const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  // Verifica daca SMTP e configurat
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'nortplex@gmail.com' && !process.env.SMTP_PASS) {
    console.warn('[Mailer] SMTP not configured — emails will be logged to console only');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Trimite un email
 * @param {Object} opts - { to, subject, html, text }
 */
async function sendEmail({ to, subject, html, text }) {
  const t = getTransporter();

  if (!t) {
    // Dev fallback: log in consola
    console.log('\n📧 [EMAIL - CONSOLE FALLBACK]');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(text || html?.replace(/<[^>]+>/g, ''));
    console.log('─────────────────────────────\n');
    return;
  }

  return t.sendMail({
    from: process.env.SMTP_FROM || 'NortPlex <nortplex@gmail.com>',
    to,
    subject,
    html,
    text: text || html?.replace(/<[^>]+>/g, ''),
  });
}

module.exports = { sendEmail };
