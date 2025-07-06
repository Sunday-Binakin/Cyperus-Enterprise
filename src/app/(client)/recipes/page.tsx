'use client';

import FeaturedProducts from '@/app/components/clients/Landing-Page/featured/FeaturedProducts';
import { HeroSection } from '@/app/components/shared/HeroSection';
import TigernutsCTA from '@/app/components/clients/recipes/TigernutsCTA';

export default function RecipesPage() {
  return (
    <main>
      <HeroSection
        title="Delicious Recipes"
        subtitle="Discover and share amazing recipes from around the world"
        backgroundImage="/images/clients/hero/slider1.JPG"  
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Recipes', href: '/recipes' },
        ]}
        height="medium"
        contentPosition="center"
        overlayOpacity={60}
      />
      
      <FeaturedProducts />
      <TigernutsCTA />
    </main>
  );
}
