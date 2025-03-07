import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState } from '../types/product';
import { productService } from '../services/supabase';

const initialState: ProductState = {
    products: [],
    maxProducts: 5,
    maxCategories: 3,
    loading: false,
    error: null
};

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const products = await productService.getProducts();
        return products;
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (_, { getState }) => {
        const state = getState() as { products: ProductState };
        const number = state.products.products.length + 1;
        const product = await productService.createProduct(number);
        return product;
    }
);

export const updateProductName = createAsyncThunk(
    'products/updateProductName',
    async ({ id, name }: { id: string; name: string }) => {
        await productService.updateProductName(id, name);
        return { id, name };
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: string, { dispatch }) => {
        await productService.deleteProduct(id);
        // Refetch products to get updated numbers
        dispatch(fetchProducts());
        return id;
    }
);

export const addCategory = createAsyncThunk(
    'products/addCategory',
    async (productId: string) => {
        const category = await productService.addCategory(productId);
        return { productId, category };
    }
);

export const updateCategoryName = createAsyncThunk(
    'products/updateCategoryName',
    async ({ productId, categoryId, name }: { productId: string; categoryId: string; name: string }) => {
        await productService.updateCategoryName(categoryId, name);
        return { productId, categoryId, name };
    }
);

export const deleteCategory = createAsyncThunk(
    'products/deleteCategory',
    async ({ productId, categoryId }: { productId: string; categoryId: string }) => {
        await productService.deleteCategory(categoryId);
        return { productId, categoryId };
    }
);

export const addImage = createAsyncThunk(
    'products/addImage',
    async ({ productId, categoryId, file }: { productId: string; categoryId: string; file: File }) => {
        try {
            const url = await productService.uploadImage(file);
            const image = await productService.addImage(categoryId, url);
            return { productId, categoryId, image };
        } catch (error) {
            console.error('Error adding image:', error);
            throw error;
        }
    }
);

export const deleteImage = createAsyncThunk(
    'products/deleteImage',
    async ({ productId, categoryId, imageId }: { productId: string; categoryId: string; imageId: string }) => {
        await productService.deleteImage(imageId);
        return { productId, categoryId, imageId };
    }
);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })

            // Add Product
            .addCase(addProduct.fulfilled, (state, action) => {
                if (state.products.length < state.maxProducts) {
                    state.products.push({
                        ...action.payload,
                        categories: []
                    });
                }
            })

            // Update Product Name
            .addCase(updateProductName.fulfilled, (state, action) => {
                const product = state.products.find(p => p.id === action.payload.id);
                if (product) {
                    product.name = action.payload.name;
                }
            })

            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            })

            // Add Category
            .addCase(addCategory.fulfilled, (state, action) => {
                const product = state.products.find(p => p.id === action.payload.productId);
                if (product && product.categories.length < state.maxCategories) {
                    product.categories.push({
                        ...action.payload.category,
                        images: []
                    });
                }
            })

            // Update Category Name
            .addCase(updateCategoryName.fulfilled, (state, action) => {
                const product = state.products.find(p => p.id === action.payload.productId);
                if (product) {
                    const category = product.categories.find(c => c.id === action.payload.categoryId);
                    if (category) {
                        category.name = action.payload.name;
                    }
                }
            })

            // Delete Category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const product = state.products.find(p => p.id === action.payload.productId);
                if (product) {
                    product.categories = product.categories.filter(c => c.id !== action.payload.categoryId);
                }
            })

            // Add Image
            .addCase(addImage.fulfilled, (state, action) => {
                const product = state.products.find(p => p.id === action.payload.productId);
                if (product) {
                    const category = product.categories.find(c => c.id === action.payload.categoryId);
                    if (category) {
                        category.images.push(action.payload.image);
                    }
                }
            })

            // Delete Image
            .addCase(deleteImage.fulfilled, (state, action) => {
                const product = state.products.find(p => p.id === action.payload.productId);
                if (product) {
                    const category = product.categories.find(c => c.id === action.payload.categoryId);
                    if (category) {
                        category.images = category.images.filter(img => img.id !== action.payload.imageId);
                    }
                }
            });
    },
});

export default productSlice.reducer; 