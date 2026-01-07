import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Letter animation variants
  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    })
  };

  const letters = "VIROSU".split("");

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-onyx">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mobile Background Image - Super Transparent with Dark Overlay */}
        <div className="md:hidden absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/landscape-img.png?w=800&format=webp&q=60')",
              opacity: 0.2
            }}
          />
          <div className="absolute inset-0 bg-onyx/80" />
        </div>

        {/* Desktop Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-gold-200/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gold-200/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Main Content - Vertical Split */}
      <div className="relative z-10 h-screen flex flex-col md:flex-row">
        
        {/* Left Side - Text & CTA */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 md:py-0 relative">
          
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-200/50 to-transparent origin-left"
          />

          {/* Animated Brand Name */}
          <div className="mb-8 overflow-hidden">
            <div className="flex items-center gap-1 md:gap-2">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={letterVariants}
                  className={`text-6xl md:text-8xl lg:text-9xl font-serif font-bold inline-block ${
                    i >= 4 ? 'text-transparent bg-clip-text bg-gradient-to-br from-gold-200 via-yellow-100 to-gold-200' : 'text-white'
                  }`}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tagline with Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold-200" />
              <Sparkles size={16} className="text-gold-200" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 italic mb-2">
              Where Scent Becomes
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white">
              Identity
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg"
          >
            Crafted with rare ingredients. <span className="text-gold-200">12-24 hour</span> longevity. 
            Premium Extrait de Parfum that defines luxury.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <button
              onClick={scrollToShop}
              className="group relative px-10 py-4 border border-gold-200/50 text-white uppercase tracking-[0.25em] text-sm overflow-hidden transition-all duration-500 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-200/20"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Explore Collection</span>
              <div className="absolute inset-0 bg-gold-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>

          {/* Decorative Bottom Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-200/50 to-transparent origin-right hidden md:block"
          />
        </div>

        {/* Right Side - Featured Product with Floating Animation */}
        <motion.div 
          className="flex-1 relative hidden md:flex items-center justify-center p-12"
          style={{ y }}
        >
          {/* Floating Product */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={isLoaded ? { 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
            } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="relative"
          >
            {/* Glow Behind Product */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-200/30 to-transparent blur-3xl scale-150 -z-10" />
            
            {/* Product Image */}
            <motion.img
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              src="/assets/1 MILLION MAN/50 ML.jpg?w=600&format=webp&q=80"
              srcSet="/assets/1 MILLION MAN/50 ML.jpg?w=400&format=webp&q=70 400w, /assets/1 MILLION MAN/50 ML.jpg?w=600&format=webp&q=80 600w, /assets/1 MILLION MAN/50 ML.jpg?w=800&format=webp&q=85 800w"
              sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
              alt="Featured Fragrance"
              className="max-w-sm lg:max-w-md drop-shadow-2xl"
            />

            {/* Floating Specs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 2 }}
              className="absolute top-1/4 -left-20 bg-black/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-sm"
            >
              <div className="text-gold-200 text-3xl font-serif mb-1">12-24h</div>
              <div className="text-gray-400 text-xs uppercase tracking-widest">Longevity</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="absolute bottom-1/4 -right-16 bg-black/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-sm"
            >
              <div className="text-gold-200 text-3xl font-serif mb-1">Premium</div>
              <div className="text-gray-400 text-xs uppercase tracking-widest">Quality</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToShop}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
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
