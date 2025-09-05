import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface DistributorInquiryEmailProps {
  formData: {
    fullName: string;
    companyName: string;
    countryCity: string;
    email: string;
    phone: string;
    businessType: string;
    businessYears: string;
    currentlyDistributing: string;
    currentBrands?: string;
    interestedProducts: string[];
    monthlyQuantity?: string;
    packagingPreference: string;
    importExperience: string;
    shippingMethod?: string;
  };
}

const DistributorInquiryEmail = ({ formData }: DistributorInquiryEmailProps) => {
  const previewText = `New Distributor Inquiry from ${formData.companyName}`;
  const companyName = "Cyperus Enterprise";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading as="h1" style={logo}>{companyName}</Heading>
          </Section>
          
          <Heading style={heading}>🌍 New International Distributor Inquiry</Heading>
          
          <Text style={paragraph}>
            A potential international distribution partner has submitted an inquiry through your website.
          </Text>

          <Hr style={hr} />

          {/* Section 1: Basic Information */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>Applicant Information</Heading>
            <Text style={field}><strong>Full Name:</strong> {formData.fullName}</Text>
            <Text style={field}><strong>Company Name:</strong> {formData.companyName}</Text>
            <Text style={field}><strong>Country & City:</strong> {formData.countryCity}</Text>
            <Text style={field}><strong>Email:</strong> <Link href={`mailto:${formData.email}`} style={link}>{formData.email}</Link></Text>
            <Text style={field}><strong>Phone:</strong> {formData.phone}</Text>
          </Section>

          <Hr style={hr} />

          {/* Section 2: Business Details */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>Business Details</Heading>
            <Text style={field}><strong>Type of Business:</strong> {formData.businessType}</Text>
            <Text style={field}><strong>Years in Business:</strong> {formData.businessYears}</Text>
            <Text style={field}><strong>Distributes Food/Beverage?:</strong> {formData.currentlyDistributing}</Text>
            {formData.currentBrands && <Text style={field}><strong>Current Brands:</strong> {formData.currentBrands}</Text>}
          </Section>

          <Hr style={hr} />

          {/* Section 3: Product Interest */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>Product Interest</Heading>
            <Text style={field}><strong>Interested Products:</strong> {formData.interestedProducts.join(', ')}</Text>
            <Text style={field}><strong>Estimated Monthly Quantity:</strong> {formData.monthlyQuantity || 'Not provided'}</Text>
            <Text style={field}><strong>Packaging Preference:</strong> {formData.packagingPreference}</Text>
          </Section>

          <Hr style={hr} />

          {/* Section 4: Logistics */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>Shipping & Logistics</Heading>
            <Text style={field}><strong>Import Experience:</strong> {formData.importExperience}</Text>
            <Text style={field}><strong>Preferred Shipping Method:</strong> {formData.shippingMethod || 'Not provided'}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the International Distributor form on the Cyperus Enterprise website.
            </Text>
             <Text style={footerText}>
              © {new Date().getFullYear()} Cyperus Enterprise. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DistributorInquiryEmail;

// Styles
const main = {
  backgroundColor: '#f4f4f7',
  fontFamily: 'Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 40px 48px',
  marginBottom: '64px',
  border: '1px solid #e6e6e6',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const header = {
  padding: '20px 0',
  textAlign: 'center' as const,
  borderBottom: '1px solid #e6e6e6',
};

const logo = {
    color: '#4A651F',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
};

const heading = {
  color: '#333333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const paragraph = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'center' as const,
  padding: '0 20px',
};

const section = {
  padding: '10px 0',
};

const subheading = {
  color: '#4A651F',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 15px 0',
};

const field = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 10px 0',
};

const link = {
    color: '#4A651F',
    textDecoration: 'underline',
}

const hr = {
  borderColor: '#cccccc',
  margin: '28px 0',
};

const footer = {
  padding: '20px 0 0 0',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#888888',
  fontSize: '12px',
  lineHeight: '18px',
};
