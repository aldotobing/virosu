import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onSplashComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the splash screen after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call the completion callback after the exit animation
      setTimeout(() => {
        onSplashComplete();
      }, 500);
    }, 3500); // Show splash for 3.5 seconds to allow for full animation

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  // Letter animation variants for the logo
  const letterVariants = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      rotateX: -90,
      scale: 0.5
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95],
        type: "spring",
        stiffness: 100
      }
    })
  };

  const letters = "VIROSU".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-onyx overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient orbs */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                x: [-100, 100, -100],
                y: [-100, 100, -100],
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gold-200/20 to-transparent rounded-full blur-[150px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
                x: [100, -100, 100],
                y: [100, -100, 100],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1 
              }}
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-transparent to-gold-200/15 rounded-full blur-[120px]"
            />
            
            {/* Subtle particle effect */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gold-200/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Logo with 3D effect */}
            <div className="mb-12 overflow-hidden">
              <div className="flex items-center justify-center gap-2 md:gap-3">
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={letterVariants}
                    className={`text-7xl md:text-9xl lg:text-[10rem] font-serif font-bold inline-block relative ${
                      i >= 4 
                        ? 'text-transparent bg-clip-text bg-gradient-to-br from-gold-200 via-yellow-100 to-gold-300' 
                        : 'text-white'
                    }`}
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {/* 3D effect layer */}
                    <span 
                      className={`absolute top-1 left-1 opacity-30 ${
                        i >= 4 
                          ? 'text-transparent bg-clip-text bg-gradient-to-br from-gold-300 to-gold-400' 
                          : 'text-gray-600'
                      }`}
                      style={{ 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        transform: 'translate(-2px, -2px)',
                        zIndex: -1
                      }}
                    >
                      {letter}
                    </span>
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-8"
            >
              <motion.h2 
                className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 italic mb-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Where Scent Becomes
              </motion.h2>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-white"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(212, 175, 55, 0)",
                    "0 0 20px rgba(212, 175, 55, 0.3)",
                    "0 0 0px rgba(212, 175, 55, 0)",
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Identity
              </motion.h2>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-8"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2 h-2 bg-gold-200 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-gold-200 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-gold-200 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />
              </div>
            </motion.div>

            {/* Subtle tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="text-gray-500 text-sm mt-8 text-center max-w-md px-4"
            >
              Crafting luxury fragrances with rare ingredients
            </motion.p>
          </div>

          {/* Animated border elements */}
          <motion.div
            className="absolute inset-4 border border-gold-200/20 rounded-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-8 border border-gold-200/10 rounded-sm"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;