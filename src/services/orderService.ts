/**
 * Service Layer - Order Service Interface
 * 
 * Abstracts order management operations from components,
 * enabling easier testing and future backend integration.
 */

import type { CreateOrderData, Order } from '@/app/lib/mock-order-service';

export interface OrderServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Order Service Interface
 * Defines the contract for order operations
 */
export interface IOrderService {
  createOrder(orderData: CreateOrderData): Promise<OrderServiceResponse<Order>>;
  getOrderById(orderId: string): Promise<OrderServiceResponse<Order>>;
  updatePaymentStatus(
    orderId: string,
    status: 'pending' | 'paid' | 'failed',
    reference: string,
    channel: string
  ): Promise<OrderServiceResponse<void>>;
  sendOrderConfirmation(orderId: string): Promise<OrderServiceResponse<void>>;
}

/**
 * Mock Order Service Implementation
 * Uses the mock order service for development
 */
export class MockOrderServiceImpl implements IOrderService {
  async createOrder(orderData: CreateOrderData): Promise<OrderServiceResponse<Order>> {
    try {
      const { mockOrderService } = await import('@/app/lib/mock-order-service');
      const order = await mockOrderService.createOrder(orderData);
      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order'
      };
    }
  }

  async getOrderById(orderId: string): Promise<OrderServiceResponse<Order>> {
    try {
      const { mockOrderService } = await import('@/app/lib/mock-order-service');
      const order = await mockOrderService.getOrder(orderId);
      
      if (!order) {
        return {
          success: false,
          error: 'Order not found'
        };
      }
      
      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch order'
      };
    }
  }

  async updatePaymentStatus(
    orderId: string,
    status: 'pending' | 'paid' | 'failed',
    reference: string,
    channel: string
  ): Promise<OrderServiceResponse<void>> {
    try {
      const { mockOrderService } = await import('@/app/lib/mock-order-service');
      await mockOrderService.updatePaymentStatus(orderId, status, reference, channel);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update payment status'
      };
    }
  }

  async sendOrderConfirmation(orderId: string): Promise<OrderServiceResponse<void>> {
    try {
      const { mockOrderService } = await import('@/app/lib/mock-order-service');
      await mockOrderService.sendOrderConfirmationEmail(orderId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send order confirmation'
      };
    }
  }
}

// Singleton instance
let orderServiceInstance: IOrderService | null = null;

/**
 * Get the order service instance
 */
export function getOrderService(): IOrderService {
  if (!orderServiceInstance) {
    orderServiceInstance = new MockOrderServiceImpl();
  }
  return orderServiceInstance;
}

/**
 * Set a custom order service (useful for testing)
 */
export function setOrderService(service: IOrderService): void {
  orderServiceInstance = service;
}
