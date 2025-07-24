import React from 'react';
import { Metadata } from 'next';
import ResetPassword from '@/app/components/clients/my-account/reset-password';

export const metadata: Metadata = {
  title: 'Reset Password - Cyperus Enterprise',
  description: 'Reset your password for your Cyperus Enterprise account',
};

export default function ResetPasswordPage() {
  return (
    <div>
      <ResetPassword />
    </div>
  );
}
