// Paystack Payment Service for Ghana
export interface PaystackPaymentData {
  email: string;
  amount: number; // in pesewas (GHS * 100)
  currency?: string;
  reference?: string;
  callback_url?: string;
  metadata?: {
    order_id: string;
    customer_name?: string;
    phone?: string;
    [key: string]: any;
  };
  channels?: string[];
}

export interface PaystackTransaction {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string | null;
  gateway_response: string;
  paid_at: string | null;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: any;
  log: any;
  fees: number;
  fees_split: any;
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
    first_name: string | null;
    last_name: string | null;
    email: string;
    customer_code: string;
    phone: string | null;
    metadata: any;
    risk_action: string;
    international_format_phone: string | null;
  };
  plan: any;
  split: any;
  order_id: string | null;
  paidAt: string | null;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: any;
  source: any;
  fees_breakdown: any;
}

export class PaystackService {
  private secretKey: string;
  private publicKey: string;
  private baseUrl = 'https://api.paystack.co';

  constructor() {
    this.secretKey = process.env.PAYSTACK_SECRET_KEY || '';
    this.publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
    
    if (!this.secretKey) {
      console.warn('PAYSTACK_SECRET_KEY not found in environment variables');
    }
    if (!this.publicKey) {
      console.warn('NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY not found in environment variables');
    }
  }

  async initializeTransaction(paymentData: PaystackPaymentData) {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          currency: paymentData.currency || 'GHS',
          channels: paymentData.channels || ['card', 'bank', 'ussd', 'qr', 'mobile_money'],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initialize payment');
      }

      return {
        status: data.status,
        message: data.message,
        data: {
          authorization_url: data.data.authorization_url,
          access_code: data.data.access_code,
          reference: data.data.reference,
        },
      };
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw error;
    }
  }

  async verifyTransaction(reference: string): Promise<PaystackTransaction> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify payment');
      }

      return data.data;
    } catch (error) {
      console.error('Paystack verification error:', error);
      throw error;
    }
  }

  async listTransactions(page = 1, perPage = 50) {
    try {
      const response = await fetch(
        `${this.baseUrl}/transaction?page=${page}&perPage=${perPage}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch transactions');
      }

      return data;
    } catch (error) {
      console.error('Paystack list transactions error:', error);
      throw error;
    }
  }

  async createCustomer(customerData: {
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: any;
  }) {
    try {
      const response = await fetch(`${this.baseUrl}/customer`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create customer');
      }

      return data.data;
    } catch (error) {
      console.error('Paystack create customer error:', error);
      throw error;
    }
  }

  // Utility functions
  formatAmount(amount: number): number {
    // Convert from GHS to pesewas (multiply by 100)
    return Math.round(amount * 100);
  }

  formatAmountFromPesewas(amount: number): number {
    // Convert from pesewas to GHS (divide by 100)
    return amount / 100;
  }

  generateReference(prefix = 'CYP'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${random}`.toUpperCase();
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  // Webhook signature verification
  verifyWebhookSignature(body: string, signature: string): boolean {
    const crypto = require('crypto');
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(body)
      .digest('hex');
    
    return hash === signature;
  }
}

export const paystackService = new PaystackService();
