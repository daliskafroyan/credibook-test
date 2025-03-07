import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    fullWidth?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    fullWidth = false,
    icon,
    children,
    className = '',
    ...props
}) => {
    const baseStyles = "flex items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm transition-colors duration-200";
    const variantStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "border border-gray-300 text-gray-500 hover:bg-gray-50",
        danger: "bg-red-500 text-white hover:bg-red-600"
    };
    const widthStyles = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
            {...props}
        >
            {icon && <span className="h-5 w-5">{icon}</span>}
            <span>{children}</span>
        </button>
    );
}; 