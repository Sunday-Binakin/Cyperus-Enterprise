'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AuthUser = { email: string; firstName?: string } | null;

type AuthContextType = {
  user: AuthUser;
  signIn: (user: { email: string; firstName?: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  // Hydrate from localStorage on mount to align with authSlice
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const signIn = async (payload: { email: string; firstName?: string }) => {
    setUser(payload);
    if (typeof window !== 'undefined') localStorage.setItem('auth_user', JSON.stringify(payload));
  };

  const signOut = async () => {
    setUser(null);
    if (typeof window !== 'undefined') localStorage.removeItem('auth_user');
  };

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}