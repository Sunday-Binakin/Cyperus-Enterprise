import { Product } from '@/app/types/product';

export type { Product };

export const BITTER_KOLA_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bitter Kola',
    description: 'Strong, earthy, and deeply restorative. Infused with bitter kola’s ancient energy-boosting power to support endurance, detoxification, and focus.',
    price: 25.00,
    image: '/images/clients/products/footer/bitter-kola.jpeg',
    category: 'Bitter Kola',
    stock: 50,
    netWeight: '350ml',
  }
];
