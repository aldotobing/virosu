import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-onyx relative">
      <div className="container mx-auto">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Curated <span className="text-gold-200 italic">Essence</span>
            </h2>
            <p className="text-gray-400 font-light max-w-sm">
              Each fragrance is a masterpiece, composed with the rarest ingredients from around the world.
            </p>
          </div>
          <div className="hidden md:block">
             <span className="text-gold-400 text-sm tracking-widest uppercase">
               {products.length} Unique Scents
             </span>
          </div>
        </header>

        {/* Editorial Grid - Alternating Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-20">
          {products.map((product, index) => {
             // Create a varied grid pattern
             const isLarge = index % 3 === 0;
             const colSpan = isLarge ? "lg:col-span-8" : "lg:col-span-4";
             const offset = index % 2 !== 0 ? "lg:translate-y-12" : "";

             return (
              <div key={product.id} className={`${colSpan} ${offset}`}>
                <ProductCard product={product} isLarge={isLarge} />
              </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
