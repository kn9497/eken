import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { sellers } from '../data/sellers';
import { ProductCard } from '../components/ui/ProductCard';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';

export const HomePage = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const featuredSeller = sellers[0];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-[#1E140E] text-[#FAF8F5] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/assets/real/main page image.jpeg"
            alt="Artisanal solid wood dining room setup"
            fallbackTitle="EKEN Living"
            aspectRatioClass="h-full w-full"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E140E] via-[#1E140E]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#BA8888] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D1405D]" />
              Artisanal Marketplace of India
            </span>
            <h1 className="font-serif text-4xl sm:6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Heirloom Living, Hand-Hewn.
            </h1>
            <p className="text-base sm:text-lg text-[#D1C4BD] font-sans leading-relaxed">
              Discover enduring, sculptural furniture directly from India's generational ateliers. Crafted in reclaimed teak, rosewood, and natural river cane without industrial compromise.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-[#D1405D] text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#B12747] transition-all shadow-tactile inline-flex items-center gap-2"
              >
                Explore All Pieces
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/sellers"
                className="border border-[#FAF8F5]/40 text-[#FAF8F5] px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#1E140E] transition-all inline-flex items-center"
              >
                Meet Master Ateliers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Spaces / Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E1DFDC]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A706A] font-semibold block mb-1">
              Architectural Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E140E]">
              Designed for Deliberate Living
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-widest font-semibold text-[#1E140E] hover:text-[#D1405D] inline-flex items-center gap-1.5 mt-4 md:mt-0 transition-colors"
          >
            View Complete Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group flex flex-col bg-[#FAF8F5] border border-[#E1DFDC] overflow-hidden transition-all duration-300 hover:shadow-tactile hover:border-[#80756F]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EDE4]">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  fallbackTitle={cat.name}
                  aspectRatioClass="aspect-[4/5]"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#BA8888] block font-sans">
                    {cat.productCount} Creations
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {cat.name}
                  </h3>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#4E4540] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#D1405D] mt-3 inline-flex items-center gap-1">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Masterworks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 pb-4 border-b border-[#E1DFDC]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A706A] font-semibold block mb-1">
              Curator's Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E140E]">
              Signature Centerpieces
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-widest font-semibold text-[#1E140E] hover:text-[#D1405D] inline-flex items-center gap-1.5 transition-colors"
          >
            All 40 Pieces
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Atelier Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E140E] text-[#FAF8F5] grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-tactile">
          <div className="relative min-h-[360px] lg:min-h-[480px]">
            <ImageWithFallback
              src="/assets/real/eken-brand-spotlight.png"
              alt="EKEN Artisanal Design & Heritage"
              fallbackTitle="EKEN"
              aspectRatioClass="h-full w-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E140E]/80 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#BA8888] font-semibold">
              Featured Master Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              EKEN
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#CEA642] font-medium">
              India &bull; Est. 1988
            </p>
            <p className="text-sm sm:text-base text-[#D1C4BD] leading-relaxed font-sans">
              {featuredSeller.bio}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                to={`/seller/${featuredSeller.id}`}
                className="bg-[#D1405D] text-white px-6 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#B12747] transition-colors"
              >
                View Atelier Works
              </Link>
              <Link
                to="/sellers"
                className="text-xs uppercase tracking-widest font-semibold text-[#FAF8F5] hover:text-[#BA8888] transition-colors inline-flex items-center gap-1.5"
              >
                All 5 Ateliers &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Craft Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-8 bg-[#F2EDE4] border border-[#E1DFDC]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FAF8F5] border border-[#D1C4BD] text-[#1E140E]">
              <ShieldCheck className="w-6 h-6 text-[#D1405D]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1E140E] mb-1">
                Heirloom Certified Timbers
              </h3>
              <p className="text-xs text-[#4E4540] leading-relaxed font-sans">
                Every piece is fashioned from salvaged, mature plantation, or reclaimed wood with verifiable lineage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FAF8F5] border border-[#D1C4BD] text-[#1E140E]">
              <Compass className="w-6 h-6 text-[#D1405D]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1E140E] mb-1">
                Direct Atelier Contact
              </h3>
              <p className="text-xs text-[#4E4540] leading-relaxed font-sans">
                Connect directly with the artisans via direct telephone or email for bespoke dimension adjustments.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FAF8F5] border border-[#D1C4BD] text-[#1E140E]">
              <Sparkles className="w-6 h-6 text-[#D1405D]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1E140E] mb-1">
                Purity in Pricing
              </h3>
              <p className="text-xs text-[#4E4540] leading-relaxed font-sans">
                Fair, transparent minor-unit pricing with zero middleman markups or synthetic discount engines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
