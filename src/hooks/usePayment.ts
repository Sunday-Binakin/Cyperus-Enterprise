import { useState } from 'react';
import type { PaymentData } from '@/app/lib/paystack-service';

interface UsePaymentReturn {
  isProcessing: boolean;
  paymentError: string | null;
  processPayment: (paymentData: PaymentData) => Promise<void>;
  clearError: () => void;
}

export function usePayment(): UsePaymentReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const processPayment = async (paymentData: PaymentData): Promise<void> => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Dynamically import Paystack service
      const { paystackService } = await import('@/app/lib/paystack-service');
      
      const result = await paystackService.initializePayment(paymentData);
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment initialization failed';
      setPaymentError(errorMessage);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const clearError = () => {
    setPaymentError(null);
  };

  return {
    isProcessing,
    paymentError,
    processPayment,
    clearError
  };
}
