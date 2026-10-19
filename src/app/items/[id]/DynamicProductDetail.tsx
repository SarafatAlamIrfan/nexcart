'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Tag, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80';

export default function DynamicProductDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { products, loading, getProductById } = useProducts();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
        <p className="text-slate-600 mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/items"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/items"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <Tag className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            {product.featured && (
              <span className="text-xs font-semibold text-white bg-indigo-600 px-2.5 py-1 rounded-full">
                Featured
              </span>
            )}
            {product.isUserAdded && (
              <span className="text-xs font-semibold text-white bg-emerald-500 px-2.5 py-1 rounded-full">
                User Added
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
            {product.title}
          </h1>

          <p className="text-4xl font-extrabold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">{product.fullDescription}</p>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Calendar className="w-3.5 h-3.5" />
            Added{' '}
            {new Date(product.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div className="bg-slate-50 rounded-xl p-5">
              <h2 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">
                Specifications
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs text-slate-500">{key}</dt>
                      <dd className="text-sm font-semibold text-slate-800">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 mb-12">
        <h2 className="font-bold text-slate-900 mb-3">Additional Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Product ID</span>
            <p className="font-mono text-slate-800 mt-0.5 text-xs break-all">{product.id}</p>
          </div>
          <div>
            <span className="text-slate-500">Category</span>
            <p className="font-semibold text-slate-800 mt-0.5">{product.category}</p>
          </div>
          <div>
            <span className="text-slate-500">Status</span>
            <p className="font-semibold text-emerald-700 mt-0.5">In Catalog</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
