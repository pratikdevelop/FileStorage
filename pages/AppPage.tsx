
import React from 'react';
import Uploader from '../components/Uploader';

const AppPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-dark flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 pt-24">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Secure<span className="text-brand-blue">Vault</span> Pro
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Enterprise-grade chunked file uploader with drag & drop.
          </p>
        </header>
        <main>
          <Uploader />
        </main>
      </div>
    </div>
  );
};

export default AppPage;
