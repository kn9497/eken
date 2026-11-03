import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Pause, Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { customerReviews } from '../../data/reviews';
import { getInitials } from '../../utils/authCrypto';
import { ImageWithFallback } from '../ui/ImageWithFallback';

/**
 * CustomerReviewSection Component
 * Premium editorial customer review section positioned immediately above the footer.
 * Features continuous left-to-right horizontal motion, customer initials (no fake photos),
 * authentic product connections, and studio attribution.
 */
export const CustomerReviewSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  // Manual scroll controls for accessibility and reduced-motion environments
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Duplicate dataset to create a seamless infinite left-to-right loop without blank spaces
  const displayReviews = [...customerReviews, ...customerReviews];

  return (
    <section
      aria-label="Customer Reviews"
      className="relative bg-[#FAF8F5] py-20 border-t border-[#E1DFDC] overflow-hidden"
    >
      {/* Editorial Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#BA8888] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D1405D]" />
              Patron Experiences & Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E140E] tracking-tight leading-tight uppercase">
              LIVED WITH. LOVED OVER TIME.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4E4540] leading-relaxed">
              Real experiences with thoughtfully designed furniture. Discover the pieces that have found a place in people's homes.
            </p>
          </div>

          {/* Interactive Marquee Controls (Play/Pause & Scroll) */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={togglePause}
              className="p-2.5 bg-white border border-[#E1DFDC] text-[#1E140E] hover:border-[#1E140E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E140E]"
              aria-label={isPaused ? 'Resume review carousel animation' : 'Pause review carousel animation'}
              title={isPaused ? 'Resume carousel' : 'Pause carousel'}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
            </button>
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-2.5 bg-white border border-[#E1DFDC] text-[#1E140E] hover:border-[#1E140E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E140E]"
              aria-label="Scroll reviews backward"
              title="Previous reviews"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-2.5 bg-white border border-[#E1DFDC] text-[#1E140E] hover:border-[#1E140E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E140E]"
              aria-label="Scroll reviews forward"
              title="Next reviews"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Review Carousel Track (Left-to-Right Continuous Motion) */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-hidden group"
      >
        {/* Subtle Edge Gradient Feathering Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10" />

        {/* Moving Track */}
        <div
          className={`animate-marquee-ltr flex gap-6 px-4 py-2 ${
            isPaused ? '[animation-play-state:paused]' : ''
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
        >
          {displayReviews.map((review, index) => {
            const initials = getInitials(review.customerName);

            return (
              <article
                key={`${review.id}-${index}`}
                className="w-[320px] sm:w-[380px] bg-white border border-[#E1DFDC] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between flex-shrink-0 group/card"
              >
                {/* Header: Customer Initials, Name & Location */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Initials Badge (Strictly no human portrait photographs) */}
                    <div
                      className="w-10 h-10 rounded-full bg-[#F2EDE4] border border-[#1E140E]/20 text-[#1E140E] flex items-center justify-center font-serif text-xs font-bold tracking-wider flex-shrink-0 select-none shadow-xs"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-bold text-[#1E140E] leading-tight">
                        {review.customerName}
                      </h3>
                      <p className="text-[11px] font-sans text-[#7A706A]">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  {/* Subtle 5-Star Rating Indicator */}
                  <div
                    className="flex items-center gap-0.5 text-[#CEA642] pt-1"
                    aria-label={`Rated ${review.rating} out of 5 stars`}
                  >
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Narrative */}
                <blockquote className="font-sans text-xs sm:text-sm text-[#4E4540] leading-relaxed mb-6 italic line-clamp-4">
                  &ldquo;{review.reviewText}&rdquo;
                </blockquote>

                {/* Purchased Product & Connected Studio Card */}
                <div className="pt-4 border-t border-[#F2EDE4] mt-auto">
                  <Link
                    to={`/product/${review.productId}`}
                    className="flex items-center gap-3 group-hover/card:opacity-95 transition-opacity"
                    aria-label={`View purchased piece: ${review.productName}`}
                  >
                    {/* Authentic Product Image Thumbnail (4:5 Ratio) */}
                    <div className="w-12 h-15 aspect-[4/5] bg-[#F2EDE4] border border-[#E1DFDC] overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={review.productImage}
                        alt={review.productName}
                        fallbackTitle={review.productName}
                        aspectRatioClass="aspect-[4/5]"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Metadata */}
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#BA8888] font-semibold block truncate">
                        {review.categoryName} &bull; {review.purchaseDate}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-[#1E140E] group-hover/card:text-[#D1405D] transition-colors truncate">
                        {review.productName}
                      </h4>
                      <p className="text-[10px] text-[#7A706A] truncate mt-0.5">
                        Connected with: <span className="font-medium text-[#4E4540]">{review.studioName}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
