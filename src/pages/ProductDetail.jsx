import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, ExternalLink, Share, Clock, Zap, Target, SunMoon, Heart } from 'lucide-react';
import { optimizedProducts } from '../data/optimizedProducts';
import { updateMetaTags } from '../utils/metaTags';
import { useCart } from '../context/CartContext';
import ScentPyramid from '../components/ScentPyramid';

const encodePath = (path) => {
  if (!path || typeof path !== 'string') return path;
  if (path.includes('?')) {
    const [baseUrl, query] = path.split('?');
    return baseUrl.split('/').map(segment => encodeURIComponent(segment)).join('/') + '?' + query;
  }
  return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = optimizedProducts.find(p => p.id === parseInt(id));
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[1] : '50ml');
  const [activeImage, setActiveImage] = useState(product?.image || {});
  const [galleryLoaded, setGalleryLoaded] = useState(false);

  useEffect(() => {
    if (product) {
        setActiveImage(product.image);
        setSelectedSize(product.sizes[1] || product.sizes[0]);

        // Update meta tags for sharing
        const title = `VIROSU - ${product.name}`;
        const description = `${product.name} - ${extractIntro(product.description || '') || 'Experience luxury with this premium Extrait de Parfum'}`;
        const imageUrl = product.image?.large || product.image || '/assets/LOGO_NEW_50.png?w=1200&format=webp&q=80';
        const url = window.location.href;

        updateMetaTags(title, description, imageUrl, url);
    }
  }, [product]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryLoaded(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const galleryElement = document.getElementById('product-gallery');
    if (galleryElement) {
      observer.observe(galleryElement);
    }

    return () => {
      if (galleryElement) {
        observer.unobserve(galleryElement);
      }
    };
  }, []);

  if (!product) return null;

  // --- Extract Highlights from Description ---
  const extractHighlights = (desc) => {
      const lines = desc.split('\n').map(l => l.trim()).filter(l => l);
      let highlights = [];

      lines.forEach(line => {
          // Collect bullet points that are actual highlights/benefits
          if (line.startsWith('*')) {
              const cleanHighlight = line.replace(/\*/g, '').trim();
              // Skip the "Keunggulan Produk" line itself, only keep the actual benefits
              if (!cleanHighlight.toLowerCase().includes('keunggulan produk') &&
                  !cleanHighlight.toLowerCase().includes('extrait de parfum - konsentrasi tinggi') &&
                  cleanHighlight) {
                  highlights.push(cleanHighlight);
              }
          }
      });

      return highlights;
  };

  const highlights = extractHighlights(product.description || '');
  const notes = product.notes || { top: '', heart: '', base: '' };

  // Extract only the introduction part, excluding notes and other sections
  const extractIntro = (desc) => {
    const lines = desc.split('\n').map(l => l.trim()).filter(l => l);
    let introLines = [];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      // Stop when we encounter notes or other structured sections
      if (lowerLine.includes('top notes') || lowerLine.includes('heart notes') ||
          lowerLine.includes('middle notes') || lowerLine.includes('base notes') ||
          lowerLine.includes('aroma awal') || lowerLine.includes('aroma tengah') ||
          lowerLine.includes('aroma akhir') || lowerLine.includes('notes')) {
        break;
      }
      // Skip bullet points (highlights) as they're handled separately
      if (!line.startsWith('*')) {
        introLines.push(line);
      }
    }

    return introLines.join(' ');
  };

  const intro = extractIntro(product.description || '');

  const handleShare = async (product) => {
    const shareData = {
      title: `VIROSU - ${product.name}`,
      text: `${product.name} - ${intro || 'Experience luxury with this premium Extrait de Parfum'}`,
      url: window.location.href,
    };

    // Try to use the Web Share API if available (for mobile devices)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback to copying to clipboard
        fallbackShare(shareData);
      }
    } else {
      // Fallback for desktop browsers
      fallbackShare(shareData);
    }
  };

  const fallbackShare = async (shareData) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Link copied to clipboard! Share it with your friends.');
      } else {
        // Fallback to a share dialog
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
        window.open(shareUrl, '_blank');
      }
    } catch (err) {
      console.error('Error in fallback share:', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-onyx"
    >
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* Left: Interactive Gallery */}
        <div className="w-full md:w-1/2 relative bg-charcoal/30 flex flex-col items-center justify-center p-6 md:p-12 md:h-screen md:sticky md:top-0 overflow-visible pt-24 md:pt-12">
           {/* Background Effects */}
          <div className="absolute inset-0 bg-gold-gradient opacity-5 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50" />
          
          <motion.button 
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed top-6 left-4 md:absolute md:top-32 md:left-8 z-50 text-white/50 hover:text-white flex items-center gap-2 group bg-black/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-4 py-2 md:p-0 rounded-full md:rounded-none"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest text-[10px] md:text-xs">Back</span>
          </motion.button>

          {/* Main Image */}
          <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center mb-6 md:mb-8">
            <AnimatePresence mode="wait">
                <motion.img
                    key={JSON.stringify(activeImage)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={typeof activeImage === 'string' ? encodePath(activeImage) : (activeImage?.large || activeImage?.medium || activeImage?.small || activeImage)}
                    srcSet={typeof activeImage === 'string' 
                      ? `${encodePath(activeImage)} 1200w` 
                      : `${activeImage?.small} 300w, ${activeImage?.medium} 600w, ${activeImage?.large} 1200w`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
                    alt={product.name}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl relative z-10"
                />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div id="product-gallery" className="relative z-20 flex gap-3 md:gap-4 overflow-x-auto py-4 max-w-full px-2 md:px-4 scrollbar-hide">
            {galleryLoaded ? (
              product.gallery.map((img, idx) => (
                  <button
                   key={idx}
                   onClick={() => setActiveImage(img)}
                   className={`w-12 h-12 md:w-16 md:h-16 shrink-0 border rounded-full transition-all duration-300 overflow-visible ${
                     JSON.stringify(activeImage) === JSON.stringify(img) ? 'border-gold-200 ring-2 ring-gold-200/30 scale-105' : 'border-white/10 opacity-60 active:opacity-100'}`}
                  >
                      <img
                        src={typeof img === 'string' ? encodePath(img) : (img?.small || img)}
                        srcSet={typeof img === 'string' ? `${encodePath(img)} 300w` : `${img?.small} 300w, ${img?.medium} 600w, ${img?.large} 1200w`}
                        sizes="60px"
                        alt=""
                        className="w-full h-full object-cover rounded-full bg-onyx"
                      />
                  </button>
              ))
            ) : (
              // Placeholder while loading
              <div className="flex gap-3 md:gap-4">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 animate-pulse"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Structured Details */}
        <div className="w-full md:w-1/2 px-6 py-8 md:p-24 bg-onyx relative z-10 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto md:mx-0"
          >
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <span className="text-gold-200 uppercase tracking-[0.25em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold mb-2 block">{product.category}</span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-3 md:mb-4 leading-tight md:leading-none">{product.name}</h1>
                <div className="flex items-center gap-2 text-gold-200/80">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="md:w-[14px] md:h-[14px]" fill="currentColor" />)}
                    <span className="text-[10px] md:text-xs text-gray-500 ml-1 md:ml-2 tracking-widest uppercase">Masterpiece Release</span>
                </div>
            </div>

            {/* Introduction */}
            {intro && (
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light mb-8 md:mb-10 first-letter:text-3xl md:first-letter:text-4xl first-letter:font-serif first-letter:text-gold-200 first-letter:mr-1 first-letter:float-left">
                    {intro}
                </p>
            )}

            {/* Scent Character Gauges */}
            {product.profile && (
                <div className="mb-10 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock size={14} className="text-gold-200" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Longevity</span>
                        </div>
                        <div className="text-white text-sm font-medium mb-2">{product.profile.longevity}</div>
                        <div className="h-1 w-full bg-charcoal rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: product.profile.longevity === 'Eternal' ? '100%' : product.profile.longevity === 'Long Lasting' ? '80%' : '50%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gold-200"
                            />
                        </div>
                    </div>
                    <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Target size={14} className="text-gold-200" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Sillage</span>
                        </div>
                        <div className="text-white text-sm font-medium mb-2">{product.profile.sillage}</div>
                        <div className="h-1 w-full bg-charcoal rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: product.profile.sillage === 'Strong' ? '100%' : product.profile.sillage === 'Moderate' ? '60%' : '30%' }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="h-full bg-gold-200"
                            />
                        </div>
                    </div>
                    <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <SunMoon size={14} className="text-gold-200" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Best For</span>
                        </div>
                        <div className="text-white text-sm font-medium">{product.profile.bestTime} Use</div>
                    </div>
                    <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap size={14} className="text-gold-200" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Mood</span>
                        </div>
                        <div className="text-white text-sm font-medium">{product.profile.mood}</div>
                    </div>
                </div>
            )}

            {/* Olfactory Pyramid (New Visual) */}
            {(notes.top || notes.heart || notes.base) && (
                <div className="mb-12">
                   <h3 className="text-xs md:text-sm uppercase tracking-widest text-gold-200 mb-6 text-center">Olfactory Pyramid</h3>
                   <ScentPyramid notes={notes} />
                </div>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
                <div className="mb-8 md:mb-12">
                   <h3 className="text-xs md:text-sm uppercase tracking-widest text-gold-200 mb-3 md:mb-4 border-b border-white/10 pb-2 inline-block">Product Highlights</h3>
                   <ul className="space-y-2.5 md:space-y-3">
                       {highlights.map((h, i) => (
                           <li key={i} className="flex items-start gap-2.5 md:gap-3 text-gray-400 font-light text-sm">
                               <span className="w-1.5 h-1.5 rounded-full bg-gold-200 mt-2 shrink-0" />
                               <span className="break-words">{h}</span>
                           </li>
                       ))}
                   </ul>
                </div>
            )}

            {/* Size Selector */}
            <div className="mb-8 md:mb-12">
                <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest block mb-3 md:mb-4">Available Sizes</span>
                <div className="flex gap-2.5 md:gap-3">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`flex-1 md:flex-none md:px-6 py-3.5 md:py-3 border text-xs md:text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 ${selectedSize === size ? 'border-gold-200 text-black bg-gold-200 font-medium' : 'border-white/20 text-gray-400 active:border-white'}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Wishlist and Shopee Actions */}
            <div className="md:static pb-6 md:pb-0 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Add to Wishlist Button */}
                  <button
                      onClick={() => addToCart(product, selectedSize)}
                      className="flex-1 md:flex-none bg-transparent border border-gold-200 text-gold-200 py-4 md:py-5 px-6 md:px-8 flex items-center justify-center gap-2.5 md:gap-3 hover:bg-gold-200 hover:text-black active:scale-[0.98] transition-all duration-300 group overflow-hidden relative"
                  >
                      <Heart size={18} className="md:w-5 md:h-5 relative z-10" />
                      <span className="uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium text-xs md:text-sm relative z-10">Add to Wishlist</span>
                  </button>

                  {/* Buy on Shopee Button */}
                  <a
                      href="https://shopee.co.id/virosu?uls_trackid=54jrj52r02l4&utm_content=43frnSTLTZotRSs553ooeysR1wEw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#EE4D2D] text-white py-4 md:py-5 px-6 md:px-8 flex items-center justify-center gap-2.5 md:gap-3 hover:bg-[#ff5d3d] active:scale-[0.98] transition-all shadow-lg shadow-orange-900/20 group overflow-hidden relative"
                  >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <ShoppingBag size={18} className="md:w-5 md:h-5 relative z-10" />
                      <span className="uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium text-xs md:text-sm relative z-10">Buy on Shopee</span>
                      <ExternalLink size={14} className="md:w-4 md:h-4 relative z-10 opacity-70" />
                  </a>
                </div>

                {/* Share Button (Secondary) */}
                <button
                    onClick={() => handleShare(product)}
                    className="w-full text-gray-500 hover:text-gold-200 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                    <Share size={14} />
                    <span>Share this Scent</span>
                </button>

                <p className="text-center md:text-left mt-3 md:mt-4 text-[10px] md:text-xs text-gray-600 px-2 md:px-0">
                    Secure transaction via official marketplace partner.
                </p>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
