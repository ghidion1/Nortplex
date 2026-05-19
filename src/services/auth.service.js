import { api } from './api';

const BASE = import.meta.env.VITE_API_URL || '/api';

export const authService = {
  /**
   * Inregistrare cont nou
   */
  register: (data) => api.post('/auth/register', data),

  /**
   * Login cu email si parola
   */
  login: (email, password) => api.post('/auth/login', { email, password }),

  /**
   * Logout — sterge cookies si refresh token din DB
   */
  logout: () => api.post('/auth/logout'),

  /**
   * Returneaza userul curent din cookie-ul de session
   */
  me: () => api.get('/auth/me'),

  /**
   * Rennoieste access token-ul (se apeleaza automat din api.js)
   */
  refresh: () => fetch(`${BASE}/auth/refresh`, { method: 'POST', credentials: 'include' }),

  /**
   * Trimite email de reset parola
   */
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),

  /**
   * Reseteaza parola cu token-ul primit pe email
   */
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),

  /**
   * URL-uri OAuth — redirecteaza la backend care redirecteaza la provider
   */
  googleLoginUrl: `${BASE}/auth/google`,
  githubLoginUrl: `${BASE}/auth/github`,
};
