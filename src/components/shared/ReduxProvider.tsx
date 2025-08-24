'use client';

import { Provider } from 'react-redux';
import { store } from '../../store';
import { CartInitializer } from './CartInitializer';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartInitializer>
        {children}
      </CartInitializer>
    </Provider>
  );
}