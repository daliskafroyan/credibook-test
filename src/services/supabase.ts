import { supabase } from '../lib/supabase';

const STORAGE_BUCKET = 'product-images';

export const productService = {
    // Fetch all products
    async getProducts() {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                categories:categories(
                    *,
                    images:images(*)
                )
            `)
            .order('number');

        if (error) throw error;
        return data;
    },

    // Create a new product
    async createProduct(number: number) {
        const { data, error } = await supabase
            .from('products')
            .insert([{ number, name: '' }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update product name
    async updateProductName(id: string, name: string) {
        const { error } = await supabase
            .from('products')
            .update({ name })
            .eq('id', id);

        if (error) throw error;
    },

    // Delete product
    async deleteProduct(id: string) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Add category to product
    async addCategory(productId: string) {
        const { data, error } = await supabase
            .from('categories')
            .insert([{ product_id: productId, name: '' }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update category name
    async updateCategoryName(categoryId: string, name: string) {
        const { error } = await supabase
            .from('categories')
            .update({ name })
            .eq('id', categoryId);

        if (error) throw error;
    },

    // Delete category
    async deleteCategory(categoryId: string) {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', categoryId);

        if (error) throw error;
    },

    // Add image to category
    async addImage(categoryId: string, url: string) {
        const { data, error } = await supabase
            .from('images')
            .insert([{ category_id: categoryId, url }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete image
    async deleteImage(imageId: string) {
        const { error } = await supabase
            .from('images')
            .delete()
            .eq('id', imageId);

        if (error) throw error;
    },

    // Upload image file to storage
    async uploadImage(file: File) {
        try {
            // Validate file type
            const fileExt = file.name.split('.').pop()?.toLowerCase();
            if (!fileExt || !['jpg', 'jpeg', 'png'].includes(fileExt)) {
                throw new Error('Only JPG and PNG files are allowed');
            }

            // Generate a unique filename in the public folder
            const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            // Upload the file
            const { error: uploadError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: `image/${fileExt}`
                });

            if (uploadError) throw uploadError;

            // Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
}; 