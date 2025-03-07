import React from 'react';
import { useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { updateProduct, deleteProduct } from '../store/productSlice';
import { Product as ProductType } from '../types/product';
import { ImageUpload } from './ImageUpload';

interface ProductProps {
    product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateProduct({ id: product.id, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateProduct({ id: product.id, description: e.target.value }));
    };

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
    };

    return (
        <tr className="border-b border-gray-200">
            <td className="py-4 pl-6 pr-3">
                <span className="text-sm font-medium text-gray-900">{product.number}.</span>
            </td>
            <td className="px-3 py-4">
                <input
                    type="text"
                    value={product.name}
                    onChange={handleNameChange}
                    placeholder="Nama Produk"
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
            </td>
            <td className="px-3 py-4">
                <input
                    type="text"
                    value={product.description}
                    onChange={handleDescriptionChange}
                    placeholder="Deskripsi Produk"
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
            </td>
            <td className="px-3 py-4">
                <ImageUpload productId={product.id} images={product.images} />
            </td>
            <td className="py-4 pl-3 pr-6">
                <button
                    onClick={handleDelete}
                    className="rounded-md bg-white p-1.5 text-gray-500 hover:bg-gray-100"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </td>
        </tr>
    );
}; 