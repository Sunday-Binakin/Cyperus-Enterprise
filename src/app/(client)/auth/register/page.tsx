'use client';

import React from 'react';
import { RegisterForm } from '@/app/components/clients/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create an Account</h1>
          <p className="mt-2 text-gray-400">
            Join us to start shopping
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
