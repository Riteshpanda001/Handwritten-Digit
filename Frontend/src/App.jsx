import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Predictor from './pages/Predictor';
import Model from './pages/Model';
import History from './pages/History';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AuthModal from './components/layout/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, openAuthModal } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openAuthModal('login');
    }
  }, [loading, isAuthenticated, openAuthModal]);

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppRoutes() {
  const { isAuthOpen, authMode, closeAuthModal, setCurrentUser } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/predictor"
          element={
            <ProtectedRoute>
              <Predictor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/model"
          element={
            <ProtectedRoute>
              <Model />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={closeAuthModal}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
