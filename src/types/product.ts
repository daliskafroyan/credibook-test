export interface Image {
    id: string;
    url: string;
    file: File;
}

export interface Product {
    id: string;
    number: number;
    name: string;
    description: string;
    images: Image[];
}

export interface ProductState {
    products: Product[];
    maxProducts: number;
} 