'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const isInitialized = authState?.isInitialized ?? false;

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { initializeAuth } = await import('../../store/authSlice');
        if (!isInitialized && typeof initializeAuth === 'function') {
          dispatch(initializeAuth());
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    };

    initAuth();
  }, [dispatch, isInitialized]);

  return <>{children}</>;
}