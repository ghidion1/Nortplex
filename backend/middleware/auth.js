const jwt = require('jsonwebtoken');
const db = require('../config/db');

/**
 * Middleware: verifica JWT din cookie sau header Authorization
 * Pune user-ul in req.user daca tokenul e valid
 */
function requireAuth(req, res, next) {
  const token = extractToken(req);
  const jwtSecret = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? null : 'dev-only-jwt-secret-change-me');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  if (!jwtSecret) {
    return res.status(500).json({ error: 'Authentication is not configured.' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    
    // Verifica ca user-ul inca exista in DB
    const user = db.prepare('SELECT id, email, name, company, avatar_url, is_verified FROM users WHERE id = ?').get(payload.sub);
    
    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

/**
 * Middleware optional: seteaza req.user daca exista token, dar nu blocheaza
 */
function optionalAuth(req, res, next) {
  const token = extractToken(req);
  const jwtSecret = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? null : 'dev-only-jwt-secret-change-me');

  if (!token || !jwtSecret) return next();

  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = db.prepare('SELECT id, email, name, company, avatar_url, is_verified FROM users WHERE id = ?').get(payload.sub);
    if (user) req.user = user;
  } catch (_) {
    // Ignora token invalid pentru auth optional
  }

  next();
}

function extractToken(req) {
  // 1. Cookie httpOnly
  if (req.cookies?.access_token) return req.cookies.access_token;
  // 2. Authorization: Bearer <token>
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

module.exports = { requireAuth, optionalAuth };
