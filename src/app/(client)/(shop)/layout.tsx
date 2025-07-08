import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Cyperus Enterprise',
  description: 'Explore our premium selection of products',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
