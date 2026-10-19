import type { Metadata } from 'next';
import Link from 'next/link';
import { Cpu, Shirt, Home, Watch, ArrowRight } from 'lucide-react';
import { SEED_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Categories | NexCart',
  description:
    'Browse NexCart product categories — Electronics, Fashion, Home & Living, and Accessories.',
};

const categories = [
  {
    name: 'Electronics',
    icon: Cpu,
    description:
      'Cutting-edge tech, audio gear, keyboards, and gadgets to power your digital life.',
    color: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-700',
  },
  {
    name: 'Fashion',
    icon: Shirt,
    description:
      'Modern wardrobe essentials — shirts, sweaters, and styles that never go out of fashion.',
    color: 'from-pink-500 to-rose-600',
    lightBg: 'bg-pink-50',
    lightText: 'text-pink-700',
  },
  {
    name: 'Home & Living',
    icon: Home,
    description:
      'Elevate your living space with curated coffee sets, organizers, and air purifiers.',
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    lightText: 'text-emerald-700',
  },
  {
    name: 'Accessories',
    icon: Watch,
    description:
      'Premium finishing touches — watches, bags, and sunglasses crafted with care.',
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-700',
  },
];

export default function CategoriesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Product Categories
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From the latest tech to timeless style, explore our curated
            collections across four categories.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = SEED_PRODUCTS.filter(
                (p) => p.category === category.name
              ).length;

              return (
                <Link
                  key={category.name}
                  href={`/items?category=${encodeURIComponent(category.name)}`}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-8 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />

                  <div className="flex items-start gap-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-slate-900">
                          {category.name}
                        </h2>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${category.lightBg} ${category.lightText}`}
                        >
                          {count} product{count !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                        Browse {category.name}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {categories.map((category) => {
        const Icon = category.icon;
        const categoryProducts = SEED_PRODUCTS.filter(
          (p) => p.category === category.name
        );

        return (
          <section
            key={category.name}
            className="py-12 sm:py-16 border-t border-slate-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {category.name}
                  </h2>
                </div>
                <Link
                  href={`/items?category=${encodeURIComponent(category.name)}`}
                  className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-6 text-center sm:hidden">
                <Link
                  href={`/items?category=${encodeURIComponent(category.name)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View all {category.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
