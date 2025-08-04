'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirmPasswordReset } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      setValidToken(false);
      return;
    }

    // Verify token validity (in real app, this would be an API call)
    const resetTokens = JSON.parse(localStorage.getItem('mock_reset_tokens') || '[]');
    const tokenData = resetTokens.find((t: any) => t.token === token && t.email === email);
    
    if (!tokenData) {
      setValidToken(false);
      return;
    }

    // Check if token is expired (1 hour)
    if (new Date() > new Date(tokenData.expiresAt)) {
      setValidToken(false);
      toast.error('Reset link has expired. Please request a new one.');
      return;
    }

    setValidToken(true);
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!token || !email) {
      toast.error('Invalid reset link');
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(token, email, formData.newPassword);
      toast.success('Password reset successfully! You can now sign in with your new password.');
      router.push('/my-account');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (validToken === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFE554] mx-auto"></div>
          <p className="mt-4">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (validToken === false) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-red-500 mb-2">Invalid Link</h1>
            <p className="text-gray-300">
              This password reset link is invalid or has expired.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <p className="text-gray-300 mb-6">
              Password reset links expire after 1 hour for security. Please request a new reset link.
            </p>

            <div className="space-y-3">
              <Link
                href="/auth/forgot-password"
                className="block w-full bg-[#EFE554] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#d4c948] transition-colors text-center"
              >
                Request New Reset Link
              </Link>
              
              <Link
                href="/my-account"
                className="block w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700 text-center"
              >
                Back to Sign In
              </Link>
            </div>
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
          <h1 className="text-3xl font-bold text-[#EFE554] mb-2">Set New Password</h1>
          <p className="text-gray-300">
            Enter your new password for <span className="font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <div className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  minLength={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters long</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EFE554] text-black py-3 rounded-lg font-semibold hover:bg-[#d4c948] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
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
