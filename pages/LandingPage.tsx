
import React from 'react';
import { Page } from '../App';
import Footer from '../components/Footer';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { UsersIcon } from '../components/icons/UsersIcon';

interface LandingPageProps {
  setPage: (page: Page) => void;
}

const features = [
    {
        name: 'Zero-Trust Security',
        description: 'Client-side E2EE, multi-region residency, and SOC 2 / HIPAA compliance-ready architecture ensure your data is always protected.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'AI-Powered Intelligence',
        description: 'Go beyond filename search. Find documents with natural language queries like "contracts signed last quarter" and get auto-tagged files.',
        icon: SparklesIcon,
    },
    {
        name: 'Real-Time Collaboration',
        description: 'Comment, annotate, and see changes live. A truly collaborative environment built for compliance-heavy teams.',
        icon: UsersIcon,
    },
];

const LandingPage: React.FC<LandingPageProps> = ({ setPage }) => {
  return (
    <>
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                The Secure, Collaborative
                <span className="block text-brand-blue">AI-Powered File Platform</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                SecureVault Pro combines zero-knowledge encryption, intelligent search, and seamless collaboration for enterprise teams in legal, healthcare, and finance.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setPage('signup'); }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-blue-500 md:py-4 md:text-lg md:px-10"
                  >
                    Get started for free
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                   <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setPage('pricing'); }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-blue bg-gray-dark hover:bg-gray-medium md:py-4 md:text-lg md:px-10"
                  >
                    View Pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-gray-medium py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-brand-blue font-semibold tracking-wide uppercase">Why SecureVault?</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                A better way to manage your files
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
                Built from the ground up for teams that demand security, intelligence, and speed.
              </p>
            </div>

            <div className="mt-20">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-blue text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-400">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
