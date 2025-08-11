// Client-side EmailJS service for order confirmation
// Uses a single template for sending order confirmation emails

export type OrderConfirmationParams = {
  order_id: string;
  customer_name: string;
  email_to: string;
  items_json: string; // JSON stringified items
  total: number;
  shipping_address: string; // single-line formatted address
};

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const CONFIRMATION_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID || '';

let initialized = false;

type EmailJSModule = {
  default: {
    init: (opts: { publicKey: string }) => void;
    send: (
      serviceId: string,
      templateId: string,
      templateParams: Record<string, unknown>,
      options: { publicKey: string }
    ) => Promise<{ status: number }>;
  };
};

async function getEmailJS() {
  const mod = (await import('@emailjs/browser')) as unknown as EmailJSModule;
  const emailjs = mod.default;
  if (!initialized && typeof window !== 'undefined' && PUBLIC_KEY) {
    try {
      if (typeof emailjs.init === 'function') {
        emailjs.init({ publicKey: PUBLIC_KEY });
      }
      initialized = true;
    } catch (e) {
      // Safe to continue; we'll fall back to sending with publicKey arg
      console.warn('EmailJS init failed:', e);
    }
  }
  return emailjs;
}

export async function sendOrderConfirmation(params: OrderConfirmationParams): Promise<boolean> {
  if (typeof window === 'undefined') return false; // client-only

  if (!SERVICE_ID || !PUBLIC_KEY || !CONFIRMATION_TEMPLATE_ID) {
    console.warn('EmailJS env not configured. Skipping order confirmation email.');
    return false;
  }

  try {
    const emailjs = await getEmailJS();

    // Ensure template params keys match your EmailJS template variables
    const templateParams = {
      order_id: params.order_id,
      customer_name: params.customer_name,
      email_to: params.email_to,
      items_json: params.items_json,
      total: params.total,
      shipping_address: params.shipping_address,
    } as const;

    const res = await emailjs.send(
      SERVICE_ID,
      CONFIRMATION_TEMPLATE_ID,
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    return res?.status === 200;
  } catch (error) {
    console.warn('EmailJS sendOrderConfirmation failed:', error);
    return false;
  }
}
