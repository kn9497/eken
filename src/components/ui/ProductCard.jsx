import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { formatPrice } from '../../utils/formatPrice';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { sellers } from '../../data/sellers';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { requireAuth } = useAuth();
  const { showNotification } = useNotification();
  const wishlisted = isInWishlist(product.id);
  const seller = sellers.find((s) => s.id === product.sellerId);

  const handleToggleWishlist = () => {
    requireAuth(() => {
      const willBeWishlisted = !isInWishlist(product.id);
      toggleWishlist(product);
      if (willBeWishlisted) {
        showNotification({
          title: 'Added to wishlist.',
          message: `"${product.title}" has been saved to your wishlist.`,
          type: 'success',
        });
      } else {
        showNotification({
          title: 'Removed from wishlist.',
          message: `"${product.title}" has been removed from your wishlist.`,
          type: 'info',
        });
      }
    });
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    requireAuth(() => {
      addItem(product, 1);
      showNotification({
        title: 'Added to cart.',
        message: `"${product.title}" has been added to your shopping cart.`,
        type: 'success',
      });
    });
  };

  return (
    <article className="group relative flex flex-col bg-transparent transition-all duration-300">
      {/* 4:5 Image Container (D-05) */}
      <div className="relative overflow-hidden aspect-[4/5] bg-[#F2EDE4]">
        <Link
          to={`/product/${product.id}`}
          className="block w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
          aria-label={`View details for ${product.title}`}
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={product.title}
            fallbackTitle={product.title}
            aspectRatioClass="aspect-[4/5]"
            className="transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 z-10 ${
            wishlisted
              ? 'bg-[#D1405D] text-white shadow-md'
              : 'bg-white/80 backdrop-blur-sm text-[#1E140E] hover:bg-white hover:text-[#D1405D]'
          }`}
          aria-label={
            wishlisted
              ? `Remove ${product.title} from Wishlist`
              : `Add ${product.title} to Wishlist`
          }
        >
          <Heart
            className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`}
            strokeWidth={1.8}
          />
        </button>

        {/* In-Stock or Lead Time Badge */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1 pointer-events-none">
          {!product.inStock ? (
            <span className="bg-[#1E140E]/80 backdrop-blur-sm text-[#FAF8F5] text-[10px] uppercase font-sans tracking-widest px-2 py-0.5">
              Made to Order
            </span>
          ) : (
            <span className="bg-white/90 backdrop-blur-sm text-[#1E140E] text-[10px] uppercase font-sans tracking-widest px-2 py-0.5">
              In Stock
            </span>
          )}
        </div>

        {/* Quick Add Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#1E140E] text-[#FAF8F5] text-xs uppercase tracking-widest py-2.5 px-4 font-medium flex items-center justify-center gap-2 hover:bg-[#2B231D] active:bg-[#161311] shadow-tactile transition-colors"
            aria-label={`Add ${product.title} to Cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {seller && (
          <Link
            to={`/seller/${seller.id}`}
            className="text-[11px] uppercase tracking-wider text-[#7A706A] hover:text-[#1E140E] transition-colors mb-1 truncate block"
          >
            {seller.name}
          </Link>
        )}

        <h3 className="font-serif text-base text-[#1E140E] font-medium leading-snug line-clamp-1 mb-1">
          <Link
            to={`/product/${product.id}`}
            className="hover:underline hover:text-[#D1405D] transition-colors"
          >
            {product.title}
          </Link>
        </h3>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-sm font-semibold text-[#1E140E] font-sans">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#80756F]">
            Pop. {product.popularity}
          </span>
        </div>
      </div>
    </article>
  );
};
