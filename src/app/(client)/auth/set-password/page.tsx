'use client';

import React, { Suspense } from 'react';
import { SetPasswordForm } from '@/app/components/clients/auth/SetPasswordForm';

function SetPasswordContent() {
  return (
    <main className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Set New Password</h1>
          <p className="mt-2 text-gray-400">
            Create a new password for your account
          </p>
        </div>
        <SetPasswordForm />
      </div>
    </main>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <SetPasswordContent />
    </Suspense>
  );
}
