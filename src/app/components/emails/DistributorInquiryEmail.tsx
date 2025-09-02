import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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

const DistributorInquiryEmail = ({ formData }: DistributorInquiryEmailProps) => (
  <Html>
    <Head />
    <Preview>New International Distributor Inquiry from {formData.companyName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>🌍 New International Distributor Inquiry</Heading>
        <Text style={paragraph}>You have received a new inquiry from the international distributors form on your website.</Text>
        
        <Section style={section}>
          <Heading as="h2" style={subheading}>Basic Information</Heading>
          <Text style={field}><strong>Full Name:</strong> {formData.fullName}</Text>
          <Text style={field}><strong>Company Name:</strong> {formData.companyName}</Text>
          <Text style={field}><strong>Country & City:</strong> {formData.countryCity}</Text>
          <Text style={field}><strong>Email Address:</strong> {formData.email}</Text>
          <Text style={field}><strong>Phone Number:</strong> {formData.phone}</Text>
        </Section>
        
        <Hr style={hr} />

        <Section style={section}>
          <Heading as="h2" style={subheading}>Business Details</Heading>
          <Text style={field}><strong>Type of Business:</strong> {formData.businessType}</Text>
          <Text style={field}><strong>Years in Business:</strong> {formData.businessYears}</Text>
          <Text style={field}><strong>Distributes Food/Beverage?:</strong> {formData.currentlyDistributing}</Text>
          {formData.currentBrands && <Text style={field}><strong>Current Brands:</strong> {formData.currentBrands}</Text>}
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Heading as="h2" style={subheading}>Interest in Cyperus Products</Heading>
          <Text style={field}><strong>Interested Products:</strong> {formData.interestedProducts.join(', ')}</Text>
          <Text style={field}><strong>Estimated Monthly Quantity:</strong> {formData.monthlyQuantity || 'Not provided'}</Text>
          <Text style={field}><strong>Packaging Preference:</strong> {formData.packagingPreference}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Heading as="h2" style={subheading}>Shipping & Logistics</Heading>
          <Text style={field}><strong>Import Experience:</strong> {formData.importExperience}</Text>
          <Text style={field}><strong>Preferred Shipping Method:</strong> {formData.shippingMethod || 'Not provided'}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>This email was sent from the Cyperus Enterprise website.</Text>
      </Container>
    </Body>
  </Html>
);

export default DistributorInquiryEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '32px',
  textAlign: 'center' as const,
  color: '#333',
};

const subheading = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#4A651F',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  color: '#555',
  padding: '0 20px',
};

const section = {
    padding: '0 20px',
}

const field = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#555',
    marginBottom: '8px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};
