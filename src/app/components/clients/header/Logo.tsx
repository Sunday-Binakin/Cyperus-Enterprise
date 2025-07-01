import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => (
  <div className="font-bold text-2xl">
    <Link href="/">
      <Image src="/images/clients/logo.png" alt="Cyperus Logo" width={120} height={30} />
    </Link>
  </div>
);

export default Logo;