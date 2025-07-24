'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fallback handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: any = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
} else {
  console.warn('Supabase configuration missing. Please check your environment variables.');
  console.warn('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
};

type Provider = 'google' | 'github';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  updateProfile: (profile: { full_name?: string; avatar_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase not available, user will remain null');
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error: any) => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Authentication service not available. Please check your configuration.');
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Authentication service not available. Please check your configuration.');
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    if (!supabase) {
      throw new Error('Authentication service not available. Please check your configuration.');
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      throw new Error('Authentication service not available. Please check your configuration.');
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const signInWithProvider = async (provider: Provider) => {
    if (!supabase) {
      throw new Error('Authentication service not available. Please check your configuration.');
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) throw error;
  };

  const updateProfile = async (profile: { full_name?: string; avatar_url?: string }) => {
    if (!supabase) {
      throw new Error('Authentication service not available. Please check your configuration.');
    }
    const { error } = await supabase.auth.updateUser({
      data: profile
    });
    if (error) throw error;

    // Update local user state
    if (user) {
      setUser({
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...profile
        }
      });
    }
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
