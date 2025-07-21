import { NextRequest, NextResponse } from 'next/server';
import { paystackService } from '@/app/lib/paystack';
import { orderService } from '@/app/lib/orderService';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      console.error('Missing Paystack signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Validate webhook signature
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error('Missing Paystack secret key');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      console.error('Invalid Paystack signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    console.log('Received Paystack webhook:', event.event);

    // Handle different webhook events
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(event.data);
        break;
      
      case 'charge.failed':
        await handleChargeFailed(event.data);
        break;
      
      case 'invoice.create':
        console.log('Invoice created:', event.data.id);
        break;
      
      case 'invoice.update':
        console.log('Invoice updated:', event.data.id);
        break;
      
      case 'subscription.create':
        console.log('Subscription created:', event.data.id);
        break;
      
      default:
        console.log('Unhandled Paystack event:', event.event);
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

async function handleChargeSuccess(data: any) {
  try {
    console.log('Processing successful charge:', data.reference);

    const orderId = data.metadata?.order_id;
    if (!orderId) {
      console.error('No order ID found in payment metadata');
      return;
    }

    // Verify the transaction with Paystack
    const verification = await paystackService.verifyTransaction(data.reference);
    
    if (!verification.status || verification.data.status !== 'success') {
      console.error('Transaction verification failed:', verification);
      return;
    }

    // Update order payment status
    await orderService.updatePaymentStatus(orderId, 'paid', data.reference);
    
    // Update order status to confirmed
    await orderService.updateOrderStatus(orderId, 'confirmed', 'Payment confirmed via Paystack');

    // Send confirmation email
    try {
      await orderService.sendOrderConfirmationEmail(orderId);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the webhook for email errors
    }

    // Notify admin (you can implement this via Discord/Slack webhook)
    try {
      await notifyAdminOfNewOrder(orderId, data);
    } catch (notifyError) {
      console.error('Failed to notify admin:', notifyError);
      // Don't fail the webhook for notification errors
    }

    console.log('Successfully processed payment for order:', orderId);

  } catch (error) {
    console.error('Error handling charge success:', error);
    throw error;
  }
}

async function handleChargeFailed(data: any) {
  try {
    console.log('Processing failed charge:', data.reference);

    const orderId = data.metadata?.order_id;
    if (!orderId) {
      console.error('No order ID found in payment metadata');
      return;
    }

    // Update order payment status
    await orderService.updatePaymentStatus(orderId, 'failed', data.reference);
    
    // Add tracking event
    await orderService.addTrackingEvent(
      orderId, 
      'payment_failed', 
      'Payment failed. Customer will be notified to retry.',
      undefined,
      data.gateway_response
    );

    // Send payment failure notification
    try {
      await sendPaymentFailureNotification(orderId, data);
    } catch (emailError) {
      console.error('Failed to send payment failure notification:', emailError);
    }

    console.log('Successfully processed failed payment for order:', orderId);

  } catch (error) {
    console.error('Error handling charge failed:', error);
    throw error;
  }
}

async function notifyAdminOfNewOrder(orderId: string, paymentData: any) {
  try {
    // Example: Send to Discord webhook
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl) {
      const embed = {
        title: '🎉 New Order Received!',
        color: 0x00ff00, // Green
        fields: [
          {
            name: 'Order ID',
            value: orderId,
            inline: true
          },
          {
            name: 'Amount',
            value: `GH₵${(paymentData.amount / 100).toFixed(2)}`,
            inline: true
          },
          {
            name: 'Customer Email',
            value: paymentData.customer.email,
            inline: true
          },
          {
            name: 'Payment Reference',
            value: paymentData.reference,
            inline: false
          }
        ],
        timestamp: new Date().toISOString()
      };

      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });
    }

    // Example: Send to Slack webhook
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: `🎉 New order received: ${orderId} - GH₵${(paymentData.amount / 100).toFixed(2)} from ${paymentData.customer.email}`
        })
      });
    }

  } catch (error) {
    console.error('Error notifying admin:', error);
    throw error;
  }
}

async function sendPaymentFailureNotification(orderId: string, paymentData: any) {
  try {
    // TODO: Implement with Supabase Edge Functions or email service
    console.log('Would send payment failure notification for order:', orderId);
    
    // You can implement this with:
    // 1. Supabase Edge Functions
    // 2. SendGrid/Mailgun
    // 3. Your preferred email service
    
  } catch (error) {
    console.error('Error sending payment failure notification:', error);
    throw error;
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'Paystack webhook endpoint' });
}
