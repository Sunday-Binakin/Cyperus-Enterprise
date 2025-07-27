import { mockProducts, Product, ProductVariant } from './mock-data';

export interface ProductSearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

class ProductService {
  private products: Product[] = mockProducts;

  constructor() {
    // Initialize with mock data
    this.products = [...mockProducts];
  }

  /**
   * Get all products with optional filtering
   */
  async getProducts(filters?: ProductSearchFilters, page = 1, limit = 12): Promise<ProductSearchResult> {
    // Simulate API delay
    await this.delay(300);

    let filteredProducts = [...this.products];

    // Apply filters
    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(p => p.stock_quantity > 0);
      }
    }

    // Apply pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages
    };
  }

  /**
   * Get a single product by ID
   */
  async getProduct(id: string): Promise<Product | null> {
    await this.delay(200);
    
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string, limit?: number): Promise<Product[]> {
    await this.delay(250);
    
    let categoryProducts = this.products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );

    if (limit) {
      categoryProducts = categoryProducts.slice(0, limit);
    }

    return categoryProducts;
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    await this.delay(200);
    
    // Return products with good stock levels (simulating featured products)
    const featuredProducts = this.products
      .filter(p => p.stock_quantity > 10 && p.is_active)
      .slice(0, limit);

    return featuredProducts;
  }

  /**
   * Search products
   */
  async searchProducts(query: string, limit = 10): Promise<Product[]> {
    await this.delay(300);
    
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    const results = this.products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );

    return results.slice(0, limit);
  }

  /**
   * Get related products
   */
  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    await this.delay(200);
    
    const currentProduct = this.products.find(p => p.id === productId);
    if (!currentProduct) {
      return [];
    }

    // Get products from same category, excluding current product
    const relatedProducts = this.products
      .filter(p => p.id !== productId && p.category === currentProduct.category)
      .slice(0, limit);

    // If not enough from same category, fill with other products
    if (relatedProducts.length < limit) {
      const additionalProducts = this.products
        .filter(p => p.id !== productId && !relatedProducts.includes(p))
        .slice(0, limit - relatedProducts.length);
      
      relatedProducts.push(...additionalProducts);
    }

    return relatedProducts;
  }

  /**
   * Get all product categories
   */
  async getCategories(): Promise<string[]> {
    await this.delay(100);
    
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.sort();
  }

  /**
   * Update product inventory (for cart operations)
   */
  async updateInventory(productId: string, quantity: number): Promise<boolean> {
    await this.delay(100);
    
    const productIndex = this.products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return false;
    }

    const product = this.products[productIndex];
    if (product.stock_quantity < quantity) {
      return false; // Not enough inventory
    }

    // Update inventory
    this.products[productIndex] = {
      ...product,
      stock_quantity: product.stock_quantity - quantity
    };

    return true;
  }

  /**
   * Get product variants (if any)
   */
  async getProductVariants(productId: string): Promise<ProductVariant[]> {
    await this.delay(100);
    
    const product = this.products.find(p => p.id === productId);
    return product?.variants || [];
  }

  /**
   * Check product availability
   */
  async checkAvailability(productId: string, quantity = 1): Promise<boolean> {
    await this.delay(100);
    
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      return false;
    }

    return product.stock_quantity >= quantity;
  }

  /**
   * Get price range for filtering
   */
  async getPriceRange(): Promise<{ min: number; max: number }> {
    await this.delay(100);
    
    const prices = this.products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  /**
   * Simulate API delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const productService = new ProductService();

export default ProductService;
