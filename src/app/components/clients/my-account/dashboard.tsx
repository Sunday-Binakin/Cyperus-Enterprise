"use client";

import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'account-details', label: 'Account Details' },
    { id: 'logout', label: 'Logout' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-[#EFE554]">12</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-2">Pending Orders</h3>
                <p className="text-3xl font-bold text-[#EFE554]">3</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-2">Total Spent</h3>
                <p className="text-3xl font-bold text-[#EFE554]">GH₵450.00</p>
              </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-300">Order #1234 placed</span>
                  <span className="text-gray-500 text-sm">2 days ago</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-300">Payment confirmed for Order #1233</span>
                  <span className="text-gray-500 text-sm">5 days ago</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Profile updated</span>
                  <span className="text-gray-500 text-sm">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Orders</h2>
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">Order #1234</p>
                      <p className="text-gray-400 text-sm">Placed on January 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#EFE554] font-bold">GH₵75.00</p>
                      <span className="inline-block px-3 py-1 text-xs bg-green-900 text-green-300 rounded-full">Completed</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">Order #1233</p>
                      <p className="text-gray-400 text-sm">Placed on January 10, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#EFE554] font-bold">GH₵120.00</p>
                      <span className="inline-block px-3 py-1 text-xs bg-yellow-900 text-yellow-300 rounded-full">Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'downloads':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Downloads</h2>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <p className="text-gray-400">No downloadable products found.</p>
            </div>
          </div>
        );
      case 'addresses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Billing Address</h3>
                <div className="text-gray-300 space-y-1">
                  <p>John Doe</p>
                  <p>123 Main Street</p>
                  <p>Accra, Greater Accra</p>
                  <p>Ghana</p>
                </div>
                <button className="mt-4 text-[#EFE554] hover:text-[#d5cc49] text-sm">Edit</button>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Shipping Address</h3>
                <div className="text-gray-300 space-y-1">
                  <p>John Doe</p>
                  <p>123 Main Street</p>
                  <p>Accra, Greater Accra</p>
                  <p>Ghana</p>
                </div>
                <button className="mt-4 text-[#EFE554] hover:text-[#d5cc49] text-sm">Edit</button>
              </div>
            </div>
          </div>
        );
      case 'account-details':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Account Details</h2>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                      defaultValue="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-[#EFE554] text-[#4A651F] rounded-md font-semibold hover:bg-[#d5cc49] transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        );
      case 'logout':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Logout</h2>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <p className="text-gray-300 mb-4">Are you sure you want to logout?</p>
              <button className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors">
                Confirm Logout
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
          <p className="text-gray-400">Manage your account settings and view your order history</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-800 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#EFE554] text-white font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;