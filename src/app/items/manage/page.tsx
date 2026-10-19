'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, Trash2, Package, PlusCircle } from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ConfirmDialog from '@/components/ConfirmDialog';
import EmptyState from '@/components/EmptyState';
import { toast } from 'sonner';
import { Product } from '@/types';

function ManageProductsTable() {
  const { products, deleteProduct, loading } = useProducts();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id);
    toast.success(`"${productToDelete.title}" deleted successfully.`);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-slate-500">Loading products…</div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products in catalog"
        description="Add your first product to get started."
        action={
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Product
          </Link>
        }
      />
    );
  }

  return (
    <>
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title="Delete Product"
        description={`Are you sure you want to delete "${productToDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        destructive
      />

      {/* Mobile cards */}
      <div className="sm:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">
                  {product.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{product.category}</p>
                <p className="text-sm font-bold text-indigo-600 mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex border-t border-slate-100">
              <Link
                href={`/items/${product.id}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </Link>
              <div className="w-px bg-slate-100" />
              <button
                onClick={() => handleDeleteClick(product)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full" aria-label="Products management table">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80';
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate max-w-[200px]">
                        {product.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-slate-900 text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                  {new Date(product.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/items/${product.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                      aria-label={`View ${product.title}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      aria-label={`Delete ${product.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ManageProductsPage() {
  const { products } = useProducts();

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              Manage Products
            </h1>
            <p className="text-slate-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} in catalog
            </p>
          </div>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        <ManageProductsTable />
      </div>
    </ProtectedRoute>
  );
}
