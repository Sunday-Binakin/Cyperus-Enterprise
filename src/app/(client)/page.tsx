import React from 'react';
import Slideshow from '../components/clients/hero/Slideshow';
import ProductShowcase from '../components/clients/products/ProductShowcase';
import FeaturedProducts from '../components/clients/featured/FeaturedProducts';
import WhyChoose from '../components/clients/why-choose/WhyChoose';
import Categories from '../components/clients/categories/Categories';
import Testimonials from '../components/clients/Testimonials/Testimonials';
import BlogSection from '../components/clients/BlogSection';
import SubscribeSection from '../components/clients/SubscribeSection';

export default function Home() {
  return (
    <main>
      <Slideshow />
      <ProductShowcase />
      <FeaturedProducts />
      <WhyChoose />
      <Categories />
      <Testimonials />
      <BlogSection />
      <SubscribeSection />
    </main>
  );
}
