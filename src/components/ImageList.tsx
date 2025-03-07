import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { addImage, deleteImage } from '../store/productSlice';
import { Category } from '../types/product';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from './Modal';
import { ImagePreview } from './ImagePreview';
import { ImageThumbnail } from './images/ImageThumbnail';
import { Button } from './buttons/Button';

interface ImageListProps {
    productId: string;
    categories: Category[];
}

export const ImageList: React.FC<ImageListProps> = ({ productId, categories }) => {
    const dispatch = useDispatch();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState<{ categoryId: string; imageId: string } | null>(
        null
    );
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleFileChange = async (categoryId: string, file: File) => {
        const imageUrl = URL.createObjectURL(file);
        dispatch(
            addImage({
                productId,
                categoryId,
                image: {
                    id: uuidv4(),
                    url: imageUrl,
                    file,
                },
            })
        );
    };

    const handleDeleteClick = (categoryId: string, imageId: string) => {
        setSelectedDelete({ categoryId, imageId });
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (selectedDelete) {
            dispatch(
                deleteImage({
                    productId,
                    categoryId: selectedDelete.categoryId,
                    imageId: selectedDelete.imageId,
                })
            );
            setShowDeleteConfirm(false);
            setSelectedDelete(null);
        }
    };

    return (
        <>
            <div className="flex min-h-[100px] w-full flex-col space-y-6">
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        className={`flex w-full flex-col ${index !== 0 ? 'border-t border-gray-200 pt-6' : ''
                            }`}
                    >
                        <div className="flex flex-wrap gap-2 px-3">
                            {category.images.map((image) => (
                                <ImageThumbnail
                                    key={image.id}
                                    src={image.url}
                                    alt="Category"
                                    onClick={() => setPreviewImage(image.url)}
                                    onDelete={() => handleDeleteClick(category.id, image.id)}
                                />
                            ))}
                            <label className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-300 hover:bg-gray-50">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileChange(category.id, file);
                                    }}
                                    className="hidden"
                                />
                                <PhotoIcon className="h-4 w-4 text-gray-400" />
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                <div className="text-center">
                    <p className="mb-6 text-lg font-medium text-gray-900">
                        Apakah Anda Yakin untuk Menghapus Gambar?
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button
                            variant="secondary"
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            Batalkan
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleConfirmDelete}
                        >
                            Hapus
                        </Button>
                    </div>
                </div>
            </Modal>

            <ImagePreview
                isOpen={!!previewImage}
                imageUrl={previewImage || ''}
                onClose={() => setPreviewImage(null)}
            />
        </>
    );
}; 