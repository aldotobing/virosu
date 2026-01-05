import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';

const Home = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <div id="shop">
        <ProductSection />
      </div>

      {/* About Virosu Section */}
      <section id="about" className="py-32 px-6 md:px-12 bg-charcoal/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_var(--tw-gradient-stops))] from-gold-200/5 via-transparent to-transparent opacity-40 pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold-200 uppercase tracking-[0.5em] text-xs border-b border-gold-400 pb-2 inline-block mb-6">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Virosu – The Art of Timeless Essence
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed font-light first-letter:text-5xl first-letter:font-serif first-letter:text-gold-200 first-letter:mr-2 first-letter:float-left">
                Hadirkan kemewahan sejati dalam setiap semprotan. Virosu adalah Extrait de Parfum yang dirancang khusus bagi Anda yang menghargai kualitas tanpa kompromi. Menggunakan bibit parfum premium pilihan, setiap tetesnya memancarkan karakter yang kuat, mendalam, dan memikat.
              </p>
              <p className="text-gray-400 font-light leading-relaxed">
                Dengan konsentrasi minyak parfum tertinggi, Virosu menjanjikan ketahanan aroma yang luar biasa sepanjang hari, menciptakan jejak (sillage) yang elegan kemanapun Anda pergi.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
              <h3 className="text-gold-200 font-serif text-xl mb-6 border-b border-white/10 pb-3">What Makes Us Different</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-gold-200 text-2xl">•</span>
                  <div>
                    <span className="text-white font-medium block mb-1">Extrait de Parfum</span>
                    <span className="text-gray-400 text-sm">Highest concentration for lasting impression</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-200 text-2xl">•</span>
                  <div>
                    <span className="text-white font-medium block mb-1">Premium High-Grade Ingredients</span>
                    <span className="text-gray-400 text-sm">Only the finest oils and essences</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-200 text-2xl">•</span>
                  <div>
                    <span className="text-white font-medium block mb-1">12-24 Hour Longevity</span>
                    <span className="text-gray-400 text-sm">All-day elegance, unmatched performance</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-200 text-2xl">•</span>
                  <div>
                    <span className="text-white font-medium block mb-1">Exclusive & Bold Character</span>
                    <span className="text-gray-400 text-sm">More than a scent—it's your identity</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-500 italic mt-16 text-lg font-light">
            Rasakan kemewahan yang melekat sempurna di kulit Anda. <br />
            <span className="text-gold-200">Virosu, lebih dari sekadar wangi—ini adalah identitas.</span>
          </p>
        </div>
      </section>
      
      {/* Aesthetic Quote Section */}
      <section id="journal" className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-gradient opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic text-gold-200 mb-8 leading-tight">
            "Perfume is the art that makes memory speak."
          </h2>
          <p className="text-gray-400 uppercase tracking-[0.3em] text-sm">
            Francis Kurkdjian
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
