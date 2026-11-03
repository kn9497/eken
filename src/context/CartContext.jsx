import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateSubtotal, calculateTotal, SHIPPING_MINOR_UNITS, TAX_RATE } from '../utils/formatPrice';

export const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useLocalStorage('eken_v3_cart', []);

  const addItem = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // D-04: count total quantities rather than distinct products
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  // D-02: integer minor units arithmetic
  const subtotal = useMemo(() => {
    return calculateSubtotal(items);
  }, [items]);

  const shipping = SHIPPING_MINOR_UNITS;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = useMemo(() => calculateTotal(subtotal), [subtotal]);
  const notice = 'Shipping and tax are not included in this version.';

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
        notice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
