import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('admin_user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse admin user token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      const payload = response?.data || response;
      const token = payload?.token || response?.token;
      const userData = payload?.user || response?.user || { name: 'SS Infotech Admin', role: 'SUPER_ADMIN' };

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('admin_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: response?.message || 'Login failed' };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
