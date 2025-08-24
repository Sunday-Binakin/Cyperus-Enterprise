import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { mockOrderService } from '@/app/lib/mock-order-service';

interface PaystackWebhookData {
  id: number;
  amount: number;
  currency: string;
  reference: string;
  status: string;
  gateway_response: string;
  channel: string; // This contains the actual payment method used
  metadata?: {
    order_id?: string;
    [key: string]: string | undefined;
  };
  customer: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    customer_code: string;
    phone: string | null;
  };
  authorization?: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
  };
}

// Paystack webhook endpoint for payment verification
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');
    
    // Verify webhook signature
    const secret = process.env.PAYSTACK_SECRET_KEY || '';
    const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');
    
    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    
    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        // Payment was successful
        console.log('Payment successful:', event.data);
        await handleChargeSuccess(event.data);
        break;
        
      case 'charge.failed':
        // Payment failed
        console.log('Payment failed:', event.data);
        await handleChargeFailed(event.data);
        break;
        
      default:
        console.log('Unhandled event:', event.event);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}

async function handleChargeSuccess(data: PaystackWebhookData) {
  try {
    const orderId = data.metadata?.order_id;
    if (!orderId) {
      console.error('No order_id found in webhook metadata');
      return;
    }

    // Update payment status with the actual payment channel used
    await mockOrderService.updatePaymentStatus(orderId, 'paid', data.reference, data.channel);
    
    // Send confirmation email (this will now include the correct payment method)
    await mockOrderService.sendOrderConfirmationEmail(orderId);
    
    console.log(`Payment successful for order ${orderId}:`, {
      reference: data.reference,
      amount: data.amount,
      currency: data.currency,
      channel: data.channel, // This will be "mobile_money", "card", etc.
      customer_email: data.customer.email
    });

  } catch (error) {
    console.error('Error handling charge success:', error);
    throw error;
  }
}

async function handleChargeFailed(data: PaystackWebhookData) {
  try {
    const orderId = data.metadata?.order_id;
    if (!orderId) {
      console.error('No order_id found in webhook metadata');
      return;
    }

    // Update payment status with the payment channel that failed
    await mockOrderService.updatePaymentStatus(orderId, 'failed', data.reference, data.channel);
    
    console.log(`Payment failed for order ${orderId}:`, {
      reference: data.reference,
      reason: data.gateway_response,
      channel: data.channel,
      customer_email: data.customer.email
    });

  } catch (error) {
    console.error('Error handling charge failure:', error);
    throw error;
  }
}