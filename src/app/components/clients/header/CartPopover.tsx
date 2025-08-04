'use client';

import { useCart } from '../../../../store/hooks';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { removeItem, updateQuantity } from '../../../../store/cartSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPopover() {
  const { cartItems, totalPrice } = useCart();
  const authState = useAppSelector((state) => state.auth);
  const user = authState?.user ?? null;
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(totalPrice).replace('GHS', 'GH₵');

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!user) {
      toast.error('Please sign in to continue');
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    router.push('/checkout');
  };

  const truncateProductName = (name: string, maxLength: number = 25) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-black rounded-lg shadow-2xl border border-gray-800 z-50 animate-in slide-in-from-top-2 duration-200">
      <div className="p-6">
        {cartItems.length > 0 ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h3>
            </div>
            
            <div className="max-h-80 overflow-y-auto space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-white font-medium mb-1" title={item.name}>
                      {truncateProductName(item.name)}
                    </h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#EFE554] font-semibold">
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'GHS',
                          minimumFractionDigits: 2
                        }).format(item.price).replace('GHS', 'GH₵')}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch(updateQuantity({ productId: item.product_id, quantity: (item.quantity || 1) - 1 }))}
                          className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs hover:bg-gray-600 transition-colors flex items-center justify-center"
                          disabled={(item.quantity || 1) <= 1}
                        >
                          -
                        </button>
                        <span className="text-xs text-gray-300 w-8 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ productId: item.product_id, quantity: (item.quantity || 1) + 1 }))}
                          className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs hover:bg-gray-600 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Subtotal: {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'GHS',
                        minimumFractionDigits: 2
                      }).format(item.price * (item.quantity || 1)).replace('GHS', 'GH₵')}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => dispatch(removeItem(item.product_id))}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-4 mb-6">
              <div className="flex justify-between items-center text-white mb-2">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-[#EFE554]">{formattedTotal}</span>
              </div>
              <p className="text-xs text-gray-400">Shipping calculated at checkout</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                className="bg-gray-800 text-white px-4 py-3 rounded-lg text-center text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700"
              >
                View Basket
              </Link>
              <button
                onClick={handleProceedToCheckout}
                className="bg-[#EFE554] text-black px-4 py-3 rounded-lg text-center text-sm hover:bg-[#dbd348] transition-colors font-semibold"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <Image
                src="/images/clients/icons/empty-cart.svg"
                alt="Empty cart"
                width={32}
                height={32}
                className="opacity-50"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">Your cart is empty</p>
            <p className="text-gray-500 text-sm mb-4">Add some products to get started</p>
            <Link
              href="/products"
              className="inline-block bg-[#EFE554] text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#dbd348] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
