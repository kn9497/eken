import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useLocalStorage('eken_v3_wishlist', []);

  const isInWishlist = (productId) => {
    return items.some((item) => item.product.id === productId);
  };

  const toggleWishlist = (product) => {
    setItems((prevItems) => {
      const exists = prevItems.some((item) => item.product.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.product.id !== product.id);
      }
      return [...prevItems, { product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        totalWishlistItems: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
