const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ═══════════════════════════════════════════════════════════
// GET /api/status  — health check public
// ═══════════════════════════════════════════════════════════
router.get('/', (req, res) => {
  let dbOk = false;
  try {
    db.prepare('SELECT 1').get();
    dbOk = true;
  } catch (_) {}

  const status = dbOk ? 'operational' : 'degraded';
  const code = dbOk ? 200 : 503;

  return res.status(code).json({
    status,
    services: {
      api: 'operational',
      database: dbOk ? 'operational' : 'degraded',
    },
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// ═══════════════════════════════════════════════════════════
// GET /api/status/ping  — latency check
// ═══════════════════════════════════════════════════════════
router.get('/ping', (req, res) => {
  res.json({ pong: true, ts: Date.now() });
});

module.exports = router;
