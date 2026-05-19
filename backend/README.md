# NortPlex — Backend Setup

## Structura proiectului

```
nortplex/
├── src/                         Frontend React (Vite)
│   ├── context/AuthContext.jsx  ✅ Conectat la backend
│   ├── hooks/use-contact.js     ✅ Conectat la backend
│   ├── services/
│   │   ├── api.js               ✅ HTTP client cu auto-refresh JWT
│   │   └── auth.service.js      ✅ Toate apelurile de auth
│   └── pages/
│       ├── Login.jsx            ✅ Actualizat cu useAuth
│       └── Register.jsx         ✅ Actualizat cu useAuth
│
├── backend/
│   ├── server.js                Serverul principal Express
│   ├── config/
│   │   ├── db.js                SQLite (fisier local, fara setup)
│   │   └── mailer.js            Nodemailer (email)
│   ├── middleware/
│   │   └── auth.js              Verificare JWT
│   ├── routes/
│   │   ├── auth.js              Login/Register/OAuth/Refresh
│   │   ├── contact.js           Formular contact
│   │   └── status.js            Health check
│   ├── .env.example             ← COPIAZA IN .env SI COMPLETEAZA
│   └── package.json
├── api/
│   ├── index.js                 Entrypoint Vercel pentru rewrite-ul /api/*
│   ├── [...path].js             Entrypoint catch-all Vercel pentru /api/*
│   └── _app.cjs                 Adapter catre Express
│
├── package.json                 Scripts: build, start, dev
├── vercel.json                  Ruleaza /api/* prin Express, restul prin SPA
└── vite.config.js               Proxy /api → localhost:3001
```

---

## Pasul 1 — Configurare .env

```bash
cp backend/.env.example backend/.env
```

Editeaza `backend/.env` si completeaza:

### JWT Secrets (OBLIGATORIU)
Genereaza doua secrete random:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Pune primul in `JWT_SECRET`, al doilea in `JWT_REFRESH_SECRET`.

### Email (pentru formularul de contact + resetare parola)
Foloseste Gmail cu App Password:
1. Mergi la myaccount.google.com → Security → 2-Step Verification → App passwords
2. Creeaza o parola pentru "Mail"
3. Pune in `SMTP_USER=nortplex@gmail.com` si `SMTP_PASS=parola_de_16_chars`

### Google OAuth (optional)
1. console.cloud.google.com → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID → Web application
3. Redirect URI local: `http://localhost:3001/api/auth/google/callback`
4. Redirect URI productie: `https://domeniultau.com/api/auth/google/callback`
5. Pune `GOOGLE_CLIENT_ID` si `GOOGLE_CLIENT_SECRET`

### GitHub OAuth (optional)
1. github.com/settings/developers → OAuth Apps → New OAuth App
2. Callback URL local: `http://localhost:3001/api/auth/github/callback`
3. Callback URL productie: `https://domeniultau.com/api/auth/github/callback`
4. Pune `GITHUB_CLIENT_ID` si `GITHUB_CLIENT_SECRET`

---

## Pasul 2 — Instalare dependente

```bash
# Frontend
npm install

# Backend
cd backend && npm install && cd ..
```

---

## Pasul 3 — Development

Terminal 1 (Backend):
```bash
npm run dev:backend
# Porneste pe http://localhost:3001
```

Terminal 2 (Frontend):
```bash
npm run dev
# Porneste pe http://localhost:5173
# Proxy automat: /api/* → http://localhost:3001
```

---

## Pasul 4 — Build pentru productie

```bash
npm run build
# Construieste frontul in /dist
# Instaleaza dependentele backend-ului

# Pornire:
NODE_ENV=production npm start
# Serverul serveste si frontul din /dist pe portul 3001
```

---

## Deploy pe Vercel

`vercel.json` trimite `/api/*` catre Express prin `api/index.cjs`, iar restul rutelor catre SPA.

Variabile necesare in Vercel:
- `NODE_ENV=production`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `FRONTEND_URL=https://domeniultau.com`
- `GOOGLE_CLIENT_ID` si `GOOGLE_CLIENT_SECRET`

Pentru Google OAuth, in Google Cloud Console trebuie adaugat exact redirect URI-ul de productie:
`https://domeniultau.com/api/auth/google/callback`.

Nota: SQLite pe Vercel foloseste `/tmp` implicit, deci datele nu sunt persistente intre instante/deploy-uri. Pentru productie reala, seteaza `SQLITE_DB_PATH` catre un storage persistent sau migreaza la o baza de date managed.

---

## API Endpoints

| Method | Endpoint | Auth | Descriere |
|--------|----------|------|-----------|
| POST | /api/auth/register | ✗ | Inregistrare |
| POST | /api/auth/login | ✗ | Login |
| POST | /api/auth/logout | ✗ | Logout |
| POST | /api/auth/refresh | ✗ | Rennoieste token (cookie) |
| GET | /api/auth/me | ✅ | Userul curent |
| POST | /api/auth/forgot-password | ✗ | Email reset parola |
| POST | /api/auth/reset-password | ✗ | Reseteaza parola |
| GET | /api/auth/google | ✗ | Redirect Google OAuth |
| GET | /api/auth/github | ✗ | Redirect GitHub OAuth |
| POST | /api/contact | ✗ | Trimite mesaj contact |
| GET | /api/status | ✗ | Health check |

---

## Note de securitate

- Tokenele JWT sunt stocate in **httpOnly cookies** (nu localStorage!)
- Refresh token rotation: la fiecare refresh se genereaza un token nou
- Rate limiting: 10 req/15min pe auth, 5 msg/30min pe contact
- Parolele sunt hashuite cu bcrypt (cost factor 12)
- CSRF protection pentru OAuth (state parameter)
- Helmet.js pentru security headers
