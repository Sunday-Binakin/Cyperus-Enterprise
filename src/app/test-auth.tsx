'use client';

import { useAuth } from '@/app/context/AuthContext';

export default function AuthTest() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading auth...</div>;
  }

  return (
    <div>
      <h1>Auth Test</h1>
      <p>User: {user?.email || 'Not logged in'}</p>
      <p>Status: {user?.status || 'No user'}</p>
    </div>
  );
}
