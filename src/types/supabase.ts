export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    number: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    number: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    number?: number
                }
            }
            categories: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    product_id: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    product_id: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    product_id?: string
                }
            }
            images: {
                Row: {
                    id: string
                    created_at: string
                    url: string
                    category_id: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    url: string
                    category_id: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    url?: string
                    category_id?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
} 