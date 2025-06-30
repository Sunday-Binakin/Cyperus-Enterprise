import React from 'react';
import Slideshow from '../components/clients/hero/Slideshow';
import ProductShowcase from '../components/clients/products/ProductShowcase';
import FeaturedProducts from '../components/clients/featured/FeaturedProducts';
import WhyChoose from '../components/clients/why-choose/WhyChoose';
import Categories from '../components/clients/categories/Categories';

export default function Home() {
  return (
    <main>
      <Slideshow />
      <ProductShowcase />
      <FeaturedProducts />
      <WhyChoose />
      <Categories />
    </main>
  );
}
