// Mock Email Service for Client-side Implementation
// In production, this would be replaced with actual email service integration

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export interface AccountActivationData {
  email: string;
  activationToken: string;
  temporaryPassword: string;
}

export interface PasswordResetData {
  email: string;
  resetToken: string;
}

class MockEmailService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  }

  /**
   * Send account activation email
   */
  async sendAccountActivationEmail(data: AccountActivationData): Promise<boolean> {
    try {
      const activationLink = `${this.baseUrl}/auth/activate?token=${data.activationToken}&email=${encodeURIComponent(data.email)}`;
      
      const template = this.getActivationEmailTemplate(data.email, activationLink, data.temporaryPassword);
      
      // Simulate email sending (in production, integrate with EmailJS, SendGrid, etc.)
      console.log('📧 Account Activation Email Sent:');
      console.log('To:', data.email);
      console.log('Subject:', template.subject);
      console.log('Activation Link:', activationLink);
      console.log('Temporary Password:', data.temporaryPassword);
      console.log('HTML Content:', template.htmlContent);
      
      // Store the email data in localStorage for demo purposes
      const emailData = {
        type: 'activation',
        email: data.email,
        activationToken: data.activationToken,
        temporaryPassword: data.temporaryPassword,
        sentAt: new Date().toISOString(),
        activated: false
      };
      
      this.saveEmailToStorage(emailData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Failed to send activation email:', error);
      return false;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(data: PasswordResetData): Promise<boolean> {
    try {
      const resetLink = `${this.baseUrl}/auth/reset-password?token=${data.resetToken}&email=${encodeURIComponent(data.email)}`;
      
      const template = this.getPasswordResetEmailTemplate(data.email, resetLink);
      
      console.log('📧 Password Reset Email Sent:');
      console.log('To:', data.email);
      console.log('Subject:', template.subject);
      console.log('Reset Link:', resetLink);
      console.log('HTML Content:', template.htmlContent);
      
      // Store the email data in localStorage for demo purposes
      const emailData = {
        type: 'password_reset',
        email: data.email,
        resetToken: data.resetToken,
        sentAt: new Date().toISOString(),
        used: false
      };
      
      this.saveEmailToStorage(emailData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      return false;
    }
  }

  /**
   * Get activation email template
   */
  private getActivationEmailTemplate(email: string, activationLink: string, temporaryPassword: string): EmailTemplate {
    return {
      subject: 'Activate Your Cyperus Account',
      textContent: `
Welcome to Cyperus!

Thank you for registering with us. To complete your account setup, please:

1. Click the following link to activate your account: ${activationLink}
2. Use this temporary password to sign in: ${temporaryPassword}
3. You'll be prompted to change your password on first login

If you didn't create this account, please ignore this email.

Best regards,
The Cyperus Team
      `,
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Activate Your Cyperus Account</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #EFE554; margin: 0;">Welcome to Cyperus!</h1>
    </div>
    
    <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 1px solid #333;">
        <h2 style="color: #EFE554; margin-top: 0;">Activate Your Account</h2>
        
        <p>Thank you for registering with Cyperus. To complete your account setup, please follow these steps:</p>
        
        <ol style="line-height: 1.6;">
            <li><strong>Click the activation button below:</strong></li>
        </ol>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${activationLink}" 
               style="background-color: #EFE554; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Activate Account
            </a>
        </div>
        
        <ol start="2" style="line-height: 1.6;">
            <li><strong>Use this temporary password to sign in:</strong></li>
        </ol>
        
        <div style="background-color: #333; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <code style="font-size: 18px; color: #EFE554; font-weight: bold;">${temporaryPassword}</code>
        </div>
        
        <ol start="3" style="line-height: 1.6;">
            <li><strong>You'll be prompted to change your password on first login</strong></li>
        </ol>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #ccc; font-size: 14px;">
            If you didn't create this account, please ignore this email.
        </p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
        <p>&copy; 2025 Cyperus Enterprise. All rights reserved.</p>
    </div>
</body>
</html>
      `
    };
  }

  /**
   * Get password reset email template
   */
  private getPasswordResetEmailTemplate(email: string, resetLink: string): EmailTemplate {
    return {
      subject: 'Reset Your Cyperus Password',
      textContent: `
Password Reset Request

We received a request to reset your password for your Cyperus account.

Click the following link to reset your password: ${resetLink}

This link will expire in 24 hours.

If you didn't request this password reset, please ignore this email.

Best regards,
The Cyperus Team
      `,
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reset Your Cyperus Password</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #EFE554; margin: 0;">Password Reset</h1>
    </div>
    
    <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 1px solid #333;">
        <h2 style="color: #EFE554; margin-top: 0;">Reset Your Password</h2>
        
        <p>We received a request to reset your password for your Cyperus account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #EFE554; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Reset Password
            </a>
        </div>
        
        <p style="color: #ccc;">This link will expire in 24 hours.</p>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #ccc; font-size: 14px;">
            If you didn't request this password reset, please ignore this email.
        </p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
        <p>&copy; 2025 Cyperus Enterprise. All rights reserved.</p>
    </div>
</body>
</html>
      `
    };
  }

  /**
   * Save email data to localStorage for demo purposes
   */
  private saveEmailToStorage(emailData: any): void {
    try {
      const existingEmails = JSON.parse(localStorage.getItem('mock_emails') || '[]');
      existingEmails.push(emailData);
      localStorage.setItem('mock_emails', JSON.stringify(existingEmails));
    } catch (error) {
      console.error('Failed to save email data:', error);
    }
  }

  /**
   * Get all emails from storage (for demo purposes)
   */
  getEmailsFromStorage(): any[] {
    try {
      return JSON.parse(localStorage.getItem('mock_emails') || '[]');
    } catch (error) {
      console.error('Failed to get emails from storage:', error);
      return [];
    }
  }

  /**
   * Find activation email by token
   */
  findActivationEmail(token: string, email: string): any | null {
    const emails = this.getEmailsFromStorage();
    return emails.find(e => 
      e.type === 'activation' && 
      e.activationToken === token && 
      e.email === email &&
      !e.activated
    ) || null;
  }

  /**
   * Find password reset email by token
   */
  findPasswordResetEmail(token: string, email: string): any | null {
    const emails = this.getEmailsFromStorage();
    return emails.find(e => 
      e.type === 'password_reset' && 
      e.resetToken === token && 
      e.email === email &&
      !e.used
    ) || null;
  }

  /**
   * Mark activation email as used
   */
  markActivationEmailAsUsed(token: string, email: string): void {
    try {
      const emails = this.getEmailsFromStorage();
      const emailIndex = emails.findIndex(e => 
        e.type === 'activation' && 
        e.activationToken === token && 
        e.email === email
      );
      
      if (emailIndex !== -1) {
        emails[emailIndex].activated = true;
        emails[emailIndex].activatedAt = new Date().toISOString();
        localStorage.setItem('mock_emails', JSON.stringify(emails));
      }
    } catch (error) {
      console.error('Failed to mark activation email as used:', error);
    }
  }

  /**
   * Mark password reset email as used
   */
  markPasswordResetEmailAsUsed(token: string, email: string): void {
    try {
      const emails = this.getEmailsFromStorage();
      const emailIndex = emails.findIndex(e => 
        e.type === 'password_reset' && 
        e.resetToken === token && 
        e.email === email
      );
      
      if (emailIndex !== -1) {
        emails[emailIndex].used = true;
        emails[emailIndex].usedAt = new Date().toISOString();
        localStorage.setItem('mock_emails', JSON.stringify(emails));
      }
    } catch (error) {
      console.error('Failed to mark password reset email as used:', error);
    }
  }
}

// Export singleton instance
export const mockEmailService = new MockEmailService();

// Utility functions
export const generateActivationToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const generateTemporaryPassword = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const generateResetToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
