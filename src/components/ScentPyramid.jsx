import React from 'react';
import { motion } from 'framer-motion';

const ScentPyramid = ({ notes }) => {
  // Parsing string notes into arrays if they are comma-separated strings
  const parseNotes = (noteString) => {
    if (!noteString) return [];
    return noteString.split(',').map(n => n.trim());
  };

  const topNotes = parseNotes(notes.top);
  const heartNotes = parseNotes(notes.heart);
  const baseNotes = parseNotes(notes.base);

  return (
    <div className="relative py-12 px-4 flex flex-col items-center justify-center">
      {/* Background Triangle Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-0 h-0 
          border-l-[150px] border-l-transparent 
          border-r-[150px] border-r-transparent 
          border-b-[250px] border-b-gold-200" 
        />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        
        {/* Top Notes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="inline-block bg-onyx/80 backdrop-blur-md border border-gold-200/30 px-6 py-2 rounded-full mb-3">
            <span className="text-gold-200 text-xs uppercase tracking-widest font-bold">Top Notes</span>
          </div>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            {topNotes.join(' • ')}
          </p>
          <p className="text-gray-500 text-[10px] uppercase mt-1">First Impression (0-15 mins)</p>
        </motion.div>

        {/* Heart Notes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-block bg-onyx/80 backdrop-blur-md border border-gold-200/30 px-6 py-2 rounded-full mb-3">
            <span className="text-gold-200 text-xs uppercase tracking-widest font-bold">Heart Notes</span>
          </div>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            {heartNotes.join(' • ')}
          </p>
          <p className="text-gray-500 text-[10px] uppercase mt-1">Core Character (15-60 mins)</p>
        </motion.div>

        {/* Base Notes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-block bg-onyx/80 backdrop-blur-md border border-gold-200/30 px-6 py-2 rounded-full mb-3">
            <span className="text-gold-200 text-xs uppercase tracking-widest font-bold">Base Notes</span>
          </div>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            {baseNotes.join(' • ')}
          </p>
          <p className="text-gray-500 text-[10px] uppercase mt-1">The Lasting Memory (6+ hours)</p>
        </motion.div>

      </div>
      
      {/* Connecting Lines */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 z-0">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold-200 mb-2"></div>
        <div className="w-px h-16 bg-gold-200 mb-2"></div>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-gold-200"></div>
      </div>
    </div>
  );
};

export default ScentPyramid;
