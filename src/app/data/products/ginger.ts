import { Product } from '@/app/types/product';

export type { Product };

export const GINGER_PRODUCTS: Product[] = [
  {
    id: 'ginger-1',
    name: 'Ginger Tigernut Drink',
    description: 'Bold and spicy with a natural kick. Infused with real ginger to boost metabolism, improve circulation, and awaken your senses.',
    price: 20.00,
    image: '/images/clients/products/footer/ginger.jpg',
    netWeight: '350ml',
    category: 'Ginger',
    stock: 50,
  }
];
