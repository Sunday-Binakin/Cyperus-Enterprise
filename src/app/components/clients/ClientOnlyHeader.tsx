'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Header component with no SSR
const DynamicHeader = dynamic(() => import('./Header'), {
  ssr: false,
});

export default function ClientOnlyHeader() {
  return <DynamicHeader />;
}
