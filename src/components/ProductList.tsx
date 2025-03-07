import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addProduct } from '../store/productSlice';
import { RootState } from '../store/store';
import { Product } from './Product';
import { Modal } from './Modal';
import { Button } from './buttons/Button';

export const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const { products, maxProducts } = useSelector((state: RootState) => state.products);
    const [showMaxWarning, setShowMaxWarning] = useState(false);

    useEffect(() => {
        if (products.length >= maxProducts) {
            setShowMaxWarning(true);
        }
    }, [products.length, maxProducts]);

    const handleAddProduct = () => {
        if (products.length >= maxProducts) {
            setShowMaxWarning(true);
        } else {
            dispatch(addProduct());
        }
    };

    return (
        <div className="container mx-auto max-w-6xl p-6">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200">
                            <th scope="col" className="w-16 py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                                No
                            </th>
                            <th scope="col" className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Produk
                            </th>
                            <th scope="col" className="w-[320px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Kategori
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Gambar
                            </th>
                            <th scope="col" className="w-20 py-3.5 pl-3 pr-6 text-center text-sm font-semibold text-gray-900">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                        {products.length < maxProducts && (
                            <tr className="divide-x divide-gray-200">
                                <td colSpan={5} className="p-4">
                                    <Button
                                        variant="secondary"
                                        icon={<PlusIcon className="h-5 w-5" />}
                                        onClick={handleAddProduct}
                                        fullWidth
                                    >
                                        Tambah Produk
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
        </div>
    );
}; 