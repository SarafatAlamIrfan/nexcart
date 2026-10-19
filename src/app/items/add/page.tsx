'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/context/ProductsContext';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ProductFormData } from '@/types';
import { toast } from 'sonner';
import { PlusCircle, ImageIcon, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80';

interface FormErrors {
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  price?: string;
  category?: string;
}

function AddProductForm() {
  const router = useRouter();
  const { addProduct } = useProducts();
  const { user } = useAuth();

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    category: '',
    image: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required.';
    } else if (formData.shortDescription.trim().length < 10) {
      newErrors.shortDescription = 'Short description must be at least 10 characters.';
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = 'Full description is required.';
    } else if (formData.fullDescription.trim().length < 30) {
      newErrors.fullDescription = 'Full description must be at least 30 characters.';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required.';
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = 'Price must be a positive number.';
      } else if (priceNum > 999999) {
        newErrors.price = 'Price seems too high.';
      }
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const newProduct = addProduct(formData);
      toast.success(`"${newProduct.title}" added successfully!`);
      setSubmitted(true);
    } catch {
      toast.error('Failed to add product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <PlusCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Added!</h2>
        <p className="text-slate-600 mb-6">Your product has been added to the catalog.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setFormData({
                title: '',
                shortDescription: '',
                fullDescription: '',
                price: '',
                category: '',
                image: '',
              });
              setSubmitted(false);
            }}
            className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Add Another Product
          </button>
          <button
            onClick={() => router.push('/items')}
            className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            View All Products
          </button>
          <button
            onClick={() => router.push('/items/manage')}
            className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Manage Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-800 mb-1.5">
          Product Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Sony WH-1000XM5 Headphones"
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
            errors.title
              ? 'border-red-400 focus:ring-red-300'
              : 'border-slate-300 focus:ring-indigo-400 focus:border-transparent'
          }`}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
          </p>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label
          htmlFor="shortDescription"
          className="block text-sm font-semibold text-slate-800 mb-1.5"
        >
          Short Description <span className="text-red-500">*</span>
        </label>
        <input
          id="shortDescription"
          name="shortDescription"
          type="text"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="A brief one-line summary of the product"
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
            errors.shortDescription
              ? 'border-red-400 focus:ring-red-300'
              : 'border-slate-300 focus:ring-indigo-400 focus:border-transparent'
          }`}
          aria-describedby={errors.shortDescription ? 'short-desc-error' : undefined}
        />
        {errors.shortDescription && (
          <p id="short-desc-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.shortDescription}
          </p>
        )}
      </div>

      {/* Full Description */}
      <div>
        <label
          htmlFor="fullDescription"
          className="block text-sm font-semibold text-slate-800 mb-1.5"
        >
          Full Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="fullDescription"
          name="fullDescription"
          rows={5}
          value={formData.fullDescription}
          onChange={handleChange}
          placeholder="Describe the product in detail — features, benefits, materials, etc."
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.fullDescription
              ? 'border-red-400 focus:ring-red-300'
              : 'border-slate-300 focus:ring-indigo-400 focus:border-transparent'
          }`}
          aria-describedby={errors.fullDescription ? 'full-desc-error' : undefined}
        />
        {errors.fullDescription && (
          <p id="full-desc-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.fullDescription}
          </p>
        )}
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-slate-800 mb-1.5">
            Price (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              $
            </span>
            <input
              id="price"
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className={`w-full pl-7 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.price
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-slate-300 focus:ring-indigo-400 focus:border-transparent'
              }`}
              aria-describedby={errors.price ? 'price-error' : undefined}
            />
          </div>
          {errors.price && (
            <p id="price-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.price}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-slate-800 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all bg-white ${
              errors.category
                ? 'border-red-400 focus:ring-red-300'
                : 'border-slate-300 focus:ring-indigo-400 focus:border-transparent'
            }`}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.category}
            </p>
          )}
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-semibold text-slate-800 mb-1.5">
          Image URL <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/product-image.jpg"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Leave blank to use a default placeholder image.
        </p>

        {/* Preview */}
        {formData.image && (
          <div className="mt-3 w-32 h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        id="add-product-submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Adding Product…
          </>
        ) : (
          <>
            <PlusCircle className="w-5 h-5" />
            Add Product
          </>
        )}
      </button>
    </form>
  );
}

export default function AddProductPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Product</h1>
          <p className="text-slate-600">
            Fill in the details below to add a new product to the NexCart catalog.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <AddProductForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
