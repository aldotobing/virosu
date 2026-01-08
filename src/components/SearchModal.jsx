import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-start justify-center pt-32 px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Search Input */}
            <div className="relative mb-8">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-200" size={24} strokeWidth={1} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for fragrances..."
                autoFocus
                className="w-full bg-white/5 border border-white/10 text-white text-2xl font-light py-6 pl-16 pr-6 focus:outline-none focus:border-gold-200 transition-colors placeholder:text-gray-600"
              />
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto space-y-4 scrollbar-hide">
              {query.trim() && results.length === 0 && (
                <p className="text-gray-500 text-center py-12">No fragrances found for "{query}"</p>
              )}
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-200/30 p-4 transition-all group"
                >
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-contain bg-charcoal/50 p-2" />
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-serif mb-1 group-hover:text-gold-200 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm uppercase tracking-widest">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
