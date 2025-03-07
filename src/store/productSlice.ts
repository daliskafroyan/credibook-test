import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Image, ProductState } from '../types/product';
import { v4 as uuidv4 } from 'uuid';

const initialState: ProductState = {
    products: [],
    maxProducts: 3,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state) => {
            if (state.products.length < state.maxProducts) {
                const newProduct: Product = {
                    id: uuidv4(),
                    number: state.products.length + 1,
                    name: '',
                    description: '',
                    images: [],
                };
                state.products.push(newProduct);
            }
        },
        updateProduct: (
            state,
            action: PayloadAction<{ id: string; name?: string; description?: string }>
        ) => {
            const product = state.products.find((p) => p.id === action.payload.id);
            if (product) {
                if (action.payload.name !== undefined) {
                    product.name = action.payload.name;
                }
                if (action.payload.description !== undefined) {
                    product.description = action.payload.description;
                }
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((p) => p.id !== action.payload);
            // Update numbers
            state.products.forEach((product, index) => {
                product.number = index + 1;
            });
        },
        addImage: (
            state,
            action: PayloadAction<{ productId: string; image: Image }>
        ) => {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (product) {
                product.images.push(action.payload.image);
            }
        },
        deleteImage: (
            state,
            action: PayloadAction<{ productId: string; imageId: string }>
        ) => {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (product) {
                product.images = product.images.filter((img) => img.id !== action.payload.imageId);
            }
        },
    },
});

export const {
    addProduct,
    updateProduct,
    deleteProduct,
    addImage,
    deleteImage,
} = productSlice.actions;

export default productSlice.reducer; 