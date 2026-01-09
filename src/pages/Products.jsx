import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Zap } from 'lucide-react';
import { optimizedProducts } from '../data/optimizedProducts';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]); // Store original products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);

  // Categories for filtering
  const categories = ['all', 'Men', 'Women', 'Unisex'];
  const vibes = ['all', 'Fresh', 'Bold', 'Sweet', 'Sophisticated', 'Romantic'];

  // Load original products once
  useEffect(() => {
    const timer = setTimeout(() => {
      setOriginalProducts(optimizedProducts);
      setFilteredProducts(optimizedProducts); // Initially show all products
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Filter products based on search term and category
  useEffect(() => {
    if (!originalProducts || originalProducts.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let result = [...originalProducts]; // Always filter from original products

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply vibe filter
    if (selectedVibe !== 'all') {
      result = result.filter(product => product.vibe === selectedVibe);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedVibe, originalProducts]);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-onyx text-white relative overflow-hidden">
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simplified Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-200/5 rounded-full blur-[100px] hidden md:block" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gold-200/5 rounded-full blur-[100px] hidden md:block" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 to-yellow-100">Collection</span>
            </motion.h1>

            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our curated selection of premium Extrait de Parfum with 12-24 hour longevity
            </motion.p>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-6 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.div
              className="absolute -bottom-6 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gold-200 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Top Row: Search and View Mode */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8 pb-8 border-b border-white/5">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search by name, notes or character..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-gold-200 focus:ring-1 focus:ring-gold-200/20 transition-all duration-300 text-sm"
                />
              </div>

              <div className="flex items-center gap-4 self-end md:self-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">View</span>
                <div className="flex border border-white/10 rounded-full overflow-hidden bg-black/20 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-gold-200 text-black' : 'text-gray-500 hover:text-white'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-gold-200 text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Functional Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Filter size={12} className="text-gold-200" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Collection</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                        selectedCategory === category
                          ? 'bg-gold-200 border-gold-200 text-black shadow-lg shadow-gold-200/20'
                          : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {category === 'all' ? 'All Collections' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vibe Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-gold-200" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Find your Vibe</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vibes.map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => setSelectedVibe(vibe)}
                      className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                        selectedVibe === vibe
                          ? 'bg-white/10 border-gold-200/50 text-gold-200'
                          : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {vibe === 'all' ? 'Any Vibe' : vibe}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="max-w-7xl mx-auto mb-8 text-center"
        >
          <p className="text-gray-500">
            Showing <span className="text-gold-200">{filteredProducts.length}</span> of <span className="text-gold-200">{originalProducts.length}</span> fragrances
          </p>
        </motion.div>

        {/* Products Grid/List */}
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-gold-200 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <h3 className="text-2xl font-serif text-gray-400 mb-4">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                      : 'space-y-6'
                  }
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <ProductCard product={product} viewMode={viewMode} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              <div className="text-4xl font-serif text-gold-200 mb-2">{originalProducts.length}+</div>
              <div className="text-gray-400 text-lg">Unique Scents</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
            >
              <div className="text-4xl font-serif text-gold-200 mb-2">12-24h</div>
              <div className="text-gray-400 text-lg">Longevity</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
            >
              <div className="text-4xl font-serif text-gold-200 mb-2">Premium</div>
              <div className="text-gray-400 text-lg">Quality</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;