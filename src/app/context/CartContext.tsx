'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';

interface CartItem {
  id: string; // Cart item ID from database
  product_id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  image: string;
  quantity: number;
  inventory: number; // Available stock
}

interface DatabaseCartItem {
  id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  price: number;
  products?: {
    name: string;
    image_url: string;
    inventory: number;
  } | null;
  variants?: {
    name: string;
    inventory: number;
  } | null;
}

interface LocalStorageCartItem {
  id?: string;
  product_id?: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  image: string;
  quantity: number;
  inventory?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: {
    product_id: string;
    variant_id?: string;
    name: string;
    variant_name?: string;
    price: number;
    image: string;
    inventory: number;
  }) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isLoading: boolean;
  syncCartFromLocalStorage: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  // Generate or get session ID for guests
  const getSessionId = () => {
    let sessionId = localStorage.getItem('guest_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('guest_session_id', sessionId);
    }
    return sessionId;
  };

  // Load cart from Supabase on mount or user change
  useEffect(() => {
    loadCartFromDatabase();
  }, [user]);

  // Load cart items from database
  const loadCartFromDatabase = async () => {
    setIsLoading(true);
    try {
      // Check if we have a valid Supabase client
      if (!supabase) {
        console.warn('Supabase client not available');
        setItems([]);
        return;
      }

      let query = supabase
        .from('cart')
        .select(`
          id,
          product_id,
          variant_id,
          quantity,
          price,
          products (
            name,
            image_url,
            inventory
          ),
          variants (
            name,
            inventory
          )
        `);

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading cart:', error);
        console.error('Error details:', error.message, error.details, error.hint);
        
        // If it's a table not found error, use localStorage fallback
        if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
          console.warn('Database tables not found, using localStorage fallback');
          loadCartFromLocalStorage();
          return;
        }
        return;
      }

      const cartItems: CartItem[] = (data || []).map((item: DatabaseCartItem) => ({
        id: item.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        name: item.products?.name || 'Unknown Product',
        variant_name: item.variants?.name,
        price: item.price,
        image: item.products?.image_url || '/placeholder-product.jpg',
        quantity: item.quantity,
        inventory: item.variant_id ? (item.variants?.inventory || 0) : (item.products?.inventory || 0)
      }));

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart from database:', error);
      console.warn('Falling back to localStorage');
      loadCartFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback: Load cart from localStorage
  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const localItems = JSON.parse(savedCart);
        // Convert localStorage format to database format
        const cartItems: CartItem[] = localItems.map((item: LocalStorageCartItem, index: number) => ({
          id: `local_${index}`, // Temporary ID for local items
          product_id: item.id || item.product_id || `temp_${index}`,
          variant_id: item.variant_id,
          name: item.name,
          variant_name: item.variant_name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          inventory: item.inventory || 999
        }));
        setItems(cartItems);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setItems([]);
    }
  };

  // Sync localStorage cart to database when user logs in
  const syncCartFromLocalStorage = async () => {
    if (!user) return;

    const localCart = localStorage.getItem('cart');
    if (!localCart) return;

    try {
      const localItems = JSON.parse(localCart);
      for (const item of localItems) {
        await addItem({
          product_id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          inventory: 999 // Default inventory
        });
      }
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error syncing cart from localStorage:', error);
    }
  };

  // Add item to cart
  const addItem = async (newItem: {
    product_id: string;
    variant_id?: string;
    name: string;
    variant_name?: string;
    price: number;
    image: string;
    inventory: number;
  }) => {
    setIsLoading(true);
    try {
      // Check if database is available
      if (!supabase) {
        console.warn('Database not available, using localStorage fallback');
        addItemToLocalStorage(newItem);
        return;
      }

      const cartData = {
        user_id: user?.id || null,
        session_id: user ? null : getSessionId(),
        product_id: newItem.product_id,
        variant_id: newItem.variant_id || null,
        quantity: 1,
        price: newItem.price
      };

      // Check if item already exists in cart
      let query = supabase
        .from('cart')
        .select('id, quantity')
        .eq('product_id', newItem.product_id);

      if (newItem.variant_id) {
        query = query.eq('variant_id', newItem.variant_id);
      } else {
        query = query.is('variant_id', null);
      }

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_id', getSessionId());
      }

      const { data: existingItem, error: queryError } = await query.single();

      if (queryError && !queryError.message?.includes('No rows')) {
        throw queryError;
      }

      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity <= newItem.inventory) {
          await updateQuantity(existingItem.id, newQuantity);
        } else {
          toast.error('Not enough stock available');
        }
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart')
          .insert(cartData);

        if (error) throw error;
        await loadCartFromDatabase();
        toast.success(`${newItem.name} added to cart!`);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      console.warn('Falling back to localStorage');
      addItemToLocalStorage(newItem);
      toast.success(`${newItem.name} added to cart!`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback: Add item to localStorage
  const addItemToLocalStorage = (newItem: {
    product_id: string;
    variant_id?: string;
    name: string;
    variant_name?: string;
    price: number;
    image: string;
    inventory: number;
  }) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.product_id === newItem.product_id && 
        item.variant_id === newItem.variant_id
      );

      let newItems;
      if (existingItemIndex > -1) {
        // Update existing item
        newItems = currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        const newCartItem: CartItem = {
          id: `local_${Date.now()}`,
          product_id: newItem.product_id,
          variant_id: newItem.variant_id,
          name: newItem.name,
          variant_name: newItem.variant_name,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          inventory: newItem.inventory
        };
        newItems = [...currentItems, newCartItem];
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  // Remove item from cart
  const removeItem = async (cartItemId: string) => {
    setIsLoading(true);
    try {
      // Check if this is a local item (starts with 'local_')
      if (cartItemId.startsWith('local_')) {
        removeItemFromLocalStorage(cartItemId);
        return;
      }

      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
      
      setItems(items.filter(item => item.id !== cartItemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Fallback to local removal
      removeItemFromLocalStorage(cartItemId);
      toast.success('Item removed from cart');
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback: Remove item from localStorage
  const removeItemFromLocalStorage = (cartItemId: string) => {
    setItems(currentItems => {
      const newItems = currentItems.filter(item => item.id !== cartItemId);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  // Update item quantity
  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(cartItemId);
      return;
    }

    setIsLoading(true);
    try {
      // Check if this is a local item
      if (cartItemId.startsWith('local_')) {
        updateQuantityInLocalStorage(cartItemId, quantity);
        return;
      }

      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) throw error;
      
      setItems(items.map(item => 
        item.id === cartItemId 
          ? { ...item, quantity }
          : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Fallback to local update
      updateQuantityInLocalStorage(cartItemId, quantity);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback: Update quantity in localStorage
  const updateQuantityInLocalStorage = (cartItemId: string, quantity: number) => {
    setItems(currentItems => {
      const newItems = currentItems.map(item =>
        item.id === cartItemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  // Clear cart
  const clearCart = async () => {
    setIsLoading(true);
    try {
      // Always clear localStorage
      localStorage.removeItem('cart');
      
      // Try to clear database
      if (supabase) {
        let query = supabase.from('cart').delete();

        if (user) {
          query = query.eq('user_id', user.id);
        } else {
          query = query.eq('session_id', getSessionId());
        }

        const { error } = await query;
        if (error) {
          console.error('Error clearing cart from database:', error);
        }
      }
      
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Still clear local state even if database fails
      setItems([]);
      localStorage.removeItem('cart');
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Real-time subscription to cart changes (only when database is available)
  useEffect(() => {
    if (!user || !supabase) return;

    // Test if database is accessible before setting up subscription
    const testDatabaseConnection = async () => {
      try {
        const { error } = await supabase.from('cart').select('id').limit(1);
        if (error && error.message?.includes('relation') && error.message?.includes('does not exist')) {
          console.warn('Database tables not available, skipping real-time subscription');
          return;
        }

        // Database is available, set up real-time subscription
        const channel = supabase
          .channel('cart-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'cart',
              filter: `user_id=eq.${user.id}`
            },
            () => {
              loadCartFromDatabase();
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.warn('Could not set up real-time subscription:', error);
      }
    };

    const cleanup = testDatabaseConnection();
    return () => {
      cleanup?.then(fn => fn?.());
    };
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        syncCartFromLocalStorage,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
