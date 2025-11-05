
import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AppPage from './pages/AppPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

export type Page = 'landing' | 'pricing' | 'login' | 'signup' | 'app';

const AppContent: React.FC = () => {
  const { page, setPage, isAuthenticated } = useAuth();

  const renderPage = () => {
    // If authenticated, always show the app page if requested
    if (isAuthenticated && page === 'app') {
      return <AppPage />;
    }

    // Public pages
    switch (page) {
      case 'pricing':
        return <PricingPage setPage={setPage} />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'app':
         // If not authenticated and trying to access app, redirect to login
        return <LoginPage />;
      case 'landing':
      default:
        return <LandingPage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-dark">
      <Navbar />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
