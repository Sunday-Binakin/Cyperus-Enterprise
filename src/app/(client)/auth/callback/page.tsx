'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Handle the OAuth callback
    const handleOAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // Redirect to account page on successful authentication
        router.push('/account');
      } catch (error: any) {
        console.error('Error during OAuth callback:', error.message);
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
