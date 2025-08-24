import { NextRequest, NextResponse } from 'next/server';
import { mockOrderService } from '@/app/lib/mock-order-service';

interface MockPaymentCustomer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: Record<string, unknown>;
  risk_action: string;
}

interface MockPaymentMetadata {
  order_id: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface MockChargeData {
  id: number;
  amount: number;
  currency: string;
  reference: string;
  status: string;
  gateway_response: string;
  channel: string;
  metadata: MockPaymentMetadata;
  customer: MockPaymentCustomer;
  authorization: {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    
    // For mock implementation, we'll skip signature validation
    // In a real app, you'd validate the webhook signature

    const event = JSON.parse(body);
    console.log('Received mock payment webhook:', event.event);

    // Handle different webhook events
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(event.data);
        break;
      
      case 'charge.failed':
        await handleChargeFailed(event.data);
        break;
      
      case 'transfer.success':
        await handleTransferSuccess(event.data);
        break;
      
      case 'transfer.failed':
        await handleTransferFailed(event.data);
        break;
      
      default:
        console.log('Unhandled webhook event:', event.event);
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

async function handleChargeSuccess(data: MockChargeData) {
  try {
    console.log('Processing successful charge:', data.reference);
    
    const orderId = data.metadata.order_id;
    if (!orderId) {
      console.error('No order_id found in webhook metadata');
      return;
    }

    // Update payment status to paid with the actual payment channel
    await mockOrderService.updatePaymentStatus(orderId, 'paid', data.reference, data.channel);
    
    // Add tracking event
    await mockOrderService.addTrackingEvent(
      orderId, 
      'payment_confirmed', 
      `Payment confirmed via ${data.channel}. Reference: ${data.reference}`
    );
    
    // Log successful payment
    console.log(`Payment successful for order ${orderId}:`, {
      reference: data.reference,
      amount: data.amount,
      currency: data.currency,
      channel: data.channel,
      customer_email: data.customer.email
    });

  } catch (error) {
    console.error('Error handling charge success:', error);
    throw error;
  }
}

async function handleChargeFailed(data: MockChargeData) {
  try {
    console.log('Processing failed charge:', data.reference);
    
    const orderId = data.metadata.order_id;
    if (!orderId) {
      console.error('No order_id found in webhook metadata');
      return;
    }

    // Update payment status to failed with the payment channel
    await mockOrderService.updatePaymentStatus(orderId, 'failed', data.reference, data.channel);
    
    // Add tracking event
    await mockOrderService.addTrackingEvent(
      orderId, 
      'payment_failed', 
      `Payment failed: ${data.gateway_response}. Reference: ${data.reference}`
    );
    
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

async function handleTransferSuccess(data: MockChargeData) {
  try {
    console.log('Processing successful transfer:', data.reference);
    
    // Handle successful transfer (for refunds, settlements, etc.)
    console.log('Transfer successful:', {
      reference: data.reference,
      amount: data.amount,
      currency: data.currency
    });

  } catch (error) {
    console.error('Error handling transfer success:', error);
    throw error;
  }
}

async function handleTransferFailed(data: MockChargeData) {
  try {
    console.log('Processing failed transfer:', data.reference);
    
    // Handle failed transfer
    console.log('Transfer failed:', {
      reference: data.reference,
      reason: data.gateway_response
    });

  } catch (error) {
    console.error('Error handling transfer failure:', error);
    throw error;
  }
}

// Mock function to simulate order completion process
/* Commented out unused function
async function completeOrder(orderId: string) {
  try {
    // Update order status to confirmed/processing
    await mockOrderService.updateOrderStatus(orderId, 'processing', 'Payment confirmed, order is being processed');
    
    // Send confirmation email (mock)
    await mockOrderService.sendOrderConfirmationEmail(orderId);
    
    console.log(`Order ${orderId} marked as confirmed and processing`);

  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
}
*/

// Mock function to handle order cancellation
/* Commented out unused function
async function cancelOrder(orderId: string, reason: string) {
  try {
    // Update order status to cancelled
    await mockOrderService.updateOrderStatus(orderId, 'cancelled', reason);
    
    console.log(`Order ${orderId} cancelled: ${reason}`);

  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
}
*/

// Export additional utility functions for testing
// export { handleChargeSuccess, handleChargeFailed, completeOrder, cancelOrder };
