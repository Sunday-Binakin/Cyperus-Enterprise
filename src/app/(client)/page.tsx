import React from 'react';
import Slideshow from '../components/clients/Landing-Page/hero/Slideshow';
import ProductShowcase from '../components/clients/Landing-Page/products/ProductShowcase';
import FeaturedProducts from '../components/clients/Landing-Page/featured/FeaturedProducts';
import WhyChoose from '../components/clients/Landing-Page/why-choose/WhyChoose';
import Categories from '../components/clients/Landing-Page/categories/Categories';
import BlogSection from '../components/clients/Landing-Page/blogSection/BlogSection';
import TestimonialsSection from '../components/clients/Landing-Page/TestimonialsSection';
import SubscribeSection from '../components/clients/Landing-Page/products/SubscribeSection';
import ScrollReveal from '../components/animation/ScrollReveal';

export default function Home() {
  return (
    <main>
      {/* Hero section doesn't need animation as it's above the fold */}
      <Slideshow />
      
      {/* Product showcase animates from left */}
      <ScrollReveal direction="left">
        <ProductShowcase />
      </ScrollReveal>

      {/* Featured products animate up */}
      <ScrollReveal direction="up" delay={0.2}>
        <FeaturedProducts />
      </ScrollReveal>

      {/* Why choose section animates from right */}
      <ScrollReveal direction="right">
        <WhyChoose />
      </ScrollReveal>

      {/* Categories animate up */}
      <ScrollReveal direction="up" delay={0.2}>
        <Categories />
      </ScrollReveal>

      {/* Blog section animates up */}
      <ScrollReveal direction="up" delay={0.2}>
        <BlogSection />
      </ScrollReveal>

      {/* Testimonials section animates from left */}
      <ScrollReveal direction="left">
        <TestimonialsSection />
      </ScrollReveal>

      {/* Subscribe section animates from right */}
      <ScrollReveal direction="right">
        <SubscribeSection />
      </ScrollReveal>
    </main>
  );
}
