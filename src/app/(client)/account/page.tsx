'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFE554] mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>
        
        {/* Account Information */}
        <section className="mb-12 bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            {user.user_metadata?.full_name && (
              <div>
                <label className="text-gray-400">Full Name</label>
                <p className="text-lg">{user.user_metadata.full_name}</p>
              </div>
            )}
          </div>
        </section>

        {/* Order History - Placeholder */}
        <section className="mb-12 bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Order History</h2>
          <p className="text-gray-400">No orders found.</p>
        </section>

        {/* Account Settings */}
        <section className="mb-12 bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
          <div className="space-y-4">
            <button 
              className="bg-[#EFE554] text-[#55006F] px-6 py-2 rounded hover:bg-[#55006F] hover:text-[#EFE554] transition-colors"
              onClick={() => {/* TODO: Implement password change */}}
            >
              Change Password
            </button>
            <button 
              className="block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
              onClick={() => {/* TODO: Implement account deletion */}}
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
