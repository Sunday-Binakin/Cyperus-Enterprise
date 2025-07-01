'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  link?: string;
  className?: string;
}

export const ContactCard = ({
  icon,
  title,
  content,
  link,
  className = '',
}: ContactCardProps) => {
  const cardContent = (
    <div className="h-full flex flex-col">
      <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <div className="text-yellow-400 hover:text-yellow-300 transition-colors flex-grow">
        {content}
      </div>
    </div>
  );

  const card = (
    <div 
      className={`bg-white/10 backdrop-blur-md rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300 h-full ${className}`}
    >
      {cardContent}
    </div>
  );

  return link ? (
    <Link href={link} className="block h-full">
      {card}
    </Link>
  ) : (
    card
  );
};
