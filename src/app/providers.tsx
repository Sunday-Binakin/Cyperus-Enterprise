'use client';

import { AuthProvider } from '@/app/context/AuthContext_working';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
