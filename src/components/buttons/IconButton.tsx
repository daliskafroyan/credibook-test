import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    variant?: 'primary' | 'danger' | 'default';
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    variant = 'default',
    className,
    ...props
}) => {
    const baseStyles = "rounded-md p-1 transition-colors duration-200";
    const variantStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        default: "bg-white text-gray-500 hover:bg-gray-100"
    };

    return (
        <button
            className={twMerge(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {icon}
        </button>
    );
}; 