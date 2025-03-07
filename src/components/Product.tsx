import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { updateProductName, deleteProduct, addCategory } from '../store/productSlice';
import { Product as ProductType } from '../types/product';
import { CategoryList } from './CategoryList';
import { ImageList } from './ImageList';
import { Button } from './buttons/Button';
import { Modal } from './Modal';
import { useDebounce } from '../hooks/useDebounce';

interface ProductProps {
    product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const [showMaxWarning, setShowMaxWarning] = useState(false);
    const [localName, setLocalName] = useState(product.name);

    useEffect(() => {
        if (product.categories.length >= 3) {
            setShowMaxWarning(true);
        }
    }, [product.categories.length]);

    useEffect(() => {
        setLocalName(product.name);
    }, [product.name]);

    const debouncedUpdateName = useDebounce((name: string) => {
        if (name !== product.name) {
            dispatch(updateProductName({ id: product.id, name }));
        }
    }, 500);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setLocalName(newName);
        debouncedUpdateName(newName);
    };

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
    };

    const handleAddCategory = () => {
        if (product.categories.length >= 3) {
            setShowMaxWarning(true);
        } else {
            dispatch(addCategory(product.id));
        }
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
                        value={localName}
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
            <Modal isOpen={showMaxWarning} onClose={() => setShowMaxWarning(false)}>
                <div className="text-center">
                    <p className="mb-4 text-lg font-medium text-gray-900">
                        Anda Sudah Mencapai Maksimum Input
                    </p>
                    <Button variant="secondary" onClick={() => setShowMaxWarning(false)}>
                        Tutup
                    </Button>
                </div>
            </Modal>
        </>
    );
}; 