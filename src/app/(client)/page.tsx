import React from 'react';
import Slideshow from '../components/clients/Landing-Page/hero/Slideshow';
import ProductShowcase from '../components/clients/Landing-Page/products/ProductShowcase';
import FeaturedProducts from '../components/clients/Landing-Page/featured/FeaturedProducts';
import WhyChoose from '../components/clients/Landing-Page/why-choose/WhyChoose';
import Categories from '../components/clients/Landing-Page/categories/Categories';
import Testimonials from '../components/clients/Landing-Page/Testimonials/Testimonials';
import BlogSection from '../components/clients/Landing-Page/BlogSection';
import SubscribeSection from '../components/clients/Landing-Page/SubscribeSection';

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
