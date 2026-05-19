let db;

module.exports = new Proxy({}, {
  get(_target, prop) {
    if (!db) db = require('./db');

    const value = db[prop];
    return typeof value === 'function' ? value.bind(db) : value;
  },
});
