'use client';

import { useAuth } from '@/store/hooks';
import { useState } from 'react';

export default function AuthTestPage() {
  const { user, isLoading, error, dispatch } = useAuth();
  const [email, setEmail] = useState('test@example.com');

  const handleRegister = async () => {
    try {
      // Import from authActions file to ensure proper module resolution
      const authModule = await import('@/store/authActions');
      console.log('Auth module exports:', Object.keys(authModule));
      
      if (typeof authModule.registerUser !== 'function') {
        throw new Error('registerUser is not available in auth module');
      }
      
      await dispatch(authModule.registerUser({
        email,
        password: 'test123',
        firstName: 'Test',
        lastName: 'User'
      }));
      console.log('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      // Dynamically import auth functions to avoid module resolution issues
      const { loginUser } = await import('@/store/authSlice');
      await dispatch(loginUser({ email, password: 'test123' }));
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Auth Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current State</h2>
        <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>User: {user ? `${user.firstName} ${user.lastName} (${user.email})` : 'Not logged in'}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
        <div className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded mr-4"
            />
          </div>
          <div className="space-x-4">
            <button 
              onClick={handleRegister}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Register
            </button>
            <button 
              onClick={handleLogin}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Test Login
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify({ user, isLoading, error }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
