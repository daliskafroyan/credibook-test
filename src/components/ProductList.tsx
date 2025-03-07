import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addProduct } from '../store/productSlice';
import { RootState } from '../store/store';
import { Product } from './Product';

export const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const { products, maxProducts } = useSelector((state: RootState) => state.products);

    const handleAddProduct = () => {
        dispatch(addProduct());
    };

    return (
        <div className="container mx-auto max-w-6xl p-6">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                                No
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Produk
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Deskripsi Produk
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Gambar Produk
                            </th>
                            <th scope="col" className="py-3.5 pl-3 pr-6 text-right text-sm font-semibold text-gray-900">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                        {products.length < maxProducts && (
                            <tr>
                                <td colSpan={5} className="p-4">
                                    <button
                                        onClick={handleAddProduct}
                                        className="flex w-full items-center justify-center space-x-2 rounded border border-gray-300 py-2 hover:bg-gray-50"
                                    >
                                        <PlusIcon className="h-5 w-5 text-gray-400" />
                                        <span className="text-sm text-gray-500">Tambah Produk</span>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {products.length >= maxProducts && (
                    <div className="border-t border-gray-200 p-4">
                        <p className="text-center text-sm text-red-500">
                            Anda Sudah Mencapai Maksimum Input
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}; 