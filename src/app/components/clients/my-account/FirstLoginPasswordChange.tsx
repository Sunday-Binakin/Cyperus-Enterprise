'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

interface FirstLoginPasswordChangeProps {
  onPasswordChanged: () => void;
}

export default function FirstLoginPasswordChange({ onPasswordChanged }: FirstLoginPasswordChangeProps) {
  const { changePassword, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      await changePassword(formData.currentPassword, formData.newPassword);
      toast.success('Password changed successfully!');
      onPasswordChanged();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#EFE554] mb-2">Change Your Password</h1>
          <p className="text-gray-300">
            Welcome {user?.user_metadata?.full_name || 'to Cyperus'}! For security, please change your temporary password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Temporary Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
                  placeholder="Enter your temporary password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  minLength={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters long</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EFE554] text-black py-3 rounded-lg font-semibold hover:bg-[#d4c948] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-gray-400">
          <p className="text-sm">
            This is a one-time security step to protect your account.
          </p>
        </div>
      </div>
    </div>
  );
}
