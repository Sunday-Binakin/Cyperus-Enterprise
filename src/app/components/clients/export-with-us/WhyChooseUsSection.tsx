import Image from 'next/image';
import { FaLeaf, FaBoxOpen, FaTag, FaPlane } from 'react-icons/fa';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <li className="flex items-start">
      <div className="bg-[#EFE554] w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white">{description}</p>
      </div>
    </li>
  );
}

export default function WhyChooseUsSection() {
  const benefits = [
    {
      icon: <FaLeaf className="text-[#4A651F]" />,
      title: "Farm-to-factory sourcing",
      description: "We work directly with local farmers, ensuring quality control throughout our supply chain and fair compensation."
    },
    {
      icon: <FaBoxOpen className="text-[#4A651F]" />,
      title: "Retail-ready packaging",
      description: "Our products come in eye-catching, shelf-stable packaging that meets international standards."
    },
    {
      icon: <FaTag className="text-[#4A651F]" />,
      title: "Bulk/private labeling",
      description: "Flexible options for distributors, including custom branding and white-label solutions."
    },
    {
      icon: <FaPlane className="text-[#4A651F]" />,
      title: "Reliable shipping",
      description: "Experienced in international logistics with efficient shipping solutions to ensure products arrive in perfect condition."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl border-2 border-[#4A651F]">
            <Image 
              src="/images/clients/products/footer/choconut.jpg" 
              alt="Ghanaian Tigernut Farm" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-white font-serif mb-8">Why <span className="text-[#EFE554]">Choose Us</span>?</h2>
            
            <ul className="space-y-6">
              {benefits.map((benefit, index) => (
                <BenefitItem
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
