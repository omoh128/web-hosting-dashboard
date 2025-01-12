import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  errorMessage = '',
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
      />
      {errorMessage && (
        <span className="text-sm text-red-500 mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
