import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImagePreviewProps {
    isOpen: boolean;
    imageUrl: string;
    onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ isOpen, imageUrl, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative max-h-[90vh] max-w-[90vw]">
                <button
                    onClick={onClose}
                    className="absolute -right-4 -top-4 rounded-full bg-white p-1 shadow-lg hover:bg-gray-100"
                >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
                <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                />
            </div>
        </div>
    );
}; 