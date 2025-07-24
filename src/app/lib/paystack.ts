// Extend Window interface to include PaystackPop
declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: unknown) => {
        openIframe: () => void;
      };
    };
  }
}

export interface PaystackConfig {
  publicKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface PaystackCustomer {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface PaystackTransaction {
  amount: number; // Amount in kobo (multiply by 100)
  email: string;
  currency?: string;
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
  channels?: string[];
  split_code?: string;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: 'account' | 'subaccount';
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: unknown;
}

export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, unknown>;
    log: unknown;
    fees: number;
    fees_split: unknown;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
      metadata: Record<string, any>;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: any;
    split: any;
    order_id: string | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: any;
    source: any;
    fees_breakdown: any;
  };
}

class PaystackService {
  private config: PaystackConfig;

  constructor() {
    this.config = {
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      secretKey: process.env.PAYSTACK_SECRET_KEY || '',
      baseUrl: 'https://api.paystack.co'
    };

    if (!this.config.publicKey) {
      console.warn('Paystack public key not found in environment variables');
    }
  }

  /**
   * Initialize a transaction
   */
  async initializeTransaction(transaction: PaystackTransaction): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transaction,
          currency: transaction.currency || 'GHS',
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error initializing Paystack transaction:', error);
      throw new Error('Failed to initialize payment');
    }
  }

  /**
   * Verify a transaction
   */
  async verifyTransaction(reference: string): Promise<PaystackVerificationResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying Paystack transaction:', error);
      throw new Error('Failed to verify payment');
    }
  }

  /**
   * Get all transactions
   */
  async getTransactions(params?: {
    perPage?: number;
    page?: number;
    customer?: number;
    status?: 'failed' | 'success' | 'abandoned';
    from?: string;
    to?: string;
    amount?: number;
  }): Promise<PaystackResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(
        `${this.config.baseUrl}/transaction?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.config.secretKey}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Paystack transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(customer: PaystackCustomer): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/customer`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating Paystack customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  /**
   * Get customer by ID or email
   */
  async getCustomer(identifier: string): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/customer/${identifier}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Paystack customer:', error);
      throw new Error('Failed to fetch customer');
    }
  }

  /**
   * Generate a payment reference
   */
  generateReference(prefix = 'CYP'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Convert amount to kobo (Paystack's smallest currency unit)
   */
  toKobo(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Convert amount from kobo to cedis
   */
  fromKobo(amount: number): number {
    return amount / 100;
  }

  /**
   * Validate webhook signature
   */
  validateWebhookSignature(payload: string, signature: string): boolean {
    const crypto = require('crypto');
    const hash = crypto
      .createHmac('sha512', this.config.secretKey)
      .update(payload)
      .digest('hex');
    return hash === signature;
  }

  /**
   * Get public key for frontend
   */
  getPublicKey(): string {
    return this.config.publicKey;
  }
}

// Export singleton instance
export const paystackService = new PaystackService();

// Utility functions for frontend
export const initializePaystackPayment = (options: {
  email: string;
  amount: number;
  reference?: string;
  metadata?: Record<string, any>;
  onSuccess: (response: any) => void;
  onCancel: () => void;
  onClose?: () => void;
}) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.PaystackPop) {
      reject(new Error('Paystack script not loaded'));
      return;
    }

    const reference = options.reference || paystackService.generateReference();
    
    const paystack = window.PaystackPop.setup({
      key: paystackService.getPublicKey(),
      email: options.email,
      amount: paystackService.toKobo(options.amount),
      currency: 'GHS',
      ref: reference,
      metadata: options.metadata || {},
      callback: function(response: any) {
        options.onSuccess(response);
        resolve(response);
      },
      onClose: function() {
        options.onCancel();
        if (options.onClose) {
          options.onClose();
        }
        reject(new Error('Payment cancelled'));
      }
    });

    paystack.openIframe();
  });
};

// Load Paystack script dynamically
export const loadPaystackScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window object not available'));
      return;
    }

    if (window.PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Paystack script'));
    };

    document.head.appendChild(script);
  });
};

export default PaystackService;
