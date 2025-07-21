import { Metadata } from 'next';
import { CHOCONUT_PRODUCTS } from '@/app/data/products/choconut';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = CHOCONUT_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: 'Product Not Found - Cyperus Enterprise',
      description: 'The requested choconut product could not be found.',
    };
  }

  return {
    title: `${product.name} - Cyperus Enterprise`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return CHOCONUT_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}
