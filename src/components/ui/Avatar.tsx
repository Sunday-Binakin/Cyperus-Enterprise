'use client'
import Image from 'next/image';

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

export default function Avatar({ name, src, size = 40, className = "" }: AvatarProps) {
  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a consistent color based on name
  const getAvatarColor = (fullName: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (src && src !== '/images/clients/products/footer/ginger.jpg') {
    return (
      <div className={`relative overflow-hidden rounded-full ${className}`} style={{ width: size, height: size }}>
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }

  // Fallback to initials
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full text-white font-bold ${getAvatarColor(name)} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {getInitials(name)}
    </div>
  );
}
