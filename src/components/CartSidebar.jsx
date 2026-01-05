import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ExternalLink } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose }) => {
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-onyx border-l border-white/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                <ShoppingBag size={24} className="text-gold-200" />
                Your Selection
              </h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-gray-600" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                Discover our collection of luxury fragrances and find your signature scent.
              </p>
              <button
                onClick={onClose}
                className="border border-gold-200 text-gold-200 px-8 py-3 uppercase tracking-[0.2em] text-sm hover:bg-gold-200 hover:text-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Footer - Shopee Link */}
            <div className="border-t border-white/10 p-6 bg-charcoal/30">
              <p className="text-gray-500 text-xs mb-4 text-center">
                Purchase available through our official store
              </p>
              <a
                href="https://shopee.co.id/virosu?uls_trackid=54jrj52r02l4&utm_content=43frnSTLTZotRSs553ooeysR1wEw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#EE4D2D] text-white py-4 flex items-center justify-center gap-3 hover:bg-[#ff5d3d] transition-colors group"
              >
                <ShoppingBag size={20} />
                <span className="uppercase tracking-[0.2em] font-medium text-sm">Shop on Shopee</span>
                <ExternalLink size={16} className="opacity-70" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
