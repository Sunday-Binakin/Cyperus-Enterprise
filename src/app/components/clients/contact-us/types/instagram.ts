export interface InstagramPost {
  id: number;
  imageUrl: string;
  link: string;
  alt?: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { 
    id: 1, 
    imageUrl: '/images/clients/products/footer/choconut.jpg', 
    link: '#',
    alt: 'Choconut product'
  },
  { 
    id: 2, 
    imageUrl: '/images/clients/products/footer/clove.jpg', 
    link: '#',
    alt: 'Clove product'
  },
  { 
    id: 3, 
    imageUrl: '/images/clients/products/footer/ginger.jpg', 
    link: '#',
    alt: 'Ginger product'
  },
  { 
    id: 4, 
    imageUrl: '/images/clients/products/footer/lemon-grass.jpg', 
    link: '#',
    alt: 'Lemon grass product'
  },
  { 
    id: 5, 
    imageUrl: '/images/clients/products/footer/ginger.jpg', 
    link: '#',
    alt: 'Ginger product'
  },
  { 
    id: 6, 
    imageUrl: '/images/clients/products/footer/ginger.jpg', 
    link: '#',
    alt: 'Ginger product'
  },
];
