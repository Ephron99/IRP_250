import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import FrontOffice from './pages/FrontOffice';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './i18n/config';

// Auth Guard component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Layout component to wrap protected routes
const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-erp-bg flex transition-colors duration-300">
    <Sidebar />
    <div className="flex-1 flex flex-col ml-64">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  </div>
);

// Placeholder components for other pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="ml-64 p-8 min-h-screen bg-erp-bg flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-erp-text-main mb-4">{title}</h1>
      <p className="text-erp-text-muted">This module is coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout><Dashboard /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/front-office" element={
              <ProtectedRoute>
                <AppLayout><FrontOffice /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/housekeeping" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="Housekeeping" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/fb-service" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="F&B Service" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/hr" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="Human Resources" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/finance" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="Accounting & Finance" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/purchasing" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="Purchasing & Inventory" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="Sales & Marketing" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/security" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="Security" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/engineering" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="Engineering & Maintenance" /></AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/it" element={
              <ProtectedRoute>
                <AppLayout><PlaceholderPage title="IT" /></AppLayout>
              </ProtectedRoute>
            } />
  
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
