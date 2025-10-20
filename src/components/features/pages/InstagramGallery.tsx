'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { InstagramPost } from './InstagramPost';
import { INSTAGRAM_POSTS } from './types/instagram';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const InstagramGallery = () => {
  // Take first 6 posts for consistent display
  const displayPosts = INSTAGRAM_POSTS.slice(0, 6);

  return (
    <div className="w-full py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white text-center">
          Follow Us on Instagram
        </h2>
        
        {/* Mobile Carousel - Swipeable with 1 image at a time */}
        <div className="block md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={true}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100',
            }}
            className="!pb-12"
          >
            {displayPosts.map((post, index) => (
              <SwiperSlide key={`mobile-${post.id}-${index}`}>
                <div className="w-[90vw] h-[300px] overflow-hidden rounded-xl border-2 border-white mx-auto">
                  <InstagramPost
                    {...post}
                    index={index}
                    className="w-full h-full object-cover"
                    isHovered={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop/Tablet Static Grid - 3 large images */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            {displayPosts.slice(0, 3).map((post, index) => (
              <div 
                key={`desktop-${post.id}-${index}`}
                className="min-h-[400px] overflow-hidden rounded-xl border-2 border-white group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <InstagramPost
                    {...post}
                    index={index}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    isHovered={false}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;
