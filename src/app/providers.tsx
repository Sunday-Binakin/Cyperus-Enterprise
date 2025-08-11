'use client';

import { ReduxProvider } from './components/ReduxProvider';
import { CartProvider } from './context/CartContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ReduxProvider>
  );
}
