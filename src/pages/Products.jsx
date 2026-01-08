import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { optimizedProducts } from '../data/optimizedProducts';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]); // Store original products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);

  // Categories for filtering
  const categories = ['all', 'Men', 'Women', 'Unisex'];

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

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, originalProducts]);

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gold-200/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-64 h-64 bg-gold-200/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
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
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-200 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-gold-200 to-yellow-100 text-black'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </motion.button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex border border-white/20 rounded-lg overflow-hidden bg-white/5">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.2)" }}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gold-200 text-black' : 'text-gray-400'}`}
                >
                  <Grid size={18} />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.2)" }}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gold-200 text-black' : 'text-gray-400'}`}
                >
                  <List size={18} />
                </motion.button>
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
                        <Link to={`/product/${product.id}`}>
                          <ProductCard product={product} viewMode={viewMode} />
                        </Link>
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