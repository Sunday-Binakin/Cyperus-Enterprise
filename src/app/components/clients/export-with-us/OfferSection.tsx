import { FaCheck, FaLeaf, FaBoxOpen } from 'react-icons/fa';

interface OfferCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function OfferCard({ icon, title, description }: OfferCardProps) {
  return (
    <div className="bg-black p-8 rounded-lg shadow-md border border-[#4A651F] transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="bg-[#EFE554] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white text-center mb-4">{title}</h3>
      <p className="text-white text-center">
        {description}
      </p>
    </div>
  );
}

export default function OfferSection() {
  const offers = [
    {
      icon: <FaCheck className="text-[#4A651F] text-2xl" />,
      title: "Tigernut Beverages",
      description: "Our vegan, nutrient-rich tigernut beverages are perfect for health-conscious consumers seeking dairy alternatives."
    },
    {
      icon: <FaLeaf className="text-[#4A651F] text-2xl" />,
      title: "Snacks & Popsicles",
      description: "Natural, low-sugar snacks and refreshing popsicles made from premium Ghanaian tigernuts."
    },
    {
      icon: <FaBoxOpen className="text-[#4A651F] text-2xl" />,
      title: "Pulp Flour & Poultry Feed",
      description: "Multi-purpose by-products ideal for gluten-free baking or high-quality animal feed with exceptional nutritional value."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white font-serif mb-16">What We <span className="text-[#EFE554]">Offer</span></h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              icon={offer.icon}
              title={offer.title}
              description={offer.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
