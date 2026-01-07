import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchModal from './SearchModal';
import CartSidebar from './CartSidebar';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // If not on home page, navigate first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-onyx/80 backdrop-blur-xl border-white/5 py-4' 
            : 'bg-transparent border-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-3 items-center">
          
          {/* Left - Mobile Menu / Desktop Links */}
          <div className="flex items-center justify-start">
            <button 
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white hover:text-gold-200 transition-colors"
            >
              <Menu strokeWidth={1} size={28} />
            </button>
            <div className="hidden md:flex space-x-8">
              <NavLink onClick={() => scrollToSection('shop')}>Shop</NavLink>
              <NavLink onClick={() => scrollToSection('shop')}>Collections</NavLink>
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-500">
              <img src="/assets/LOGO_NEW_50.png" alt="Virosu" className="h-8 md:h-10 object-contain" />
            </Link>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center justify-end space-x-6">
            <div className="hidden md:flex space-x-8 mr-8">
              <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
              <NavLink onClick={() => scrollToSection('journal')}>Journal</NavLink>
            </div>
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-white hover:text-gold-200 transition-colors"
            >
              <Search strokeWidth={1} size={22} />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="text-white hover:text-gold-200 transition-colors relative"
            >
              <ShoppingBag strokeWidth={1} size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-200 rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-onyx flex flex-col items-center justify-center space-y-8"
          >
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-gold-200"
            >
              <X strokeWidth={1} size={32} />
            </button>
            {[
              { label: 'Shop', action: () => scrollToSection('shop') },
              { label: 'Collections', action: () => scrollToSection('shop') },
              { label: 'About', action: () => scrollToSection('about') },
              { label: 'Journal', action: () => scrollToSection('journal') }
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={item.action}
                className="text-4xl font-serif text-white hover:text-gold-200 hover:italic transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

const NavLink = ({ onClick, children }) => (
  <button 
    onClick={onClick}
    className="text-xs uppercase tracking-[0.15em] text-gray-300 hover:text-gold-200 relative group overflow-hidden"
  >
    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{children}</span>
    <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-gold-200">{children}</span>
  </button>
);

export default Navbar;
