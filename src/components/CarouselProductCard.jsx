import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles, Droplet } from 'lucide-react';

const CarouselProductCard = ({ product, isActive, scale }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Dynamic glow color based on category
  const glowColor = {
    'Men': 'from-blue-500/20 to-cyan-500/20',
    'Women': 'from-pink-500/20 to-rose-500/20',
    'Unisex': 'from-purple-500/20 to-amber-500/20'
  }[product.category] || 'from-gold-200/20 to-yellow-500/20';

  // Extract notes for preview (simple extraction)
  const extractNotes = (desc) => {
    const topMatch = desc.match(/Top Notes[^:]*:([^*\n]+)/i);
    const heartMatch = desc.match(/Heart Notes[^:]*:([^*\n]+)/i);
    return {
      top: topMatch ? topMatch[1].trim().split(',')[0] : null,
      heart: heartMatch ? heartMatch[1].trim().split(',')[0] : null
    };
  };

  const notes = extractNotes(product.description);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity'
        }}
        className={`relative overflow-hidden bg-gradient-to-br from-charcoal via-charcoal/95 to-onyx w-64 md:w-72 h-80 md:h-96 flex flex-col transition-all duration-500 ${
          isHovered ? 'shadow-xl translate-z-10' : ''
        } ${isActive ? 'ring-1 ring-gold-200/30' : ''}`}
      >
        {/* Border Glow - Simplified */}
        <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-lg pointer-events-none hidden md:block`} />
        <div className="absolute inset-0 border border-white/5 group-hover:border-gold-200/20 transition-all duration-500" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 flex items-center gap-2 rounded-sm">
            <Sparkles size={12} className="text-gold-200" />
            <span className="text-white text-xs uppercase tracking-[0.1em] font-medium">{product.category}</span>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 flex items-center justify-center p-6 overflow-hidden">
          {/* Radial Glow - Only on hover */}
          <motion.div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${glowColor} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}
            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Product Image */}
          <motion.div
            className="relative z-10 flex items-center justify-center w-full"
            animate={isHovered ? { y: [-5, 5, -5] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={product.image.small}
              srcSet={`${product.image.small} 300w, ${product.image.medium} 600w`}
              sizes="(max-width: 768px) 200px, 300px"
              alt={product.name}
              loading="lazy"
              decoding="async"
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
              className="max-h-40 md:max-h-52 object-contain drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Scent Notes Preview - Simplified */}
          {(notes.top || notes.heart) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="absolute top-4 right-4 bg-black/90 backdrop-blur-md border border-gold-200/30 p-3 rounded-sm max-w-[150px] z-30 shadow-lg hidden md:block"
              style={{ transform: 'translateZ(50px)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Droplet size={10} className="text-gold-200" />
                <span className="text-[10px] uppercase tracking-widest text-gold-200">Notes</span>
              </div>
              {notes.top && (
                <p className="text-white text-[10px] font-light leading-tight">
                  {notes.top.substring(0, 20)}...
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Info Panel */}
        <div className="relative mt-auto" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-200/20 to-transparent group-hover:via-gold-200/50 transition-all duration-500" />

          <div className="p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-serif text-white mb-0.5 leading-tight group-hover:text-gold-200 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-light">
                  Extrait de Parfum
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-gold-200 group-hover:text-black transition-all">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarouselProductCard;