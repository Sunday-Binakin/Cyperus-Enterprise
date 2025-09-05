'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Header component with no SSR and no skeleton while loading
const DynamicHeader = dynamic(() => import('@/components/layout/Header'), {
  ssr: false
});

export default function ClientOnlyHeader() {
  return <DynamicHeader />;
}
