'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Test export to see if basic exports work
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function useAuth() {
  return {};
}
