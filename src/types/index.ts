export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  image: string;
  specifications: Record<string, string>;
  featured: boolean;
  createdAt: string;
  isUserAdded?: boolean;
}

export interface ProductFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  category: string;
  image: string;
}

export type Category =
  | 'Electronics'
  | 'Fashion'
  | 'Home & Living'
  | 'Accessories'
  | 'All';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
