'use client'
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { GiHut } from 'react-icons/gi';
import { GiMuscleUp } from 'react-icons/gi';

const benefits = [
  {
    icon: GiHut,
    title: 'Freshly Sourced Tigernuts',
    description: 'Our tigernut are gotten straight from the farm to ensure freshness and quality, delivering the best natural flavor and nutrients in every product.'
  },
  {
    icon: GiMuscleUp,
    title: 'Energy Boost',
    description: 'Filled with nourishing energy, these tigernut products will keep you fueled throughout the day, whether it\'s a quick snack or a full meal.'
  }
];

export default function WhyChoose() {
  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="relative h-[600px] w-full">
          <Image
            src="/images/clients/products/footer/choconut.jpg"
            alt="Tigernut Drink Splash"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="text-white space-y-8 ml-10">
          <p className="text-[#EFE554] text-lg font-medium">WHY CHOOSE TIGERNUTS REPUBLIC</p>
          <h2 className="text-4xl md:text-3xl font-bold leading-tight">
            Enjoy Pure & Natural Tigernut<br />
            Goodness in Every Variety
          </h2>
          <p className="text-gray-300 text-lg">
            Our tigernut-based products are both nutritious and delicious,
            perfect for a healthier lifestyle.
          </p>

          {/* Benefits */}
          <div className="space-y-8 mt-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-[#EFE554] mt-1">
                  <benefit.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="relative bg-[#EFE554] text-[#55006F] px-8 py-4 rounded-lg font-semibold overflow-hidden group mt-8">
            <span className="relative z-10 group-hover:text-[#EFE554] transition-colors duration-300 flex items-center gap-2">
              SEE WHAT DRIVES US <ChevronRight />
            </span>
            <div className="absolute inset-0 bg-[#55006F] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
}