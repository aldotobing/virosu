import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

// Scroll to top component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onSplashComplete={handleSplashComplete} />
      ) : (
        <div className="min-h-screen relative bg-onyx text-white font-sans selection:bg-gold-200 selection:text-black">
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>

          {/* Footer is now globally visible or can be per page. Let's keep it global if intended, but Home has the quote section.
              Actually, the Footer was inside Home logic before.
              The previous design had footer in App. Let's put Footer in App so it's on Detail pages too?
              Usually product detail pages have footers.
          */}
          <footer className="py-20 bg-black text-center border-t border-white/5">
              <h2 className="text-2xl font-serif text-white mb-8">VIROSU<span className="text-gold-200">.</span></h2>
              <div className="flex justify-center flex-wrap gap-8 mb-12 text-xs uppercase tracking-widest text-gray-500 px-6">
                <a href="#" className="hover:text-gold-200 transition-colors">Collection</a>
                <a href="#" className="hover:text-gold-200 transition-colors">Our Story</a>
                <a href="#" className="hover:text-gold-200 transition-colors">Contact</a>
                <a href="#" className="hover:text-gold-200 transition-colors">Shipping</a>
                <a href="#" className="hover:text-gold-200 transition-colors">Returns</a>
              </div>
              <p className="text-gray-600 text-xs tracking-wider">&copy; {new Date().getFullYear()} Virosu Perfumery. Crafted with elegance.</p>
            </footer>
        </div>
      )}
    </>
  );
}

export default App;
