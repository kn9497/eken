import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Layout } from './components/layout/Layout';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { SellersPage } from './pages/SellersPage';
import { SellerDetailPage } from './pages/SellerDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/sellers" element={<SellersPage />} />
                <Route path="/seller/:id" element={<SellerDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
  );
};

export default App;
