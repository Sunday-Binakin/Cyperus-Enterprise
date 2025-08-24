'use client';

import dynamic from 'next/dynamic';
import HeaderSkeleton from '@/components/layout/Header/HeaderSkeleton';

// Dynamically import the Header component with no SSR and show skeleton while loading
const DynamicHeader = dynamic(() => import('@/components/layout/Header'), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});

export default function ClientOnlyHeader() {
  return <DynamicHeader />;
}
