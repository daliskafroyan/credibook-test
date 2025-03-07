import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ImageThumbnailProps {
    src: string;
    alt?: string;
    onDelete?: () => void;
    onClick?: () => void;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
    src,
    alt = 'Image',
    onDelete,
    onClick
}) => {
    return (
        <div className="relative h-8 w-8">
            <img
                src={src}
                alt={alt}
                className="h-full w-full cursor-pointer rounded object-cover hover:opacity-90"
                onClick={onClick}
            />
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute -right-1 -top-1 rounded-full bg-white p-0.5 shadow-md hover:bg-gray-100"
                >
                    <TrashIcon className="h-3 w-3 text-red-600" />
                </button>
            )}
        </div>
    );
}; 