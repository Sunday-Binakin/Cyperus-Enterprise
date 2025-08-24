import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => (
  <div className="font-bold text-2xl">
    <Link href="/">
      <Image
      src="/images/clients/logo.png"
      alt="Cyperus Logo"
      width={180}
      height={45}
      className="w-[100px] h-auto sm:w-[120px] md:w-[80px] lg:w-[120px] transition-all duration-300"
      priority
      />
    </Link>
  </div>
);

export default Logo;