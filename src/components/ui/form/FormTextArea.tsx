import React from 'react';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  variant?: 'dark' | 'light' | 'white';
}

export default function FormTextArea({
  label,
  error,
  containerClassName = '',
  labelClassName = '',
  variant = 'dark',
  className = '',
  ...props
}: FormTextAreaProps) {
  const baseTextAreaClasses = 'w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 transition-colors';
  
  const variantClasses = {
    dark: 'bg-gray-800 text-white placeholder-gray-400 focus:ring-white border-0 rounded-lg',
    light: 'bg-black text-white placeholder-gray-400 focus:ring-white border border-white rounded-lg',
    white: 'bg-white text-black placeholder-gray-400 focus:ring-[#EFE554] border border-gray-300'
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className={`block text-sm font-medium text-white mb-2 ${labelClassName}`}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        {...props}
        className={`${baseTextAreaClasses} ${variantClasses[variant]} ${className}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
