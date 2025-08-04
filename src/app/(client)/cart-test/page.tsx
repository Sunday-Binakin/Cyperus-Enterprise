'use client';

import { useCart } from '@/store/hooks';
import { addItem, removeItem, clearCart } from '@/store/cartSlice';

export default function CartTestPage() {
  const { cartItems, totalItems, totalPrice, dispatch } = useCart();

  const testProduct = {
    product_id: 'test-1',
    name: 'Test Product',
    price: 100,
    image: '/test-image.jpg',
    inventory: 50
  };

  const handleAddItem = () => {
    dispatch(addItem(testProduct));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem('test-1'));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Cart Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cart Status</h2>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: GH₵{totalPrice.toFixed(2)}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.product_id} className="p-4 border rounded">
                <p><strong>{item.name}</strong></p>
                <p>Price: GH₵{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: GH₵{(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-x-4">
        <button 
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Test Item
        </button>
        <button 
          onClick={handleRemoveItem}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove Test Item
        </button>
        <button 
          onClick={handleClearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify({ cartItems, totalItems, totalPrice }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
