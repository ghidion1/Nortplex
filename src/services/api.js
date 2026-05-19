// ─── API Client cu auto-refresh JWT ──────────────────────────
// Toate request-urile API trec prin aceasta functie

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

let isRefreshing = false;
let refreshQueue = [];

async function processQueue(error) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  refreshQueue = [];
}

/**
 * Fetch cu logica de retry dupa refresh token
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Trimite cookies httpOnly
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // Daca access token expirat — incearca refresh
  if (response.status === 401) {
    const data = await response.clone().json().catch(() => ({}));

    if (data.code === 'TOKEN_EXPIRED') {
      if (isRefreshing) {
        // Asteapta refresh-ul curent
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(() => apiFetch(endpoint, options));
      }

      isRefreshing = true;

      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshRes.ok) {
          // Redirect la login
          processQueue(new Error('Session expired'));
          window.location.href = '/login';
          throw new Error('Session expired. Please log in again.');
        }

        processQueue(null);
        return apiFetch(endpoint, options);
      } catch (err) {
        processQueue(err);
        throw err;
      } finally {
        isRefreshing = false;
      }
    }
  }

  // Returneaza datele sau arunca eroarea
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ─── Metode convenabile ───────────────────────────────────────
export const api = {
  get: (endpoint, options) => apiFetch(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => apiFetch(endpoint, { method: 'POST', body, ...options }),
  put: (endpoint, body, options) => apiFetch(endpoint, { method: 'PUT', body, ...options }),
  patch: (endpoint, body, options) => apiFetch(endpoint, { method: 'PATCH', body, ...options }),
  delete: (endpoint, options) => apiFetch(endpoint, { method: 'DELETE', ...options }),
};
