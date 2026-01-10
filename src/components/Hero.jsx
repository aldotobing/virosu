import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);

    // Delay slightly after splash screen would end to ensure smooth transition
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Flying animation for VIROSU letters - now rising from bottom
  const letterFlyVariants = {
    hidden: {
      y: 50, // Start from below
      opacity: 0
    },
    visible: (i) => ({
      y: 0, // End at original position
      opacity: 1,
      transition: {
        delay: i * 0.1, // Sequential delay starting from V (index 0)
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    })
  };

  // Fade in up animation for other elements (works better for centered mobile layout)
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const letters = "VIROSU".split("");

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-onyx">
      
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mobile Background Image - Refined for Premium Feel */}
        <div className="md:hidden absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/landscape-img.jpg?w=800&format=webp&q=60')",
              opacity: 0.25 // Slightly more visible for atmosphere
            }}
          />
          {/* Stronger gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 via-onyx/70 to-onyx" />
        </div>

        {/* Desktop Gradient Orbs - Static for better performance */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold-200/10 rounded-full blur-[120px] hidden md:block" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold-200/5 rounded-full blur-[100px] hidden md:block" />
      </div>

      {/* Main Content - Vertical Split */}
      <div className="relative z-10 h-screen flex flex-col md:flex-row">
        
        {/* Left Side - Text & CTA */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start px-6 md:px-16 lg:px-24 py-20 md:py-0 relative text-center md:text-left">
          
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-200/50 to-transparent origin-left"
          />

          {/* Animated Brand Name - Flying from left to right */}
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="mb-6 md:mb-8 overflow-hidden"
          >
            <div className="flex items-center gap-1 md:gap-2">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={letterFlyVariants}
                  className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold inline-block ${
                    i >= 4 ? 'text-transparent bg-clip-text bg-gradient-to-br from-gold-200 via-yellow-100 to-gold-200' : 'text-white'
                  }`}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tagline with Slide In */}
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 md:mb-6 flex flex-col items-center md:items-start"
          >
            <div className="hidden md:flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold-200" />
              <Sparkles size={16} className="text-gold-200" />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-300 italic mb-2 tracking-wide">
              Where Scent Becomes
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-white uppercase tracking-widest md:tracking-normal">
              Identity
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-400 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-10 max-w-xs md:max-w-lg mx-auto md:mx-0"
          >
            Crafted with rare ingredients. <span className="text-gold-200">12-24 hour</span> longevity.
            Premium Extrait de Parfum that defines luxury.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: isMobile ? 1.8 : 0.7 }}
          >
            <button
              onClick={scrollToShop}
              className="group relative px-8 py-3.5 md:px-10 md:py-4 border border-gold-200/50 text-white uppercase tracking-[0.3em] text-xs md:text-sm overflow-hidden transition-all duration-500 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-200/20"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Explore Collection</span>
              <div className="absolute inset-0 bg-gold-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>

          {/* Decorative Bottom Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-200/50 to-transparent origin-right hidden md:block"
          />
        </div>

        {/* Right Side - Featured Product with Floating Animation */}
        <motion.div
          className="flex-1 relative hidden md:flex items-center justify-center p-8 lg:p-12"
          style={{ y }}
        >
          {/* Floating Product */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={isLoaded ? {
              opacity: 1,
              scale: 1,
              x: 0,
            } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="relative"
          >
            {/* Enhanced Glow Behind Product for Better Integration */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-200/20 via-transparent to-transparent blur-3xl scale-150 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent blur-2xl scale-125 -z-20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-gold-200/10 blur-xl scale-110 -z-30" />

            {/* Product Image with Enhanced Blending */}
            <div className="relative">
              {/* Multiple layered shadows for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-200/10 to-transparent rounded-xl blur-xl scale-110 -z-5"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl blur-md scale-105 -z-4"></div>

              {/* Main product image with enhanced depth */}
              <motion.img
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                src="/assets/1%20MILLION%20MAN/50%20ML.jpg?w=600&format=webp&q=80"
                srcSet="/assets/1%20MILLION%20MAN/50%20ML.jpg?w=400&format=webp&q=70 400w, /assets/1%20MILLION%20MAN/50%20ML.jpg?w=600&format=webp&q=80 600w, /assets/1%20MILLION%20MAN/50%20ML.jpg?w=800&format=webp&q=85 800w"
                sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
                alt="Featured Fragrance"
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md relative z-10 rounded-xl drop-shadow-2xl"
              />

              {/* Subtle overlay for better integration */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-xl -z-3"></div>
            </div>

            {/* Floating Specs - with higher z-index to appear in front */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute top-1/4 -left-16 md:-left-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-sm z-20"
            >
              <div className="text-gold-200 text-2xl md:text-3xl font-serif mb-1">12-24h</div>
              <div className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest">Longevity</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute bottom-1/4 -right-12 md:-right-16 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-sm z-20"
            >
              <div className="text-gold-200 text-2xl md:text-3xl font-serif mb-1">Premium</div>
              <div className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest">Quality</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToShop}
        style={{ opacity }}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-8 md:bottom-12 left-0 right-0 mx-auto w-fit flex flex-col items-center gap-2 text-white/30 hover:text-gold-200 transition-colors cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-light">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-200/50 to-transparent" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
