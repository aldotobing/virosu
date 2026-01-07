import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import CarouselProductCard from './CarouselProductCard';

const ScentCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const rotation = useMotionValue(0);
  const radius = 500; // Increased radius for horizontal layout to allow more spread
  const totalItems = products.length;
  // Use a horizontal layout instead of circular for better visibility
  const maxVisibleItems = 7; // Maximum items to show at once
  const visibleItems = Math.min(maxVisibleItems, totalItems);

  // Determine if we're on mobile based on screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || totalItems <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalItems);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating, totalItems]);

  // Update rotation value when current index changes
  useEffect(() => {
    // For the semicircular layout, we don't need to update rotation motion value
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + totalItems) % totalItems);
    setIsAutoRotating(false);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalItems);
    setIsAutoRotating(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoRotating(false);
  };

  const getCardPosition = (index) => {
    // Calculate the relative position to the current index
    let relativeIndex = (index - currentIndex + totalItems) % totalItems;

    // Adjust to get the closest position (either forward or backward)
    if (relativeIndex > totalItems / 2) {
      relativeIndex = relativeIndex - totalItems;
    }

    // Calculate position based on a horizontal spread rather than circular
    const maxSpread = radius * 0.8; // Maximum horizontal spread
    const maxVisibleDistance = Math.floor(visibleItems / 2);

    // Calculate normalized position (-1 to 1) where 0 is the center
    let normalizedPos;
    if (maxVisibleDistance > 0) {
      normalizedPos = Math.max(-1, Math.min(1, relativeIndex / maxVisibleDistance));
    } else {
      normalizedPos = 0; // Center item
    }

    // Position items linearly across the horizontal axis
    const x = normalizedPos * maxSpread;
    const y = Math.abs(normalizedPos) * 40; // Slight vertical offset for visual effect

    // Calculate scale and opacity based on distance from center with more dramatic difference
    const normalizedDistance = Math.abs(normalizedPos);
    // Use a quadratic function to make center item significantly larger
    const scale = Math.max(0.5, 1 - (normalizedDistance * normalizedDistance * 0.5)); // More dramatic scale difference
    const opacity = Math.max(0.3, 1 - (normalizedDistance * normalizedDistance * 0.7)); // More dramatic opacity difference
    const zIndex = 100 - Math.abs(Math.round(normalizedDistance * normalizedDistance * 50));

    return { x, y, scale, opacity, zIndex };
  };

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        onMouseEnter={() => setIsAutoRotating(false)}
        onMouseLeave={() => setIsAutoRotating(true)}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4/5 h-4/5 rounded-full border border-gold-200/10" />
          <div className="absolute w-3/5 h-3/5 rounded-full border border-gold-200/5" />
        </div>

        {/* Carousel Items */}
        {products.map((product, index) => {
          const position = getCardPosition(index);

          return (
            <motion.div
              key={product.id}
              className="absolute transition-all duration-700 ease-out"
              style={{
                x: position.x,
                y: position.y,
                scale: position.scale,
                opacity: position.opacity,
                zIndex: position.zIndex,
              }}
              whileHover={{ scale: position.scale * 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Link to={`/product/${product.id}`}>
                <CarouselProductCard
                  product={product}
                  isActive={index === currentIndex}
                  scale={position.scale}
                />
              </Link>
            </motion.div>
          );
        })}

        {/* Center focal point */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-gold-200/10 to-transparent blur-xl" />
      </div>

      {/* Navigation Controls - moved below carousel container with more space */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold-200 hover:text-black transition-all duration-300"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Position Indicators */}
        <div className="flex items-center gap-2">
          {products.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick((currentIndex - 2 + idx + totalItems) % totalItems)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === 2 ? 'bg-gold-200 w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold-200 hover:text-black transition-all duration-300"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Auto-rotate indicator - hidden on mobile */}
      {isAutoRotating && !isMobile && (
        <div className="absolute top-6 right-6 flex items-center gap-2 text-xs text-gold-200">
          <RotateCcw size={12} className="animate-spin" />
          <span>Auto-rotating</span>
        </div>
      )}
    </div>
  );
};

export default ScentCarousel;