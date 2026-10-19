'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Product, ProductFormData } from '@/types';
import { SEED_PRODUCTS } from '@/data/products';

const STORAGE_KEYS = {
  USER_PRODUCTS: 'nexcart_user_products',
  DELETED_IDS: 'nexcart_deleted_ids',
} as const;

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  addProduct: (data: ProductFormData) => Product;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage on client only
  useEffect(() => {
    try {
      const storedUserProducts = localStorage.getItem(STORAGE_KEYS.USER_PRODUCTS);
      const storedDeletedIds = localStorage.getItem(STORAGE_KEYS.DELETED_IDS);

      if (storedUserProducts) {
        setUserProducts(JSON.parse(storedUserProducts));
      }
      if (storedDeletedIds) {
        setDeletedIds(new Set(JSON.parse(storedDeletedIds)));
      }
    } catch {
      // Silently ignore localStorage errors
    } finally {
      setLoading(false);
    }
  }, []);

  // Combined products: seed (minus deleted) + user-added
  const products: Product[] = [
    ...SEED_PRODUCTS.filter((p) => !deletedIds.has(p.id)),
    ...userProducts.filter((p) => !deletedIds.has(p.id)),
  ];

  const addProduct = useCallback((data: ProductFormData): Product => {
    const newProduct: Product = {
      id: generateId(),
      title: data.title.trim(),
      shortDescription: data.shortDescription.trim(),
      fullDescription: data.fullDescription.trim(),
      price: parseFloat(data.price),
      category: data.category,
      image:
        data.image.trim() ||
        'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80',
      specifications: {},
      featured: false,
      createdAt: new Date().toISOString(),
      isUserAdded: true,
    };

    setUserProducts((prev) => {
      const next = [...prev, newProduct];
      try {
        localStorage.setItem(STORAGE_KEYS.USER_PRODUCTS, JSON.stringify(next));
      } catch {}
      return next;
    });

    return newProduct;
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setDeletedIds((prev) => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(STORAGE_KEYS.DELETED_IDS, JSON.stringify([...next]));
      } catch {}
      return next;
    });

    // Also remove from userProducts if it was user-added
    setUserProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.USER_PRODUCTS, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  return (
    <ProductsContext.Provider
      value={{ products, loading, addProduct, deleteProduct, getProductById }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextType {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
