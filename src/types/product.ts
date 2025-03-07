export interface Image {
    id: string;
    url: string;
    file: File;
}

export interface Category {
    id: string;
    name: string;
    images: Image[];
}

export interface Product {
    id: string;
    number: number;
    name: string;
    categories: Category[];
}

export interface ProductState {
    products: Product[];
    maxProducts: number;
    maxCategories: number;
} 