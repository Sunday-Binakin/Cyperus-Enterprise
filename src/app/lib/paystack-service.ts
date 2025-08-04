// Paystack Client-side Payment Service
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackSetupOptions) => {
        openIframe: () => void;
      };
    };
  }
}

export interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number; // Amount in kobo (multiply by 100)
  currency: string;
  ref: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
  metadata?: {
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    [key: string]: unknown;
  };
  channels?: string[];
  plan?: string;
  quantity?: number;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: string;
}

export interface PaystackResponse {
  message: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

export interface PaymentData {
  email: string;
  amount: number; // Amount in cedis
  currency: string;
  reference: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  metadata?: Record<string, unknown>;
  channels?: string[];
}

class PaystackService {
  private readonly publicKey: string;
  private scriptLoaded: boolean = false;

  constructor() {
    this.publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_136958e9da0c7d27ad6aec58947641796fac1ea8';
  }

  /**
   * Load Paystack inline script dynamically
   */
  private loadPaystackScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded || window.PaystackPop) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Paystack script'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Generate a unique payment reference
   */
  private generateReference(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `cyperus_${timestamp}_${random}`;
  }

  /**
   * Initialize Paystack payment
   */
  async initializePayment(paymentData: PaymentData): Promise<PaystackResponse> {
    try {
      // Load Paystack script if not already loaded
      await this.loadPaystackScript();

      return new Promise((resolve, reject) => {
        const handler = window.PaystackPop.setup({
          key: this.publicKey,
          email: paymentData.email,
          amount: Math.round(paymentData.amount * 100), // Convert to kobo
          currency: paymentData.currency || 'GHS',
          ref: paymentData.reference || this.generateReference(),
          firstname: paymentData.firstname,
          lastname: paymentData.lastname,
          phone: paymentData.phone,
          metadata: {
            custom_fields: [
              {
                display_name: "Order ID",
                variable_name: "order_id",
                value: String(paymentData.metadata?.order_id || '')
              },
              {
                display_name: "Customer ID",
                variable_name: "customer_id", 
                value: String(paymentData.metadata?.customer_id || '')
              }
            ],
            ...paymentData.metadata
          },
          channels: paymentData.channels || ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
          callback: (response: PaystackResponse) => {
            console.log('Payment successful:', response);
            resolve(response);
          },
          onClose: () => {
            reject(new Error('Payment was cancelled by user'));
          }
        });

        handler.openIframe();
      });
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw error;
    }
  }

  /**
   * Verify payment status (client-side)
   * Note: In production, this should be done on the server-side
   */
  async verifyPayment(reference: string): Promise<{ status: string; data?: Record<string, unknown> }> {
    try {
      // For client-side implementation, we'll simulate verification
      // In production, you should verify on your backend using the secret key
      console.log('Verifying payment reference:', reference);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return success status (in real implementation, call your backend)
      return {
        status: 'success',
        data: {
          reference,
          status: 'success',
          gateway_response: 'Successful',
          paid_at: new Date().toISOString(),
          amount: 0 // Amount would come from verification
        }
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      return { status: 'failed' };
    }
  }

  /**
   * Get supported payment channels
   */
  getSupportedChannels(): string[] {
    return ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'];
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number, currency: string = 'GHS'): string {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount).replace('GHS', 'GH₵');
  }
}

// Export singleton instance
export const paystackService = new PaystackService();

// Export utility functions
export const initializePaystackPayment = paystackService.initializePayment.bind(paystackService);
export const verifyPaystackPayment = paystackService.verifyPayment.bind(paystackService);
