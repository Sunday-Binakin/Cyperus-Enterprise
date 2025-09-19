import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Section,
  Row,
  Column,
  Hr,
} from '@react-email/components';
import { Order } from '@/app/lib/mock-order-service';

interface OrderConfirmationEmailProps {
  order: Order;
}

const companyName = "Cyperus Enterprise";
const companyUrl = "https://cyperus-enterprise.vercel.app/"; 

export const OrderConfirmationEmail = ({ order }: OrderConfirmationEmailProps) => {
  const previewText = `Your ${companyName} Order #${order.order_number}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading as="h1" style={logo}>{companyName}</Heading>
          </Section>

          <Heading style={heading}>Thank you for your order!</Heading>
          
          <Text style={paragraph}>
            Hi {order.shipping_address.full_name},
          </Text>
          <Text style={paragraph}>
            We&apos;ve received your order and are getting it ready for shipment. We will notify you once it has been sent. You can view your order summary below.
          </Text>

          <Section style={buttonContainer}>
            <Link href={`${companyUrl}/orders/${order.id}`} style={button}>
              View Your Order
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>Order Summary</Heading>
            <Text style={field}><strong>Order Number:</strong> {order.order_number}</Text>
            <Text style={field}><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</Text>
            <Text style={field}><strong>Payment Method:</strong> {order.payment_channel || order.payment_method}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>Items Ordered</Heading>
            {order.items.map((item) => (
              <Row key={item.product_id} style={itemRow}>
                <Column style={{ paddingRight: '15px' }}>
                  {/* Using a placeholder image as the original one might not be accessible */}
                  <Img src={item.product_image} width="64" height="64" alt={item.product_name} style={itemImage} />
                </Column>
                <Column>
                  <Text style={itemName}>{item.product_name}</Text>
                  <Text style={itemDetails}>Quantity: {item.quantity}</Text>
                </Column>
                <Column align="right" style={itemPrice}>
                  GH₵{item.price.toFixed(2)}
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>GH₵{(order.total_amount - order.shipping_fee - order.tax_amount).toFixed(2)}</Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Shipping</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>GH₵{order.shipping_fee.toFixed(2)}</Text>
              </Column>
            </Row>
             <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Tax</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>GH₵{order.tax_amount.toFixed(2)}</Text>
              </Column>
            </Row>
            <Hr style={hrLight} />
            <Row style={totalRow}>
              <Column>
                <Text style={totalMainLabel}><strong>Total</strong></Text>
              </Column>
              <Column align="right">
                <Text style={totalMainValue}><strong>GH₵{order.total_amount.toFixed(2)}</strong></Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>Shipping Address</Heading>
            <Text style={address}>
              {order.shipping_address.full_name}<br />
              {order.shipping_address.address_line_1}<br />
              {order.shipping_address.address_line_2 ? `${order.shipping_address.address_line_2}<br />` : ''}
              {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}<br />
              {order.shipping_address.country}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions, please reply to this email.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

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
  textAlign: 'left' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#4A651F',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '14px 20px',
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

const hr = {
  borderColor: '#cccccc',
  margin: '28px 0',
};

const hrLight = {
  borderColor: '#e6e6e6',
  margin: '15px 0',
};

const itemRow = {
  width: '100%',
  marginBottom: '15px',
};

const itemImage = {
  borderRadius: '4px',
  border: '1px solid #eaeaea',
};

const itemName = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
};

const itemDetails = {
  fontSize: '14px',
  color: '#777',
};

const itemPrice = {
  fontSize: '16px',
  color: '#555',
  fontWeight: 'bold' as const,
};

const totalRow = {
  width: '100%',
  margin: '2px 0',
};

const totalLabel = {
  fontSize: '16px',
  color: '#555',
};

const totalValue = {
  fontSize: '16px',
  color: '#555',
};

const totalMainLabel = {
  fontSize: '18px',
  color: '#333',
  fontWeight: 'bold' as const,
};

const totalMainValue = {
  fontSize: '18px',
  color: '#333',
  fontWeight: 'bold' as const,
};

const address = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#555',
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
