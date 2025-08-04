'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { mockEmailService } from '@/app/lib/mock-email-service';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      
      // Check if user exists (in real app, this would be an API call)
      const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
      const userExists = users.some((user: any) => user.email === email);

      if (!userExists) {
        toast.error('No account found with this email address');
        return;
      }

      // Send password reset email
      await mockEmailService.sendPasswordResetEmail({
        email,
        resetToken: `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });
      setEmailSent(true);
      toast.success('Password reset link sent to your email!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-[#EFE554] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-[#EFE554] mb-2">Check Your Email</h1>
            <p className="text-gray-300">
              We've sent a password reset link to:
            </p>
            <p className="font-semibold text-white mt-1">{email}</p>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="space-y-4 text-sm text-gray-300">
              <p>
                Click the link in the email to reset your password. The link will expire in 1 hour for security.
              </p>
              <p>
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                }}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700"
              >
                Try Different Email
              </button>
              
              <Link
                href="/my-account"
                className="block w-full bg-[#EFE554] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#d4c948] transition-colors text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-400">
              Having trouble? Contact support for help with your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link 
            href="/my-account"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Back to Sign In
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#EFE554] mb-2">Reset Password</h1>
          <p className="text-gray-300">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EFE554] text-black py-3 rounded-lg font-semibold hover:bg-[#d4c948] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-gray-400">
          <p className="text-sm">
            Remember your password?{' '}
            <Link href="/my-account" className="text-[#EFE554] hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
