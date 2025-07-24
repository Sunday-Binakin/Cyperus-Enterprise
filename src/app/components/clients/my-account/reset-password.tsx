"use client";

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';

export default function ResetPassword() {
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('Please enter your username or email address');
            return;
        }

        try {
            setLoading(true);
            await resetPassword(email);
            toast.success('Password reset email sent! Check your inbox.');
            setEmail(''); // Clear the form
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col    px-4 py-32">

            <h1 className="text-6xl font-semibold text-white my-5 flex justify-center items-center">
                Set password
            </h1>

            <div className='flex flex-col w-[60%] mx-auto'>
                <p className="text-gray-400 ml-12   max-w-lg mx-auto mt-20">
                    Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
                </p>
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="w-2/3">
                <div className="space-y-3 m-10">
                    <label
                        htmlFor="email"
                        className="block text-gray-300 text-base font-medium"
                    >
                        Username or email <span className="text-red-500">*</span>
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-2/3 px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-[#EFE554] transition-colors"
                        placeholder="Enter your username or email"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-[35%] ml-10 h-12 -mt-20 bg-[#EFE554] text-[#4A651F] py-4 px-6 rounded-md text-[12px] font-bold uppercase tracking-wide hover:bg-[#d5cc49] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFE554] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {loading ? 'SENDING...' : 'RESET PASSWORD'}
                </button>
            </form>
            </div>
        </div>

    );
}
