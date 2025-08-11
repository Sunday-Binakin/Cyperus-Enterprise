// Mock data for products and client-side storage

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  is_active: boolean;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price: number;
  stock_quantity: number;
  attributes: Record<string, string>;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Tiger Nuts',
    description: 'High-quality dried tiger nuts, perfect for snacking or making tiger nut milk.',
    category: 'Tiger Nuts',
    price: 2500,
    image_url: '/images/clients/products/tigernuts-premium.jpg',
    is_active: true,
    stock_quantity: 100,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    variants: [
      {
        id: '1-1',
        product_id: '1',
        name: '500g Pack',
        price: 2500,
        stock_quantity: 50,
        attributes: { weight: '500g', packaging: 'resealable bag' }
      },
      {
        id: '1-2',
        product_id: '1',
        name: '1kg Pack',
        price: 4500,
        stock_quantity: 30,
        attributes: { weight: '1kg', packaging: 'resealable bag' }
      }
    ]
  },
  {
    id: '2',
    name: 'Tiger Nut Flour',
    description: 'Finely ground tiger nut flour, gluten-free and perfect for baking.',
    category: 'Flour',
    price: 3000,
    image_url: '/images/clients/products/tigernut-flour.jpg',
    is_active: true,
    stock_quantity: 75,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    variants: [
      {
        id: '2-1',
        product_id: '2',
        name: '500g Pack',
        price: 3000,
        stock_quantity: 40,
        attributes: { weight: '500g', type: 'fine ground' }
      }
    ]
  },
  {
    id: '3',
    name: 'Tiger Nut Oil',
    description: 'Cold-pressed tiger nut oil, rich in nutrients and perfect for cooking.',
    category: 'Oil',
    price: 5500,
    image_url: '/images/clients/products/tigernut-oil.jpg',
    is_active: true,
    stock_quantity: 25,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    variants: [
      {
        id: '3-1',
        product_id: '3',
        name: '250ml Bottle',
        price: 5500,
        stock_quantity: 25,
        attributes: { volume: '250ml', type: 'cold-pressed' }
      }
    ]
  },
  {
    id: '4',
    name: 'Bitter Kola',
    description: 'Fresh bitter kola nuts, known for their medicinal properties.',
    category: 'Bitter Kola',
    price: 1500,
    image_url: '/images/clients/products/bitter-kola.jpg',
    is_active: true,
    stock_quantity: 200,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    name: 'Ginger Powder',
    description: 'Premium ground ginger powder for cooking and health benefits.',
    category: 'Spices',
    price: 2000,
    image_url: '/images/clients/products/ginger-powder.jpg',
    is_active: true,
    stock_quantity: 80,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
];

export const mockCategories = [
  'Tiger Nuts',
  'Flour',
  'Oil',
  'Bitter Kola',
  'Spices',
  'Seeds',
  'Dried Fruits',
  'Nuts'
];
