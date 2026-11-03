import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, Shield, Clock, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { sellers } from '../data/sellers';
import { categories } from '../data/categories';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { formatPrice } from '../utils/formatPrice';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { ProductCard } from '../components/ui/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { requireAuth } = useAuth();
  const { showNotification } = useNotification();

  const product = products.find((p) => p.id === id);
  const seller = product ? sellers.find((s) => s.id === product.sellerId) : null;
  const category = product ? categories.find((c) => c.id === product.categoryId) : null;

  const wishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (!addedNotice) return;
    const timer = setTimeout(() => setAddedNotice(false), 3000);
    return () => clearTimeout(timer);
  }, [addedNotice]);

  const handleAddToCart = () => {
    if (!product) return;
    requireAuth(() => {
      addItem(product, quantity);
      showNotification({
        title: 'Added to cart.',
        message: `"${product.title}" has been added to your shopping cart.`,
        type: 'success',
      });
      setAddedNotice(true);
    });
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    requireAuth(() => {
      const willBeWishlisted = !wishlisted;
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

  const relatedProducts = product
    ? products
        .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.sellerId === product.sellerId))
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Piece Not Found</h1>
        <p className="text-sm text-[#7A706A] mb-8">
          The requested furniture creation is unavailable or may have been archived.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#1E140E] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center space-x-2 text-xs uppercase tracking-widest text-[#7A706A]">
          <li>
            <Link to="/" className="hover:text-[#1E140E] transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:text-[#1E140E] transition-colors">Catalog</Link>
          </li>
          {category && (
            <>
              <li>/</li>
              <li>
                <Link to={`/category/${category.slug}`} className="hover:text-[#1E140E] transition-colors">
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <li>/</li>
          <li className="text-[#1E140E] font-semibold truncate max-w-xs" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Left: Gallery (4:5 Aspect Ratio Container) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] bg-[#F2EDE4] overflow-hidden border border-[#E1DFDC]">
            <ImageWithFallback
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.title} view ${selectedImageIndex + 1}`}
              fallbackTitle={product.title}
              aspectRatioClass="aspect-[4/5]"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 aspect-[4/5] bg-[#F2EDE4] border-2 transition-all overflow-hidden flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#1E140E]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          {/* Atelier Link */}
          {seller && (
            <div className="flex items-center justify-between">
              <Link
                to={`/seller/${seller.id}`}
                className="text-xs uppercase tracking-[0.25em] text-[#7A706A] hover:text-[#1E140E] transition-colors font-semibold flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D1405D]" />
                {seller.name} &bull; {seller.location}
              </Link>
              <span className="text-xs text-[#80756F] uppercase tracking-wider">
                Popularity: {product.popularity}/100
              </span>
            </div>
          )}

          {/* Title & Price */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E140E] leading-tight mb-3">
              {product.title}
            </h1>
            <p className="font-sans text-2xl font-bold text-[#1E140E]">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Stock & Lead Time Badges */}
          <div className="flex items-center gap-3 py-1">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E1DFDC] text-[#1E140E] text-xs font-sans uppercase tracking-widest px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                In Stock & Ready for Dispatch
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E1DFDC] text-[#7A706A] text-xs font-sans uppercase tracking-widest px-3 py-1">
                <Clock className="w-3.5 h-3.5 text-[#D1405D]" />
                Made to Order &bull; Lead Time: {product.leadTime}
              </span>
            )}
          </div>

          {/* Editorial Description */}
          <div className="border-t border-b border-[#E1DFDC] py-5">
            <p className="text-sm text-[#4E4540] font-sans leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart & Wishlist Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#1E140E] bg-[#FAF8F5]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 text-sm text-[#1E140E] hover:bg-[#F2EDE4] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-sm font-semibold text-[#1E140E] font-sans">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2.5 text-sm text-[#1E140E] hover:bg-[#F2EDE4] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#1E140E] text-white py-3.5 px-6 text-xs uppercase tracking-widest font-semibold hover:bg-[#2B231D] active:bg-[#161311] transition-all flex items-center justify-center gap-2 shadow-tactile"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              {/* Wishlist Toggle Button */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`p-3.5 border transition-colors flex items-center justify-center ${
                  wishlisted
                    ? 'bg-[#D1405D] text-white border-[#D1405D]'
                    : 'border-[#1E140E] text-[#1E140E] hover:bg-[#F2EDE4]'
                }`}
                aria-label={
                  wishlisted
                    ? `Remove ${product.title} from Wishlist`
                    : `Add ${product.title} to Wishlist`
                }
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Added Feedback Toast */}
            {addedNotice && (
              <div className="p-3 bg-[#FAF8F5] border border-emerald-600/40 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added {quantity} &times; "{product.title}" to your cart.</span>
                <Link to="/cart" className="underline font-semibold ml-auto">
                  View Cart
                </Link>
              </div>
            )}
          </div>

          {/* Product Specifications Table */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1E140E]">
              Specifications & Craftsmanship
            </h3>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-sans border-t border-[#E1DFDC] pt-3">
              <dt className="text-[#7A706A] uppercase tracking-wider">Dimensions</dt>
              <dd className="text-[#1E140E] font-medium">
                {product.dimensions.width} &times; {product.dimensions.height} &times; {product.dimensions.depth} {product.dimensions.unit}
              </dd>

              <dt className="text-[#7A706A] uppercase tracking-wider">Materials</dt>
              <dd className="text-[#1E140E] font-medium">
                {product.materials.join(', ')}
              </dd>

              <dt className="text-[#7A706A] uppercase tracking-wider">Room Space</dt>
              <dd className="text-[#1E140E] font-medium">{product.roomType}</dd>

              <dt className="text-[#7A706A] uppercase tracking-wider">Lead Time</dt>
              <dd className="text-[#1E140E] font-medium">{product.leadTime}</dd>
            </dl>
          </div>

          {/* Atelier Direct Contact Module (D-07) */}
          {seller && (
            <div className="p-5 bg-[#F2EDE4] border border-[#E1DFDC] space-y-3 mt-6">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-bold text-[#1E140E]">
                  Inquire with {seller.name}
                </h4>
                <Link
                  to={`/seller/${seller.id}`}
                  className="text-[11px] uppercase tracking-wider text-[#D1405D] hover:underline font-semibold"
                >
                  Atelier Profile &rarr;
                </Link>
              </div>
              <p className="text-xs text-[#4E4540] font-sans leading-relaxed">
                Connect directly with the atelier for custom wood staining, dimensions, or fabric swatches.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {seller.phone && (
                  <a
                    href={`tel:${seller.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white border border-[#D1C4BD] px-3 py-2 text-[#1E140E] hover:bg-[#1E140E] hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {seller.phone}
                  </a>
                )}
                {seller.email && (
                  <a
                    href={`mailto:${seller.email}?subject=Inquiry regarding ${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white border border-[#D1C4BD] px-3 py-2 text-[#1E140E] hover:bg-[#1E140E] hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Atelier
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Security & Authenticity Guarantee */}
          <div className="flex items-center gap-3 text-xs text-[#7A706A] pt-2">
            <Shield className="w-4 h-4 text-[#D1405D]" />
            <span>Verifiable provenance & generational joinery guarantee.</span>
          </div>
        </div>
      </div>

      {/* Related Pieces */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E1DFDC]">
          <h2 className="font-serif text-2xl font-bold text-[#1E140E] mb-8">
            Complementary Pieces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
