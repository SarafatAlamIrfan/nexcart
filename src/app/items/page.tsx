'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories'];

const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $50', value: 'under50' },
  { label: '$50–$100', value: '50to100' },
  { label: '$100–$250', value: '100to250' },
  { label: 'Above $250', value: 'above250' },
];

function filterByPrice(price: number, range: string): boolean {
  switch (range) {
    case 'under50':
      return price < 50;
    case '50to100':
      return price >= 50 && price <= 100;
    case '100to250':
      return price > 100 && price <= 250;
    case 'above250':
      return price > 250;
    default:
      return true;
  }
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, loading } = useProducts();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (category && category !== 'All') params.set('category', category);
    const newUrl = params.toString() ? `?${params.toString()}` : '/items';
    router.replace(newUrl, { scroll: false });
  }, [search, category, router]);

  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !search ||
      product.title.toLowerCase().includes(searchLower) ||
      product.shortDescription.toLowerCase().includes(searchLower) ||
      product.fullDescription.toLowerCase().includes(searchLower);
    const matchesCategory = category === 'All' || product.category === category;
    const matchesPrice = filterByPrice(product.price, priceRange);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const hasActiveFilters =
    search !== '' || category !== 'All' || priceRange !== 'all';

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setPriceRange('all');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          All Products
        </h1>
        <p className="text-slate-600">
          Discover our curated collection of premium products.
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="product-search"
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            aria-label="Search products"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors sm:hidden"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside
          className={`lg:w-56 shrink-0 space-y-5 ${
            showFilters ? 'block' : 'hidden sm:block'
          }`}
        >
          {/* Category filter */}
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-2.5 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-indigo-500" />
              Category
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  id={`category-${cat.replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === cat
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-2.5">
              Price Range
            </h3>
            <div className="space-y-1">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setPriceRange(range.value)}
                  id={`price-${range.value}`}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    priceRange === range.value
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              id="reset-filters-btn"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No products match your criteria"
              description="Try adjusting your search terms, category, or price range."
              action={
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Reset All Filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ItemsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
