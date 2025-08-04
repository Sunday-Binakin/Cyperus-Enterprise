'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function ActivateAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activateAccount, signIn } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [activationStatus, setActivationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (!token || !emailParam) {
      setActivationStatus('error');
      toast.error('Invalid activation link');
      return;
    }

    setEmail(emailParam);
    handleActivation(token, emailParam);
  }, [searchParams]);

  const handleActivation = async (token: string, email: string) => {
    try {
      setLoading(true);
      const result = await activateAccount(token, email);
      setTemporaryPassword(result.temporaryPassword);
      setActivationStatus('success');
      toast.success('Account activated successfully!');
    } catch (error: unknown) {
      setActivationStatus('error');
      toast.error(error instanceof Error ? error.message : 'Activation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn(email, temporaryPassword);
      toast.success('Signed in successfully! You will be prompted to change your password.');
      router.push('/my-account');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(temporaryPassword);
    toast.success('Password copied to clipboard!');
  };

  if (activationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFE554] mx-auto"></div>
          <p className="mt-4">Activating your account...</p>
        </div>
      </div>
    );
  }

  if (activationStatus === 'error') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-red-400 mb-2">Activation Failed</h1>
            <p className="text-gray-300">
              The activation link is invalid or has expired. Please try registering again.
            </p>
          </div>
          
          <button
            onClick={() => router.push('/my-account')}
            className="bg-[#EFE554] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#d4c948] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#EFE554] mb-2">Account Activated!</h1>
          <p className="text-gray-300">
            Your Cyperus account has been successfully activated.
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Temporary Password</h2>
          <p className="text-gray-300 mb-4">
            Use this temporary password to sign in. You'll be prompted to change it on first login.
          </p>
          
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={temporaryPassword}
              readOnly
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-20 text-[#EFE554] font-mono text-lg focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button
                type="button"
                onClick={copyPassword}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Copy password"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="bg-[#EFE554] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#d4c948] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In Now'}
            </button>
          </div>
        </div>

        <div className="text-center text-gray-400">
          <p className="text-sm">
            Having trouble? 
            <button 
              onClick={() => router.push('/contact-us')}
              className="text-[#EFE554] hover:underline ml-1"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
