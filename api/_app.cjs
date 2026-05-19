let app;

function getApp() {
  if (!app) app = require('../backend/server.js');
  return app;
}

function normalizePathParam(value) {
  if (Array.isArray(value)) return value.join('/');
  if (typeof value === 'string') return value;
  return '';
}

module.exports = function handler(req, res) {
  const path = normalizePathParam(req.query?.path);

  if (path && (req.url.startsWith('/api/index') || req.url.startsWith('/api/[...path]'))) {
    const queryIndex = req.url.indexOf('?');
    const query = queryIndex >= 0 ? req.url.slice(queryIndex) : '';
    req.url = `/api/${path}${query}`;
  }

  try {
    return getApp()(req, res);
  } catch (err) {
    console.error('[Express API runtime]', err);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({
      error: 'API runtime failed',
      code: err.code || null,
      message: err.message,
    }));
  }
};
