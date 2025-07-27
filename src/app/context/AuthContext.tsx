'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Mock user interface
interface MockUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

type Provider = 'google' | 'github';

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  updateProfile: (profile: { full_name?: string; avatar_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (in real app, this would be a backend)
const mockUsers: MockUser[] = [
  { 
    id: '1', 
    email: 'admin@cyperus.com', 
    user_metadata: { full_name: 'Admin User', avatar_url: '' } 
  },
  { 
    id: '2', 
    email: 'user@example.com', 
    user_metadata: { full_name: 'Test User', avatar_url: '' } 
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cyperus_auth_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cyperus_auth_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password.length >= 6) {
      setUser(foundUser);
      localStorage.setItem('cyperus_auth_user', JSON.stringify(foundUser));
      setLoading(false);
      return;
    }
    
    setLoading(false);
    throw new Error('Invalid email or password');
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setLoading(false);
      throw new Error('User already exists with this email');
    }
    
    if (password.length < 6) {
      setLoading(false);
      throw new Error('Password must be at least 6 characters');
    }
    
    // Create new user
    const newUser: MockUser = {
      id: Date.now().toString(),
      email,
      user_metadata: { 
        full_name: email.split('@')[0], 
        avatar_url: '' 
      }
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('cyperus_auth_user', JSON.stringify(newUser));
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('cyperus_auth_user');
  };

  const resetPassword = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser) {
      throw new Error('User not found');
    }
    
    // In a real app, this would send an email
    console.log(`Password reset email sent to ${email}`);
  };

  const signInWithProvider = async (provider: Provider) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock OAuth flow
    const mockUser: MockUser = {
      id: Date.now().toString(),
      email: `user@${provider}.com`,
      user_metadata: { 
        full_name: `${provider} User`, 
        avatar_url: '' 
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('cyperus_auth_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const updateProfile = async (profile: { full_name?: string; avatar_url?: string }) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Update local user state
    const updatedUser = {
      ...user,
      user_metadata: {
        ...user.user_metadata,
        ...profile
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('cyperus_auth_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
    resetPassword,
    signInWithProvider,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
