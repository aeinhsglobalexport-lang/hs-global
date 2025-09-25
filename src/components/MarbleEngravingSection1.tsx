import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronRight, Star, ChevronLeft } from 'lucide-react';

const MarbleEngravingSection1: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [availableImages, setAvailableImages] = useState<typeof images>([]);

  // Core demo images (placed under public/engraving)
  const images = [
    {
      src: "/engraving/WhatsApp Image 2025-09-15 at 18.24.53.jpeg",
      title: "Seven Horses Masterpiece",
      description: "Intricate multi-horse engraving"
    },
    {
      src: "/engraving/WhatsApp Image 2025-09-15 at 18.24.56.jpeg",
      title: "Religious Portrait",
      description: "Detailed spiritual artwork"
    },
    {
      src: "/engraving/WhatsApp Image 2025-09-15 at 18.25.02 (1).jpeg",
      title: "Portrait Excellence",
      description: "Lifelike marble engraving"
    },
    {
      src: "/engraving/WhatsApp Image 2025-09-15 at 18.25.02 (2).jpeg",
      title: "Elegant Portrait",
      description: "Premium quality craftsmanship"
    },
    {
      src: "/engraving/WhatsApp Image 2025-09-15 at 18.25.02.jpeg",
      title: "Memory Preserved",
      description: "Timeless marble memorial"
    }
  ];

  // Load from /engraving/manifest.json when available
  type ManifestItem = { src: string; title?: string; description?: string };
  const [manifestItems, setManifestItems] = useState<ManifestItem[] | null>(null);

  // Check which images actually exist
  useEffect(() => {
    const checkImageExists = async (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    const filterAvailableImages = async () => {
      const available = [] as typeof images;
      for (const image of images) {
        const exists = await checkImageExists(image.src);
        if (exists) {
          available.push(image);
        }
      }
      setAvailableImages(available);
    };

    filterAvailableImages();
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch('/engraving/manifest.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ManifestItem[] | null) => {
        if (!isMounted || !data || !Array.isArray(data)) return;
        setManifestItems(data);
      })
      .catch(() => void 0);
    return () => {
      isMounted = false;
    };
  }, []);

  const baseGalleryItems = (manifestItems && manifestItems.length > 0 ? manifestItems : availableImages).map((it) => ({
    src: it.src,
    title: it.title || 'Engraving',
    description: it.description || 'Premium laser engraving',
  }));

  // Create infinite loop by duplicating images multiple times
  const galleryItems = [...baseGalleryItems, ...baseGalleryItems, ...baseGalleryItems];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918107115116?text=I%20am%20interested%20in%20marble%20engraving%20services', '_blank');
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const singleSetWidth = (container.scrollWidth / 3);
      
      if (container.scrollLeft <= 0) {
        // Jump to end of second set for seamless loop
        container.scrollTo({ left: singleSetWidth * 2, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -360, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const singleSetWidth = (container.scrollWidth / 3);
      
      if (container.scrollLeft >= singleSetWidth * 2 - 10) {
        // Jump to beginning of first set for seamless loop
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 360, behavior: 'smooth' });
      }
    }
  };

  // Press-and-hold fast scroll
  const holdIntervalRef = useRef<number | null>(null);
  const handleHoldStart = (direction: 'left' | 'right') => {
    if (holdIntervalRef.current) return;
    holdIntervalRef.current = window.setInterval(() => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -12 : 12, behavior: 'auto' });
    }, 16);
  };
  const handleHoldStop = () => {
    if (holdIntervalRef.current) {
      window.clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  // Auto scroll effect with infinite loop
  useEffect(() => {
    let rafId: number | null = null;
    const step = () => {
      if (!isAutoScrolling || !scrollContainerRef.current) {
        rafId = requestAnimationFrame(step);
        return;
      }
      const container = scrollContainerRef.current;
      const singleSetWidth = (container.scrollWidth / 3); // since we have 3 sets
      const maxScroll = singleSetWidth * 2; // from start of middle set to end of last set
      
      if (container.scrollLeft >= maxScroll - 2) {
        // jump back to the middle set start for seamless loop
        container.scrollTo({ left: singleSetWidth, behavior: 'auto' });
      } else if (container.scrollLeft <= 2) {
        // if somehow at the very start, jump to middle set
        container.scrollTo({ left: singleSetWidth, behavior: 'auto' });
      } else {
        container.scrollBy({ left: 2.5, behavior: 'auto' });
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isAutoScrolling]);

  // Initialize position to middle set for seamless bi-directional looping
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const init = () => {
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    };
    // wait a tick for layout to settle
    const id = window.setTimeout(init, 0);
    return () => window.clearTimeout(id);
  }, [galleryItems.length]);

  const temporarilyPauseAutoScroll = () => {
    setIsAutoScrolling(false);
    window.setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 lg:mb-0"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Marble <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Engraving</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Transform your precious memories into timeless marble masterpieces with our premium engraving service
            </p>
          </motion.div>
          
          <motion.button
            onClick={handleWhatsAppClick}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-black text-white hover:bg-white hover:text-black border-2 border-black hover:border-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-green-500">
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.1 5.38.12 11.98c0 2.1.55 4.1 1.52 5.86L0 24l6.3-1.6a12.02 12.02 0 0 0 5.76 1.46h.03c6.6 0 11.97-5.36 12-11.96a11.94 11.94 0  0 0-3.57-8.42zM12.09 21.3h-.02a9.9 9.9 0  0 1-5.04-1.38l-.36-.2-3.74.95.99-3.64-.24-.38a9.36 9.36 0  0 1-1.45-4.96c-.02-5.16 4.18-9.38 9.34-9.4 2.5 0 4.86.98 6.64 2.77a9.32 9.32 0  0 1 2.75 6.65c-.02 5.16-4.22 9.39-9.37 9.39zm5.35-7.26c-.29-.15-1.72-.84-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.92 1.12-.17.19-.34.22-.62.08-.29-.15-1.2-.44-2.28-1.41-1.68-1.5-1.92-2.33-2.14-2.62-.23-.29-.02-.45.13-.6.13-.13.3-.33.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.55-.9-2.12-.24-.57-.48-.49-.66-.49-.17 0-.37-.02-.57-.02-.2 0-.52.08-.8.37-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.16 5.04 4.43.71.31 1.26.48 1.69.62.71.22 1.34.2 1.85.12.57-.09 1.73-.7 1.98-1.39.25-.69.25-1.27.17-1.39-.07-.12-.27-.19-.55-.33z"/>
            </svg>
            <span>Want to Know More</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onMouseDown={() => handleHoldStart('left')}
            onMouseUp={handleHoldStop}
            onMouseOut={handleHoldStop}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={scrollRight}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onMouseDown={() => handleHoldStart('right')}
            onMouseUp={handleHoldStop}
            onMouseOut={handleHoldStop}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          <div 
            ref={scrollContainerRef}
            onScroll={() => {
              const container = scrollContainerRef.current;
              if (!container) return;
              const singleSetWidth = container.scrollWidth / 3;
              const endOfLast = singleSetWidth * 2;
              if (container.scrollLeft <= 2) {
                container.scrollTo({ left: singleSetWidth, behavior: 'auto' });
              } else if (container.scrollLeft >= endOfLast - 2) {
                container.scrollTo({ left: singleSetWidth, behavior: 'auto' });
              }
            }}
            onWheel={temporarilyPauseAutoScroll}
            onTouchStart={temporarilyPauseAutoScroll}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryItems.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % baseGalleryItems.length) * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Quality Badge */}
                  
                </div>
                
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span>Scroll to see more</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarbleEngravingSection1;
