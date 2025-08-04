'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Mock user interface (simplified)
interface MockUser {
  id: string;
  email?: string;
  status: 'pending' | 'active' | 'suspended';
  isFirstLogin: boolean;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
  createdAt: string;
  activatedAt?: string;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple mock users without external dependencies
const mockUsers: MockUser[] = [
  { 
    id: '1', 
    email: 'admin@cyperus.com',
    status: 'active',
    isFirstLogin: false,
    createdAt: '2024-01-01T00:00:00Z',
    activatedAt: '2024-01-01T00:00:00Z',
    user_metadata: { full_name: 'Admin User', avatar_url: '' } 
  },
];

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cyperus_auth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.status === 'active') {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('cyperus_auth_user');
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cyperus_auth_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simple mock sign in
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'admin123') {
      setUser(foundUser);
      localStorage.setItem('cyperus_auth_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('cyperus_auth_user');
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSimpleAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
}
