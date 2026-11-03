import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-28 text-center">
      <div className="w-20 h-20 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1E140E]">
        <Compass className="w-10 h-10 opacity-70" />
      </div>
      <span className="text-xs uppercase tracking-[0.3em] text-[#D1405D] font-bold block mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E140E] mb-4">
        Sanctuary Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-[#7A706A] mb-8 max-w-md mx-auto leading-relaxed font-sans">
        The route you are navigating to does not exist or has been relocated within our artisanal collections.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#1E140E] text-white px-8 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#2B231D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
        <Link
          to="/products"
          className="border border-[#1E140E] text-[#1E140E] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#1E140E] hover:text-white transition-colors"
        >
          Browse All Collections
        </Link>
      </div>
    </div>
  );
};
