'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  ArrowLeft,
  Download,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface OrderTrackingEvent {
  id: string;
  status: string;
  description: string;
  location?: string;
  timestamp: string;
  completed: boolean;
}

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
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  estimated_delivery: string;
  tracking_events: OrderTrackingEvent[];
  courier_info?: {
    company: string;
    tracking_number: string;
    contact_phone: string;
  };
}

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderId = params.id as string;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(price).replace('GHS', 'GH₵');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500';
      case 'shipped':
        return 'text-blue-500';
      case 'processing':
        return 'text-yellow-500';
      case 'confirmed':
        return 'text-[#EFE554]';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <Clock className="w-5 h-5 text-[#EFE554]" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'pending':
        return 10;
      case 'confirmed':
        return 25;
      case 'processing':
        return 50;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
      case 'cancelled':
        return 0;
      default:
        return 0;
    }
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        router.push('/');
        return;
      }

      try {
        // TODO: Fetch order details from mock order service
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
          payment_method: 'paystack',
          payment_reference: 'PAY_123456789',
          status: 'shipped',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          estimated_delivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
          tracking_events: [
            {
              id: '1',
              status: 'confirmed',
              description: 'Order confirmed and payment received',
              location: 'Cyperus Warehouse',
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              completed: true
            },
            {
              id: '2',
              status: 'processing',
              description: 'Order is being prepared for shipment',
              location: 'Cyperus Warehouse',
              timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
              completed: true
            },
            {
              id: '3',
              status: 'shipped',
              description: 'Package has been shipped and is in transit',
              location: 'Accra Distribution Center',
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              completed: true
            },
            {
              id: '4',
              status: 'out_for_delivery',
              description: 'Package is out for delivery',
              location: 'Local Delivery Hub',
              timestamp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false
            },
            {
              id: '5',
              status: 'delivered',
              description: 'Package delivered to customer',
              location: 'Customer Address',
              timestamp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false
            }
          ],
          courier_info: {
            company: 'Ghana Post GPS',
            tracking_number: 'GP123456789GH',
            contact_phone: '+233 302 123 456'
          }
        };

        setOrder(mockOrder);

      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#EFE554] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Package className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <p className="text-gray-400 mb-6">The order you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#EFE554] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Track Order</h1>
              <p className="text-gray-400">
                Order ID: <span className="text-[#EFE554] font-mono">{order.id}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className={`font-semibold capitalize ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Delivery Progress</h2>
            <span className="text-sm text-gray-400">
              {getProgressPercentage(order.status)}% Complete
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#EFE554] to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage(order.status)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-4">
              {['confirmed', 'processing', 'shipped', 'delivered'].map((status, index) => (
                <div key={status} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 ${
                    getProgressPercentage(order.status) > index * 25
                      ? 'border-[#EFE554] bg-[#EFE554] text-black'
                      : 'border-gray-600 bg-gray-800 text-gray-400'
                  }`}>
                    {getProgressPercentage(order.status) > index * 25 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 capitalize">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        {order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div className="bg-gradient-to-r from-blue-900/20 to-[#EFE554]/20 border border-blue-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-semibold text-blue-400">Estimated Delivery</h3>
                <p className="text-gray-300">{formatDate(order.estimated_delivery)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Courier Information */}
        {order.courier_info && order.status === 'shipped' && (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#EFE554]" />
              Courier Information
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Courier Company</p>
                <p className="font-medium">{order.courier_info.company}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Tracking Number</p>
                <p className="font-mono text-sm">{order.courier_info.tracking_number}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Contact</p>
                <p className="font-medium">{order.courier_info.contact_phone}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-semibold mb-6">Tracking Timeline</h2>
              
              <div className="space-y-6">
                {order.tracking_events.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        event.completed
                          ? 'border-[#EFE554] bg-[#EFE554] text-black'
                          : 'border-gray-600 bg-gray-800 text-gray-400'
                      }`}>
                        {event.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      
                      {index < order.tracking_events.length - 1 && (
                        <div className={`w-0.5 h-16 mt-2 ${
                          event.completed ? 'bg-[#EFE554]' : 'bg-gray-700'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${
                          event.completed ? 'text-white' : 'text-gray-400'
                        }`}>
                          {event.description}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{formatDate(event.timestamp)}</span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Qty: {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EFE554]" />
                Delivery Address
              </h2>
              
              <div className="text-sm text-gray-300 space-y-1">
                <p className="font-medium text-white">{order.shipping_address.fullName}</p>
                <p>{order.shipping_address.address}</p>
                <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                {order.shipping_address.postalCode && (
                  <p>{order.shipping_address.postalCode}</p>
                )}
                <div className="flex items-center gap-1 pt-2">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span>{order.shipping_address.phone}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{order.shipping_fee === 0 ? 'Free' : formatPrice(order.shipping_fee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VAT</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="border-t border-gray-700 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-[#EFE554]">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full bg-[#EFE554] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#dbd348] transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Invoice
              </button>
              
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700">
                  Contact Support
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
