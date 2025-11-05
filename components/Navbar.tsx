
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { page, setPage, isAuthenticated, userEmail, logout } = useAuth();
  const navLinkClasses = "transition-colors hover:text-brand-blue";

  return (
    <nav className="bg-gray-medium/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setPage('landing')}>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Secure<span className="text-brand-blue">Vault</span>
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('landing'); }} className={`${navLinkClasses} ${page === 'landing' ? 'text-brand-blue' : ''}`}>
                  Home
                </a>
                <a href="#features" onClick={(e) => { e.preventDefault(); setPage('landing'); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className={navLinkClasses}>
                  Features
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('pricing'); }} className={`${navLinkClasses} ${page === 'pricing' ? 'text-brand-blue' : ''}`}>
                  Pricing
                </a>
                 {isAuthenticated && (
                   <a href="#" onClick={(e) => { e.preventDefault(); setPage('app'); }} className={`${navLinkClasses} ${page === 'app' ? 'text-brand-blue' : ''}`}>
                      Uploader
                   </a>
                 )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300 mr-4 text-sm">Welcome, {userEmail}</span>
                   <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 transition-colors"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className={`${navLinkClasses} mr-4`}>
                    Log in
                  </a>
                  <button
                    onClick={() => setPage('signup')}
                    className="bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
