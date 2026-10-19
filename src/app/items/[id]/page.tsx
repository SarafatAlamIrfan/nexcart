import type { Metadata } from 'next';
import { SEED_PRODUCTS } from '@/data/products';
import DynamicProductDetail from './DynamicProductDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = SEED_PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return { title: 'Product Not Found | NexCart' };
  }
  return {
    title: `${product.title} | NexCart`,
    description: product.shortDescription,
  };
}

export function generateStaticParams() {
  return SEED_PRODUCTS.map((p) => ({ id: p.id }));
}

/**
 * Product detail page.
 * Uses a client component (DynamicProductDetail) to handle:
 * - Seed products (looked up from static data)
 * - User-added products (looked up from ProductsContext / LocalStorage)
 * - Invalid IDs (graceful 404 state)
 *
 * A client component is required here because we need:
 * - onError event handlers on images
 * - Access to ProductsContext (React Context, client-side)
 */
export default function ProductDetailPage() {
  return <DynamicProductDetail />;
}
