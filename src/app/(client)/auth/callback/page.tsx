'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Mock OAuth callback handling
    const handleOAuthCallback = async () => {
      try {
        // In a real app, you'd handle OAuth callback here
        // For mock, we'll just redirect to account page
        console.log('Mock OAuth callback completed');
        
        // Simulate delay for processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to account page on successful authentication
        router.push('/account');
      } catch (error: unknown) {
        console.error('Error during OAuth callback:', error instanceof Error ? error.message : 'Unknown error');
        router.push('/auth/login');
      }
    };

    handleOAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#EFE554] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4">Completing sign in...</p>
      </div>
    </div>
  );
}
