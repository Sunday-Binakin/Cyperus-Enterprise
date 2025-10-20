import Image from 'next/image';

type ProductImageProps = {
  src: string;
  alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-800">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={800}
        className="h-full w-full object-cover object-center"
        priority
      />
    </div>
  );
}
