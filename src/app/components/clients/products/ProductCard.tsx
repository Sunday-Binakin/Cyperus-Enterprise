import Image from 'next/image';

interface ProductCardProps {
  image: string;
  name: string;
  alt: string;
}

export default function ProductCard({ image, name, alt }: ProductCardProps) {
  return (
    <div className="relative h-[300px] group">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <p className="text-white text-2xl font-bold">{name}</p>
      </div>
    </div>
  );
} 