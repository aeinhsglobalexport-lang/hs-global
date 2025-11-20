import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { AddToCartButton } from './AddToCartButton';
import { QuantityHandler } from './QuantityHandler';
import { usePhoneVerification } from '../contexts/PhoneVerificationContext';
import { useCart } from '../contexts/CartContext';
import { getFurnitureSpecs } from '../data/furnitureSpecs';
import { loadImageUrl } from '../data/slabs.loader';

interface ProductCardProps {
  product: Product;
  variant: 'modern' | 'luxury' | 'industrial' | 'elegant';
  index: number;
}

const normalizeName = (name: string) =>
  name
    .replace(/[^a-z0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getProductVideoUrl = (productName: string, category: string, subcategory: string) => {
  if (category !== 'furniture') return null;
  
  const folderProduct = normalizeName(productName);
  const folderSub = normalizeName(subcategory);
  
  if (subcategory.toLowerCase().includes('table')) {
    return `/videos/Tables/${folderSub}/${folderProduct}/video.mp4`;
  }
  
  if (subcategory.toLowerCase().includes('pedestal') || subcategory.toLowerCase().includes('countertop')) {
    return `/videos/Wash Basins/${folderSub}/${folderProduct}/video.mp4`;
  }
  
  return `/videos/${folderSub}/${folderProduct}/video.mp4`;
};

const sortImagesByPriority = (images: string[], category: string): string[] => {
  if (category !== 'furniture') {
    const standImages = images.filter(img => img.toLowerCase().includes('/stand/'));
    const otherImages = images.filter(img => !img.toLowerCase().includes('/stand/'));
    return [...standImages, ...otherImages];
  }
  
  const priorityPatterns = [
    /^1\.webp$/i, /^1\.jpg$/i, /^1\.png$/i, /^01\.webp$/i, /^01\.jpg$/i,
    /main\./i, /cover\./i, /primary\./i, /_01\./i, /_1\./i, /^1-/i,
    /stand\./i, /front\./i, /hero\./i, /^a\./i,
  ];

  const getImagePriority = (imagePath: string): number => {
    const fileName = imagePath.split('/').pop()?.toLowerCase() || '';
    
    for (let i = 0; i < priorityPatterns.length; i++) {
      if (priorityPatterns[i].test(fileName)) {
        return i;
      }
    }
    
    const numMatch = fileName.match(/^(\d+)\./);
    if (numMatch) {
      const num = parseInt(numMatch[1], 10);
      return 1000 + num;
    }
    
    return 10000;
  };

  return [...images].sort((a, b) => {
    const priorityA = getImagePriority(a);
    const priorityB = getImagePriority(b);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    return a.localeCompare(b);
  });
};

export const ProductCard: React.FC<ProductCardProps> = memo(({ product, variant, index }) => {
  const { openModal } = usePhoneVerification();
  const { state } = useCart();
  const priceText = (product as any).price ?? '₹2,499/m²';

  const [isHovering, setIsHovering] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState<string>('');
  const [isInViewport, setIsInViewport] = useState(false);
  
  // OPTIMIZED: Lazy load images for slabs
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [primaryImageLoaded, setPrimaryImageLoaded] = useState(false);
  const [additionalImagesLoaded, setAdditionalImagesLoaded] = useState(false);
  
  const intervalRef = useRef<number | null>(null);
  const videoCheckedRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check if this is a slab product
  const isSlab = product.category === 'slabs';

  // OPTIMIZED: For slabs, images array contains paths; for furniture, contains URLs
  const imagePaths = useMemo(() => {
    if (isSlab) {
      // For slabs, product.images contains file paths
      const allPaths = [
        ...(product.images || [])
      ].filter(Boolean);
      const uniquePaths = Array.from(new Set(allPaths));
      return sortImagesByPriority(uniquePaths, product.category);
    } else {
      // For furniture, product.images contains URLs
      const allImages = [product.image, ...((product as any).images || [])].filter(Boolean);
      const uniqueImages = Array.from(new Set(allImages));
      return sortImagesByPriority(uniqueImages, product.category);
    }
  }, [product.image, (product as any).images, product.category, isSlab]);

  // OPTIMIZED: Lazy load images when card enters viewport
  useEffect(() => {
    if (!isSlab || isLoadingImages || loadedImages.length > 0) return;
    if (!isInViewport) return;

    setIsLoadingImages(true);
    
    // Load primary image first (first path)
    if (imagePaths.length > 0) {
      loadImageUrl(imagePaths[0])
        .then(url => {
          if (url) {
            setLoadedImages([url]);
            setPrimaryImageLoaded(true);
            
            // Load remaining images after a short delay
            setTimeout(() => {
              if (imagePaths.length > 1) {
                Promise.all(imagePaths.slice(1, 4).map(path => loadImageUrl(path)))
                  .then(urls => {
                    const validUrls = urls.filter(Boolean);
                    setLoadedImages(prev => [...prev, ...validUrls]);
                  })
                  .catch(err => {
                    console.error('Error loading additional images:', err);
                  })
                  .finally(() => {
                    setIsLoadingImages(false);
                  });
              } else {
                setIsLoadingImages(false);
              }
            }, 300);
          } else {
            setIsLoadingImages(false);
          }
        })
        .catch(err => {
          console.error('Error loading primary image:', err);
          setIsLoadingImages(false);
        });
    }
  }, [isSlab, isInViewport, imagePaths, isLoadingImages, loadedImages.length]);

  // Use loaded images for slabs, direct URLs for furniture
  const slideshowImages = useMemo(() => {
    if (isSlab) {
      return loadedImages;
    }
    return imagePaths;
  }, [isSlab, loadedImages, imagePaths]);

  // OPTIMIZED: IntersectionObserver with earlier loading
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // Load 400px before entering viewport
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const etsyUrl = useMemo(() => {
    if (product.category === 'furniture') {
      const specs = getFurnitureSpecs(product.name);
      return specs?.etsyUrl;
    }
    return null;
  }, [product.category, product.name]);

  // Only get video URL for furniture products
  const videoUrl = useMemo(
    () => product.category === 'furniture' 
      ? getProductVideoUrl(product.name, product.category, (product as any).subcategory || '')
      : null,
    [product.name, product.category, (product as any).subcategory]
  );

  // Only check for video if it's a furniture product AND in viewport
  useEffect(() => {
    // Skip video check for slabs
    if (product.category !== 'furniture') return;
    // Only check when in viewport to avoid unnecessary checks
    if (!videoUrl || videoCheckedRef.current || !isInViewport) return;
    
    videoCheckedRef.current = true;

    fetch(videoUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setHasVideo(true);
          setVideoError('');
        } else {
          setHasVideo(false);
          setVideoError(`Video not found (${res.status})`);
        }
      })
      .catch((err) => {
        setHasVideo(false);
        setVideoError(`Fetch error: ${err.message}`);
      });
  }, [videoUrl, isInViewport, product.category]);

  useEffect(() => {
    if ((hasVideo && product.category === 'furniture') || !isHovering || slideshowImages.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setSlideIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
      }, 1100);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovering, hasVideo, slideshowImages.length, product.category]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Only try to play video for furniture products
    if (product.category === 'furniture' && hasVideo) {
      setShowVideo(true);
    }
    // For slabs, slideshow will start automatically via useEffect
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowVideo(false);
    setSlideIndex(0);
  };

  const handleCardClick = () => {
    sessionStorage.setItem('scrollY', window.scrollY.toString());
  };

  const whatsAppUrl = useMemo(
    () =>
      `https://wa.me/918107115116?text=${encodeURIComponent(
        `Inquiry about ${product.name}`
      )}`,
    [product.name]
  );

  // Show placeholder while primary image is loading for slabs
  const showPlaceholder = isSlab && !primaryImageLoaded && isInViewport;
  const showContent = !isSlab || primaryImageLoaded;

  return (
    <motion.div
      ref={cardRef}
      data-variant={variant}
      className="relative overflow-hidden group transition-transform duration-300 bg-white shadow-lg hover:shadow-xl rounded-lg flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/productsinfo/${product.id}`}
        className="relative block overflow-hidden bg-gray-50"
        style={{ aspectRatio: '4/5' }}
        aria-label={`View details for ${product.name}`}
        onClick={handleCardClick}
      >
        {/* VIDEO ON HOVER (only for furniture if exists) */}
        {showVideo && hasVideo && product.category === 'furniture' && videoUrl && (
          <video
            key={videoUrl}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover z-20"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => {/* Video loaded */}}
            onError={(e) => {
              setHasVideo(false);
              setShowVideo(false);
            }}
          />
        )}

        {/* LOADING PLACEHOLDER for slabs */}
        {showPlaceholder && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* IMAGE SLIDESHOW */}
        {showContent && (!showVideo || !hasVideo || product.category !== 'furniture') &&
          slideshowImages.map((src, idx) => {
            const isVisible = idx === slideIndex;
            return (
              <img
                key={`${src}-${idx}`}
                src={src}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
            );
          })}

        {/* DEBUG INFO - Only in development */}
        {import.meta.env.DEV && process.env.NODE_ENV === 'development' && product.category === 'furniture' && (
          <div className="absolute bottom-2 left-2 z-30 text-xs bg-black/70 text-white p-2 rounded max-w-[200px]">
            <div>Video: {hasVideo ? '✓' : '✗'}</div>
            {videoError && <div className="text-red-400">{videoError}</div>}
            <div className="text-gray-300 mt-1">Main: {slideshowImages[0]?.split('/').pop()}</div>
          </div>
        )}

        {/* Price Badge */}
        {product.category === 'furniture' && (
          <div className="absolute top-3 left-3 z-30">
            <span className="inline-block px-3 py-1.5 text-xs md:text-sm font-semibold tracking-wide rounded-full bg-amber-100/95 text-amber-900 border border-amber-300 shadow-sm">
              {priceText}
            </span>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5 rounded-lg" />
      </Link>

      {/* Bottom content */}
      <div className="flex flex-col flex-grow p-4 md:p-5 bg-white">
        <Link to={`/productsinfo/${product.id}`} onClick={handleCardClick}>
          <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-3">
            {product.name}
          </h3>
        </Link>

        {/* Buttons Row */}
        <div className="mt-auto pt-2 flex gap-2">
          <div className="flex-grow">
            {state.items.find((item) => item.id === product.id) ? (
              <QuantityHandler product={product} className="w-full h-11 md:h-12" />
            ) : (
              <AddToCartButton
                product={product}
                variant="compact"
                className="w-full h-11 md:h-12 bg-black text-white hover:bg-gray-800 border-2 border-black transition-all duration-300 font-semibold text-xs md:text-sm rounded-lg"
                onPhoneVerificationRequired={() => openModal(product)}
              />
            )}
          </div>

          {etsyUrl && (
            <a
              href={etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 md:h-12 px-3 flex items-center justify-center rounded-lg transition-colors"
              style={{ backgroundColor: '#ff5c01' }}
              aria-label="Buy on Etsy"
              title="Buy on Etsy"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/etsy_logo.webp"
                alt="Etsy"
                className="w-8 h-8 md:w-9 md:h-9 object-contain"
              />
            </a>
          )}

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="h-11 md:h-12 px-3 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
            aria-label="Inquire on WhatsApp"
            title="Inquire on WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="h-6 w-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.1 5.38.12 11.98c0 2.1.55 4.1 1.52 5.86L0 24l6.3-1.6a12.02 12.02 0 0 0 5.76 1.46h.03c6.6 0 11.97-5.36 12-11.96a11.94 11.94 0 0 0-3.57-8.42zM12.09 21.3h-.02a9.9 9.9 0 0 1-5.04-1.38l-.36-.2-3.74.95.99-3.64-.24-.38a9.36 9.36 0 0 1-1.45-4.96c-.02-5.16 4.18-9.38 9.34-9.4 2.5 0 4.86.98 6.64 2.77a9.32 9.32 0 0 1 2.75 6.65c-.02 5.16-4.22 9.39-9.37 9.39zm5.35-7.26c-.29-.15-1.72-.84-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.92 1.12-.17.19-.34.22-.62.08-.29-.15-1.2-.44-2.28-1.41-1.68-1.5-1.92-2.33-2.14-2.62-.23-.29-.02-.45.13-.6.13-.13.3-.33.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.55-.9-2.12-.24-.57-.48-.49-.66-.49-.17 0-.37-.02-.57-.02-.2 0-.52.08-.8.37-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.16 5.04 4.43.71.31 1.26.48 1.69.62.71.22 1.34.2 1.85.12.57-.09 1.73-.7 1.98-1.39.25-.69.25-1.27.17-1.39-.07-.12-.27-.19-.55-.33z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
});