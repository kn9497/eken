import React, { useState } from 'react';

export const ImageWithFallback = ({
  src,
  alt = 'EKEN artisanal furniture piece',
  fallbackTitle = 'EKEN Atelier Piece',
  aspectRatioClass = 'aspect-[4/5]',
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If missing src or error occurred, render inline architectural SVG fallback
  if (!src || error) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-[#F2EDE4] text-[#1E140E] flex flex-col items-center justify-center p-6 text-center select-none border border-[#E1DFDC] ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-12 h-12 text-[#80756F] mb-3 opacity-60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="font-serif text-sm font-semibold tracking-wide text-[#1E140E]">
          {fallbackTitle}
        </span>
        <span className="text-xs text-[#80756F] mt-1 font-sans">
          Artisanal Craftwork
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} bg-[#F2EDE4]`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#E8E2D8] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
