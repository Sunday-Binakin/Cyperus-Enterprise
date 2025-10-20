import React from 'react';
import Slideshow from '@/components/features/home/hero/Slideshow';
import ProductShowcase from '@/components/features/home/products/ProductShowcase';
import FeaturedProducts from '@/components/features/home/featured/FeaturedProducts';
import WhyChoose from '@/components/features/home/why-choose/WhyChoose';
import Categories from '@/components/features/home/categories/Categories';
import BlogSection from '@/components/features/home/blogSection/BlogSection';
import TestimonialsSection from '@/components/features/home/TestimonialsSection';
import SubscribeSection from '@/components/features/home/products/SubscribeSection';
import ScrollReveal from '@/components/ui/ScrollReveal';

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
