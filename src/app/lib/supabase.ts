import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createSupabaseClient = () => {
  return createClientComponentClient();
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          address: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          address?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          address?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category: string | null;
          inventory: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          category?: string | null;
          inventory?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category?: string | null;
          inventory?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      variants: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          price_modifier: number;
          inventory: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          price_modifier?: number;
          inventory?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          price_modifier?: number;
          inventory?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          product_id: string;
          variant_id: string | null;
          quantity: number;
          price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          product_id: string;
          variant_id?: string | null;
          quantity: number;
          price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          product_id?: string;
          variant_id?: string | null;
          quantity?: number;
          price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          guest_email: string | null;
          status: string;
          total_amount: number;
          shipping_address: string | null;
          payment_status: string;
          payment_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          guest_email?: string | null;
          status?: string;
          total_amount: number;
          shipping_address?: string | null;
          payment_status?: string;
          payment_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          guest_email?: string | null;
          status?: string;
          total_amount?: number;
          shipping_address?: string | null;
          payment_status?: string;
          payment_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
