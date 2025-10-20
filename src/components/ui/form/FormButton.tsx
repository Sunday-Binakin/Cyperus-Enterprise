import React from 'react';
import { Loader2 } from 'lucide-react';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'yellow';
  icon?: React.ReactNode;
}

export default function FormButton({
  children,
  isLoading = false,
  loadingText = 'Submitting...',
  variant = 'primary',
  icon,
  className = '',
  disabled,
  ...props
}: FormButtonProps) {
  const baseClasses = 'flex items-center justify-center px-8 py-3 font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#55006F] text-white hover:bg-[#F0B100] focus:ring-white focus:ring-offset-gray-900',
    secondary: 'bg-white text-black hover:bg-gray-200 focus:ring-white focus:ring-offset-black',
    yellow: 'bg-[#EFE554] text-black hover:bg-[#d5cc49] focus:ring-[#EFE554] focus:ring-offset-black font-bold'
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          {loadingText}
        </>
      ) : (
        <>
          {children}
          {icon && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
}
