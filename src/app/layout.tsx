import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ProductsProvider } from '@/context/ProductsContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NexCart — Discover Better. Shop Smarter.',
    template: '%s | NexCart',
  },
  description:
    'NexCart is a modern e-commerce product discovery platform. Explore curated electronics, fashion, home & living, and accessories.',
  keywords: ['e-commerce', 'products', 'shopping', 'electronics', 'fashion', 'NexCart'],
  authors: [{ name: 'NexCart Team' }],
  openGraph: {
    title: 'NexCart — Discover Better. Shop Smarter.',
    description:
      'A modern e-commerce product discovery platform with curated collections.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-slate-900 font-sans">
        <AuthProvider>
          <ProductsProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              richColors
              toastOptions={{
                style: { fontFamily: 'Inter, system-ui, sans-serif' },
              }}
            />
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
