import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, Info } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useNotification } from '../hooks/useNotification';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import { formatPrice } from '../utils/formatPrice';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';

export const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    shipping,
    tax,
    total,
    notice, // "Shipping and tax are not included in this version."
  } = useCart();

  const { showNotification } = useNotification();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [clearCartConfirmOpen, setClearCartConfirmOpen] = useState(false);

  const handleDecreaseQuantity = (item) => {
    if (item.quantity <= 1) {
      setItemToRemove(item);
    } else {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };

  const handleTrashClick = (item) => {
    setItemToRemove(item);
  };

  const handleConfirmItemRemove = () => {
    if (!itemToRemove) return;
    removeItem(itemToRemove.product.id);
    showNotification({
      title: 'Removed from cart.',
      message: `"${itemToRemove.product.title}" has been removed from your cart.`,
      type: 'info',
    });
    setItemToRemove(null);
  };

  const handleClearAllClick = () => {
    setClearCartConfirmOpen(true);
  };

  const handleConfirmClearCart = () => {
    clearCart();
    showNotification({
      title: 'Cart cleared.',
      message: 'All items have been removed from your cart.',
      type: 'info',
    });
    setClearCartConfirmOpen(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1E140E]">
          <ShoppingBag className="w-8 h-8 opacity-60" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1E140E] mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-[#7A706A] mb-8 max-w-md mx-auto leading-relaxed">
          You haven't reserved any artisanal creations yet. Discover handcrafted solid wood pieces from our master ateliers.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#1E140E] text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#2B231D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#E1DFDC] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A706A] font-semibold block mb-1">
            Artisanal Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E140E]">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          type="button"
          onClick={handleClearAllClick}
          className="text-xs uppercase tracking-widest text-[#D1405D] hover:underline self-start sm:self-auto font-semibold"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => {
            const lineTotal = item.product.price * item.quantity;
            return (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-[#FAF8F5] border border-[#E1DFDC]"
              >
                {/* 4:5 Thumbnail */}
                <div className="w-24 aspect-[4/5] bg-[#F2EDE4] overflow-hidden flex-shrink-0">
                  <Link to={`/product/${item.product.id}`}>
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fallbackTitle={item.product.title}
                      aspectRatioClass="aspect-[4/5]"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg font-semibold text-[#1E140E] mb-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="hover:underline hover:text-[#D1405D] transition-colors"
                    >
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#7A706A] font-sans uppercase tracking-wider mb-2">
                    Unit Price: {formatPrice(item.product.price)}
                  </p>
                  <p className="text-xs text-[#4E4540]">
                    Lead Time: {item.product.leadTime}
                  </p>
                </div>

                {/* Quantity Controls - 44x44px touch targets */}
                <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start">
                  <div className="flex items-center border border-[#1E140E] bg-white">
                    <button
                      type="button"
                      onClick={() => handleDecreaseQuantity(item)}
                      className="w-11 h-11 flex items-center justify-center text-base font-bold text-[#1E140E] hover:bg-[#F2EDE4] active:bg-[#E5DDCF] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E140E]"
                      aria-label={`Decrease quantity of ${item.product.title}`}
                    >
                      -
                    </button>
                    <span className="min-w-[44px] h-11 flex items-center justify-center text-sm font-semibold font-sans border-x border-[#1E140E] select-none">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center text-base font-bold text-[#1E140E] hover:bg-[#F2EDE4] active:bg-[#E5DDCF] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E140E]"
                      aria-label={`Increase quantity of ${item.product.title}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="text-sm font-bold font-sans text-[#1E140E] w-24 text-right">
                    {formatPrice(lineTotal)}
                  </span>

                  {/* Remove Action - enlarged touch target with confirmation dialog */}
                  <button
                    type="button"
                    onClick={() => handleTrashClick(item)}
                    className="w-11 h-11 flex items-center justify-center text-[#7A706A] hover:text-[#D1405D] hover:bg-[#F2EDE4] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D1405D]"
                    aria-label={`Remove ${item.product.title} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Working Continue Shopping Link (D-03) */}
          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1E140E] hover:text-[#D1405D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary & Notice (D-02, D-03) */}
        <div className="lg:col-span-4">
          <div className="bg-[#F2EDE4] border border-[#E1DFDC] p-6 space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#1E140E]">
              Order Summary
            </h2>

            <dl className="space-y-3 text-sm font-sans">
              <div className="flex justify-between text-[#4E4540]">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-[#1E140E]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#4E4540]">
                <span>Estimated Shipping</span>
                <span className="font-medium text-[#1E140E]">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-[#4E4540]">
                <span>Estimated Tax</span>
                <span className="font-medium text-[#1E140E]">{formatPrice(tax)}</span>
              </div>

              {/* Total Calculation: total = subtotal + shipping + tax */}
              <div className="pt-4 border-t border-[#D1C4BD] flex justify-between text-base font-bold text-[#1E140E]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </dl>

            {/* Mandatory Notice Display (D-02) */}
            <div className="p-3 bg-[#FAF8F5] border border-[#D1C4BD] text-xs text-[#4E4540] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#D1405D] flex-shrink-0 mt-0.5" />
              <p className="font-sans leading-relaxed">
                {notice}
              </p>
            </div>

            {/* Locked D-03: DO NOT implement a Checkout button. Provide working Continue shopping link. */}
            <div className="pt-2">
              <Link
                to="/products"
                className="w-full bg-[#1E140E] text-[#FAF8F5] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold hover:bg-[#2B231D] transition-all flex items-center justify-center gap-2 shadow-tactile block text-center"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Removal Confirmation Dialog */}
      <ConfirmationModal
        isOpen={Boolean(itemToRemove)}
        onClose={() => setItemToRemove(null)}
        onConfirm={handleConfirmItemRemove}
        title="Remove this product?"
        message={
          itemToRemove
            ? `Are you sure you want to remove "${itemToRemove.product.title}" from your cart?`
            : ''
        }
        confirmText="Yes, Remove"
        cancelText="Cancel"
        isDestructive={true}
      />

      {/* Clear All Items Confirmation Dialog */}
      <ConfirmationModal
        isOpen={clearCartConfirmOpen}
        onClose={() => setClearCartConfirmOpen(false)}
        onConfirm={handleConfirmClearCart}
        title="Clear shopping cart?"
        message={`Are you sure you want to remove all ${totalItems} items from your cart?`}
        confirmText="Yes, Clear All"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
};
