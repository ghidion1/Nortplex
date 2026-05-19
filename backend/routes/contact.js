const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');

const db = require('../config/db');
const { sendEmail } = require('../config/mailer');

// Max 5 mesaje per IP la 30 minute
const contactLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Please wait 30 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ═══════════════════════════════════════════════════════════
// POST /api/contact
// ═══════════════════════════════════════════════════════════
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validare
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    if (name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    }
    if (message.trim().length > 5000) {
      return res.status(400).json({ error: 'Message is too long (max 5000 characters).' });
    }

    const ip = req.ip || req.connection?.remoteAddress;
    const id = uuidv4();
    const now = Date.now();

    // Salveaza in DB
    db.prepare(`
      INSERT INTO contact_messages (id, name, email, message, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, name.trim(), email.toLowerCase(), message.trim(), ip, now);

    const receiveEmail = process.env.CONTACT_RECEIVE_EMAIL || 'nortplex@gmail.com';

    // Email notificare catre echipa
    sendEmail({
      to: receiveEmail,
      subject: `[NortPlex Contact] Mesaj nou de la ${name}`,
      html: `
        <h2>Mesaj nou prin formularul de contact</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Nume:</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Data:</strong></td><td>${new Date(now).toLocaleString('ro-RO')}</td></tr>
          <tr><td><strong>IP:</strong></td><td>${ip}</td></tr>
        </table>
        <h3>Mesaj:</h3>
        <p style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</p>
        <p><a href="mailto:${escapeHtml(email)}">Raspunde direct</a></p>
      `,
    }).catch(err => console.error('[Contact] Failed to send notification email:', err));

    // Email de confirmare catre utilizator
    sendEmail({
      to: email,
      subject: 'NortPlex — Am primit mesajul tau!',
      html: `
        <h2>Multumim, ${escapeHtml(name)}!</h2>
        <p>Am primit mesajul tau si te vom contacta in cel mai scurt timp.</p>
        <p><strong>Mesajul tau:</strong></p>
        <blockquote style="border-left:4px solid #2563eb;padding-left:16px;color:#555">${escapeHtml(message)}</blockquote>
        <p>Cu stima,<br>Echipa NortPlex</p>
      `,
    }).catch(err => console.error('[Contact] Failed to send confirmation email:', err));

    return res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('[POST /contact]', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = router;
