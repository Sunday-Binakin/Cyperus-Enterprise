import { useState } from 'react';
import type { CartItem } from '@/store/cartSlice';
import type { ShippingAddress } from '@/hooks/useShippingAddress';
import { getOrderService } from '@/services/orderService';
import type { CreateOrderData, OrderItem } from '@/app/lib/mock-order-service';

interface UseCheckoutOrderReturn {
  isCreatingOrder: boolean;
  orderError: string | null;
  createOrder: (
    items: CartItem[],
    shippingAddress: ShippingAddress,
    email: string,
    total: number,
    shippingFee: number,
    tax: number
  ) => Promise<string>;
  clearOrderError: () => void;
}

export function useCheckoutOrder(): UseCheckoutOrderReturn {
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const createOrder = async (
    items: CartItem[],
    shippingAddress: ShippingAddress,
    email: string,
    total: number,
    shippingFee: number,
    tax: number
  ): Promise<string> => {
    setIsCreatingOrder(true);
    setOrderError(null);

    try {
      const orderService = getOrderService();

      const orderData: CreateOrderData = {
        session_id: crypto.randomUUID(),
        items: items.map((item): OrderItem => ({
          product_id: item.product_id,
          product_name: item.name,
          product_image: item.image,
          price: item.price,
          quantity: item.quantity || 1,
          variant_info: undefined
        })),
        shipping_address: shippingAddress,
        total_amount: total,
        shipping_fee: shippingFee,
        tax_amount: tax,
        payment_method: 'paystack',
        customer_email: email || ''
      };

      const result = await orderService.createOrder(orderData);
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to create order');
      }
      
      return result.data.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      setOrderError(errorMessage);
      throw error;
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const clearOrderError = () => {
    setOrderError(null);
  };

  return {
    isCreatingOrder,
    orderError,
    createOrder,
    clearOrderError
  };
}
