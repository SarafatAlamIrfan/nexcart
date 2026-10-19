import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Target,
  Rocket,
  Shield,
  Zap,
  Package,
  Search,
  ArrowRight,
  Users,
  Globe,
  Heart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About NexCart',
  description:
    'Learn about NexCart — a modern product discovery platform built for smart shoppers and creators.',
};

const benefits = [
  {
    icon: Search,
    title: 'Powerful Discovery',
    description:
      'Find exactly what you need with smart search, category browsing, and price filters.',
  },
  {
    icon: Package,
    title: 'Full Catalog Control',
    description:
      'Add your own products and manage the complete catalog with an intuitive interface.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description:
      'Firebase-powered authentication keeps your account and data safe at all times.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built on Next.js with the App Router for instant navigation and optimal performance.',
  },
  {
    icon: Globe,
    title: 'Always Accessible',
    description:
      'Responsive design ensures a great experience on every device and screen size.',
  },
  {
    icon: Heart,
    title: 'Curated Quality',
    description:
      'Every product in the default catalog is selected for quality, relevance, and value.',
  },
];

const keyFeatures = [
  'Email and password authentication via Firebase',
  'Optional Google Sign-In support',
  'Real-time auth state persistence',
  'Add and manage custom products',
  'LocalStorage-powered product persistence',
  'Case-insensitive product search',
  'Filter by category and price range',
  'Dynamic product detail pages',
  'Protected routes for authenticated users',
  'Responsive design for all screen sizes',
  'Toast notifications for key actions',
  'Accessible UI with ARIA attributes',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Rocket className="w-4 h-4" />
            About NexCart
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            Built for the Modern Shopper
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            NexCart is a product discovery and management platform designed to help people
            find better products and manage curated catalogs with ease.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                Simplifying Product Discovery for Everyone
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We built NexCart because finding quality products online is often frustrating.
                Overwhelming search results, inconsistent information, and scattered catalogs
                make it hard to make confident purchasing decisions.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                NexCart solves this by providing a clean, focused platform where every product
                is presented clearly with complete information — full descriptions, specifications,
                and images that help you decide with confidence.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you are exploring new products, managing your own catalog, or helping
                others discover great finds, NexCart gives you the tools to do it beautifully.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '12+', sublabel: 'Curated Products', color: 'bg-indigo-50 text-indigo-700' },
                { label: '4', sublabel: 'Categories', color: 'bg-emerald-50 text-emerald-700' },
                { label: '100%', sublabel: 'Open Platform', color: 'bg-amber-50 text-amber-700' },
                { label: 'Free', sublabel: 'To Use', color: 'bg-purple-50 text-purple-700' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`${stat.color} rounded-2xl p-6 text-center`}
                >
                  <p className="text-4xl font-extrabold mb-1">{stat.label}</p>
                  <p className="text-sm font-medium opacity-80">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Platform Benefits
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Everything you need for a seamless product discovery experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Key Features
            </h2>
            <p className="text-slate-600">Everything built into NexCart out of the box.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {keyFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3"
              >
                <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Users className="w-12 h-12 mx-auto mb-5 text-white/70" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Explore?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Browse our curated product catalog and discover your next favorite find.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/items"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
