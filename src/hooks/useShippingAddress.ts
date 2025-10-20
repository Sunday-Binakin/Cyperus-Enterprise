import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { validateShippingAddress } from '@/utils/validators';

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
}

interface UseShippingAddressReturn {
  shippingAddress: ShippingAddress;
  savedAddresses: ShippingAddress[];
  selectedAddressIndex: number;
  showNewAddressForm: boolean;
  handleAddressChange: (field: keyof ShippingAddress, value: string) => void;
  selectSavedAddress: (index: number, address: ShippingAddress) => void;
  toggleNewAddressForm: (show: boolean) => void;
  validateAddress: () => boolean;
}

const MOCK_SAVED_ADDRESSES: ShippingAddress[] = [
  {
    full_name: 'John Doe',
    phone: '+233 123 456 789',
    address_line_1: '123 Independence Avenue',
    city: 'Accra',
    state: 'Greater Accra',
    postal_code: 'GA-123-4567',
    country: 'Ghana'
  }
];

export function useShippingAddress(): UseShippingAddressReturn {
  const [savedAddresses] = useState<ShippingAddress[]>(MOCK_SAVED_ADDRESSES);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    MOCK_SAVED_ADDRESSES.length > 0 
      ? MOCK_SAVED_ADDRESSES[0] 
      : {
          full_name: '',
          phone: '',
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'Ghana'
        }
  );

  const handleAddressChange = useCallback((
    field: keyof ShippingAddress,
    value: string
  ) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  }, []);

  const selectSavedAddress = useCallback((index: number, address: ShippingAddress) => {
    setSelectedAddressIndex(index);
    setShippingAddress(address);
    setShowNewAddressForm(false);
  }, []);

  const toggleNewAddressForm = useCallback((show: boolean) => {
    setShowNewAddressForm(show);
  }, []);

  const validateAddress = useCallback(() => {
    const validation = validateShippingAddress({
      full_name: shippingAddress.full_name,
      phone: shippingAddress.phone,
      address_line_1: shippingAddress.address_line_1,
      city: shippingAddress.city,
      state: shippingAddress.state
    });

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      toast.error(firstError);
      return false;
    }

    return true;
  }, [shippingAddress]);

  return {
    shippingAddress,
    savedAddresses,
    selectedAddressIndex,
    showNewAddressForm,
    handleAddressChange,
    selectSavedAddress,
    toggleNewAddressForm,
    validateAddress
  };
}
