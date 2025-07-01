'use client';

import { useEffect, useRef, useState } from 'react';
import { ContactCard } from './ContactCard';
import { CONTACT_CARDS } from './constants/contactData';

interface ContactCardsProps {
  cards?: typeof CONTACT_CARDS;
  className?: string;
}

type CardRefs = {
  [key: number]: HTMLDivElement | null;
};

/**
 * A flexible grid of contact cards
 */
export const ContactCards: React.FC<ContactCardsProps> = ({ 
  cards = CONTACT_CARDS, 
  className = '' 
}) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<CardRefs>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a map to track which cards have been animated
    const animatedCards = new Set<number>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            if (!animatedCards.has(index)) {
              animatedCards.add(index);
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200); // 200ms delay between each card
            }
          }
        });
      },
      { 
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      }
    );

    // Store the current refs in a variable for cleanup
    const currentCardRefs = cardRefs.current;
    
    // Observe each card individually
    Object.values(currentCardRefs).forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      // Use the same refs for cleanup that we used for setup
      Object.values(currentCardRefs).forEach(card => {
        if (card) observer.unobserve(card);
      });
      observer.disconnect();
    };
  }, [cards.length]);

  return (
    <div 
      ref={containerRef}
      className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ${className}`}
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isVisible = visibleCards.includes(index);
        
        return (
          <div 
            key={`${card.title}-${index}`}
            ref={el => {
              if (el) {
                cardRefs.current[index] = el;
              }
            }}
            data-index={index}
            className={`contact-card transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-6'
            }`}
          >
            <ContactCard
              icon={<Icon className="h-8 w-8 text-white" />}
              title={card.title}
              content={card.content}
              link={card.link}
            />
          </div>
        );
      })}
    </div>
  );
};

/**
 * Default export with predefined contact cards
 * For backward compatibility
 */
const ContactInfoCards = () => <ContactCards />;

export default ContactInfoCards;
