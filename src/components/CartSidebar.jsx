import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ExternalLink, Trash2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Generate checkout link/message
  const handleCheckout = () => {
    window.open("https://shopee.co.id/virosu?uls_trackid=54jrj52r02l4&utm_content=43frnSTLTZotRSs553ooeysR1wEw", "_blank");
  };

  const handleExplore = () => {
    setIsCartOpen(false);
    navigate('/products');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-onyx border-l border-white/10 z-[120] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-white/10 p-6 flex items-center justify-between bg-charcoal">
              <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
                <Heart size={24} className="text-gold-200 fill-gold-200" />
                Your Selection
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Heart size={32} className="text-gray-600" strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-8 max-w-sm text-sm">
                    Curate your personal collection of premium fragrances.
                  </p>
                  <button
                    onClick={handleExplore}
                    className="border border-gold-200 text-gold-200 px-8 py-3 uppercase tracking-[0.2em] text-xs hover:bg-gold-200 hover:text-black transition-colors"
                  >
                    Explore Scents
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => {
                    const imageUrl = typeof item.image === 'string' 
                      ? item.image 
                      : (item.image?.small || item.image?.medium || item.image);

                    return (
                      <motion.div
                        key={`${item.id}-${item.selectedSize}-${index}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-white font-serif text-lg leading-tight">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                className="text-gray-500 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">{item.selectedSize}</p>
                          </div>
                          {/* Price removed as per request */}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-charcoal/50">
                <p className="text-gray-500 text-[10px] mb-4 text-center">
                  Ready to purchase? Continue to our official store.
                </p>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#EE4D2D] text-white py-4 flex items-center justify-center gap-3 hover:bg-[#ff5d3d] transition-colors group rounded-sm shadow-lg shadow-orange-900/20"
                >
                  <ShoppingBag size={20} />
                  <span className="uppercase tracking-[0.2em] font-medium text-sm">Buy on Shopee</span>
                  <ExternalLink size={16} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
