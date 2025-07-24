import { createSupabaseClient } from './supabase';
import type { Database } from './supabase';

type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export class ProductService {
  private supabase = createSupabaseClient();

  async getProducts({
    category,
    isActive = true,
    limit = 20,
    offset = 0
  }: {
    category?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = this.supabase
      .from('products')
      .select(`
        *,
        variants (*)
      `)
      .eq('is_active', isActive)
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (limit) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return data;
  }

  async getProduct(id: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants (*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return data;
  }

  async getFeaturedProducts(limit = 8) {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants (*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }

    return data;
  }

  async searchProducts(query: string, limit = 20) {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants (*)
      `)
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    return data;
  }

  async getCategories() {
    const { data, error } = await this.supabase
      .from('products')
      .select('category')
      .eq('is_active', true)
      .not('category', 'is', null);

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    // Get unique categories
    const categories = [...new Set(data.map(item => item.category).filter(Boolean))];
    return categories;
  }

  // Admin functions
  async createProduct(product: ProductInsert) {
    const { data, error } = await this.supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return data;
  }

  async updateProduct(id: string, updates: ProductUpdate) {
    const { data, error } = await this.supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return data;
  }

  async deleteProduct(id: string) {
    const { error } = await this.supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async updateInventory(productId: string, variantId: string | null, quantity: number) {
    if (variantId) {
      const { error } = await this.supabase
        .from('variants')
        .update({ inventory: quantity })
        .eq('id', variantId);

      if (error) throw error;
    } else {
      const { error } = await this.supabase
        .from('products')
        .update({ inventory: quantity })
        .eq('id', productId);

      if (error) throw error;
    }
  }
}

export const productService = new ProductService();
