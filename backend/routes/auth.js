const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const https = require('https');

const db = require('../config/db');
const { requireAuth } = require('../middleware/auth');
const { sendEmail } = require('../config/mailer');

const configuredFrontendUrl = process.env.FRONTEND_URL;
const jwtSecret = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? null : 'dev-only-jwt-secret-change-me');

// ─── Rate limiting ─────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── TOKENS ─────────────────────────────────────
function generateAccessToken(userId) {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is required in production.');
  }

  return jwt.sign(
    { sub: userId, iat: Math.floor(Date.now() / 1000) },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
}

function parseExpiry(expiry) {
  const unit = expiry.slice(-1);
  const val = parseInt(expiry.slice(0, -1));
  if (unit === 'd') return val * 24 * 60 * 60 * 1000;
  if (unit === 'h') return val * 60 * 60 * 1000;
  if (unit === 'm') return val * 60 * 1000;
  return 7 * 24 * 60 * 60 * 1000;
}

function generateRefreshToken(userId) {
  const token = uuidv4() + '-' + crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresMs = parseExpiry(process.env.JWT_REFRESH_EXPIRES_IN || '7d');
  const expiresAt = Date.now() + expiresMs;

  db.prepare(`
    INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(uuidv4(), userId, tokenHash, expiresAt, Date.now());

  return { token, expiresAt };
}

// ─── COOKIES ───────────────────────────────────
function setAuthCookies(res, accessToken, refreshToken, refreshExpiresAt) {
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: parseExpiry(process.env.JWT_EXPIRES_IN || '15m'),
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: Math.max(refreshExpiresAt - Date.now(), 0),
    path: '/api/auth/refresh',
  });
}

function clearAuthCookies(res) {
  const isProd = process.env.NODE_ENV === 'production';
  const opts = { httpOnly: true, secure: isProd, sameSite: isProd ? 'strict' : 'lax' };

  res.clearCookie('access_token', opts);
  res.clearCookie('refresh_token', { ...opts, path: '/api/auth/refresh' });
}

function formatUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    company: user.company || null,
    avatarUrl: user.avatar_url || null,
    isVerified: !!user.is_verified,
  };
}

function getRequestBaseUrl(req) {
  const proto = (req.get('x-forwarded-proto') || req.protocol || 'http').split(',')[0].trim();
  const host = (req.get('x-forwarded-host') || req.get('host') || 'localhost').split(',')[0].trim();
  return `${proto}://${host}`;
}

function getFrontendUrl(req) {
  return configuredFrontendUrl || getRequestBaseUrl(req);
}

function getGoogleRedirectUri(req) {
  return process.env.GOOGLE_REDIRECT_URI || `${getRequestBaseUrl(req)}/api/auth/google/callback`;
}

function getGithubRedirectUri(req) {
  return process.env.GITHUB_REDIRECT_URI || `${getRequestBaseUrl(req)}/api/auth/github/callback`;
}

// ───────────────────────────────────────────────
// AUTH ROUTES
// ───────────────────────────────────────────────

router.post('/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existing) return res.status(409).json({ error: 'Email exists' });

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = uuidv4();
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const now = Date.now();

    db.prepare(`
      INSERT INTO users (id, email, name, company, password_hash, verification_token, is_verified, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
    `).run(userId, email.toLowerCase(), name, company || null, passwordHash, verificationToken, now, now);

    const accessToken = generateAccessToken(userId);
    const { token: refreshToken, expiresAt } = generateRefreshToken(userId);
    setAuthCookies(res, accessToken, refreshToken, expiresAt);

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    return res.status(201).json({ user: formatUser(user), accessToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
      const expiresAt = Date.now() + 60 * 60 * 1000;

      db.prepare(`
        UPDATE users
        SET reset_token = ?, reset_token_expires = ?, updated_at = ?
        WHERE id = ?
      `).run(resetTokenHash, expiresAt, Date.now(), user.id);

      const resetUrl = `${getFrontendUrl(req)}/reset-password?token=${resetToken}`;

      sendEmail({
        to: user.email,
        subject: 'NortPlex - Resetare parola',
        html: `
          <h2>Resetare parola</h2>
          <p>Am primit o cerere de resetare a parolei pentru contul tau NortPlex.</p>
          <p><a href="${resetUrl}">Reseteaza parola</a></p>
          <p>Link-ul expira in 60 de minute. Daca nu ai cerut resetarea, poti ignora acest email.</p>
        `,
      }).catch(err => console.error('[Auth] Failed to send reset email:', err));
    }

    res.json({ message: 'If an account exists for this email, a reset link was sent.' });
  } catch (err) {
    console.error('[POST /auth/forgot-password]', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required.' });
    }
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and include uppercase, lowercase, and a number.' });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = db.prepare(`
      SELECT * FROM users
      WHERE reset_token = ? AND reset_token_expires > ?
    `).get(tokenHash, Date.now());

    if (!user) {
      return res.status(400).json({ error: 'Reset token is invalid or expired.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    db.prepare(`
      UPDATE users
      SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL, updated_at = ?
      WHERE id = ?
    `).run(passwordHash, Date.now(), user.id);

    db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(user.id);
    clearAuthCookies(res);

    res.json({ message: 'Password reset successfully.' });
  } catch (err) {
    console.error('[POST /auth/reset-password]', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = generateAccessToken(user.id);
    const { token: refreshToken, expiresAt } = generateRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken, expiresAt);

    res.json({ user: formatUser(user), accessToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  const refreshToken = req.cookies?.refresh_token;

  if (refreshToken) {
    const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    db.prepare('DELETE FROM refresh_tokens WHERE token_hash = ?').run(hash);
  }

  clearAuthCookies(res);
  res.json({ message: 'Logged out' });
});

router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: 'No token' });

  const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const stored = db.prepare('SELECT * FROM refresh_tokens WHERE token_hash = ?').get(hash);

  if (!stored || stored.expires_at < Date.now()) {
    clearAuthCookies(res);
    return res.status(401).json({ error: 'Expired' });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(stored.user_id);
  if (!user) return res.status(401).json({ error: 'User not found' });

  db.prepare('DELETE FROM refresh_tokens WHERE id = ?').run(stored.id);

  const newAccessToken = generateAccessToken(user.id);
  const { token: newRefreshToken, expiresAt } = generateRefreshToken(user.id);

  setAuthCookies(res, newAccessToken, newRefreshToken, expiresAt);

  res.json({ user: formatUser(user), accessToken: newAccessToken });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: formatUser(req.user) });
});

// ───────────────────────────────────────────────
// GOOGLE OAUTH
// ───────────────────────────────────────────────

router.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const frontendUrl = getFrontendUrl(req);
  const redirectUri = getGoogleRedirectUri(req);

  if (!clientId || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.redirect(`${frontendUrl}/login?error=google_config`);
  }

  const state = crypto.randomBytes(16).toString('hex');

  res.cookie('oauth_state', state, { httpOnly: true, maxAge: 10 * 60 * 1000 });

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code&scope=openid%20email%20profile&state=${state}`;

  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    const frontendUrl = getFrontendUrl(req);
    const redirectUri = getGoogleRedirectUri(req);

    if (state !== req.cookies?.oauth_state) {
      return res.redirect(`${frontendUrl}/login?error=state`);
    }

    const tokenData = await fetchJson('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    const profile = await fetchJson('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const user = upsertOAuthUser({
      provider: 'google',
      providerId: profile.sub,
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.picture,
    });

    const accessToken = generateAccessToken(user.id);
    const { token: refreshToken, expiresAt } = generateRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken, expiresAt);

    res.redirect(`${frontendUrl}/?login=success`);

  } catch (err) {
    console.error(err);
    res.redirect(`${frontendUrl}/login?error=google`);
  }
});

// ───────────────────────────────────────────────
// GITHUB OAUTH
// ───────────────────────────────────────────────

router.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const frontendUrl = getFrontendUrl(req);
  const redirectUri = getGithubRedirectUri(req);

  if (!clientId || !process.env.GITHUB_CLIENT_SECRET) {
    return res.redirect(`${frontendUrl}/login?error=github_config`);
  }

  const state = crypto.randomBytes(16).toString('hex');
  res.cookie('oauth_state', state, { httpOnly: true, maxAge: 10 * 60 * 1000 });

  const url =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=read:user%20user:email&state=${state}`;

  res.redirect(url);
});

router.get('/github/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    const frontendUrl = getFrontendUrl(req);
    const redirectUri = getGithubRedirectUri(req);

    if (state !== req.cookies?.oauth_state) {
      return res.redirect(`${frontendUrl}/login?error=state`);
    }

    const tokenData = await fetchJson('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'NortPlex',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: redirectUri,
      }).toString(),
    });

    const profile = await fetchJson('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'NortPlex',
      },
    });

    let email = profile.email;
    if (!email) {
      const emails = await fetchJson('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'NortPlex',
        },
      });
      const primary = Array.isArray(emails) ? emails.find(item => item.primary && item.verified) : null;
      email = primary?.email;
    }

    if (!email) {
      return res.redirect(`${frontendUrl}/login?error=github_email`);
    }

    const user = upsertOAuthUser({
      provider: 'github',
      providerId: String(profile.id),
      email,
      name: profile.name || profile.login || email.split('@')[0],
      avatarUrl: profile.avatar_url,
    });

    const accessToken = generateAccessToken(user.id);
    const { token: refreshToken, expiresAt } = generateRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken, expiresAt);

    res.redirect(`${frontendUrl}/?login=success`);
  } catch (err) {
    console.error(err);
    res.redirect(`${frontendUrl}/login?error=github`);
  }
});

// ───────────────────────────────────────────────
// HELPER FETCH
// ───────────────────────────────────────────────

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);

    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers: options.headers,
    }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : {};
          if (res.statusCode >= 400) {
            const err = new Error(`Request failed with status ${res.statusCode}`);
            err.response = json;
            reject(err);
            return;
          }
          resolve(json);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function upsertOAuthUser({ provider, providerId, email, name, avatarUrl }) {
  const now = Date.now();
  const providerColumn = provider === 'google' ? 'google_id' : 'github_id';

  let user = db.prepare(`SELECT * FROM users WHERE ${providerColumn} = ?`).get(providerId);

  if (user) {
    db.prepare(`
      UPDATE users
      SET email = ?, name = ?, avatar_url = ?, is_verified = 1, updated_at = ?
      WHERE id = ?
    `).run(email.toLowerCase(), name, avatarUrl || null, now, user.id);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
  }

  user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());

  if (user) {
    db.prepare(`
      UPDATE users
      SET ${providerColumn} = ?, name = COALESCE(name, ?), avatar_url = COALESCE(avatar_url, ?), is_verified = 1, updated_at = ?
      WHERE id = ?
    `).run(providerId, name, avatarUrl || null, now, user.id);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
  }

  const userId = uuidv4();
  db.prepare(`
    INSERT INTO users (id, email, name, ${providerColumn}, avatar_url, is_verified, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 1, ?, ?)
  `).run(userId, email.toLowerCase(), name, providerId, avatarUrl || null, now, now);

  return db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
}

// ───────────────────────────────────────────────

module.exports = router;
