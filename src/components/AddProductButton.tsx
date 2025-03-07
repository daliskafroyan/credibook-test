import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface AddProductButtonProps {
    onClick: () => void;
}

export const AddProductButton: React.FC<AddProductButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center justify-center space-x-2 rounded border border-gray-300 py-2 hover:bg-gray-50"
        >
            <PlusIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Tambah Produk</span>
        </button>
    );
}; 