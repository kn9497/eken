import React from 'react';
import { sellers } from '../data/sellers';
import { SellerCard } from '../components/ui/SellerCard';

export const SellersPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-[#E1DFDC]">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A706A] font-semibold block mb-1">
          Master Karigars & Guilds
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E140E] mb-4">
          The Craft Ateliers
        </h1>
        <p className="text-sm sm:text-base text-[#4E4540] max-w-3xl leading-relaxed font-sans">
          EKEN connects you directly with the generational timber workshops and craft collectives shaping Indian furniture architecture. Every atelier maintains rigorous heritage standards, sustainable forestry sourcing, and direct client dialogue.
        </p>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
};
