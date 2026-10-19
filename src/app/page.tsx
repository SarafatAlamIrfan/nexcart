import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Package,
  Star,
  ChevronRight,
  Cpu,
  Shirt,
  Home,
  Watch,
} from 'lucide-react';
import { SEED_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'NexCart — Discover Better. Shop Smarter.',
  description:
    'Explore a curated collection of modern essentials, innovative gadgets, and lifestyle favorites on NexCart.',
};

const featuredProducts = SEED_PRODUCTS.filter((p) => p.featured).slice(0, 4);

const categories = [
  {
    name: 'Electronics',
    icon: Cpu,
    description: 'Cutting-edge tech and gadgets',
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50 text-blue-700',
    count: SEED_PRODUCTS.filter((p) => p.category === 'Electronics').length,
  },
  {
    name: 'Fashion',
    icon: Shirt,
    description: 'Modern style essentials',
    color: 'from-pink-500 to-rose-600',
    lightColor: 'bg-pink-50 text-pink-700',
    count: SEED_PRODUCTS.filter((p) => p.category === 'Fashion').length,
  },
  {
    name: 'Home & Living',
    icon: Home,
    description: 'Elevate your living space',
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-50 text-emerald-700',
    count: SEED_PRODUCTS.filter((p) => p.category === 'Home & Living').length,
  },
  {
    name: 'Accessories',
    icon: Watch,
    description: 'Premium finishing touches',
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-50 text-amber-700',
    count: SEED_PRODUCTS.filter((p) => p.category === 'Accessories').length,
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Curated Products',
    description:
      'Every product is hand-selected for quality, relevance, and value — saving you hours of research.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    icon: Zap,
    title: 'Smart Discovery',
    description:
      'Powerful search and filters let you find exactly what you need across categories and price ranges.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: Package,
    title: 'Product Management',
    description:
      'Add your own products, manage your catalog, and keep your collection fresh and organized.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description:
      'Firebase-powered authentication keeps your account safe with modern security standards.',
    color: 'text-blue-600 bg-blue-50',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Interior Designer',
    avatar: 'SM',
    avatarColor: 'bg-pink-500',
    rating: 5,
    text: 'NexCart has completely changed how I discover products for my clients. The curated selection and intuitive filters save me hours every week.',
  },
  {
    name: 'James Chen',
    role: 'Tech Enthusiast',
    avatar: 'JC',
    avatarColor: 'bg-indigo-500',
    rating: 5,
    text: 'Finally a product discovery platform that actually understands what "curated" means. The electronics section is spot-on every time.',
  },
  {
    name: 'Amara Osei',
    role: 'Small Business Owner',
    avatar: 'AO',
    avatarColor: 'bg-emerald-500',
    rating: 5,
    text: 'The ability to add and manage my own products is a game-changer. Clean interface, fast performance, and everything just works.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white py-20 sm:py-28 lg:py-36">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Discover Better. Shop Smarter.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
              Discover Products That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Elevate Your Everyday
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Explore a curated collection of modern essentials, innovative gadgets, and
              lifestyle favorites — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/items"
                id="hero-explore-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                id="hero-learn-more-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-slate-700 font-semibold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-indigo-300 transition-all"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                12+ Products
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                4 Categories
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Always Growing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-600 font-semibold text-sm mb-1 uppercase tracking-wider">
                Hand-picked
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Featured Products
              </h2>
            </div>
            <Link
              href="/items"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/items"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section
        id="categories"
        className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm mb-1 uppercase tracking-wider">
              Browse By
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Product Categories
            </h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">
              From the latest tech to timeless style, find exactly what you are looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={`/items?category=${encodeURIComponent(category.name)}`}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">{category.description}</p>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${category.lightColor}`}
                  >
                    {category.count} product{category.count !== 1 ? 's' : ''}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why NexCart ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm mb-1 uppercase tracking-wider">
              Why NexCart
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Built for Smart Shoppers
            </h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">
              Everything you need to discover, compare, and manage products efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <p className="text-indigo-300 font-semibold text-sm mb-1 uppercase tracking-wider">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white font-bold text-xs`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-indigo-300 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Ready to Discover Something New?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Browse our full catalog and find products that match your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/items"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
            >
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
