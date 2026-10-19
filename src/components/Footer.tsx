import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Mail, Globe, Send, AtSign } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/items' },
    { label: 'Electronics', href: '/items?category=Electronics' },
    { label: 'Fashion', href: '/items?category=Fashion' },
    { label: 'Home & Living', href: '/items?category=Home+%26+Living' },
    { label: 'Accessories', href: '/items?category=Accessories' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Add Product', href: '/items/add' },
    { label: 'Manage Products', href: '/items/manage' },
  ],
  Account: [
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">NexCart</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Discover Better. Shop Smarter. A curated collection of modern essentials
              and innovative products.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter / X"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <AtSign className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-white text-sm mb-4">{section}</h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NexCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
