
import React from 'react';
import { Page } from '../App';

interface NavbarProps {
  setPage: (page: Page) => void;
  currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ setPage, currentPage }) => {
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
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('landing'); }} className={`${navLinkClasses} ${currentPage === 'landing' ? 'text-brand-blue' : ''}`}>
                  Home
                </a>
                <a href="#features" onClick={(e) => { e.preventDefault(); setPage('landing'); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className={navLinkClasses}>
                  Features
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('pricing'); }} className={`${navLinkClasses} ${currentPage === 'pricing' ? 'text-brand-blue' : ''}`}>
                  Pricing
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className={`${navLinkClasses} mr-4`}>
                Log in
              </a>
              <button
                onClick={() => setPage('signup')}
                className="bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
