module.exports = function handler(req, res) {
  try {
    return require('./_app.cjs')(req, res);
  } catch (err) {
    console.error('[Vercel API bootstrap]', err);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({
      error: 'API bootstrap failed',
      code: err.code || null,
      message: err.message,
    }));
  }
};
