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

export interface PaymentVerificationResult {
  status: string;
  data?: {
    reference: string;
    status: string;
    gateway_response: string;
    paid_at: string;
    amount: number;
  };
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
  private publicKey: string | null = null;
  private scriptLoaded: boolean = false;

  constructor() {
    // Don't initialize in constructor to avoid build-time errors
    // Initialize when needed on client-side
  }

  /**
   * Get or initialize the public key
   */
  private getPublicKey(): string {
    if (this.publicKey) {
      return this.publicKey;
    }

    // Only access environment variables on client-side
    if (typeof window === 'undefined') {
      throw new Error('Paystack can only be initialized on the client side');
    }

    const envKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    
    if (!envKey) {
      console.error('❌ PAYSTACK ERROR: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set in environment variables');
      throw new Error('Paystack public key is required. Please check your .env.local file.');
    }
    
    this.publicKey = envKey;
    
    // Log key type (without exposing the full key)
    const keyType = envKey.startsWith('pk_live') ? '🟢 LIVE' : '🟡 TEST';
    console.log(`Paystack initialized with ${keyType} key`);
    
    return this.publicKey;
  }

  /**
   * Load Paystack inline script dynamically
   * Simplified version with clearer logic flow
   */
  private loadPaystackScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Early return if already loaded
      if (this.isPaystackAvailable()) {
        this.scriptLoaded = true;
        resolve();
        return;
      }

      // Check if script element exists in DOM
      const existingScript = this.getExistingPaystackScript();
      if (existingScript) {
        this.attachScriptListeners(existingScript, resolve, reject);
        return;
      }

      // Create and inject new script
      this.injectPaystackScript(resolve, reject);
    });
  }

  /**
   * Check if Paystack is already available in window
   */
  private isPaystackAvailable(): boolean {
    return typeof window.PaystackPop !== 'undefined';
  }

  /**
   * Get existing Paystack script element if it exists
   */
  private getExistingPaystackScript(): HTMLScriptElement | null {
    return document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
  }

  /**
   * Attach load/error listeners to existing script
   */
  private attachScriptListeners(
    script: HTMLScriptElement,
    resolve: () => void,
    reject: (error: Error) => void
  ): void {
    script.addEventListener('load', () => {
      this.scriptLoaded = true;
      resolve();
    });
    
    script.addEventListener('error', () => {
      reject(new Error('Failed to load Paystack script'));
    });

    // Check if already loaded
    if (this.isPaystackAvailable()) {
      this.scriptLoaded = true;
      resolve();
    }
  }

  /**
   * Create and inject new Paystack script into document
   */
  private injectPaystackScript(
    resolve: () => void,
    reject: (error: Error) => void
  ): void {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;

    script.onload = () => {
      // Small delay to ensure PaystackPop is initialized
      setTimeout(() => {
        if (this.isPaystackAvailable()) {
          this.scriptLoaded = true;
          console.log('✅ Paystack script loaded successfully');
          resolve();
        } else {
          reject(new Error('Paystack script loaded but PaystackPop is not available'));
        }
      }, 100);
    };

    script.onerror = () => {
      console.error('❌ Failed to load Paystack script');
      reject(new Error('Failed to load Paystack script'));
    };

    document.head.appendChild(script);
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
   * Simplified with extracted helper methods
   */
  async initializePayment(paymentData: PaymentData): Promise<PaystackResponse> {
    this.ensureClientSide();
    
    const publicKey = this.getPublicKey();
    await this.loadPaystackScript();
    
    this.validatePaystackAvailability();

    console.log('🔄 Initializing Paystack payment...', {
      email: paymentData.email,
      amount: paymentData.amount,
      reference: paymentData.reference || this.generateReference()
    });

    return this.setupPaymentHandler(publicKey, paymentData);
  }

  /**
   * Ensure code is running on client-side
   */
  private ensureClientSide(): void {
    if (typeof window === 'undefined') {
      throw new Error('Payment can only be initialized on the client side');
    }
  }

  /**
   * Validate that PaystackPop is available
   */
  private validatePaystackAvailability(): void {
    if (!this.isPaystackAvailable()) {
      throw new Error('Paystack script loaded but PaystackPop is not available. Please try again.');
    }
  }

  /**
   * Setup Paystack payment handler and open iframe
   */
  private setupPaymentHandler(
    publicKey: string,
    paymentData: PaymentData
  ): Promise<PaystackResponse> {
    return new Promise((resolve, reject) => {
      try {
        const handler = window.PaystackPop.setup(
          this.buildPaystackOptions(publicKey, paymentData, resolve, reject)
        );

        console.log('🔓 Opening Paystack iframe...');
        handler.openIframe();
      } catch (setupError) {
        console.error('❌ Error setting up Paystack:', setupError);
        reject(setupError);
      }
    });
  }

  /**
   * Build Paystack setup options
   */
  private buildPaystackOptions(
    publicKey: string,
    paymentData: PaymentData,
    resolve: (response: PaystackResponse) => void,
    reject: (error: Error) => void
  ): PaystackSetupOptions {
    return {
      key: publicKey,
      email: paymentData.email,
      amount: Math.round(paymentData.amount * 100), // Convert to kobo/pesewas
      currency: paymentData.currency || 'GHS',
      ref: paymentData.reference || this.generateReference(),
      firstname: paymentData.firstname,
      lastname: paymentData.lastname,
      phone: paymentData.phone,
      metadata: this.buildMetadata(paymentData.metadata),
      channels: paymentData.channels || ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      callback: (response: PaystackResponse) => {
        console.log('✅ Payment successful:', response);
        resolve(response);
      },
      onClose: () => {
        console.log('❌ Payment cancelled by user');
        reject(new Error('Payment was cancelled by user'));
      }
    };
  }

  /**
   * Build metadata object for Paystack
   */
  private buildMetadata(metadata?: Record<string, unknown>): PaystackSetupOptions['metadata'] {
    return {
      custom_fields: [
        {
          display_name: "Order ID",
          variable_name: "order_id",
          value: String(metadata?.order_id || '')
        },
        {
          display_name: "Customer ID",
          variable_name: "customer_id",
          value: String(metadata?.customer_id || '')
        }
      ],
      ...metadata
    };
  }

  /**
   * Verify payment status (client-side simulation)
   * IMPORTANT: In production, this MUST be done on the server-side using your secret key
   * This is a simplified version for demonstration purposes only
   */
  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    console.log('⏳ Verifying payment reference:', reference);
    
    await this.simulateApiDelay();
    
    return this.buildSuccessVerificationResult(reference);
  }

  /**
   * Simulate API call delay (for demo purposes)
   */
  private async simulateApiDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  /**
   * Build a successful verification result
   * In production, this data would come from Paystack's verification endpoint
   */
  private buildSuccessVerificationResult(reference: string): PaymentVerificationResult {
    return {
      status: 'success',
      data: {
        reference,
        status: 'success',
        gateway_response: 'Successful',
        paid_at: new Date().toISOString(),
        amount: 0 // Would come from actual verification
      }
    };
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
