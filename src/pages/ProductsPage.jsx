import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { sellers } from '../data/sellers';
import { ProductCard } from '../components/ui/ProductCard';
import { sortProducts } from '../utils/sortProducts';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedSeller = searchParams.get('seller') || '';

  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchParam) {
        const query = searchParam.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesMaterial = product.materials.some((m) => m.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesMaterial) return false;
      }

      // Category filter
      if (selectedCategory && product.categoryId !== selectedCategory) {
        return false;
      }

      // Seller filter
      if (selectedSeller && product.sellerId !== selectedSeller) {
        return false;
      }

      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });
  }, [searchParam, selectedCategory, selectedSeller, inStockOnly]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => {
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    selectedCategory || selectedSeller || inStockOnly || searchParam || sortBy !== 'featured'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10 pb-6 border-b border-[#E1DFDC]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A706A] font-semibold block mb-1">
              Hand-Hewn Catalogue
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E140E]">
              All Furniture Creations
            </h1>
            {searchParam && (
              <p className="text-sm text-[#7A706A] mt-2">
                Showing results for query: <span className="text-[#1E140E] font-semibold">"{searchParam}"</span>
              </p>
            )}
          </div>

          {/* Quick Stats & Mobile Filter Button */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-[#7A706A] font-sans">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Piece' : 'Pieces'} Found
            </span>

            <button
              type="button"
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="lg:hidden inline-flex items-center gap-2 border border-[#1E140E] px-4 py-2 text-xs uppercase tracking-widest font-semibold text-[#1E140E]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter & Sort
            </button>
          </div>
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#E1DFDC]/60">
            <span className="text-xs text-[#7A706A] uppercase tracking-wider mr-2">
              Active Filters:
            </span>
            {searchParam && (
              <span className="inline-flex items-center gap-1.5 bg-[#F2EDE4] text-[#1E140E] text-xs px-2.5 py-1">
                Query: "{searchParam}"
                <button
                  type="button"
                  onClick={() => {
                    const next = new URLSearchParams(searchParams);
                    next.delete('search');
                    setSearchParams(next);
                  }}
                  className="hover:text-[#D1405D]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 bg-[#F2EDE4] text-[#1E140E] text-xs px-2.5 py-1">
                Space: {categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                <button
                  type="button"
                  onClick={() => updateFilter('category', '')}
                  className="hover:text-[#D1405D]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSeller && (
              <span className="inline-flex items-center gap-1.5 bg-[#F2EDE4] text-[#1E140E] text-xs px-2.5 py-1">
                Atelier: {sellers.find((s) => s.id === selectedSeller)?.name || selectedSeller}
                <button
                  type="button"
                  onClick={() => updateFilter('seller', '')}
                  className="hover:text-[#D1405D]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 bg-[#F2EDE4] text-[#1E140E] text-xs px-2.5 py-1">
                In Stock Only
                <button
                  type="button"
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-[#D1405D]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs uppercase tracking-widest font-semibold text-[#D1405D] hover:underline ml-2"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-6 border-r border-[#E1DFDC]">
          {/* Sorting */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1E140E] mb-3">
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#D1C4BD] text-xs uppercase tracking-wider py-2.5 px-3 text-[#1E140E] focus:outline-none focus:border-[#58150E]"
            >
              <option value="featured">Featured Curations</option>
              <option value="popularity">Popularity (Score 0-100)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1E140E] mb-3">
              Architectural Space
            </h3>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => updateFilter('category', '')}
                className={`w-full text-left text-xs uppercase tracking-wider py-1.5 px-2 transition-colors flex items-center justify-between ${
                  !selectedCategory
                    ? 'bg-[#1E140E] text-white font-semibold'
                    : 'text-[#4E4540] hover:bg-[#F2EDE4]'
                }`}
              >
                <span>All Spaces</span>
                <span className="text-[10px] opacity-75">{products.length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => updateFilter('category', cat.id === selectedCategory ? '' : cat.id)}
                  className={`w-full text-left text-xs uppercase tracking-wider py-1.5 px-2 transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-[#1E140E] text-white font-semibold'
                      : 'text-[#4E4540] hover:bg-[#F2EDE4]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">{cat.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Master Atelier Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1E140E] mb-3">
              Master Atelier
            </h3>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => updateFilter('seller', '')}
                className={`w-full text-left text-xs uppercase tracking-wider py-1.5 px-2 transition-colors flex items-center justify-between ${
                  !selectedSeller
                    ? 'bg-[#1E140E] text-white font-semibold'
                    : 'text-[#4E4540] hover:bg-[#F2EDE4]'
                }`}
              >
                <span>All Ateliers</span>
                <span className="text-[10px] opacity-75">{products.length}</span>
              </button>
              {sellers.map((seller) => {
                const count = products.filter((p) => p.sellerId === seller.id).length;
                return (
                  <button
                    key={seller.id}
                    type="button"
                    onClick={() => updateFilter('seller', seller.id === selectedSeller ? '' : seller.id)}
                    className={`w-full text-left text-xs uppercase tracking-wider py-1.5 px-2 transition-colors flex items-center justify-between ${
                      selectedSeller === seller.id
                        ? 'bg-[#1E140E] text-white font-semibold'
                        : 'text-[#4E4540] hover:bg-[#F2EDE4]'
                    }`}
                  >
                    <span className="truncate pr-2">{seller.name}</span>
                    <span className="text-[10px] opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1E140E] mb-3">
              Availability
            </h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider text-[#4E4540]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#1E140E] rounded-none cursor-pointer"
              />
              In Stock Pieces Only
            </label>
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {filterDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 lg:hidden flex justify-end">
            <div className="w-80 bg-[#FAF8F5] h-full p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E1DFDC]">
                <h3 className="font-serif text-lg font-bold">Filters & Sorting</h3>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-1 text-[#1E140E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sort by */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold block mb-2">Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D1C4BD] text-xs py-2 px-2"
                >
                  <option value="featured">Featured</option>
                  <option value="popularity">Popularity (0-100)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>

              {/* Spaces */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold block mb-2">Space</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D1C4BD] text-xs py-2 px-2"
                >
                  <option value="">All Spaces</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Ateliers */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold block mb-2">Atelier</label>
                <select
                  value={selectedSeller}
                  onChange={(e) => updateFilter('seller', e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D1C4BD] text-xs py-2 px-2"
                >
                  <option value="">All Ateliers</option>
                  {sellers.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In Stock Only
              </label>

              <div className="pt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="w-full bg-[#1E140E] text-white py-3 text-xs uppercase tracking-widest font-semibold"
                >
                  Apply Filters ({sortedProducts.length})
                </button>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="w-full border border-[#80756F] py-2 text-xs uppercase tracking-widest"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="p-16 text-center bg-[#F2EDE4] border border-[#E1DFDC]">
              <Filter className="w-10 h-10 text-[#80756F] mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-[#1E140E] mb-2">
                No matching furniture found
              </h3>
              <p className="text-xs text-[#7A706A] mb-6 max-w-md mx-auto leading-relaxed">
                We couldn't find any piece matching your active filters. Try broadening your criteria or reset the search query.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="bg-[#1E140E] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
