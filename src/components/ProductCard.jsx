import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isLarge }) => {
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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.6, 0.01, 0.05, 0.95]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer h-full"
      style={{ perspective: 1000 }}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <motion.div 
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          className={`relative overflow-hidden bg-gradient-to-br from-charcoal via-charcoal/95 to-onyx h-full flex flex-col ${isLarge ? 'min-h-[500px]' : 'min-h-[600px]'} transition-shadow duration-500 ${isHovered ? 'shadow-2xl shadow-gold-200/10' : ''}`}
        >
          
          {/* Animated Border Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`} />
          <div className="absolute inset-0 border border-white/5 group-hover:border-gold-200/30 transition-colors duration-500" />
          
          {/* Category Badge with Icon */}
          <motion.div 
            className="absolute top-6 left-6 z-20"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 flex items-center gap-2 rounded-sm">
              <Sparkles size={12} className="text-gold-200" />
              <span className="text-white text-[10px] uppercase tracking-[0.2em] font-medium">{product.category}</span>
            </div>
          </motion.div>

          {/* Image Container */}
          <div className="relative flex-1 flex items-center justify-center p-12 overflow-hidden">
            {/* Animated Radial Glow */}
            <motion.div 
              className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Product Image with 3D Transform */}
            <motion.img 
              src={product.image} 
              alt={product.name}
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
              className="relative z-10 max-w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Diagonal Light Sweep */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%', y: '-100%' }}
              animate={isHovered ? { x: '100%', y: '100%' } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Floating Scent Notes Preview */}
            {(notes.top || notes.heart) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-6 right-6 bg-black/80 backdrop-blur-xl border border-gold-200/30 p-4 rounded-sm max-w-[200px] z-30"
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(60px)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Droplet size={12} className="text-gold-200" />
                  <span className="text-[9px] uppercase tracking-widest text-gold-200">Notes</span>
                </div>
                {notes.top && (
                  <p className="text-white text-xs font-light leading-tight mb-1">
                    <span className="text-gray-500">Top:</span> {notes.top.substring(0, 30)}...
                  </p>
                )}
                {notes.heart && (
                  <p className="text-white text-xs font-light leading-tight">
                    <span className="text-gray-500">Heart:</span> {notes.heart.substring(0, 30)}...
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Info Panel with Magnetic Effect */}
          <div className="relative mt-auto" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
            <div className="h-px bg-gradient-to-r from-transparent via-gold-200/50 to-transparent group-hover:via-gold-200 transition-colors duration-500" />
            
            <div className="p-6 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm">
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight group-hover:text-gold-200 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-light">
                    Extrait de Parfum
                  </p>
                </div>

                {/* Animated Action Icon */}
                <motion.div 
                  className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white group-hover:bg-gold-200 group-hover:text-black group-hover:border-gold-200 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{ transformStyle: 'preserve-3d', transform: 'translateZ(80px)' }}
                >
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Size Badges - Slide in from bottom */}
          <motion.div 
            className="absolute bottom-24 right-6 flex gap-2 z-20"
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(60px)' }}
          >
            {product.sizes.map((size, idx) => (
              <div 
                key={idx}
                className="bg-black/70 backdrop-blur-md border border-gold-200/30 px-3 py-1 text-[10px] text-gold-200 uppercase tracking-widest rounded-full"
              >
                {size}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
