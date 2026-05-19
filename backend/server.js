require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

// ─── Security ─────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// ─── CORS ────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3001',
  'https://nortplex.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));

// ─── Parsers ─────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── ROUTES ──────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/status', require('./routes/status'));

// ─── FRONTEND (prod) ─────────────────────
if (isProd) {
  const distPath = path.join(__dirname, '..', 'dist');

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.warn(`[Server] Production build not found at ${distPath}`);
  }
}

// ─── ROOT (dev) ──────────────────────────
if (!isProd) {
  app.get('/', (req, res) => {
    res.json({ message: 'NortPlex API running' });
  });
}

// ─── 404 ────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── START ───────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
