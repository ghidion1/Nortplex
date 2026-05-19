const app = require('../backend/server.js');

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

  return app(req, res);
};
