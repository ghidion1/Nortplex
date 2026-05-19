import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true la inceput — verifica sesiunea

  // ─── Verifica sesiunea la incarcare ────────────────────────
  useEffect(() => {
    authService.me()
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));

    // Daca venit dupa OAuth redirect cu ?login=success
    if (window.location.search.includes('login=success')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // ─── Login ──────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const { user } = await authService.login(email, password);
    setUser(user);
    return user;
  }, []);

  // ─── Register ───────────────────────────────────────────────
  const register = useCallback(async (data) => {
    const { user } = await authService.register(data);
    setUser(user);
    return user;
  }, []);

  // ─── Logout ─────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await authService.logout().catch(() => {});
    setUser(null);
  }, []);

  // ─── Forgot password ────────────────────────────────────────
  const forgotPassword = useCallback((email) => {
    return authService.forgotPassword(email);
  }, []);

  // ─── Reset password ─────────────────────────────────────────
  const resetPassword = useCallback((token, password) => {
    return authService.resetPassword(token, password);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      googleLoginUrl: authService.googleLoginUrl,
      githubLoginUrl: authService.githubLoginUrl,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
