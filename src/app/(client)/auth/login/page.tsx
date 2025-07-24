'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, resetPassword, signInWithProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await signIn(formData.email, formData.password);
      router.push('/account');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await resetPassword(formData.email);
      toast.success('Check your email for the password reset link!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full space-y-8 bg-[#4A651F] p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EFE554] focus:border-[#EFE554] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EFE554] focus:border-[#EFE554] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-[#EFE554] hover:text-[#EFE554]/80"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#EFE554] hover:bg-[#EFE554]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFE554] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-200 bg-[#4A651F]">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={!!socialLoading}
                onClick={async () => {
                  setSocialLoading('google');
                  try {
                    await signInWithProvider('google');
                  } catch (error: any) {
                    toast.error(error.message);
                  } finally {
                    setSocialLoading(null);
                  }
                }}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-black font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFE554] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="h-5 w-5" />
                {socialLoading === 'google' ? 'Signing in...' : 'Google'}
              </button>
              <button
                type="button"
                disabled={!!socialLoading}
                onClick={async () => {
                  setSocialLoading('github');
                  try {
                    await signInWithProvider('github');
                  } catch (error: any) {
                    toast.error(error.message);
                  } finally {
                    setSocialLoading(null);
                  }
                }}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-md bg-black text-white font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFE554] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGithub className="h-5 w-5" />
                {socialLoading === 'github' ? 'Signing in...' : 'GitHub'}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-200">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-[#EFE554] hover:text-[#EFE554]/80">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
