import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AdminLayout from '@/layouts/AdminLayout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ServicesPage from '@/pages/services/ServicesPage';
import MessagesPage from '@/pages/messages/MessagesPage';
import GalleryPage from '@/pages/gallery/GalleryPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import TeamPage from '@/pages/team/TeamPage';
import LoginPage from '@/pages/auth/LoginPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-outfit">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router basename="/admin">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
