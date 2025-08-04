'use client';

import React from 'react';

// Test with the simpler version without external dependencies
import { SimpleAuthProvider } from '@/app/context/SimpleAuthContext';

export default function TestAuthProviderComponent({ children }: { children: React.ReactNode }) {
  console.log('SimpleAuthProvider:', SimpleAuthProvider);
  console.log('SimpleAuthProvider type:', typeof SimpleAuthProvider);
  
  if (!SimpleAuthProvider) {
    return <div>ERROR: SimpleAuthProvider is undefined!</div>;
  }
  
  return (
    <SimpleAuthProvider>
      <div>SimpleAuthProvider test successful!</div>
      {children}
    </SimpleAuthProvider>
  );
}
