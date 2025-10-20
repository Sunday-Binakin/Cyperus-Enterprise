'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/store/cartHooks';
import type { PaymentData } from '@/app/lib/paystack-service';
import { usePricing } from '@/hooks/usePricing';
import { useShippingAddress } from '@/hooks/useShippingAddress';
import { usePayment } from '@/hooks/usePayment';
import { useCheckoutOrder } from '@/hooks/useCheckoutOrder';
import { getOrderService } from '@/services/orderService';
import {
  CheckoutHeader,
  OrderSummary,
  PaymentMethodSection,
  ShippingAddressForm
} from '@/components/features/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [emailForReceipt, setEmailForReceipt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Custom hooks for business logic
  const { subtotal, shippingFee, tax, total, formatPrice } = usePricing(
    items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  );

  const {
    shippingAddress,
    savedAddresses,
    selectedAddressIndex,
    showNewAddressForm,
    handleAddressChange,
    selectSavedAddress,
    toggleNewAddressForm,
    validateAddress
  } = useShippingAddress();

  const { processPayment } = usePayment();
  const { createOrder } = useCheckoutOrder();

  // Load Paystack script on mount
  useEffect(() => {
    const preloadPaystackScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
      if (existingScript) return;

      // Create and load the script early
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ Paystack script preloaded');
      };
      script.onerror = () => {
        console.error('❌ Failed to preload Paystack script');
      };
      document.head.appendChild(script);
    };

    preloadPaystackScript();
  }, []);

  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      router.push('/cart');
    }
  }, [items.length, router]);

  const validateForm = () => {
    if (!emailForReceipt.trim()) {
      toast.error('Please enter your email for receipt');
      return false;
    }

    return validateAddress();
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Create order first
      const orderId = await createOrder(
        items,
        shippingAddress,
        emailForReceipt,
        total,
        shippingFee,
        tax
      );

      // Prepare payment data
      const paymentData: PaymentData = {
        email: emailForReceipt,
        amount: total,
        currency: 'GHS',
        reference: `order_${orderId}_${Date.now()}`,
        firstname: shippingAddress.full_name.split(' ')[0],
        lastname: shippingAddress.full_name.split(' ').slice(1).join(' '),
        phone: shippingAddress.phone,
        metadata: {
          order_id: orderId,
          customer_name: shippingAddress.full_name,
          shipping_address: JSON.stringify(shippingAddress)
        },
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
      };

      // Process payment
      await processPayment(paymentData);

      // Update order status and send confirmation
      try {
        const orderService = getOrderService();
        await orderService.updatePaymentStatus(orderId, 'paid', paymentData.reference, 'paystack');
        await orderService.sendOrderConfirmation(orderId);
      } catch (e) {
        console.warn('Post-payment updates failed:', e);
      }

      // Clear cart on successful payment
      clearCart();

      // Redirect to success page
      router.push(`/order-success?order_id=${orderId}&reference=${paymentData.reference}&payment_method=paystack`);

    } catch (error: unknown) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#EFE554] mx-auto mb-4"></div>
          <p className="text-white">Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <CheckoutHeader step="checkout" />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <ShippingAddressForm
              emailForReceipt={emailForReceipt}
              onEmailChange={setEmailForReceipt}
              savedAddresses={savedAddresses}
              selectedAddressIndex={selectedAddressIndex}
              onSelectAddress={selectSavedAddress}
              showNewAddressForm={showNewAddressForm}
              onToggleNewAddressForm={toggleNewAddressForm}
              shippingAddress={shippingAddress}
              onAddressChange={handleAddressChange}
            />

            <PaymentMethodSection />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shippingFee={shippingFee}
              tax={tax}
              total={total}
              formatPrice={formatPrice}
            />

            {/* Security Badge */}
            <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>SSL secured payment</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="w-full bg-[#EFE554] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#dbd348] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order - ${formatPrice(total)}`
                )}
              </button>

              <button
                onClick={() => router.push('/cart')}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
