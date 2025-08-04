'use client';

import { createContext, useContext, useState } from 'react';

// Minimal test version of AuthProvider
interface TestUser {
  id: string;
  email: string;
}

interface TestAuthContextType {
  user: TestUser | null;
  loading: boolean;
}

const TestAuthContext = createContext<TestAuthContextType | undefined>(undefined);

export function TestAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TestUser | null>(null);
  const [loading, setLoading] = useState(false);

  const value = {
    user,
    loading,
  };

  return <TestAuthContext.Provider value={value}>{children}</TestAuthContext.Provider>;
}

export function useTestAuth() {
  const context = useContext(TestAuthContext);
  if (context === undefined) {
    throw new Error('useTestAuth must be used within a TestAuthProvider');
  }
  return context;
}
