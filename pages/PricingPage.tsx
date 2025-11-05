
import React from 'react';
import { Page } from '../App';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';

interface PricingPageProps {
  setPage: (page: Page) => void;
}

const tiers = [
  {
    name: 'Free',
    price: '$0',
    freq: '/ user / month',
    description: 'For individuals and small teams getting started.',
    features: [
      '5GB storage',
      'Basic sharing',
      'Standard security',
      'Up to 3 users',
    ],
    cta: 'Get started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    freq: '/ user / month',
    description: 'For professionals and teams that need more power.',
    features: [
      '2TB storage per user',
      'Advanced versioning',
      'MFA & Hardware Keys',
      'Full-text search',
      'Basic API access',
    ],
    cta: 'Choose Pro',
    popular: false,
  },
  {
    name: 'Business',
    price: '$25',
    freq: '/ user / month',
    description: 'For companies that need advanced collaboration and security.',
    features: [
      'Unlimited storage',
      'SSO & audit logs',
      'AI-powered search',
      'Compliance reporting',
      'Advanced integrations',
    ],
    cta: 'Choose Business',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    freq: '',
    description: 'For large organizations with complex compliance needs.',
    features: [
      'Zero-Knowledge E2EE',
      'On-premise or cloud deployment',
      'Dedicated support & SLA',
      'Customer-managed KMS',
      'Custom feature development',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const PricingPage: React.FC<PricingPageProps> = ({ setPage }) => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Flexible pricing for teams of all sizes
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Choose the plan that’s right for your business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-lg p-8 flex flex-col ${tier.popular ? 'border-2 border-brand-blue bg-gray-light' : 'bg-gray-medium'}`}
            >
              {tier.popular && (
                <div className="text-center">
                    <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-3 py-1 text-sm font-semibold rounded-full">Most Popular</p>
                </div>
              )}
              <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-4 text-gray-400 flex-grow">{tier.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                <span className="text-base font-medium text-gray-400">{tier.freq}</span>
              </div>
              <ul className="mt-6 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-6 w-6 text-success" />
                    </div>
                    <p className="ml-3 text-base text-gray-300">{feature}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setPage('signup'); }}
                  className={`block w-full text-center rounded-lg px-6 py-3 text-lg font-semibold ${tier.popular ? 'text-white bg-brand-blue hover:bg-blue-500' : 'text-brand-blue bg-gray-dark hover:bg-gray-light'}`}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
