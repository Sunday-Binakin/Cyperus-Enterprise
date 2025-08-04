'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  
  // Handle case where auth state might be undefined initially
  const isInitialized = authState?.isInitialized ?? false;

  useEffect(() => {
    // Dynamically import the async thunk to avoid module resolution issues
    const initAuth = async () => {
      try {
        const { initializeAuth } = await import('../../store/authActions');
        if (!isInitialized && typeof initializeAuth === 'function') {
          console.log('Initializing auth...');
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
