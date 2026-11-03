import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { formatPrice } from '../utils/formatPrice';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';

export const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist, totalWishlistItems } = useWishlist();
  const { addItem } = useCart();
  const { requireAuth } = useAuth();
  const { showNotification } = useNotification();

  const handleMoveToCart = (product) => {
    requireAuth(() => {
      addItem(product, 1);
      removeFromWishlist(product.id);
      showNotification({
        title: 'Added to cart.',
        message: `"${product.title}" has been moved to your shopping cart.`,
        type: 'success',
      });
    });
  };

  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product.id);
    showNotification({
      title: 'Removed from wishlist.',
      message: `"${product.title}" has been removed from your wishlist.`,
      type: 'info',
    });
  };

  const handleClearWishlist = () => {
    clearWishlist();
    showNotification({
      title: 'Wishlist cleared.',
      message: 'All saved pieces have been removed from your wishlist.',
      type: 'info',
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1E140E]">
          <Heart className="w-8 h-8 opacity-60" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1E140E] mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-[#7A706A] mb-8 max-w-md mx-auto leading-relaxed">
          Save your favorite heirloom furniture pieces here while planning your interior sanctuary.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#1E140E] text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#2B231D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Explore Masterpieces
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
            Saved Creations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E140E]">
            Wishlist ({totalWishlistItems} {totalWishlistItems === 1 ? 'piece' : 'pieces'})
          </h1>
        </div>

        <button
          type="button"
          onClick={handleClearWishlist}
          className="text-xs uppercase tracking-widest text-[#D1405D] hover:underline self-start sm:self-auto font-semibold"
        >
          Clear Wishlist
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map(({ product }) => (
          <div
            key={product.id}
            className="group flex flex-col bg-[#FAF8F5] border border-[#E1DFDC] transition-all duration-300 hover:shadow-tactile hover:border-[#80756F]"
          >
            {/* 4:5 Image */}
            <div className="relative aspect-[4/5] bg-[#F2EDE4] overflow-hidden">
              <Link to={`/product/${product.id}`}>
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.title}
                  fallbackTitle={product.title}
                  aspectRatioClass="aspect-[4/5]"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <button
                type="button"
                onClick={() => handleRemoveFromWishlist(product)}
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-[#1E140E] hover:text-[#D1405D] rounded-full transition-colors z-10"
                aria-label={`Remove ${product.title} from Wishlist`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info & Action */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold text-[#1E140E] mb-1 line-clamp-1">
                  <Link to={`/product/${product.id}`} className="hover:underline hover:text-[#D1405D]">
                    {product.title}
                  </Link>
                </h3>
                <p className="text-sm font-semibold text-[#1E140E] font-sans mb-3">
                  {formatPrice(product.price)}
                </p>
                <p className="text-xs text-[#7A706A] font-sans">
                  {product.materials[0]} &bull; {product.roomType}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E1DFDC] mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMoveToCart(product)}
                  className="w-full bg-[#1E140E] text-white py-2.5 px-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#2B231D] flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
