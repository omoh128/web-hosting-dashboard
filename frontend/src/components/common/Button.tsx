import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const baseStyle =
    'px-4 py-2 rounded text-white focus:outline-none focus:ring transition';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
