'use client';

import { Provider } from 'react-redux';
import { store } from '../../store';
import { AuthInitializer } from './AuthInitializer';
import { CartInitializer } from './CartInitializer';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <CartInitializer>
          {children}
        </CartInitializer>
      </AuthInitializer>
    </Provider>
  );
}
