import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[] | string[];
  containerClassName?: string;
  labelClassName?: string;
  variant?: 'dark' | 'light' | 'white';
  placeholder?: string;
}

export default function FormSelect({
  label,
  error,
  options,
  containerClassName = '',
  labelClassName = '',
  variant = 'dark',
  className = '',
  placeholder = 'Select an option',
  ...props
}: FormSelectProps) {
  const baseSelectClasses = 'w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 transition-colors';
  
  const variantClasses = {
    dark: 'bg-gray-800 text-white focus:ring-white border-0 rounded-lg',
    light: 'bg-black text-white focus:ring-white border border-white rounded-lg',
    white: 'bg-white text-black focus:ring-[#EFE554] border border-gray-300'
  };

  // Normalize options to array of objects
  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

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
      <select
        {...props}
        className={`${baseSelectClasses} ${variantClasses[variant]} ${className}`}
      >
        <option value="">{placeholder}</option>
        {normalizedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
