// Mock Order Service for client-side order management

// Types
export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image?: string;
  price: number;
  quantity: number;
  variant_info?: Record<string, string | number | boolean | null>;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface PaymentWebhookEvent {
  event: string;
  data: {
    reference: string;
    metadata?: {
      order_id?: string;
      [key: string]: string | undefined;
    };
    [key: string]: unknown;
  };
}

export interface CreateOrderData {
  user_id?: string;
  session_id?: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  total_amount: number;
  shipping_fee: number;
  tax_amount?: number;
  discount_amount?: number;
  payment_method: 'card' | 'mobile_money' | 'bank_transfer' | 'paystack';
  notes?: string;
  customer_email?: string; // added
}

export interface TrackingEvent {
  id: string;
  order_id: string;
  status: string;
  description: string;
  location?: string;
  notes?: string;
  created_at: string;
}

export interface CourierInfo {
  id: string;
  order_id: string;
  courier_company: string;
  tracking_number: string;
  estimated_delivery?: string;
  actual_delivery?: string;
  pickup_date?: string;
  created_at: string;
}

export interface CustomerAddress {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id?: string;
  session_id?: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: 'card' | 'mobile_money' | 'bank_transfer' | 'paystack';
  payment_channel?: string; // Actual payment channel from Paystack (e.g., "mobile_money", "card", etc.)
  payment_reference?: string;
  total_amount: number;
  shipping_fee: number;
  tax_amount: number;
  discount_amount: number;
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  notes?: string;
  created_at: string;
  updated_at: string;
  delivered_at?: string;
  items: OrderItem[];
  tracking_events?: TrackingEvent[];
  courier_info?: CourierInfo | null;
  customer_email?: string; // added
}

// Mock storage for orders
class MockOrderStorage {
  private orders: Map<string, Order> = new Map();
  private addresses: Map<string, CustomerAddress[]> = new Map();
  private cartItems: Map<string, CartItem[]> = new Map();

  // Order operations
  saveOrder(order: Order) {
    this.orders.set(order.id, order);
  }

  getOrder(orderId: string): Order | undefined {
    return this.orders.get(orderId);
  }

  getUserOrders(userId: string): Order[] {
    return Array.from(this.orders.values())
      .filter(order => order.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  // Address operations
  getUserAddresses(userId: string): CustomerAddress[] {
    return this.addresses.get(userId) || [];
  }

  addUserAddress(userId: string, address: CustomerAddress) {
    const userAddresses = this.addresses.get(userId) || [];
    userAddresses.push(address);
    this.addresses.set(userId, userAddresses);
  }

  updateUserAddress(userId: string, addressId: string, updates: Partial<CustomerAddress>) {
    const userAddresses = this.addresses.get(userId) || [];
    const addressIndex = userAddresses.findIndex(addr => addr.id === addressId);
    if (addressIndex !== -1) {
      userAddresses[addressIndex] = { ...userAddresses[addressIndex], ...updates };
      this.addresses.set(userId, userAddresses);
    }
  }

  deleteUserAddress(userId: string, addressId: string) {
    const userAddresses = this.addresses.get(userId) || [];
    const filteredAddresses = userAddresses.filter(addr => addr.id !== addressId);
    this.addresses.set(userId, filteredAddresses);
  }

  // Cart operations
  getUserCart(userId: string): CartItem[] {
    return this.cartItems.get(userId) || [];
  }

  setUserCart(userId: string, items: CartItem[]) {
    this.cartItems.set(userId, items);
  }

  clearUserCart(userId: string) {
    this.cartItems.delete(userId);
  }
}

class MockOrderService {
  private storage: MockOrderStorage;

  constructor() {
    this.storage = new MockOrderStorage();
  }

  /**
   * Create a new order
   */
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    // Simulate API delay
    await this.delay(800);

    const orderId = this.generateOrderId();
    const orderNumber = this.generateOrderNumber();
    const timestamp = new Date().toISOString();

    const order: Order = {
      id: orderId,
      user_id: orderData.user_id,
      session_id: orderData.session_id,
      order_number: orderNumber,
      status: 'pending',
      payment_status: 'pending',
      payment_method: orderData.payment_method,
      total_amount: orderData.total_amount,
      shipping_fee: orderData.shipping_fee,
      tax_amount: orderData.tax_amount || 0,
      discount_amount: orderData.discount_amount || 0,
      shipping_address: orderData.shipping_address,
      billing_address: orderData.billing_address,
      notes: orderData.notes,
      created_at: timestamp,
      updated_at: timestamp,
      items: orderData.items.map(item => ({
        ...item,
        product_image: item.product_image || '/placeholder-product.jpg'
      })),
      tracking_events: [
        {
          id: this.generateId(),
          order_id: orderId,
          status: 'pending',
          description: 'Order placed and awaiting confirmation',
          created_at: timestamp
        }
      ],
      customer_email: orderData.customer_email,
    };

    this.storage.saveOrder(order);
    return order;
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId: string): Promise<Order | null> {
    await this.delay(200);
    return this.storage.getOrder(orderId) || null;
  }

  /**
   * Get orders for a user
   */
  async getUserOrders(userId: string, page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    await this.delay(300);

    const allUserOrders = this.storage.getUserOrders(userId);
    const total = allUserOrders.length;
    
    const offset = (page - 1) * limit;
    const orders = allUserOrders.slice(offset, offset + limit);

    return { orders, total };
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: Order['status'], notes?: string): Promise<void> {
    await this.delay(200);

    const order = this.storage.getOrder(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const timestamp = new Date().toISOString();
    
    // Update order
    const updatedOrder: Order = {
      ...order,
      status,
      updated_at: timestamp,
      ...(status === 'delivered' && { delivered_at: timestamp })
    };

    // Add tracking event
    const trackingEvent: TrackingEvent = {
      id: this.generateId(),
      order_id: orderId,
      status,
      description: `Order status updated to ${status}`,
      notes,
      created_at: timestamp
    };

    updatedOrder.tracking_events = [...(order.tracking_events || []), trackingEvent];
    this.storage.saveOrder(updatedOrder);
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    orderId: string, 
    paymentStatus: Order['payment_status'], 
    paymentReference?: string,
    paymentChannel?: string
  ): Promise<void> {
    await this.delay(200);

    const order = this.storage.getOrder(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const timestamp = new Date().toISOString();
    
    const updatedOrder: Order = {
      ...order,
      payment_status: paymentStatus,
      payment_reference: paymentReference,
      payment_channel: paymentChannel,
      updated_at: timestamp,
      ...(paymentStatus === 'paid' && { status: 'confirmed' })
    };

    if (paymentStatus === 'paid') {
      const trackingEvent: TrackingEvent = {
        id: this.generateId(),
        order_id: orderId,
        status: 'confirmed',
        description: `Payment confirmed via ${paymentChannel || 'paystack'}, order is being processed`,
        created_at: timestamp
      };

      updatedOrder.tracking_events = [...(order.tracking_events || []), trackingEvent];
    }

    this.storage.saveOrder(updatedOrder);
  }

  /**
   * Add tracking event
   */
  async addTrackingEvent(
    orderId: string, 
    status: string, 
    description: string, 
    location?: string,
    notes?: string
  ): Promise<void> {
    await this.delay(100);

    const order = this.storage.getOrder(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const trackingEvent: TrackingEvent = {
      id: this.generateId(),
      order_id: orderId,
      status,
      description,
      location,
      notes,
      created_at: new Date().toISOString()
    };

    const updatedOrder: Order = {
      ...order,
      tracking_events: [...(order.tracking_events || []), trackingEvent]
    };

    this.storage.saveOrder(updatedOrder);
  }

  /**
   * Add or update courier information
   */
  async updateCourierInfo(orderId: string, courierInfo: Omit<CourierInfo, 'id'>): Promise<void> {
    await this.delay(200);

    const order = this.storage.getOrder(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const newCourierInfo: CourierInfo = {
      id: this.generateId(),
      ...courierInfo,
      order_id: orderId,
      created_at: new Date().toISOString()
    };

    const updatedOrder: Order = {
      ...order,
      courier_info: newCourierInfo
    };

    this.storage.saveOrder(updatedOrder);
  }

  /**
   * Customer Address Management
   */
  async getCustomerAddresses(userId: string): Promise<CustomerAddress[]> {
    await this.delay(200);
    return this.storage.getUserAddresses(userId)
      .sort((a, b) => {
        if (a.is_default && !b.is_default) return -1;
        if (!a.is_default && b.is_default) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }

  async addCustomerAddress(userId: string, address: Omit<CustomerAddress, 'id'>): Promise<CustomerAddress> {
    await this.delay(300);

    // If this is set as default, unset other default addresses
    if (address.is_default) {
      const userAddresses = this.storage.getUserAddresses(userId);
      userAddresses.forEach(addr => {
        if (addr.is_default) {
          this.storage.updateUserAddress(userId, addr.id, { is_default: false });
        }
      });
    }

    const newAddress: CustomerAddress = {
      id: this.generateId(),
      ...address,
      user_id: userId,
      created_at: new Date().toISOString()
    };

    this.storage.addUserAddress(userId, newAddress);
    return newAddress;
  }

  async updateCustomerAddress(addressId: string, updates: Partial<CustomerAddress>): Promise<void> {
    await this.delay(200);

    // Find the user who owns this address
    const allUsers = ['mock-user-id']; // In a real app, you'd have a proper user lookup
    for (const userId of allUsers) {
      const userAddresses = this.storage.getUserAddresses(userId);
      if (userAddresses.some(addr => addr.id === addressId)) {
        this.storage.updateUserAddress(userId, addressId, updates);
        break;
      }
    }
  }

  async deleteCustomerAddress(addressId: string): Promise<void> {
    await this.delay(200);

    // Find the user who owns this address
    const allUsers = ['mock-user-id']; // In a real app, you'd have a proper user lookup
    for (const userId of allUsers) {
      const userAddresses = this.storage.getUserAddresses(userId);
      if (userAddresses.some(addr => addr.id === addressId)) {
        this.storage.deleteUserAddress(userId, addressId);
        break;
      }
    }
  }

  /**
   * Cart Synchronization
   */
  async syncCartToStorage(userId: string, cartItems: CartItem[]): Promise<void> {
    await this.delay(100);
    this.storage.setUserCart(userId, cartItems);
  }

  async getCartFromStorage(userId: string): Promise<CartItem[]> {
    await this.delay(100);
    return this.storage.getUserCart(userId);
  }

  /**
   * Webhook handlers for payment service
   */
  async handlePaymentWebhook(event: PaymentWebhookEvent): Promise<void> {
    await this.delay(200);

    try {
      switch (event.event) {
        case 'charge.success':
          await this.handlePaymentSuccess(event.data);
          break;
        case 'charge.failed':
          await this.handlePaymentFailed(event.data);
          break;
        default:
          console.log('Unhandled webhook event:', event.event);
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw error;
    }
  }

  private async handlePaymentSuccess(paymentData: PaymentWebhookEvent['data']): Promise<void> {
    const orderId = paymentData.metadata?.order_id;
    if (!orderId) return;

    // Extract payment channel from paymentData if available
    const paymentChannel = (paymentData as PaymentWebhookEvent['data'] & { channel?: string }).channel || 'paystack';

    await this.updatePaymentStatus(orderId, 'paid', paymentData.reference, paymentChannel);
    await this.sendOrderConfirmationEmail(orderId);
  }

  private async handlePaymentFailed(paymentData: PaymentWebhookEvent['data']): Promise<void> {
    const orderId = paymentData.metadata?.order_id;
    if (!orderId) return;

    // Extract payment channel from paymentData if available
    const paymentChannel = (paymentData as PaymentWebhookEvent['data'] & { channel?: string }).channel || 'paystack';

    await this.updatePaymentStatus(orderId, 'failed', paymentData.reference, paymentChannel);
  }

  /**
   * Email notifications (mock implementation)
   */
  async sendOrderConfirmationEmail(orderId: string): Promise<void> {
    await this.delay(100);
    const order = this.storage.getOrder(orderId);
    if (!order) return;

    const itemsPayload = order.items.map((i) => ({
      name: i.product_name,
      price: i.price,
      quantity: i.quantity,
    }));

    const shippingAddress = order.shipping_address;
    const addressLine = [
      shippingAddress.full_name,
      shippingAddress.address_line_1,
      shippingAddress.address_line_2,
      `${shippingAddress.city}, ${shippingAddress.state}`,
      shippingAddress.postal_code,
      shippingAddress.country,
      `Phone: ${shippingAddress.phone}`,
    ]
      .filter(Boolean)
      .join(', ');

    // Format payment method for display
    const paymentMethodDisplay = this.formatPaymentMethodForEmail(order.payment_channel || order.payment_method);

    try {
      const { sendOrderConfirmation } = await import('./email-service-emailjs');
      await sendOrderConfirmation({
        order_id: order.order_number,
        customer_name: shippingAddress.full_name,
        email_to: order.customer_email || 'customer@example.com',
        items_json: JSON.stringify(itemsPayload),
        total: order.total_amount,
        shipping_address: addressLine,
        payment_method: paymentMethodDisplay,
      });
    } catch (e) {
      console.warn('Order confirmation email skipped or failed:', e);
    }
  }

  /**
   * Format payment method for email display
   */
  private formatPaymentMethodForEmail(paymentChannel?: string): string {
    if (!paymentChannel) return 'Online Payment';
    
    switch (paymentChannel.toLowerCase()) {
      case 'mobile_money':
        return 'Mobile Money';
      case 'card':
        return 'Card Payment';
      case 'bank':
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'ussd':
        return 'USSD';
      case 'qr':
        return 'QR Code';
      case 'paystack':
        return 'Online Payment';
      default:
        return paymentChannel.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  }

  async sendShippingNotification(orderId: string): Promise<void> {
    await this.delay(100);
    console.log('Mock: Sending shipping notification for order:', orderId);
  }

  async sendDeliveryNotification(orderId: string): Promise<void> {
    await this.delay(100);
    console.log('Mock: Sending delivery notification for order:', orderId);
  }

  /**
   * Utility methods
   */
  private generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `CYP${timestamp}${random}`;
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mockOrderService = new MockOrderService();

// Utility functions
export const formatOrderStatus = (status: Order['status']): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'confirmed':
      return 'Confirmed';
    case 'processing':
      return 'Processing';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    case 'refunded':
      return 'Refunded';
    default:
      return 'Unknown';
  }
};

export const formatPaymentStatus = (status: Order['payment_status']): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'paid':
      return 'Paid';
    case 'failed':
      return 'Failed';
    case 'refunded':
      return 'Refunded';
    default:
      return 'Unknown';
  }
};

export const getOrderStatusColor = (status: Order['status']): string => {
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
    case 'refunded':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default MockOrderService;
