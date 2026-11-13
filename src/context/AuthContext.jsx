import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => dataService.getActiveUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(dataService.getActiveUser());
    };
    window.addEventListener('capsahabat_auth_changed', handleAuthChange);
    return () => window.removeEventListener('capsahabat_auth_changed', handleAuthChange);
  }, []);

  const login = (email, password) => {
    const authenticated = dataService.authenticate(email, password);
    if (authenticated) {
      setUser(authenticated);
      return { success: true, user: authenticated };
    }
    return { success: false, message: 'Email atau password salah' };
  };

  const logout = () => {
    dataService.logout();
    setUser(null);
  };

  const isAdmin = user && (user.role === 'admin' || user.role === 'super_admin');
  const isSuperAdmin = user && user.role === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

