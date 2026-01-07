import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import CarouselProductCard from './CarouselProductCard';

const ScentCarousel = ({ products }) => {
  // Initialize state from localStorage to preserve carousel position across navigation
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem('scentCarouselIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const [isAutoRotating, setIsAutoRotating] = useState(() => {
    const savedAutoRotate = localStorage.getItem('scentCarouselAutoRotate');
    return savedAutoRotate ? JSON.parse(savedAutoRotate) : true;
  });

  const [isMobile, setIsMobile] = useState(false);
  const [carouselLoaded, setCarouselLoaded] = useState(false);
  const containerRef = useRef(null);
  const rotation = useMotionValue(0);
  const radius = 600; // Increased radius for horizontal layout to allow more spread
  const totalItems = products.length;
  // Use a horizontal layout instead of circular for better visibility
  const maxVisibleItems = 4; // Maximum items to show at once
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

  // Intersection Observer to load carousel when it comes into view
  useEffect(() => {
    const timer = setTimeout(() => {
      // Fallback to ensure carousel loads after a short delay if intersection observer doesn't trigger
      setCarouselLoaded(true);
    }, 500); // 500ms delay as fallback

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarouselLoaded(true);
          clearTimeout(timer); // Clear the fallback timer
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const carouselElement = containerRef.current;
    if (carouselElement) {
      observer.observe(carouselElement);
    }

    return () => {
      clearTimeout(timer); // Clear the fallback timer on unmount
      if (carouselElement) {
        observer.unobserve(carouselElement);
      }
    };
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || totalItems <= 1 || !carouselLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const newIndex = (prev + 1) % totalItems;
        localStorage.setItem('scentCarouselIndex', newIndex.toString());
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating, totalItems, carouselLoaded]);

  // Stop auto-rotation when component unmounts (when navigating away)
  useEffect(() => {
    return () => {
      setIsAutoRotating(false);
    };
  }, []);

  // Update rotation value when current index changes
  useEffect(() => {
    // For the semicircular layout, we don't need to update rotation motion value
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const newIndex = (prev - 1 + totalItems) % totalItems;
      localStorage.setItem('scentCarouselIndex', newIndex.toString());
      return newIndex;
    });
    setIsAutoRotating(false);
    localStorage.setItem('scentCarouselAutoRotate', 'false');
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      const newIndex = (prev + 1) % totalItems;
      localStorage.setItem('scentCarouselIndex', newIndex.toString());
      return newIndex;
    });
    setIsAutoRotating(false);
    localStorage.setItem('scentCarouselAutoRotate', 'false');
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    localStorage.setItem('scentCarouselIndex', index.toString());
    setIsAutoRotating(false);
    localStorage.setItem('scentCarouselAutoRotate', 'false');
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

  // Skeleton loading component for the carousel
  const SkeletonCarousel = () => (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 h-4/5 rounded-full border border-gold-200/10" />
        <div className="absolute w-3/5 h-3/5 rounded-full border border-gold-200/5" />
      </div>

      {/* Center focal point */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-gold-200/10 to-transparent blur-xl" />

      {/* Skeleton cards */}
      {[...Array(5)].map((_, idx) => {
        // Calculate position for skeleton cards similar to actual cards
        const normalizedPos = (idx - 2) / 2; // Center at index 2
        const maxSpread = radius * 0.8;
        const x = normalizedPos * maxSpread;
        const y = Math.abs(normalizedPos) * 40;
        const scale = Math.max(0.5, 1 - (Math.abs(normalizedPos) * Math.abs(normalizedPos) * 0.5));
        const opacity = Math.max(0.3, 1 - (Math.abs(normalizedPos) * Math.abs(normalizedPos) * 0.7));
        const zIndex = 100 - Math.abs(Math.round(Math.abs(normalizedPos) * Math.abs(normalizedPos) * 50));

        return (
          <div
            key={idx}
            className="absolute transition-all duration-700 ease-out"
            style={{
              x: x,
              y: y,
              scale: scale,
              opacity: opacity,
              zIndex: zIndex,
            }}
          >
            <div className="w-48 h-64 bg-white/10 rounded-lg animate-pulse" />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden">
      {carouselLoaded ? (
        <>
          {/* Carousel Container */}
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
            onMouseEnter={() => {
              setIsAutoRotating(false);
              localStorage.setItem('scentCarouselAutoRotate', 'false');
            }}
            onMouseLeave={() => {
              setIsAutoRotating(true);
              localStorage.setItem('scentCarouselAutoRotate', 'true');
            }}
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
        </>
      ) : (
        <SkeletonCarousel />
      )}
    </div>
  );
};

export default ScentCarousel;