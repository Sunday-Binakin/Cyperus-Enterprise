'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { loadCart } from '../../store/cartSlice';

export function CartInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load cart from localStorage when the app starts
    dispatch(loadCart());
  }, [dispatch]);

  return <>{children}</>;
}
