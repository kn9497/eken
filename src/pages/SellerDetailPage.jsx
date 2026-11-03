import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, ArrowLeft } from 'lucide-react';
import { sellers } from '../data/sellers';
import { products } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';

export const SellerDetailPage = () => {
  const { id } = useParams();
  const seller = sellers.find((s) => s.id === id);
  const sellerProducts = seller ? products.filter((p) => p.sellerId === seller.id) : [];

  if (!seller) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Atelier Not Found</h1>
        <p className="text-sm text-[#7A706A] mb-8">
          The requested workshop is not listed in our atelier registry.
        </p>
        <Link
          to="/sellers"
          className="inline-flex items-center gap-2 bg-[#1E140E] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          View All Ateliers
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Atelier Banner */}
      <div className="relative bg-[#1E140E] text-[#FAF8F5] min-h-[42vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={seller.coverImage}
            alt={`${seller.name} workshop`}
            fallbackTitle={seller.name}
            aspectRatioClass="h-full w-full"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E140E] via-[#1E140E]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#BA8888]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/sellers" className="hover:text-white transition-colors">Ateliers</Link>
              </li>
              <li>/</li>
              <li className="text-white font-semibold" aria-current="page">{seller.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#CEA642] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {seller.location}, {seller.state}
              </span>
              <span className="text-xs text-[#BA8888]">&bull;</span>
              <span className="text-xs text-[#BA8888]">Est. {seller.establishedYear}</span>
              <span className="text-xs text-[#BA8888]">&bull;</span>
              <div className="inline-flex items-center gap-1 text-xs text-white">
                <Star className="w-3.5 h-3.5 fill-[#CEA642] text-[#CEA642]" />
                <span className="font-semibold">{seller.rating.toFixed(1)}</span>
                <span className="text-[#D1C4BD]">({seller.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
              {seller.name}
            </h1>
            <p className="text-sm sm:text-base text-[#D1C4BD] font-sans leading-relaxed">
              {seller.bio}
            </p>

            {/* Direct Contact Links (D-07) */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              {seller.phone ? (
                <a
                  href={`tel:${seller.phone}`}
                  className="bg-white text-[#1E140E] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#F2EDE4] transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Atelier ({seller.phone})
                </a>
              ) : (
                <span className="text-xs text-[#BA8888] italic">Phone unavailable</span>
              )}

              {seller.email ? (
                <a
                  href={`mailto:${seller.email}?subject=EKEN Inquiry for ${encodeURIComponent(seller.name)}`}
                  className="border border-[#FAF8F5]/50 text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#1E140E] transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Direct Email
                </a>
              ) : (
                <span className="text-xs text-[#BA8888] italic">Email unavailable</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Atelier Craft Specialty Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6 bg-[#F2EDE4] border border-[#E1DFDC] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#7A706A] block mb-1">
              Primary Specialty
            </span>
            <p className="text-sm font-semibold text-[#1E140E]">
              {seller.specialty}
            </p>
          </div>
          <div className="text-right sm:border-l sm:border-[#D1C4BD] sm:pl-6">
            <span className="text-[11px] uppercase tracking-widest text-[#7A706A] block">
              Flagship Creation
            </span>
            <span className="font-serif text-sm font-semibold text-[#1E140E]">
              {seller.featuredPiece}
            </span>
          </div>
        </div>
      </div>

      {/* Products from this Atelier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="pb-6 mb-8 border-b border-[#E1DFDC] flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#1E140E]">
            Atelier Creations ({sellerProducts.length})
          </h2>
          <span className="text-xs uppercase tracking-widest text-[#7A706A]">
            Direct from Workshop
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
