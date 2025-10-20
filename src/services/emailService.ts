/**
 * Service Layer - Email Service Interface
 * 
 * This abstraction separates email sending logic from components,
 * making it easier to test and switch email providers.
 */

export interface EmailServiceResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

export interface ExportInquiry {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  productsInterested: string[];
  orderQuantity: string;
  additionalInfo: string;
}

export interface DistributorInquiry {
  fullName: string;
  companyName: string;
  countryCity: string;
  email: string;
  phone: string;
  businessType: string;
  businessYears: string;
  currentlyDistributing: string;
  currentBrands?: string;
  interestedProducts: string[];
  monthlyQuantity?: string;
  packagingPreference: string;
  importExperience: string;
  shippingMethod?: string;
}

/**
 * Email Service Interface
 * Defines the contract for email sending operations
 */
export interface IEmailService {
  sendContactInquiry(data: ContactInquiry): Promise<EmailServiceResponse>;
  sendExportInquiry(data: ExportInquiry): Promise<EmailServiceResponse>;
  sendDistributorInquiry(data: DistributorInquiry): Promise<EmailServiceResponse>;
}

/**
 * Email Service Implementation using Resend
 */
export class ResendEmailService implements IEmailService {
  async sendContactInquiry(data: ContactInquiry): Promise<EmailServiceResponse> {
    try {
      const { sendContactInquiryEmail } = await import('@/app/actions/sendContactInquiry');
      return await sendContactInquiryEmail(data);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send contact inquiry'
      };
    }
  }

  async sendExportInquiry(data: ExportInquiry): Promise<EmailServiceResponse> {
    try {
      const { sendExportInquiryEmail } = await import('@/app/actions/sendExportInquiry');
      return await sendExportInquiryEmail(data);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send export inquiry'
      };
    }
  }

  async sendDistributorInquiry(data: DistributorInquiry): Promise<EmailServiceResponse> {
    try {
      const { sendDistributorInquiryEmail } = await import('@/app/actions/sendDistributorInquiry');
      return await sendDistributorInquiryEmail(data);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send distributor inquiry'
      };
    }
  }
}

// Singleton instance
let emailServiceInstance: IEmailService | null = null;

/**
 * Get the email service instance
 * This allows for easy testing by injecting a mock service
 */
export function getEmailService(): IEmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new ResendEmailService();
  }
  return emailServiceInstance;
}

/**
 * Set a custom email service (useful for testing)
 */
export function setEmailService(service: IEmailService): void {
  emailServiceInstance = service;
}
