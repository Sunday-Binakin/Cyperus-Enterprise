'use client';

import React, { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import Login from '@/app/components/clients/my-account/login'
import { Register } from '@/app/components/clients/my-account/Register'
import Dashboard from '@/app/components/clients/my-account/dashboard'
import FirstLoginPasswordChange from '@/app/components/clients/my-account/FirstLoginPasswordChange'

export default function MyAccountPage() {
  const { user, loading } = useAuth();
  const [hasChangedPassword, setHasChangedPassword] = useState(false);

  // Show loading state
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

  // If user is logged in but it's their first login and they haven't changed password yet
  if (user && user.isFirstLogin && !hasChangedPassword) {
    return (
      <FirstLoginPasswordChange 
        onPasswordChanged={() => setHasChangedPassword(true)}
      />
    );
  }

  // Show dashboard if user is logged in, otherwise show login/register
  return (
    <div>
      {user ? (
        <Dashboard />
      ) : (
        <div>
          <Login />
          <Register />
        </div>
      )}
    </div>
  );
}
