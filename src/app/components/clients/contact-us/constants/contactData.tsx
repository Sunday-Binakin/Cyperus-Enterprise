import React from 'react';
import { LocationIcon, EmailIcon, PhoneIcon } from '../icons';

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: React.ReactNode;
  link?: string;
}

const PhoneNumbers = () => (
  <div className="space-y-1">
    <p className="mb-1">+233 244 222 222</p>
    <p>+233 555 555 555</p>
  </div>
);

export const CONTACT_CARDS: ContactInfo[] = [
  {
    icon: LocationIcon,
    title: "Visit Us",
    content: "123 Main Street, City, Country",
  },
  {
    icon: EmailIcon,
    title: "Write to Us",
    content: "info@cyperus.com",
    link: "mailto:info@cyperus.com",
  },
  {
    icon: PhoneIcon,
    title: "Call Us",
    content: <PhoneNumbers />,
  },
];
