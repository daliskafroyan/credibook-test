import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { updateCategoryName, deleteCategory } from '../store/productSlice';
import { Category } from '../types/product';
import { Modal } from './Modal';
import { Button } from './buttons/Button';
import { useDebounce } from '../hooks/useDebounce';

interface CategoryListProps {
    productId: string;
    categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ productId, categories }) => {
    const dispatch = useAppDispatch();
    const [showMaxWarning, setShowMaxWarning] = useState(false);
    const [localNames, setLocalNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const names: { [key: string]: string } = {};
        categories.forEach(category => {
            names[category.id] = category.name;
        });
        setLocalNames(names);
    }, [categories]);

    const debouncedUpdateName = useDebounce((categoryId: string, name: string) => {
        const category = categories.find(c => c.id === categoryId);
        if (category && category.name !== name) {
            dispatch(updateCategoryName({ productId, categoryId, name }));
        }
    }, 500);

    const handleNameChange = (categoryId: string, name: string) => {
        setLocalNames(prev => ({ ...prev, [categoryId]: name }));
        debouncedUpdateName(categoryId, name);
    };

    const handleDeleteCategory = (categoryId: string) => {
        dispatch(deleteCategory({ productId, categoryId }));
    };

    return (
        <>
            <div className="flex min-h-[100px] w-full flex-col space-y-6">
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        className={`flex w-full items-center justify-center ${index !== 0 ? 'border-t border-gray-200 pt-6' : ''}`}
                    >
                        <div className="flex w-[280px] items-center justify-center">
                            <input
                                type="text"
                                value={localNames[category.id] || ''}
                                onChange={(e) => handleNameChange(category.id, e.target.value)}
                                placeholder="Nama Kategori"
                                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="ml-2 rounded-md bg-white p-1 text-gray-500 hover:bg-gray-100"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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