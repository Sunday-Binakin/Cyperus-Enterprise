import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/app/components/emails/OrderConfirmationEmail';
import { Order } from '@/app/lib/mock-order-service';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(order: Order) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Cyperus Enterprise <noreply@cyperus.com>',
      to: [order.customer_email || ''],
      subject: `Your Cyperus Order #${order.order_number} is Confirmed!`,
      react: OrderConfirmationEmail({ order }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}
