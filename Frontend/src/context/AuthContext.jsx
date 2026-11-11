import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser({ id: user.id, name: user.full_name, email: user.email });
        }
      } catch (err) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  const handleLogin = async (email, password) => {
    const data = await loginUser(email, password);
    const user = { id: data.user.id, name: data.user.full_name, email: data.user.email };
    setCurrentUser(user);
    return user;
  };

  const handleRegister = async (fullName, email, password) => {
    const data = await registerUser(fullName, email, password);
    const user = { id: data.user.id, name: data.user.full_name, email: data.user.email };
    setCurrentUser(user);
    return user;
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    isAuthOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    setCurrentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
