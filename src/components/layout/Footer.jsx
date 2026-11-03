import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { sellers } from '../../data/sellers';

export const Footer = () => {
  return (
    <footer className="bg-[#1E140E] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2B231D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#FAF8F5] uppercase">
                EKEN
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#BA8888]">
                Artisanal Furniture Marketplace
              </p>
            </Link>
            <p className="text-sm text-[#D1C4BD] font-sans leading-relaxed pt-2">
              Championing heirloom joinery, reclaimed woods, and generational atelier crafts across the Indian subcontinent. Built for longevity over trends.
            </p>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#BA8888] mb-4">
              Spaces & Collections
            </h4>
            <ul className="space-y-2 text-sm text-[#D1C4BD]">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All 40 Masterworks
                </Link>
              </li>
            </ul>
          </div>

          {/* Ateliers Col */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#BA8888] mb-4">
              Partner Ateliers
            </h4>
            <ul className="space-y-2 text-sm text-[#D1C4BD]">
              {sellers.map((seller) => (
                <li key={seller.id}>
                  <Link
                    to={`/seller/${seller.id}`}
                    className="hover:text-white transition-colors truncate block"
                  >
                    {seller.name} <span className="text-xs text-[#80756F]">({seller.location})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/sellers" className="hover:text-white transition-colors font-medium text-white">
                  Explore All Ateliers &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Craft Principles & Contact Notice */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#BA8888] mb-4">
              Direct Atelier Access
            </h4>
            <p className="text-sm text-[#D1C4BD] leading-relaxed">
              Every creation on EKEN connects you directly with the craftsperson. Reach ateliers via telephone or direct email for bespoke custom sizing.
            </p>
            <div className="p-3 bg-[#2B231D] border border-[#80756F]/30 text-xs text-[#D1C4BD]">
              <span className="font-semibold text-white block mb-1">Authenticity Guarantee</span>
              Handcrafted in small batches using sustainably certified and reclaimed timbers.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2B231D] flex flex-col sm:flex-row items-center justify-between text-xs text-[#80756F] gap-4">
          <p>© {new Date().getFullYear()} EKEN Marketplace. Frontend-only architectural furniture showcase.</p>
          <div className="flex items-center space-x-6">
            <Link to="/products" className="hover:text-[#D1C4BD] transition-colors">Catalog</Link>
            <Link to="/sellers" className="hover:text-[#D1C4BD] transition-colors">Sellers</Link>
            <Link to="/cart" className="hover:text-[#D1C4BD] transition-colors">Cart</Link>
            <Link to="/wishlist" className="hover:text-[#D1C4BD] transition-colors">Wishlist</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
