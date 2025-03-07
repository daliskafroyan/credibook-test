import React from 'react';
import { useDispatch } from 'react-redux';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { updateProductName, deleteProduct, addCategory } from '../store/productSlice';
import { Product as ProductType } from '../types/product';
import { CategoryList } from './CategoryList';
import { ImageList } from './ImageList';
import { Button } from './buttons/Button';

interface ProductProps {
    product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateProductName({ id: product.id, name: e.target.value }));
    };

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
    };

    const handleAddCategory = () => {
        dispatch(addCategory(product.id));
    };

    return (
        <>
            <tr className="divide-x divide-gray-200">
                <td className="w-16 py-4 pl-6 pr-3">
                    <span className="text-sm font-medium text-gray-900">{product.number}.</span>
                </td>
                <td className="w-48 px-3 py-4">
                    <input
                        type="text"
                        value={product.name}
                        onChange={handleNameChange}
                        placeholder="Nama Produk"
                        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                    />
                </td>
                <td className="w-[320px] py-4">
                    <CategoryList productId={product.id} categories={product.categories} />
                </td>
                <td className="py-4">
                    <ImageList productId={product.id} categories={product.categories} />
                </td>
                <td className="w-20 py-4 pl-3 pr-6 text-center">
                    <button
                        onClick={handleDelete}
                        className="rounded-md bg-white p-1.5 text-gray-500 hover:bg-gray-100"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </td>
            </tr>
            {product.categories.length < 3 && (
                <tr className="divide-x divide-gray-200">
                    <td className="w-16 py-4 pl-6 pr-3"></td>
                    <td className="w-48 px-3 py-4"></td>
                    <td colSpan={2} className="px-3 py-4">
                        <Button
                            variant="secondary"
                            icon={<PlusIcon className="h-5 w-5" />}
                            onClick={handleAddCategory}
                            fullWidth
                        >
                            Tambah Kategori
                        </Button>
                    </td>
                    <td className="w-20 py-4 pl-3 pr-6"></td>
                </tr>
            )}
        </>
    );
}; 