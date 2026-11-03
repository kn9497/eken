import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { sortProducts } from '../utils/sortProducts';

export const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('featured');

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter((p) => p.categoryId === category.id);
  }, [category]);

  const sortedProducts = useMemo(() => {
    return sortProducts(categoryProducts, sortBy);
  }, [categoryProducts, sortBy]);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Space Not Found</h1>
        <p className="text-sm text-[#7A706A] mb-8">
          The requested room category does not exist in our catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#1E140E] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Editorial Banner */}
      <div className="relative bg-[#1E140E] text-[#FAF8F5] min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            fallbackTitle={category.name}
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
                <Link to="/products" className="hover:text-white transition-colors">Spaces</Link>
              </li>
              <li>/</li>
              <li className="text-white font-semibold" aria-current="page">{category.name}</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-[#D1C4BD] font-sans leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Catalog Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E1DFDC] gap-4">
          <span className="text-xs uppercase tracking-widest text-[#7A706A] font-semibold">
            {sortedProducts.length} Curated {sortedProducts.length === 1 ? 'Piece' : 'Pieces'}
          </span>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#7A706A]">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#D1C4BD] text-xs uppercase tracking-wider py-2 px-3 text-[#1E140E] focus:outline-none focus:border-[#58150E]"
            >
              <option value="featured">Featured Curations</option>
              <option value="popularity">Popularity (Score 0-100)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
