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

interface ContactInquiryEmailProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;
  };
}

const ContactInquiryEmail = ({ formData }: ContactInquiryEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission: {formData.subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>📬 New Contact Form Submission</Heading>
        <Text style={paragraph}>You have received a new message from the contact form on your website.</Text>
        
        <Hr style={hr} />

        <Section style={section}>
          <Text style={field}><strong>From:</strong> {formData.name}</Text>
          <Text style={field}><strong>Email:</strong> {formData.email}</Text>
          <Text style={field}><strong>Phone:</strong> {formData.phone}</Text>
          <Text style={field}><strong>Subject:</strong> {formData.subject}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={section}>
            <Heading as="h2" style={subheading}>Message</Heading>
            <Text style={message}>{formData.message}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>This email was sent from the Cyperus Enterprise website contact form.</Text>
      </Container>
    </Body>
  </Html>
);

export default ContactInquiryEmail;

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
    marginTop: '0px',
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

const message = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#555',
    whiteSpace: 'pre-wrap' as const,
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
