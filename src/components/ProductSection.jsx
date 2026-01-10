import React from 'react';
import { Link } from 'react-router-dom';
import ScentCarousel from './ScentCarousel';
import { optimizedProducts } from '../data/optimizedProducts';

const ProductSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-onyx relative">
      <div className="container mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Curated <span className="text-gold-200 italic">Essence</span>
            </h2>
            <p className="text-gray-300 font-light max-w-sm">
              Each fragrance is a masterpiece, composed with the rarest ingredients from around the world.
            </p>
          </div>
          <div className="self-start md:self-end">
             <Link to="/products" className="text-gold-200 text-sm tracking-widest uppercase hover:text-white transition-colors cursor-pointer">
               {optimizedProducts.length} Unique Scents
             </Link>
          </div>
        </header>

        {/* Scent Carousel Gallery */}
        <div className="mb-8">
          <ScentCarousel products={optimizedProducts} />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
