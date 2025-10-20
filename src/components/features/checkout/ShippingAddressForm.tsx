'use client';

import { Truck } from 'lucide-react';
import type { ShippingAddress } from '@/hooks/useShippingAddress';

interface ShippingAddressFormProps {
  emailForReceipt: string;
  onEmailChange: (email: string) => void;
  savedAddresses: ShippingAddress[];
  selectedAddressIndex: number | null;
  onSelectAddress: (index: number, address: ShippingAddress) => void;
  showNewAddressForm: boolean;
  onToggleNewAddressForm: (show: boolean) => void;
  shippingAddress: ShippingAddress;
  onAddressChange: (field: keyof ShippingAddress, value: string) => void;
}

export function ShippingAddressForm({
  emailForReceipt,
  onEmailChange,
  savedAddresses,
  selectedAddressIndex,
  onSelectAddress,
  showNewAddressForm,
  onToggleNewAddressForm,
  shippingAddress,
  onAddressChange
}: ShippingAddressFormProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Truck className="w-5 h-5 text-[#EFE554]" />
        <h2 className="text-xl font-semibold">Shipping Address</h2>
      </div>

      {/* Email for receipt */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Email for receipt</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={emailForReceipt}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
      </div>

      {savedAddresses.length > 0 && !showNewAddressForm ? (
        <div className="space-y-4">
          {savedAddresses.map((address, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAddressIndex === index
                  ? 'border-[#EFE554] bg-gray-800'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => onSelectAddress(index, address)}
            >
              <div className="font-medium">{address.full_name}</div>
              <div className="text-sm text-gray-400">
                {address.address_line_1}, {address.city}, {address.state}
              </div>
              <div className="text-sm text-gray-400">{address.phone}</div>
            </div>
          ))}
          
          <button
            onClick={() => onToggleNewAddressForm(true)}
            className="text-[#EFE554] hover:text-[#dbd348] transition-colors"
          >
            + Add new address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name *"
            value={shippingAddress.full_name}
            onChange={(e) => onAddressChange('full_name', e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            value={shippingAddress.phone}
            onChange={(e) => onAddressChange('phone', e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Address Line 1 *"
            value={shippingAddress.address_line_1}
            onChange={(e) => onAddressChange('address_line_1', e.target.value)}
            className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Address Line 2 (Optional)"
            value={shippingAddress.address_line_2 || ''}
            onChange={(e) => onAddressChange('address_line_2', e.target.value)}
            className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
          />
          <input
            type="text"
            placeholder="City *"
            value={shippingAddress.city}
            onChange={(e) => onAddressChange('city', e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
          />
          <input
            type="text"
            placeholder="State *"
            value={shippingAddress.state}
            onChange={(e) => onAddressChange('state', e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={shippingAddress.postal_code || ''}
            onChange={(e) => onAddressChange('postal_code', e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
          />
          
          {showNewAddressForm && (
            <button
              onClick={() => onToggleNewAddressForm(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to saved addresses
            </button>
          )}
        </div>
      )}
    </div>
  );
}
