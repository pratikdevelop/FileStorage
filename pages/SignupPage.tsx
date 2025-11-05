
import React from 'react';
import { Page } from '../App';

interface SignupPageProps {
  setPage: (page: Page) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ setPage }) => {
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup and navigate to the app
    setPage('app');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-16">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-medium rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-white">
            Create your SecureVault account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className="font-medium text-brand-blue hover:text-blue-400">
              Log in
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
             <div>
              <label htmlFor="full-name" className="sr-only">Full name</label>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full px-3 py-2 text-white bg-gray-light border border-gray-lighter rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                placeholder="Full name"
              />
            </div>
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
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 text-white bg-gray-light border border-gray-lighter rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
           <p className="text-xs text-center text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="font-medium text-brand-blue hover:text-blue-400">Terms of Service</a>.
           </p>
          <div>
            <button
              type="submit"
              className="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-dark focus:ring-brand-blue"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
