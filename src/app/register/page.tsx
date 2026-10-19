
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import FirebaseConfigBanner from '@/components/FirebaseConfigBanner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'sonner';

interface FormErrors {
  displayName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface FieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  autoComplete?: string;
  suffix?: React.ReactNode;
  disabled?: boolean;
}

// IMPORTANT: Keep Field outside RegisterPage.
// This prevents input components from remounting on every keystroke.
function Field({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  suffix,
  disabled,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-slate-800"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 ${suffix ? 'pr-10' : ''
            } ${error
              ? 'border-red-400 focus:ring-red-300'
              : 'border-slate-300 focus:border-transparent focus:ring-indigo-400'
            }`}
        />

        {suffix}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    loginWithGoogle,
    user,
    loading,
    isFirebaseConfigured,
    getAuthError,
  } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user) return null;

  const clearFieldError = (field: keyof FormErrors) => {
    setFormErrors((previous) => {
      if (!previous[field]) return previous;

      return {
        ...previous,
        [field]: undefined,
      };
    });
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!displayName.trim()) {
      errors.displayName = 'Name is required.';
    }

    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (submitting || !validate()) return;

    setServerError('');
    setSubmitting(true);

    try {
      await register(email.trim(), password, displayName.trim());

      toast.success('Account created successfully! Welcome to NexCart.');
      router.replace('/');
    } catch (err: unknown) {
      setServerError(getAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (submitting) return;

    setServerError('');
    setSubmitting(true);

    try {
      await loginWithGoogle();

      toast.success('Welcome to NexCart!');
      router.replace('/');
    } catch (err: unknown) {
      setServerError(getAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              NexCart
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Join NexCart for free today
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {!isFirebaseConfigured && (
            <FirebaseConfigBanner className="mb-5" />
          )}

          {isFirebaseConfigured && (
            <>
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={submitting}
                id="google-register-btn"
                className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.74.37 3.4 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>

                Continue with Google
              </button>

              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">
                  or
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
            </>
          )}

          {serverError && (
            <div
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {serverError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <Field
              id="displayName"
              label="Full Name"
              type="text"
              value={displayName}
              onChange={(value) => {
                setDisplayName(value);
                clearFieldError('displayName');
              }}
              placeholder="Jane Doe"
              error={formErrors.displayName}
              autoComplete="name"
              disabled={!isFirebaseConfigured || submitting}
            />

            <Field
              id="register-email"
              label="Email address"
              type="email"
              value={email}
              onChange={(value) => {
                setEmail(value);
                clearFieldError('email');
              }}
              placeholder="you@example.com"
              error={formErrors.email}
              autoComplete="email"
              disabled={!isFirebaseConfigured || submitting}
            />

            <Field
              id="register-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(value) => {
                setPassword(value);
                clearFieldError('password');
              }}
              placeholder="Minimum 6 characters"
              error={formErrors.password}
              autoComplete="new-password"
              disabled={!isFirebaseConfigured || submitting}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <Field
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(value) => {
                setConfirmPassword(value);
                clearFieldError('confirmPassword');
              }}
              placeholder="Repeat your password"
              error={formErrors.confirmPassword}
              autoComplete="new-password"
              disabled={!isFirebaseConfigured || submitting}
            />

            <button
              type="submit"
              id="register-submit-btn"
              disabled={submitting || !isFirebaseConfigured}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
