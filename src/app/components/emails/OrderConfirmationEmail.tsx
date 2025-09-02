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
} from '@react-email/components';
import { Order } from '@/app/lib/mock-order-service';

interface OrderConfirmationEmailProps {
  order: Order;
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const anchor = {
  color: '#556cd6',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '10px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

export const OrderConfirmationEmail = ({ order }: OrderConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Cyperus Enterprise Order #{order.order_number}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img src="https://www.cyperus.com/logo.png" width="150" height="50" alt="Cyperus Enterprise" />
          <Heading>Thanks for your order!</Heading>
          <Text style={paragraph}>
            Hi {order.shipping_address.full_name},
          </Text>
          <Text style={paragraph}>
            We've received your order and are getting it ready for you. You can view your order details below.
          </Text>
          <hr style={hr} />
          <Heading as="h2">Order Details</Heading>
          <Text style={paragraph}>
            <strong>Order Number:</strong> {order.order_number}
          </Text>
          <Text style={paragraph}>
            <strong>Payment Method:</strong> {order.payment_channel || order.payment_method}
          </Text>
          <hr style={hr} />
          {order.items.map((item) => (
            <Row key={item.product_id}>
              <Column>
                <Img src={item.product_image} width="64" height="64" alt={item.product_name} />
              </Column>
              <Column>
                <Text>{item.product_name}</Text>
                <Text>Qty: {item.quantity}</Text>
              </Column>
              <Column align="right">
                <Text>GH₵{item.price.toFixed(2)}</Text>
              </Column>
            </Row>
          ))}
          <hr style={hr} />
          <Row>
            <Column>
              <Text>Subtotal</Text>
              <Text>Shipping</Text>
              <Text>Tax</Text>
              <Text><strong>Total</strong></Text>
            </Column>
            <Column align="right">
              <Text>GH₵{(order.total_amount - order.shipping_fee - order.tax_amount).toFixed(2)}</Text>
              <Text>GH₵{order.shipping_fee.toFixed(2)}</Text>
              <Text>GH₵{order.tax_amount.toFixed(2)}</Text>
              <Text><strong>GH₵{order.total_amount.toFixed(2)}</strong></Text>
            </Column>
          </Row>
          <hr style={hr} />
          <Heading as="h2">Shipping Address</Heading>
          <Text style={paragraph}>
            {order.shipping_address.full_name}<br />
            {order.shipping_address.address_line_1}<br />
            {order.shipping_address.address_line_2 ? `${order.shipping_address.address_line_2}<br />` : ''}
            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}<br />
            {order.shipping_address.country}
          </Text>
          <hr style={hr} />
          <Link href={`https://www.cyperus.com/orders/${order.id}`} style={button}>
            View Your Order
          </Link>
          <hr style={hr} />
          <Text style={footer}>
            Cyperus Enterprise, Accra, Ghana
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OrderConfirmationEmail;
