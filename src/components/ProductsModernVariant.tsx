import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { TopTabsNav } from './Navigation/TopTabsNav';
import { categories, Subcategory, Product } from '../data/products';

export const ProductsModernVariant: React.FC = () => {
  const [activeSection, setActiveSection] = useState('marble');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [navDims, setNavDims] = useState<{ height: number; top: number; offsetTop?: number }>({ height: 0, top: 0, offsetTop: 0 });
  const [navForceFixed, setNavForceFixed] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('slabs');
  const location = useLocation();
  // Dynamic gallery preview thumbnails (from public/gallery)
  const galleryFiles = useMemo(() => (
    import.meta.glob('/public/gallery/**/*.{webp,jpg,jpeg,png}', { as: 'url', eager: true }) as Record<string, string>
  ), []);
  const galleryPreview = useMemo(() => {
    const urls = Object.values(galleryFiles).map(u => u.replace(/^\/public/, ''));
    // Shuffle and take first 8
    for (let i = urls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [urls[i], urls[j]] = [urls[j], urls[i]];
    }
    return urls.slice(0, 8);
  }, [galleryFiles]);

  const handleMeasure = useCallback((d: { height: number; top: number; offsetTop: number }) => {
    setNavDims((prev) => {
      if (prev.height === d.height && prev.top === d.top && prev.offsetTop === d.offsetTop) return prev;
      return d;
    });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = (navDims.height || 80) + 16;
      const targetTop = window.scrollY + element.getBoundingClientRect().top - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const getAllSubcategories = () => {
    const allSubcategories: { id: string; name: string; products: Product[] }[] = [];
    
    const extractSubcategories = (subcategories: Subcategory[]) => {
      subcategories.forEach(subcategory => {
        if (subcategory.products) {
          allSubcategories.push({
            id: subcategory.id,
            name: subcategory.name,
            products: subcategory.products
          });
        }
        if (subcategory.subcategories) {
          extractSubcategories(subcategory.subcategories);
        }
      });
    };

    categories.forEach(category => {
      extractSubcategories(category.subcategories);
    });

    return allSubcategories;
  };

  const allSubcategories = getAllSubcategories();
  const categoryFilteredSubcategories = allSubcategories.filter((sub) => {
    // find parent category id for this subcategory
    const parentCategory = categories.find(cat =>
      cat.subcategories.some(s => s.id === sub.id || (s.subcategories || []).some(c => c.id === sub.id))
    );
    return parentCategory?.id === activeCategory;
  });

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-100px 0px -40px 0px',
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(sectionRefs.current).forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = heroRef.current;
      const heroBottomY = heroEl ? (heroEl.offsetTop + heroEl.offsetHeight) : 0;
      const shouldBeFixed = window.scrollY >= heroBottomY;
      setNavForceFixed(shouldBeFixed);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [heroRef]);

  // Handle deep-link hash navigation like /products#marble
  useEffect(() => {
    const validSlabIds = new Set(['marble', 'granite', 'sandstone', 'onyx', 'travertine']);

    const navigateToHash = () => {
      const rawState = (location.state as any)?.target as string | undefined;
      const rawHash = (window.location.hash || '').replace(/^#/, '').trim().toLowerCase();
      const raw = (rawState || rawHash).toLowerCase();
      if (!raw) return;
      // If the hash matches a slabs subcategory, ensure slabs is active, then scroll
      if (validSlabIds.has(raw)) {
        if (activeCategory !== 'slabs') setActiveCategory('slabs');
        // allow DOM to paint sections, then scroll
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToSection(raw);
          });
        });
      }
    };

    // Navigate on mount and when hash changes
    navigateToHash();
    const onHash = () => navigateToHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [activeCategory, navDims.height, location.state]);

  // Preload hero image and add CSS for smooth fixed backgrounds
  useEffect(() => {
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg';

    // Add CSS to ensure fixed backgrounds work immediately
    const style = document.createElement('style');
    style.textContent = `
      .fixed-bg {
        background-attachment: fixed !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // reserved: get-quote handler may be wired from CTA

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Banner */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <div 
          className="fixed-bg absolute inset-0"
          style={{
            backgroundImage: "url('/products-hero.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              Discover Premium Granite & Marble
            </motion.h1>
            <motion.p 
              className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              Export-grade slabs, tiles and custom finishes delivered worldwide
            </motion.p>
          </div>
        </div>
      </section>

      <TopTabsNav 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        onMeasure={handleMeasure}
        forceFixed={navForceFixed}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {navForceFixed && (
        <div style={{ height: navDims.height }} />
      )}
      
      <div className="pt-6 md:pt-8" id="products">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-16 md:space-y-24 py-6 md:py-8">
            {categoryFilteredSubcategories.map((subcategory) => (
              <motion.section
                key={subcategory.id}
                id={subcategory.id}
                ref={(el) => (sectionRefs.current[subcategory.id] = el)}
                className="scroll-mt-32"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="mb-8 md:mb-12 text-center">
                  <motion.h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-4 md:mb-6 tracking-wide"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    viewport={{ once: true }}
                  >
                    {subcategory.name}
                  </motion.h2>
                  <motion.div 
                    className="w-16 md:w-24 h-px bg-amber-500 mx-auto"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    viewport={{ once: true }}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {subcategory.products.map((product, index) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      variant="modern"
                      index={index}
                    />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>

       {/* Gallery CTA Section */}
       <section id="gallery-cta" className="py-16 md:py-24 bg-gray-50">
         <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-6xl mx-auto">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-2xl md:text-4xl font-light text-gray-800">Explore Our Gallery</h2>
               <a href="/gallery" className="text-amber-600 hover:text-amber-700 font-semibold">View All</a>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {galleryPreview.map((src, idx) => (
                <motion.a
                   key={src}
                   href="/gallery"
                   className="relative block overflow-hidden rounded-lg shadow-sm bg-white"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                  transition={{ duration: 0.28, delay: idx * 0.03 }}
                 >
                   <img src={src} alt="Gallery" className="w-full h-40 md:h-48 object-cover" loading="lazy" />
                   <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                 </motion.a>
               ))}
             </div>
           </div>
         </div>
       </section>

    </div>
  );
};