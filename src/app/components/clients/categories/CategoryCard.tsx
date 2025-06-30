'use client'
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  image: string;
  link: string;
}

export default function CategoryCard({ name, image, link }: CategoryCardProps) {
  return (
    <Link href={link} className="block relative w-full h-[400px] group">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 border border-[#EFE554]/20 group-hover:border-[#EFE554] transition-colors duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white text-2xl font-bold text-center">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
} 