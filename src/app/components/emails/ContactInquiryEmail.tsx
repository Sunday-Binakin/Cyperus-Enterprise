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

interface ContactInquiryEmailProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;
  };
}

const ContactInquiryEmail = ({ formData }: ContactInquiryEmailProps) => {
  const { name, email, subject, phone, message } = formData;
  const previewText = `New Contact Form Submission: ${subject}`;
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
          
          <Heading style={heading}>New Contact Inquiry</Heading>
          
          <Text style={paragraph}>
            You&apos;ve received a new message from your website&apos;s contact form.
          </Text>

          <Hr style={hr} />

          <Section style={detailsSection}>
            <Text style={detailsTitle}>Submission Details:</Text>
            <Text style={field}><strong>From:</strong> {name}</Text>
            <Text style={field}><strong>Email:</strong> <Link href={`mailto:${email}`} style={link}>{email}</Link></Text>
            <Text style={field}><strong>Phone:</strong> {phone}</Text>
            <Text style={field}><strong>Subject:</strong> {subject}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={messageSection}>
            <Heading as="h2" style={subheading}>Message</Heading>
            <Text style={messageText}>
              {message.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the contact form on the Cyperus Enterprise website. 
              You can reply directly to this email to respond to {name}.
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

export default ContactInquiryEmail;

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
};

const detailsSection = {
  padding: '10px 0',
};

const detailsTitle = {
    color: '#333333',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
}

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

const messageSection = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #e6e6e6',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '20px',
};

const subheading = {
  color: '#333333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
};

const messageText = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '24px',
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
};

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
