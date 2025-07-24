'use client';

import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { orderService, CreateOrderData } from '@/app/lib/orderService';
import { initializePaystackPayment as paystackPayment, loadPaystackScript } from '@/app/lib/paystack';

interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
}



export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'cash'>('paystack');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    full_name: user?.user_metadata?.full_name || '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Ghana'
  });

  const subtotal = getTotalPrice();
  const shippingFee = subtotal > 100 ? 0 : 15; // Free shipping over GH₵100
  const tax = subtotal * 0.025; // 2.5% VAT
  const total = subtotal + shippingFee + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(price).replace('GHS', 'GH₵');
  };

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  // Load saved addresses (mock data for now - will integrate with Supabase)
  useEffect(() => {
    if (user) {
      // TODO: Fetch saved addresses from Supabase
      const mockAddresses: ShippingAddress[] = [
        {
          full_name: user.user_metadata?.full_name || 'John Doe',
          phone: '+233 123 456 789',
          address_line_1: '123 Independence Avenue',
          city: 'Accra',
          state: 'Greater Accra',
          postal_code: 'GA-123-4567',
          country: 'Ghana'
        }
      ];
      setSavedAddresses(mockAddresses);
      if (mockAddresses.length > 0) {
        setShippingAddress(mockAddresses[0]);
      }
    }
  }, [user]);

  const validateForm = () => {
    const requiredFields = ['full_name', 'phone', 'address_line_1', 'city', 'state'];
    const missingFields = requiredFields.filter(field => 
      !shippingAddress[field as keyof ShippingAddress]?.trim()
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ').replace(/_/g, ' ')}`);
      return false;
    }

    return true;
  };

  const createOrder = async () => {
    try {
      const orderData: CreateOrderData = {
        user_id: user?.id || undefined,
        session_id: !user ? crypto.randomUUID() : undefined,
        items: items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          product_image: item.image,
          price: item.price,
          quantity: item.quantity,
          variant_info: item.variant ? { variant: item.variant } : undefined
        })),
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        subtotal,
        shipping_fee: shippingFee,
        tax,
        estimated_delivery_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
      };

      const order = await orderService.createOrder(orderData);
      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handlePaystackPayment = async (orderId: string) => {
    // Load Paystack script if not already loaded
    await loadPaystackScript();

    return paystackPayment({
      email: user?.email || shippingAddress.phone + '@temp.com',
      amount: total,
      metadata: {
        order_id: orderId,
        customer_name: shippingAddress.full_name,
        customer_phone: shippingAddress.phone,
      },
      onSuccess: (response: unknown) => {
        console.log('Payment successful:', response);
      },
      onCancel: () => {
        console.log('Payment cancelled');
      }
    });
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Create order first
      const orderId = await createOrder();

      if (paymentMethod === 'paystack') {
        // Initialize Paystack payment
        const paymentResponse = await handlePaystackPayment(orderId);
        
        if (paymentResponse && typeof paymentResponse === 'object' && 'status' in paymentResponse && paymentResponse.status === 'success') {
          // Clear cart on successful payment
          clearCart();
          
          // Redirect to success page
          const reference = (typeof paymentResponse === 'object' && 'reference' in paymentResponse) ? paymentResponse.reference : 'unknown';
          router.push(`/order-success?order_id=${orderId}&reference=${reference}`);
        } else {
          const message = (typeof paymentResponse === 'object' && paymentResponse && 'message' in paymentResponse && typeof paymentResponse.message === 'string') 
            ? paymentResponse.message 
            : 'Payment failed';
          throw new Error(message);
        }
      } else {
        // Cash on delivery
        clearCart();
        router.push(`/order-success?order_id=${orderId}&payment_method=cash`);
      }

    } catch (error: unknown) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#EFE554]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Cart</span>
            <span>→</span>
            <span className="text-[#EFE554]">Checkout</span>
            <span>→</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="w-5 h-5 text-[#EFE554]" />
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>

              {user && savedAddresses.length > 0 && !showNewAddressForm ? (
                <div className="space-y-4">
                  {savedAddresses.map((address, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAddressIndex === index
                          ? 'border-[#EFE554] bg-gray-800'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedAddressIndex(index);
                        setShippingAddress(address);
                      }}
                    >
                      <div className="font-medium">{address.full_name}</div>
                      <div className="text-sm text-gray-400">
                        {address.address_line_1}, {address.city}, {address.state}
                      </div>
                      <div className="text-sm text-gray-400">{address.phone}</div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="text-[#EFE554] hover:text-[#dbd348] transition-colors"
                  >
                    + Add new address
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={shippingAddress.full_name}
                    onChange={(e) => handleAddressChange('full_name', e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={shippingAddress.phone}
                    onChange={(e) => handleAddressChange('phone', e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 1 *"
                    value={shippingAddress.address_line_1}
                    onChange={(e) => handleAddressChange('address_line_1', e.target.value)}
                    className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2 (Optional)"
                    value={shippingAddress.address_line_2}
                    onChange={(e) => handleAddressChange('address_line_2', e.target.value)}
                    className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    value={shippingAddress.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State *"
                    value={shippingAddress.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={shippingAddress.postal_code}
                    onChange={(e) => handleAddressChange('postal_code', e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
                  />
                  
                  {showNewAddressForm && (
                    <button
                      onClick={() => setShowNewAddressForm(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ← Back to saved addresses
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-[#EFE554]" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'paystack'
                      ? 'border-[#EFE554] bg-gray-800'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setPaymentMethod('paystack')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === 'paystack' ? 'border-[#EFE554] bg-[#EFE554]' : 'border-gray-600'
                    }`} />
                    <div>
                      <div className="font-medium">Pay with Card</div>
                      <div className="text-sm text-gray-400">Secure payment via Paystack</div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'cash'
                      ? 'border-[#EFE554] bg-gray-800'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === 'cash' ? 'border-[#EFE554] bg-[#EFE554]' : 'border-gray-600'
                    }`} />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-400">Pay when your order arrives</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Qty: {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VAT (2.5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-[#EFE554]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-3 bg-gray-800 rounded-lg">
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
    </div>
  );
}
