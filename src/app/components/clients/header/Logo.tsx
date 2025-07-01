import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => (
  <div className="font-bold text-2xl">
    <Image src="/images/clients/logo.png" alt="Cyperus Logo" width={120} height={30} />
  </div>
);

export default Logo;