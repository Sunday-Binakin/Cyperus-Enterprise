'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const SetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to set password');
      }

      // Redirect to login page on success
      router.push('/my-account?message=Password has been reset successfully');
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred while setting the password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter your new password"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Confirm your new password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isLoading
            ? 'bg-indigo-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {isLoading ? 'Setting Password...' : 'Set New Password'}
      </button>
    </form>
  );
};
