import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider — Placeholder for future authentication system.
 * 
 * TODO: Connect to backend API
 * - Implement JWT token storage & refresh
 * - Add OAuth2 social login support
 * - Add MFA/2FA flow
 * - Integrate with subscription system
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (/* email, password */) => {
    // TODO: Implement API call to /api/auth/login
    setLoading(true);
    try {
      // const response = await authService.login(email, password);
      // setUser(response.user);
      // localStorage.setItem('token', response.token);
      console.log('[AuthContext] Login not yet implemented — connect backend');
    } catch (err) {
      console.error('[AuthContext] Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    // TODO: Implement API call to /api/auth/logout
    setUser(null);
    // localStorage.removeItem('token');
  }, []);

  const register = useCallback(async (/* data */) => {
    // TODO: Implement API call to /api/auth/register
    console.log('[AuthContext] Register not yet implemented — connect backend');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
