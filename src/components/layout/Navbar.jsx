import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { AccountModal } from '../auth/AccountModal';
import { getInitials } from '../../utils/authCrypto';
import { categories } from '../../data/categories';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [spacesOpen, setSpacesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart(); // D-04: total quantity of items in cart
  const { totalWishlistItems } = useWishlist();
  const {
    user,
    isAuthenticated,
    isAccountModalOpen,
    accountModalTab,
    openAccountModal,
    closeAccountModal,
  } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E1DFDC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1E140E] hover:text-[#D1405D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation Links Left */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-medium transition-colors hover:text-[#D1405D] ${
                  isActive ? 'text-[#D1405D] border-b border-[#D1405D] pb-1' : 'text-[#1E140E]'
                }`
              }
            >
              All Pieces
            </NavLink>
            <div className="relative">
              <button
                type="button"
                onClick={() => setSpacesOpen(!spacesOpen)}
                onBlur={(e) => {
                  if (!e.currentTarget.parentElement.contains(e.relatedTarget)) {
                    setSpacesOpen(false);
                  }
                }}
                aria-expanded={spacesOpen}
                aria-haspopup="true"
                aria-label="Toggle Spaces collection menu"
                className={`text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer inline-flex items-center py-2 ${
                  spacesOpen ? 'text-[#D1405D]' : 'text-[#1E140E] hover:text-[#D1405D]'
                }`}
              >
                Spaces
              </button>
              {spacesOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-0 w-56 bg-[#FAF8F5] border border-[#E1DFDC] shadow-tactile p-3 transition-all z-50"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setSpacesOpen(false)}
                      role="menuitem"
                      className="block px-3 py-2 text-xs uppercase tracking-wider text-[#4E4540] hover:text-[#1E140E] hover:bg-[#F2EDE4] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <NavLink
              to="/sellers"
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-medium transition-colors hover:text-[#D1405D] ${
                  isActive ? 'text-[#D1405D] border-b border-[#D1405D] pb-1' : 'text-[#1E140E]'
                }`
              }
            >
              Ateliers
            </NavLink>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link
              to="/"
              className="inline-flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#1E140E] uppercase">
                EKEN
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#7A706A] -mt-0.5">
                Artisanal Furniture
              </span>
            </Link>
          </div>

          {/* Right Action Icons: Search, Account, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#1E140E] hover:text-[#D1405D] transition-colors"
              aria-label="Search furniture catalog"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Account / Profile Trigger */}
            <button
              type="button"
              onClick={() => openAccountModal('signin')}
              className="relative p-2 text-[#1E140E] hover:text-[#D1405D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
              aria-label={isAuthenticated && user ? `Account for ${user.fullName}` : 'Sign in or register'}
            >
              {isAuthenticated && user ? (
                <span className="w-6 h-6 bg-[#1E140E] text-white rounded-full flex items-center justify-center font-bold text-[10px] font-sans">
                  {getInitials(user.fullName)}
                </span>
              ) : (
                <User className="w-5 h-5" strokeWidth={1.75} />
              )}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#1E140E] hover:text-[#D1405D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
              aria-label={`Wishlist with ${totalWishlistItems} saved pieces`}
            >
              <Heart className="w-5 h-5" strokeWidth={1.75} />
              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#D1405D] text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center font-sans">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Link with Total Quantity Badge (D-04) */}
            <Link
              to="/cart"
              className="relative p-2 text-[#1E140E] hover:text-[#D1405D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#1E140E] text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center font-sans">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Collapsible Search Input Panel */}
        {searchOpen && (
          <div className="py-4 border-t border-[#E1DFDC] bg-[#FAF8F5]">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teak chairs, sal tables, credenzas, ateliers..."
                className="w-full bg-[#F2EDE4] border border-[#D1C4BD] py-3 pl-4 pr-12 text-sm text-[#1E140E] placeholder-[#7A706A] focus:outline-none focus:border-[#58150E]"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#1E140E] hover:text-[#D1405D]"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E1DFDC] px-6 py-6 space-y-4">
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#1E140E] py-2 border-b border-[#E1DFDC]"
          >
            All Collections
          </Link>
          <div className="space-y-2 py-2">
            <span className="text-xs uppercase tracking-widest text-[#7A706A] font-semibold block">
              Curated Spaces
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-wider text-[#4E4540] pl-3 py-1 hover:text-[#D1405D]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <Link
            to="/sellers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#1E140E] py-2 border-t border-[#E1DFDC]"
          >
            Master Ateliers
          </Link>
          <Link
            to="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#1E140E] py-2"
          >
            Wishlist ({totalWishlistItems})
          </Link>
          <Link
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#1E140E] py-2"
          >
            Cart ({totalItems})
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openAccountModal('signin');
            }}
            className="w-full text-left block text-sm uppercase tracking-widest font-medium text-[#1E140E] py-2 border-t border-[#E1DFDC]"
          >
            {isAuthenticated && user ? `My Account (${user.fullName})` : 'Sign In / Register'}
          </button>
        </div>
      )}

      {/* Customer Account & Authentication Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={closeAccountModal}
        initialTab={accountModalTab}
      />
    </header>
  );
};
