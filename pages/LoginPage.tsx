
import React from 'react';
import { Page } from '../App';

interface LoginPageProps {
  setPage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setPage }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and navigate to the app
    setPage('app');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-16">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-medium rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-white">
            Log in to SecureVault
          </h2>
          <p className="mt-2 text-sm text-center text-gray-400">
            Don't have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('signup'); }} className="font-medium text-brand-blue hover:text-blue-400">
              Sign up
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 text-white bg-gray-light border border-gray-lighter rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-white bg-gray-light border border-gray-lighter rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-brand-blue hover:text-blue-400">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-dark focus:ring-brand-blue"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
