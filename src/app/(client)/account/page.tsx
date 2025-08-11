'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();

  // Redirect to the proper account page
  useEffect(() => {
    router.replace('/my-account');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFE554] mx-auto"></div>
        <p className="mt-4">Redirecting...</p>
      </div>
    </div>
  );
}
