'use client';

import { ReduxProvider } from '@/components/shared/ReduxProvider';

/**
 * App Providers
 * Consolidated to use Redux only for state management
 * CartProvider removed - now using Redux cartSlice + cartHooks
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}
