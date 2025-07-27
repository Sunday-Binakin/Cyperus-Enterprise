export interface PaymentConfig {
  publicKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface PaymentCustomer {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface PaymentTransaction {
  amount: number; // Amount in smallest currency unit (e.g., kobo for GHS)
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

export interface PaymentResponse {
  status: boolean;
  message: string;
  data: unknown;
}

export interface PaymentVerificationResponse {
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
      metadata: Record<string, unknown>;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: {
      id: number;
      name: string;
      amount: number;
      interval: string;
    } | null;
    split: {
      type: string;
      amount: number;
      subaccount: string;
    } | null;
    order_id: string | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: null | {
      reference: string;
      status: string;
      timestamp: string;
    };
    source: {
      type: string;
      source: string;
      identifier: string | null;
    } | null;
    fees_breakdown: Array<{
      amount: number;
      type: string;
      reason: string;
    }> | null;
  };
}

export interface PaymentClientResponse {
  reference: string;
  trans: string;
  status: 'success' | 'failed' | 'abandoned';
  message: string;
  transaction: string;
  trxref: string;
}

// Mock data storage
interface MockTransaction {
  id: number;
  reference: string;
  amount: number;
  email: string;
  currency: string;
  status: string;
  created_at: string;
  metadata: Record<string, unknown>;
  authorization_url?: string;
  access_code?: string;
}

class MockPaymentStorage {
  private transactions: Map<string, MockTransaction> = new Map();
  private customers: Map<string, Record<string, unknown>> = new Map();

  saveTransaction(reference: string, transaction: MockTransaction) {
    this.transactions.set(reference, transaction);
  }

  getTransaction(reference: string): MockTransaction | undefined {
    return this.transactions.get(reference);
  }

  saveCustomer(email: string, customer: Record<string, unknown>) {
    this.customers.set(email, customer);
  }

  getCustomer(email: string): Record<string, unknown> | undefined {
    return this.customers.get(email);
  }

  getAllTransactions(): MockTransaction[] {
    return Array.from(this.transactions.values());
  }
}

class MockPaymentService {
  private config: PaymentConfig;
  private storage: MockPaymentStorage;

  constructor() {
    this.config = {
      publicKey: 'pk_mock_public_key',
      secretKey: 'sk_mock_secret_key',
      baseUrl: 'https://mock-payment-api.local'
    };

    this.storage = new MockPaymentStorage();
  }

  /**
   * Initialize a transaction (Mock)
   */
  async initializeTransaction(transaction: PaymentTransaction): Promise<PaymentResponse> {
    // Simulate API delay
    await this.delay(500);

    const reference = transaction.reference || this.generateReference();
    const timestamp = new Date().toISOString();

    const mockTransaction = {
      id: Math.floor(Math.random() * 1000000),
      reference,
      amount: transaction.amount,
      email: transaction.email,
      currency: transaction.currency || 'GHS',
      status: 'pending',
      created_at: timestamp,
      metadata: transaction.metadata || {},
      authorization_url: `https://mock-payment.local/pay/${reference}`,
      access_code: `ac_${Math.random().toString(36).substring(2)}`
    };

    this.storage.saveTransaction(reference, mockTransaction);

    return {
      status: true,
      message: 'Authorization URL created',
      data: mockTransaction
    };
  }

  /**
   * Verify a transaction (Mock)
   */
  async verifyTransaction(reference: string): Promise<PaymentVerificationResponse> {
    // Simulate API delay
    await this.delay(300);

    const transaction = this.storage.getTransaction(reference);
    
    if (!transaction) {
      return {
        status: false,
        message: 'Transaction not found',
        data: {} as PaymentVerificationResponse['data']
      };
    }

    // Simulate random success/failure for demo (80% success rate)
    const isSuccess = Math.random() > 0.2;
    const status: 'success' | 'failed' | 'abandoned' = isSuccess ? 'success' : 'failed';
    const timestamp = new Date().toISOString();

    const verificationData = {
      id: transaction.id,
      domain: 'mock',
      status,
      reference: transaction.reference,
      amount: transaction.amount,
      message: (isSuccess ? 'Approved' : 'Declined') as string | null,
      gateway_response: isSuccess ? 'Successful' : 'Declined by bank',
      paid_at: isSuccess ? timestamp : '',
      created_at: transaction.created_at,
      channel: 'card',
      currency: transaction.currency,
      ip_address: '127.0.0.1',
      metadata: transaction.metadata,
      log: null,
      fees: Math.round(transaction.amount * 0.015), // 1.5% fee
      fees_split: null,
      authorization: {
        authorization_code: `auth_${Math.random().toString(36).substring(2)}`,
        bin: '408408',
        last4: '4081',
        exp_month: '12',
        exp_year: '2030',
        channel: 'card',
        card_type: 'visa',
        bank: 'Mock Bank',
        country_code: 'GH',
        brand: 'visa',
        reusable: true,
        signature: 'SIG_mock_signature',
        account_name: null
      },
      customer: {
        id: 123456,
        first_name: 'Mock',
        last_name: 'Customer',
        email: transaction.email,
        customer_code: `CUS_${Math.random().toString(36).substring(2)}`,
        phone: '+233123456789',
        metadata: {},
        risk_action: 'default',
        international_format_phone: null
      },
      plan: null,
      split: null,
      order_id: null,
      paidAt: isSuccess ? timestamp : '',
      createdAt: transaction.created_at,
      requested_amount: transaction.amount,
      pos_transaction_data: null,
      source: {
        type: 'api',
        source: 'web',
        identifier: null
      },
      fees_breakdown: [
        {
          amount: Math.round(transaction.amount * 0.015),
          type: 'paystack',
          reason: 'Payment gateway fee'
        }
      ] as Array<{ amount: number; type: string; reason: string; }> | null
    };

    // Update stored transaction
    const updatedTransaction: MockTransaction = {
      ...transaction,
      status,
    };
    
    this.storage.saveTransaction(reference, updatedTransaction);

    return {
      status: true,
      message: 'Verification successful',
      data: verificationData
    };
  }

  /**
   * Get all transactions (Mock)
   */
  async getTransactions(params?: {
    perPage?: number;
    page?: number;
    customer?: number;
    status?: 'failed' | 'success' | 'abandoned';
    from?: string;
    to?: string;
    amount?: number;
  }): Promise<PaymentResponse> {
    // Simulate API delay
    await this.delay(200);

    const allTransactions = this.storage.getAllTransactions();
    let filteredTransactions = allTransactions;

    // Apply filters
    if (params?.status) {
      filteredTransactions = filteredTransactions.filter(t => t.status === params.status);
    }

    // Apply pagination
    const perPage = params?.perPage || 50;
    const page = params?.page || 1;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    return {
      status: true,
      message: 'Transactions retrieved',
      data: {
        data: paginatedTransactions,
        meta: {
          total: filteredTransactions.length,
          skipped: startIndex,
          perPage,
          page,
          pageCount: Math.ceil(filteredTransactions.length / perPage)
        }
      }
    };
  }

  /**
   * Create a customer (Mock)
   */
  async createCustomer(customer: PaymentCustomer): Promise<PaymentResponse> {
    // Simulate API delay
    await this.delay(300);

    const mockCustomer = {
      id: Math.floor(Math.random() * 1000000),
      first_name: customer.first_name || '',
      last_name: customer.last_name || '',
      email: customer.email,
      phone: customer.phone || '',
      customer_code: `CUS_${Math.random().toString(36).substring(2)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      risk_action: 'default',
      metadata: {}
    };

    this.storage.saveCustomer(customer.email, mockCustomer);

    return {
      status: true,
      message: 'Customer created',
      data: mockCustomer
    };
  }

  /**
   * Get customer by ID or email (Mock)
   */
  async getCustomer(identifier: string): Promise<PaymentResponse> {
    // Simulate API delay
    await this.delay(200);

    const customer = this.storage.getCustomer(identifier);

    if (!customer) {
      return {
        status: false,
        message: 'Customer not found',
        data: null
      };
    }

    return {
      status: true,
      message: 'Customer retrieved',
      data: customer
    };
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
   * Convert amount to smallest currency unit (e.g., kobo for GHS)
   */
  toKobo(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Convert amount from smallest currency unit
   */
  fromKobo(amount: number): number {
    return amount / 100;
  }

  /**
   * Get public key for frontend
   */
  getPublicKey(): string {
    return this.config.publicKey;
  }

  /**
   * Simulate API delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mockPaymentService = new MockPaymentService();

// Mock client-side payment initialization
export const initializeMockPayment = (options: {
  email: string;
  amount: number;
  reference?: string;
  metadata?: Record<string, unknown>;
  onSuccess: (response: PaymentClientResponse) => void;
  onCancel: () => void;
  onClose?: () => void;
}): Promise<PaymentClientResponse> => {
  return new Promise((resolve, reject) => {
    const reference = options.reference || mockPaymentService.generateReference();
    
    // Simulate payment modal/iframe
    const paymentModal = document.createElement('div');
    paymentModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 8px;
      max-width: 400px;
      width: 90%;
      text-align: center;
    `;

    modalContent.innerHTML = `
      <h2>Mock Payment Gateway</h2>
      <p><strong>Amount:</strong> ₵${mockPaymentService.fromKobo(options.amount)}</p>
      <p><strong>Email:</strong> ${options.email}</p>
      <p><strong>Reference:</strong> ${reference}</p>
      <div style="margin: 2rem 0;">
        <button id="mockPaySuccess" style="background: #28a745; color: white; padding: 0.5rem 1rem; margin: 0.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Simulate Success
        </button>
        <button id="mockPayFail" style="background: #dc3545; color: white; padding: 0.5rem 1rem; margin: 0.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Simulate Failure
        </button>
        <br>
        <button id="mockPayCancel" style="background: #6c757d; color: white; padding: 0.5rem 1rem; margin: 0.5rem; border: none; border-radius: 4px; cursor: pointer;">
          Cancel
        </button>
      </div>
      <p style="font-size: 0.8rem; color: #666;">This is a mock payment interface for development</p>
    `;

    paymentModal.appendChild(modalContent);
    document.body.appendChild(paymentModal);

    const cleanup = () => {
      document.body.removeChild(paymentModal);
    };

    // Handle success
    const successBtn = modalContent.querySelector('#mockPaySuccess');
    successBtn?.addEventListener('click', () => {
      const response: PaymentClientResponse = {
        reference,
        trans: `trans_${Math.random().toString(36).substring(2)}`,
        status: 'success',
        message: 'Approved',
        transaction: reference,
        trxref: reference
      };
      
      cleanup();
      options.onSuccess(response);
      resolve(response);
    });

    // Handle failure
    const failBtn = modalContent.querySelector('#mockPayFail');
    failBtn?.addEventListener('click', () => {
      const response: PaymentClientResponse = {
        reference,
        trans: `trans_${Math.random().toString(36).substring(2)}`,
        status: 'failed',
        message: 'Declined',
        transaction: reference,
        trxref: reference
      };
      
      cleanup();
      options.onSuccess(response);
      resolve(response);
    });

    // Handle cancel
    const cancelBtn = modalContent.querySelector('#mockPayCancel');
    cancelBtn?.addEventListener('click', () => {
      cleanup();
      options.onCancel();
      if (options.onClose) {
        options.onClose();
      }
      reject(new Error('Payment cancelled'));
    });

    // Handle backdrop click
    paymentModal.addEventListener('click', (e) => {
      if (e.target === paymentModal) {
        cleanup();
        options.onCancel();
        if (options.onClose) {
          options.onClose();
        }
        reject(new Error('Payment cancelled'));
      }
    });
  });
};

// Mock script loading (no-op for mock)
export const loadMockPaymentScript = (): Promise<void> => {
  return Promise.resolve();
};

export default MockPaymentService;
