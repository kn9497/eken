import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const SellerCard = ({ seller }) => {
  return (
    <article className="group bg-[#FAF8F5] border border-[#E1DFDC] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-tactile hover:border-[#80756F]">
      <div>
        {/* Cover / Profile Banner */}
        <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden bg-[#F2EDE4]">
          <ImageWithFallback
            src={seller.coverImage}
            alt={`${seller.name} workshop`}
            fallbackTitle={seller.name}
            aspectRatioClass="h-full w-full"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs uppercase tracking-widest font-sans flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#CEA642]" />
              {seller.location}, {seller.state}
            </span>
            <span className="text-xs font-sans tracking-wider bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-sm">
              Est. {seller.establishedYear}
            </span>
          </div>
        </div>

        {/* Header Info */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-serif text-xl font-medium text-[#1E140E] group-hover:text-[#D1405D] transition-colors">
            <Link to={`/seller/${seller.id}`} className="hover:underline">
              {seller.name}
            </Link>
          </h3>
          <div className="flex items-center gap-1 bg-[#F2EDE4] px-2 py-1 text-xs font-semibold text-[#1E140E]">
            <Star className="w-3.5 h-3.5 fill-[#CEA642] text-[#CEA642]" />
            <span>{seller.rating.toFixed(1)}</span>
            <span className="text-[#80756F] font-normal">({seller.reviewCount})</span>
          </div>
        </div>

        {/* Specialty & Bio */}
        <p className="text-xs text-[#80756F] uppercase tracking-wider mb-2 font-medium">
          Specialty: {seller.specialty}
        </p>
        <p className="text-sm text-[#4E4540] line-clamp-2 mb-4 leading-relaxed font-sans">
          {seller.bio}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#E1DFDC] flex items-center justify-between gap-2">
        {/* Direct tel: and mailto: actions (D-07) */}
        <div className="flex items-center gap-2">
          {seller.phone ? (
            <a
              href={`tel:${seller.phone}`}
              className="p-2 border border-[#E1DFDC] text-[#1E140E] hover:bg-[#1E140E] hover:text-white transition-colors"
              title={`Call ${seller.name} at ${seller.phone}`}
              aria-label={`Call ${seller.name} at ${seller.phone}`}
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-[#80756F] italic">Phone unavailable</span>
          )}

          {seller.email ? (
            <a
              href={`mailto:${seller.email}?subject=EKEN Inquiry for ${seller.name}`}
              className="p-2 border border-[#E1DFDC] text-[#1E140E] hover:bg-[#1E140E] hover:text-white transition-colors"
              title={`Email ${seller.name} at ${seller.email}`}
              aria-label={`Email ${seller.name} at ${seller.email}`}
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-[#80756F] italic">Email unavailable</span>
          )}
        </div>

        <Link
          to={`/seller/${seller.id}`}
          className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#1E140E] hover:text-[#D1405D] transition-colors"
        >
          View Atelier
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
