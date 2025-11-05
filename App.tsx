
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AppPage from './pages/AppPage';

export type Page = 'landing' | 'pricing' | 'login' | 'signup' | 'app';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');

  const renderPage = () => {
    switch (page) {
      case 'pricing':
        return <PricingPage setPage={setPage} />;
      case 'login':
        return <LoginPage setPage={setPage} />;
      case 'signup':
        return <SignupPage setPage={setPage} />;
      case 'app':
        return <AppPage />;
      case 'landing':
      default:
        return <LandingPage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-dark">
      <Navbar setPage={setPage} currentPage={page} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
