import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/clients/products/footer/choconut.jpg" 
          alt="Tigernut Production" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A651F]/80 to-[#F8E5D6]/60" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mt-30">
            Bring Authentic Ghanaian Tigernut Products to Your Market
          </h1>
          {/* <p className="text-xl md:text-2xl text-[#F8E5D6] mb-8">
            Premium, farm-to-factory tigernut beverages, snacks, and by-products for global distributors.
          </p> */}
          <a 
            href="#inquiry-form"
            className="bg-[#EFE554] text-[#6B4226] my-4 px-6 py-4 rounded-md text-lg font-bold inline-flex items-center hover:bg-[#3A5F0B] hover:text-white transition-colors duration-300 shadow-lg"
          >
            Become a Distributor →
          </a>
        </div>
      </div>
    </section>
  );
}
