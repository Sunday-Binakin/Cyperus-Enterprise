// Real Email Service using Resend
// Install: npm install resend

import { Resend } from 'resend';

class EmailService {
  private resend: Resend | null = null;

  constructor() {
    // Only initialize on server side
    if (typeof window === 'undefined' && process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    }
  }

  async sendActivationEmail(email: string, token: string) {
    if (!this.resend) {
      console.log(`📧 [MOCK] Activation email would be sent to ${email} with token: ${token}`);
      console.log(`🔗 Activation link: ${process.env.NEXT_PUBLIC_APP_URL}/auth/activate?token=${token}&email=${email}`);
      return Promise.resolve();
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: 'Cyperus <noreply@your-domain.com>', // Replace with your domain
        to: [email],
        subject: 'Activate Your Cyperus Account',
        html: this.getActivationEmailTemplate(email, token),
      });

      if (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send activation email');
      }

      console.log('✅ Activation email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    if (!this.resend) {
      console.log(`📧 [MOCK] Password reset email would be sent to ${email} with token: ${token}`);
      console.log(`🔗 Reset link: ${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}&email=${email}`);
      return Promise.resolve();
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: 'Cyperus <noreply@your-domain.com>', // Replace with your domain
        to: [email],
        subject: 'Reset Your Cyperus Password',
        html: this.getPasswordResetEmailTemplate(email, token),
      });

      if (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send password reset email');
      }

      console.log('✅ Password reset email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }

  private getActivationEmailTemplate(email: string, token: string): string {
    const activationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/activate?token=${token}&email=${encodeURIComponent(email)}`;
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Activate Your Cyperus Account</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #4A651F; color: white; padding: 20px; text-align: center;">
              <h1>Welcome to Cyperus!</h1>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
              <h2>Activate Your Account</h2>
              <p>Hello!</p>
              <p>Thank you for registering with Cyperus. To complete your registration and activate your account, please click the button below:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${activationUrl}" 
                   style="background: #EFE554; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Activate Account
                </a>
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 3px;">
                ${activationUrl}
              </p>
              
              <p><strong>Note:</strong> This activation link will expire in 24 hours for security reasons.</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              
              <p style="color: #666; font-size: 14px;">
                If you didn't create an account with Cyperus, please ignore this email.
              </p>
            </div>
            
            <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
              <p>&copy; 2025 Cyperus Enterprise. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getPasswordResetEmailTemplate(email: string, token: string): string {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Cyperus Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #4A651F; color: white; padding: 20px; text-align: center;">
              <h1>Password Reset Request</h1>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
              <h2>Reset Your Password</h2>
              <p>Hello!</p>
              <p>We received a request to reset the password for your Cyperus account. If you made this request, click the button below to reset your password:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: #EFE554; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Reset Password
                </a>
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 3px;">
                ${resetUrl}
              </p>
              
              <p><strong>Note:</strong> This password reset link will expire in 1 hour for security reasons.</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              
              <p style="color: #666; font-size: 14px;">
                If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
              </p>
            </div>
            
            <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
              <p>&copy; 2025 Cyperus Enterprise. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

// Export singleton instance
export const emailService = new EmailService();
