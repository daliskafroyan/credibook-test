import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import { addImage, deleteImage } from '../store/productSlice';
import { Image } from '../types/product';

interface ImageUploadProps {
    productId: string;
    images: Image[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ productId, images }) => {
    const dispatch = useDispatch();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload only JPG, JPEG, or PNG files.');
            return;
        }

        // Create URL for preview
        const imageUrl = URL.createObjectURL(file);
        const newImage: Image = {
            id: uuidv4(),
            url: imageUrl,
            file,
        };

        dispatch(addImage({ productId, image: newImage }));
    };

    const handleDeleteClick = (imageId: string) => {
        setSelectedImageId(imageId);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (selectedImageId) {
            dispatch(deleteImage({ productId, imageId: selectedImageId }));
            setShowConfirmation(false);
            setSelectedImageId(null);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {images.map((image) => (
                    <div key={image.id} className="relative">
                        <img
                            src={image.url}
                            alt="Product"
                            className="h-16 w-16 rounded object-cover"
                        />
                        <button
                            onClick={() => handleDeleteClick(image.id)}
                            className="absolute -right-1 -top-1 rounded-full bg-white p-0.5 shadow-md hover:bg-gray-100"
                        >
                            <TrashIcon className="h-3 w-3 text-red-600" />
                        </button>
                    </div>
                ))}
                <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded border border-gray-300 hover:border-gray-400">
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <span className="text-xl text-gray-400">+</span>
                </label>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-medium">
                            Apakah Anda Yakin untuk Menghapus Gambar?
                        </h3>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Batalkan
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 