'use client';

import dynamic from 'next/dynamic';

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
      Loading map...
    </div>
  ),
});

const ContactMap = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8  ">
    {/* <div className="w-full max-w-6xl mx-auto p-8 rounded-lg bg-gray-800"> */}
      <h2 className="text-4xl font-bold mb-12 text-white text-center">Our Location</h2>
      <p className="text-gray-300 mb-8 text-center">Find us along the Amrahia-Dodowa Road</p>
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        <MapComponent />
      </div>
    </div>
  );
};

export default ContactMap;
