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

        {/* Dynamic Magazine-Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-20">
          {products.map((product, index) => {
             // Create a more varied and dynamic grid pattern
             const isLarge = index % 4 === 0; // Every 4th item is large
             const isMedium = index % 5 === 0; // Every 5th item is medium
             const isTall = index % 3 === 0 && index % 4 !== 0; // Every 3rd item (but not if it's also large) is tall

             let colSpan = "lg:col-span-4"; // Default small card
             if (isLarge) colSpan = "lg:col-span-8"; // Large card
             else if (isMedium) colSpan = "lg:col-span-6"; // Medium card
             else if (isTall) colSpan = "lg:col-span-4"; // Tall card (same width but different styling)

             const offset = index % 2 !== 0 ? "lg:translate-y-12" : "";
             const rotate = index % 7 === 0 ? "lg:rotate-1" : index % 11 === 0 ? "lg:-rotate-1" : "";

             return (
              <div
                key={product.id}
                className={`${colSpan} ${offset} ${rotate} transition-transform duration-700 hover:translate-y-[-10px]`}
              >
                <ProductCard
                  product={product}
                  isLarge={isLarge}
                  isMedium={isMedium}
                  isTall={isTall}
                />
              </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
