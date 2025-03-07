import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Category, Image, ProductState } from '../types/product';
import { v4 as uuidv4 } from 'uuid';

const initialState: ProductState = {
    products: [],
    maxProducts: 5,
    maxCategories: 3,
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
                    categories: [],
                };
                state.products.push(newProduct);
            }
        },
        updateProductName: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const product = state.products.find((p) => p.id === action.payload.id);
            if (product) {
                product.name = action.payload.name;
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((p) => p.id !== action.payload);
            // Update numbers
            state.products.forEach((product, index) => {
                product.number = index + 1;
            });
        },
        addCategory: (state, action: PayloadAction<string>) => {
            const product = state.products.find((p) => p.id === action.payload);
            if (product && product.categories.length < state.maxCategories) {
                const newCategory: Category = {
                    id: uuidv4(),
                    name: '',
                    images: [],
                };
                product.categories.push(newCategory);
            }
        },
        updateCategoryName: (
            state,
            action: PayloadAction<{ productId: string; categoryId: string; name: string }>
        ) => {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (product) {
                const category = product.categories.find((c) => c.id === action.payload.categoryId);
                if (category) {
                    category.name = action.payload.name;
                }
            }
        },
        deleteCategory: (state, action: PayloadAction<{ productId: string; categoryId: string }>) => {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (product) {
                product.categories = product.categories.filter(
                    (c) => c.id !== action.payload.categoryId
                );
            }
        },
        addImage: (
            state,
            action: PayloadAction<{ productId: string; categoryId: string; image: Image }>
        ) => {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (product) {
                const category = product.categories.find((c) => c.id === action.payload.categoryId);
                if (category) {
                    category.images.push(action.payload.image);
                }
            }
        },
        deleteImage: (
            state,
            action: PayloadAction<{ productId: string; categoryId: string; imageId: string }>
        ) => {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (product) {
                const category = product.categories.find((c) => c.id === action.payload.categoryId);
                if (category) {
                    category.images = category.images.filter((img) => img.id !== action.payload.imageId);
                }
            }
        },
    },
});

export const {
    addProduct,
    updateProductName,
    deleteProduct,
    addCategory,
    updateCategoryName,
    deleteCategory,
    addImage,
    deleteImage,
} = productSlice.actions;

export default productSlice.reducer; 