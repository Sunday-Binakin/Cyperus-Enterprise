'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Download, Package, Truck, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  tax: number;
  total: number;
  shipping_address: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  payment_method: string;
  payment_reference?: string;
  status: string;
  created_at: string;
  estimated_delivery: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const orderId = searchParams.get('order_id');
  const paymentReference = searchParams.get('reference');
  const paymentMethod = searchParams.get('payment_method');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(price).replace('GHS', 'GH₵');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Celebration animation
  const triggerCelebration = () => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Second burst after delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
    }, 250);

    // Third burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });
    }, 400);
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        router.push('/');
        return;
      }

      try {
        // TODO: Replace with actual Supabase query
        // For now, we'll create mock order data
        const mockOrder: Order = {
          id: orderId,
          items: [
            {
              id: '1',
              name: 'Premium Wireless Headphones',
              price: 299.99,
              quantity: 1,
              image: '/products/headphones.jpg'
            },
            {
              id: '2',
              name: 'Smart Watch Pro',
              price: 599.99,
              quantity: 1,
              image: '/products/smartwatch.jpg'
            }
          ],
          subtotal: 899.98,
          shipping_fee: 0,
          tax: 22.50,
          total: 922.48,
          shipping_address: {
            fullName: 'John Doe',
            phone: '+233 123 456 789',
            address: '123 Independence Avenue',
            city: 'Accra',
            state: 'Greater Accra',
            postalCode: 'GA-123-4567'
          },
          payment_method: paymentMethod || 'paystack',
          payment_reference: paymentReference || undefined,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
        };

        setOrder(mockOrder);

        // Send confirmation email (TODO: implement with Supabase Edge Functions)
        // await sendOrderConfirmationEmail(mockOrder);

        // Notify admin (TODO: implement webhook)
        // await notifyAdminOfNewOrder(mockOrder);

        // Trigger celebration
        setTimeout(triggerCelebration, 500);

      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, paymentReference, paymentMethod, router]);

  const downloadReceipt = async () => {
    if (!order) return;

    setIsDownloading(true);
    try {
      // TODO: Generate PDF receipt using Supabase Edge Functions
      // For now, we'll create a simple receipt view
      const receiptWindow = window.open('', '_blank');
      if (receiptWindow) {
        receiptWindow.document.write(`
          <html>
            <head>
              <title>Receipt - Order ${order.id}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; }
                .order-details { margin: 20px 0; }
                .items { margin: 20px 0; }
                .total { border-top: 2px solid #000; padding-top: 20px; text-align: right; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>CYPERUS</h1>
                <h2>Order Receipt</h2>
                <p>Order ID: ${order.id}</p>
                <p>Date: ${formatDate(order.created_at)}</p>
              </div>
              
              <div class="order-details">
                <h3>Shipping Address:</h3>
                <p>${order.shipping_address.fullName}</p>
                <p>${order.shipping_address.address}</p>
                <p>${order.shipping_address.city}, ${order.shipping_address.state}</p>
                <p>Phone: ${order.shipping_address.phone}</p>
              </div>

              <div class="items">
                <h3>Items Ordered:</h3>
                ${order.items.map(item => `
                  <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>${formatPrice(item.price * item.quantity)}</span>
                  </div>
                `).join('')}
              </div>

              <div class="total">
                <p>Subtotal: ${formatPrice(order.subtotal)}</p>
                <p>Shipping: ${order.shipping_fee === 0 ? 'Free' : formatPrice(order.shipping_fee)}</p>
                <p>VAT: ${formatPrice(order.tax)}</p>
                <h3>Total: ${formatPrice(order.total)}</h3>
              </div>
            </body>
          </html>
        `);
        receiptWindow.document.close();
        receiptWindow.print();
      }
    } catch (error) {
      console.error('Error generating receipt:', error);
      toast.error('Failed to generate receipt');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#EFE554] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/" className="text-[#EFE554] hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto animate-pulse" />
            <Sparkles className="w-8 h-8 text-[#EFE554] absolute -top-2 -right-2 animate-bounce" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-[#EFE554] bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Thank you for your purchase, {order.shipping_address.fullName}!
          </p>
          
          <p className="text-gray-400">
            Order ID: <span className="text-[#EFE554] font-mono">{order.id}</span>
          </p>
        </div>

        {/* Order Status & ETA */}
        <div className="bg-gradient-to-r from-green-900/20 to-[#EFE554]/20 border border-green-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-semibold text-green-400">Order Confirmed</h3>
                <p className="text-sm text-gray-400">Your order has been successfully placed</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-[#EFE554]" />
              <div>
                <h3 className="font-semibold text-[#EFE554]">Estimated Delivery</h3>
                <p className="text-sm text-gray-400">{formatDate(order.estimated_delivery)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Items Ordered */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#EFE554]" />
                Items Ordered
              </h2>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Quantity: {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#EFE554]" />
                Shipping Address
              </h2>
              
              <div className="text-gray-300 space-y-1">
                <p className="font-medium">{order.shipping_address.fullName}</p>
                <p>{order.shipping_address.address}</p>
                <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                {order.shipping_address.postalCode && (
                  <p>{order.shipping_address.postalCode}</p>
                )}
                <p>Phone: {order.shipping_address.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{order.shipping_fee === 0 ? 'Free' : formatPrice(order.shipping_fee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VAT (2.5%)</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Paid</span>
                    <span className="text-[#EFE554]">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="capitalize">
                    {order.payment_method === 'paystack' ? 'Card Payment' : 'Cash on Delivery'}
                  </span>
                </div>
                {order.payment_reference && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Reference</span>
                    <span className="font-mono text-xs">{order.payment_reference}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={downloadReceipt}
                disabled={isDownloading}
                className="w-full bg-[#EFE554] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#dbd348] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-black"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </>
                )}
              </button>

              <Link
                href={`/orders/${order.id}`}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Track Order
              </Link>

              <Link
                href="/"
                className="w-full bg-transparent text-[#EFE554] py-3 px-6 rounded-lg font-medium hover:bg-[#EFE554]/10 transition-colors border border-[#EFE554] flex items-center justify-center gap-2"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* What's Next */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#EFE554] rounded-full mt-2 flex-shrink-0"></div>
                  <p>You'll receive an email confirmation shortly</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#EFE554] rounded-full mt-2 flex-shrink-0"></div>
                  <p>We'll notify you when your order ships</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#EFE554] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Track your package using the order ID above</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
