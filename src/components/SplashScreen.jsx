import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onSplashComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total duration: 4s
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onSplashComplete();
      }, 800); // Wait for exit animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  // Container variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  // Letter animation: Smooth fade up + unblur
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: 'blur(10px)',
      scale: 1.1
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] // Custom ease-out
      }
    }
  };

  // Separator line expansion
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 1.2,
        ease: "easeInOut"
      }
    }
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 1,
        delay: 1.8,
        ease: "easeOut"
      }
    }
  };

  const letters = "VIROSU".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-onyx overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.4 }}
               transition={{ duration: 2 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[120px]" 
             />
          </div>

          {/* Logo Container */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Main Logo Text */}
            <div className="flex items-center justify-center overflow-hidden py-4 px-8">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className={`text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter ${
                    i >= 4 
                      ? 'text-transparent bg-clip-text bg-gradient-to-b from-gold-200 to-gold-400' 
                      : 'text-white'
                  }`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Decorative Line */}
            <motion.div 
              variants={lineVariants}
              className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-200 to-transparent my-6"
            />

            {/* Tagline */}
            <motion.div variants={taglineVariants} className="flex flex-col items-center space-y-2">
              <span className="text-gold-100/80 text-xs md:text-sm uppercase tracking-[0.4em] font-light">
                Where Scent Becomes
              </span>
              <span className="text-white text-lg md:text-xl font-serif italic tracking-wide">
                Identity
              </span>
            </motion.div>
          </div>

          {/* Bottom Loading Indicator (Minimalist) */}
          <motion.div 
            className="absolute bottom-12 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
             <div className="w-64 h-[1px] bg-white/10 overflow-hidden rounded-full">
               <motion.div 
                 className="h-full bg-gold-200"
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3.5, ease: "linear" }}
               />
             </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;