'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface FirebaseConfigBannerProps {
  className?: string;
}

export default function FirebaseConfigBanner({ className = '' }: FirebaseConfigBannerProps) {
  return (
    <div
      className={`bg-amber-50 border border-amber-200 rounded-xl p-4 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800 text-sm mb-1">
            Firebase Not Configured
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Authentication requires Firebase credentials. Create a{' '}
            <code className="bg-amber-100 px-1 rounded font-mono">.env.local</code> file
            with your Firebase project settings to enable login and registration.
          </p>
          <p className="text-xs text-amber-600 mt-2">
            See the{' '}
            <Link
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium hover:text-amber-800"
            >
              Firebase Console
            </Link>{' '}
            and the project README for setup instructions.
          </p>
        </div>
      </div>
    </div>
  );
}
