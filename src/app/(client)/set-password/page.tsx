"use client";

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';

export default function SetPassword() {
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password.trim()) {
            toast.error('Please enter your password');
            return;
        }

        if (!confirmPassword.trim()) {
            toast.error('Please confirm your password');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            // Here you would typically call a different function to set the new password
            // For now, using resetPassword as placeholder
            await resetPassword(password);
            toast.success('Password set successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to set password';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-6">
                    <h1 className="text-6xl font-bold text-white">
                        Set password
                    </h1>
                    
                    <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                        Please enter your new password and confirm it below to complete the password reset process.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Password Field */}
                        <div className="space-y-3">
                            <label
                                htmlFor="password"
                                className="block text-gray-300 text-base font-medium"
                            >
                                Password <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-[#EFE554] transition-colors"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-3">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-300 text-base font-medium"
                            >
                                Repeat Password <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-[#EFE554] transition-colors"
                                placeholder="Repeat your password"
                            />
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-[#EFE554] text-[#4A651F] rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-[#d5cc49] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFE554] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'SETTING...' : 'SET PASSWORD'}
                        </button>
                    </div>
                </form>

                 
                 
            </div>
        </div>
    );
}
