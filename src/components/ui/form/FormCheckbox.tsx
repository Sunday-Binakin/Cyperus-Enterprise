import React from 'react';

interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  variant?: 'default' | 'accent';
}

export default function FormCheckbox({
  label,
  containerClassName = '',
  labelClassName = '',
  variant = 'default',
  className = '',
  ...props
}: FormCheckboxProps) {
  const checkboxClasses = variant === 'accent' 
    ? 'w-5 h-5 accent-[#EFE554]'
    : 'w-4 h-4 text-white bg-black border border-white rounded focus:ring-white focus:ring-2';

  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${containerClassName}`}>
      <input
        type="checkbox"
        {...props}
        className={`${checkboxClasses} ${className}`}
      />
      <span className={`text-white ${labelClassName}`}>{label}</span>
    </label>
  );
}
