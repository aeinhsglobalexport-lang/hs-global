// ProductCard.tsx - Request Quote for Slabs, Add to Cart for Furniture
// Fixed version - Handles both furniture and slabs images correctly
// Fixed video matching for similar product names - ALL WORDS MUST MATCH

import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Product } from '../data/products';
import { AddToCartButton } from './AddToCartButton';
import { QuantityHandler } from './QuantityHandler';
import { usePhoneVerification } from '../contexts/PhoneVerificationContext';
import { useSlabCustomization } from '../contexts/SlabCustomizationContext';
import { useCart } from '../contexts/CartContext';
import { useLocalization } from '../contexts/LocalizationContext';

import { getFurnitureSpecs } from '../data/furnitureSpecs';
import { getImageUrl } from "../data/slabs.loader";

// Load all videos using Vite's glob import
const videoFiles = import.meta.glob(
  '/public/videos/**/*.mp4',
  { eager: true, import: 'default' }
) as Record<string, string>;

// Normalize name helper
const normalizeName = (name: string) =>
  name.replace(/[^a-z0-9\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());

/* ---- VIDEO MATCHING ---- */
const findVideoUrl = (productName: string, category: string, subcategory: string): string | null => {
  if (category !== 'furniture') return null;
  
  const normalizedProduct = normalizeName(productName).toLowerCase();
  const normalizedSub = normalizeName(subcategory).toLowerCase();
  
  // Clean product name for exact matching (remove spaces and special chars)
  const cleanProduct = normalizedProduct.replace(/[^a-z0-9]/g, '');
  const cleanSub = normalizedSub.replace(/[^a-z0-9]/g, '');
  
  // FIRST PASS: Try to find EXACT match
  for (const [path, url] of Object.entries(videoFiles)) {
    const cleanPath = path.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if path contains exact product name followed by subcategory or vice versa
    // This ensures "whitemarblesidetable" matches exactly, not "banswarawhitemarblesidetable"
    if (cleanPath.includes(cleanProduct + cleanSub) || 
        cleanPath.includes(cleanSub + cleanProduct)) {
      return url;
    }
  }
  
  // SECOND PASS: Try filename exact match
  for (const [path, url] of Object.entries(videoFiles)) {
    const fileName = path.split('/').pop()?.toLowerCase().replace(/\.mp4$/, '') || '';
    const cleanFileName = fileName.replace(/[^a-z0-9]/g, '');
    
    if (cleanFileName === cleanProduct + cleanSub || 
        cleanFileName === cleanSub + cleanProduct ||
        cleanFileName === cleanProduct) {
      return url;
    }
  }
  
  // THIRD PASS: ALL words must match (strict matching)
  const productWords = normalizedProduct.split(/\s+/).filter(w => w.length > 2);
  let bestMatch: { path: string; url: string; score: number; wordCount: number } | null = null;
  
  for (const [path, url] of Object.entries(videoFiles)) {
    const lowerPath = path.toLowerCase();
    
    // Must include subcategory
    if (!lowerPath.includes(normalizedSub)) continue;
    
    // Count matching words and track which ones
    let matchScore = 0;
    let matchedWords = 0;
    const pathWords = lowerPath.split(/[^a-z0-9]+/).filter(Boolean);
    
    // Check if ALL product words are in path
    for (const word of productWords) {
      if (pathWords.includes(word)) {
        matchedWords++;
        matchScore += word.length;
      }
    }
    
    // CRITICAL: ALL words must match, not just some
    // This ensures "Black Rectangular Block" won't match "Forest Green Rectangular Block"
    if (matchedWords !== productWords.length) continue;
    
    // Penalize if path has significantly MORE words (likely not exact match)
    const pathWordCount = pathWords.length;
    const productWordCount = productWords.length;
    
    // If path has extra words, it's likely a more specific variant
    if (pathWordCount > productWordCount + 2) {
      matchScore *= 0.5; // Heavy penalty
    }
    
    const matchPercentage = matchedWords / productWords.length;
    matchScore *= matchPercentage;
    
    if (!bestMatch || matchScore > bestMatch.score || 
        (matchScore === bestMatch.score && pathWordCount < bestMatch.wordCount)) {
      bestMatch = { path, url, score: matchScore, wordCount: pathWordCount };
    }
  }
  
  return bestMatch ? bestMatch.url : null;
};

/* ---- IMAGE SORTING FOR FURNITURE ---- */
const sortImagesByPriority = (
  images: { url?: string; path?: string }[],
  category: string
): string[] => {

  if (!Array.isArray(images)) return [];

  const valid = images.filter(img => img && typeof img.url === "string");

  if (category === "furniture") {
    const first = valid
      .filter(img => img.path?.toLowerCase?.().includes("/first/"))
      .map(img => img.url!);

    const others = valid
      .filter(img => !img.path?.toLowerCase?.().includes("/first/"))
      .map(img => img.url!);

    return [...first, ...others];
  }

  // For slabs, prioritize stand images
  const urls = valid.map(i => i.url!);
  const stand = urls.filter(img => img?.toLowerCase?.().includes("stand"));
  const others = urls.filter(img => !img?.toLowerCase?.().includes("stand"));

  return [...stand, ...others];
};


/* ---------------------------------------------
   PRODUCT CARD COMPONENT
---------------------------------------------- */

export const ProductCard: React.FC<{
  product: Product;
  variant: 'modern' | 'luxury' | 'industrial' | 'elegant';
  index: number;
}> = memo(({ product, variant, index }) => {

  const { openModal } = usePhoneVerification();
  const { openModal: openSlabModal } = useSlabCustomization();
  const { state } = useCart();
  const { formatPriceFromUSD } = useLocalization();

  /* ---- PRICE ---- */
  const priceUSD = useMemo(() => {
    if (product.priceUSD) return product.priceUSD;
    if (product.category === 'furniture') {
      const specs = getFurnitureSpecs(product.name);
      if (specs?.priceUSD) return specs.priceUSD;
    }
    return 0;
  }, [product]);

  const displayPrice = useMemo(() => {
    if (priceUSD > 0) return formatPriceFromUSD(priceUSD);
    return "Get Quote";
  }, [priceUSD, formatPriceFromUSD]);

  /* ---- RAW IMAGES ---- */
  const rawImages = useMemo(() => {
    return product.category === "slabs"
      ? [...(product.images || [])]
      : [product.image, ...(product.images || [])];
  }, [product]);

  const uniqueRaw = useMemo(
    () => Array.from(new Set(rawImages.filter(Boolean))),
    [rawImages]
  );

  /* ---- RESOLVED IMAGES (handles slabs vs furniture differently) ---- */
  const [resolvedImages, setResolvedImages] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    
    if (product.category === "furniture") {
      // For furniture: normalize and sort by /first/ folder
      const normalized = uniqueRaw.map((img: any) =>
        typeof img === "string"
          ? { url: img, path: img }
          : { url: img.url, path: img.path || img.url }
      );
      setResolvedImages(sortImagesByPriority(normalized, "furniture"));
      return;
    }
    
    // For slabs: use getImageUrl to resolve paths
    Promise.all(uniqueRaw.map(p => getImageUrl(p))).then(urls => {
      if (active) {
        const normalized = urls
          .filter(Boolean)
          .map(url => ({ url, path: url }));
        setResolvedImages(sortImagesByPriority(normalized, "slabs"));
      }
    });
    
    return () => { active = false; };
  }, [uniqueRaw, product.category]);

  /* ---- PRIMARY IMAGE ---- */
  const primaryImage = useMemo(() => {
    return resolvedImages[0] || "";
  }, [resolvedImages]);

  /* ---- STATES ---- */
  const [isHovering, setIsHovering] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [videoState, setVideoState] = useState<'available' | 'unavailable'>('unavailable');
  const [showVideo, setShowVideo] = useState(false);

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [primaryImageLoaded, setPrimaryImageLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isSlab = product.category === 'slabs';
  const isFurniture = product.category === 'furniture';

  /* ---- WINDOW SIZE ---- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---- VIEWPORT LAZY ---- */
  useEffect(() => {
    if (!cardRef.current) return;
    if (index < 12) { setIsNearViewport(true); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          obs.disconnect();
        }
      },
      { rootMargin: "800px", threshold: 0.01 }
    );

    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [index]);

  /* ---- VIDEO URL ---- */
  const subcategory = (product as any).subcategory || "";
  const videoUrl = useMemo(() => {
    if (!isFurniture) return null;
    return findVideoUrl(product.name, product.category, subcategory);
  }, [product]);

  useEffect(() => {
    setVideoState(videoUrl ? 'available' : 'unavailable');
  }, [videoUrl]);

  /* ---- MOBILE AUTOPLAY ---- */
  useEffect(() => {
    if (!cardRef.current || !isMobile || !isFurniture || videoState !== 'available') return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.5 }
    );

    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [isMobile, isFurniture, videoState]);

  /* ---- SHOW VIDEO ---- */
  useEffect(() => {
    if (isFurniture && videoState === 'available') {
      setShowVideo(isMobile ? isInViewport : isHovering);
    } else setShowVideo(false);
  }, [isFurniture, isHovering, videoState, isMobile, isInViewport]);

  /* ---- SLIDESHOW ---- */
  useEffect(() => {
    const shouldSlide =
      isHovering &&
      resolvedImages.length > 1 &&
      (isSlab || (isFurniture && videoState === 'unavailable')) &&
      !(isMobile && showVideo);

    if (!shouldSlide) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isHovering) setSlideIndex(0);
      return;
    }

    const delay = setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setSlideIndex(prev => (prev + 1) % resolvedImages.length);
      }, 1200);
    }, 150);

    return () => {
      clearTimeout(delay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, resolvedImages, videoState, isSlab, isFurniture, isMobile, showVideo]);

  /* ---- CLICK ---- */
  const handleCardClick = () => sessionStorage.setItem('scrollY', window.scrollY.toString());

  const specs = useMemo(() => {
    if (product.category === 'furniture') return getFurnitureSpecs(product.name);
    return null;
  }, [product]);

  const etsyUrl = specs?.etsyUrl || null;

  /* ---------------------------------------------
     RENDER
  ---------------------------------------------- */

  return (
    <motion.div
      ref={cardRef}
      data-variant={variant}
      className="relative overflow-hidden group bg-white shadow-lg hover:shadow-xl rounded-lg flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setShowVideo(false); setSlideIndex(0); }}
    >
      <Link
        to={`/productsinfo/${product.id}`}
        onClick={handleCardClick}
        className="relative block overflow-hidden bg-gray-100"
        style={{ aspectRatio: '4/5' }}
      >
        {/* VIDEO */}
        {showVideo && videoUrl && (
          <video
            key={videoUrl}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-30"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* MAIN IMAGE */}
        {isNearViewport && primaryImage && (
          <>
            <img
              src={primaryImage}
              alt={product.name}
              loading={index < 12 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                primaryImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setPrimaryImageLoaded(true)}
            />

            {/* SLIDESHOW ON HOVER */}
            {isHovering && primaryImageLoaded && resolvedImages.length > 1 &&
              (isSlab || (isFurniture && videoState === 'unavailable')) &&
              resolvedImages.map((src, idx) =>
                idx > 0 && (
                  <img
                    key={src}
                    src={src}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      idx === slideIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )
              )}
          </>
        )}

        {!isNearViewport && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}

        {isNearViewport && !primaryImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image</span>
          </div>
        )}

        {/* PRICE BADGE */}
        {isFurniture && priceUSD > 0 && (
          <div className="absolute top-3 left-3 z-30">
            <span className="inline-block px-3 py-1.5 text-xs md:text-sm font-semibold rounded-full bg-amber-100/95 text-amber-900 border border-amber-300 shadow-sm">
              {displayPrice}
            </span>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5 rounded-lg" />
      </Link>

      {/* INFO SECTION */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        <Link to={`/productsinfo/${product.id}`} onClick={handleCardClick}>
          <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 mb-3">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-2 flex gap-2">
          <div className="flex-1 min-w-0">
            {product.category === 'slabs' ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(product);
                }}
                className="w-full h-11 md:h-12 bg-black text-white border-2 border-black hover:bg-black transition-all rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap flex items-center justify-center gap-2"
              >
                Request Quote
              </button>
            ) : state.items.find(i => i.id === product.id) ? (
              <QuantityHandler product={product} className="w-full h-11 md:h-12" />
            ) : (
              <AddToCartButton
                product={product}
                variant="compact"
                className="w-full h-11 md:h-12 bg-black text-white border-2 border-black hover:bg-gray-800 transition-all rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap"
                onPhoneVerificationRequired={() => openModal(product)}
              />
            )}
          </div>

          {etsyUrl && (
            <a 
              href={etsyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-11 md:h-12 w-11 md:w-12 flex items-center justify-center rounded-lg flex-shrink-0" 
              style={{ backgroundColor: "#ff5c01" }}
            >
              <img src="/etsy_logo.webp" alt="Etsy" className="w-6 h-6 md:w-7 md:h-7 object-contain" />
            </a>
          )}

          <a
            href={`https://wa.me/918107115116?text=${encodeURIComponent("Inquiry about " + product.name)}`}
            target="_blank"
            rel="noreferrer"
            className="h-11 md:h-12 w-11 md:w-12 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-lg flex-shrink-0"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6 fill-white" viewBox="0 0 24 24">
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.1 5.38.12 11.98c0 2.1.55 4.1 1.52 5.86L0 24l6.3-1.6a12.02 12.02 0 0 0 5.76 1.46h.03c6.6 0 11.97-5.36 12-11.96a11.94 11.94 0 0 0-3.57-8.42zM12.09 21.3h-.02a9.9 9.9 0 0 1-5.04-1.38l-.36-.2-3.74.95.99-3.64-.24-.38a9.36 9.36 0 0 1-1.45-4.96c-.02-5.16 4.18-9.38 9.34-9.4 2.5 0 4.86.98 6.64 2.77a9.32 9.32 0 0 1 2.75 6.65c-.02 5.16-4.22 9.39-9.37 9.39zm5.35-7.26c-.29-.15-1.72-.84-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.92 1.12-.17.19-.34.22-.62.08-.29-.15-1.2-.44-2.28-1.41-1.68-1.5-1.92-2.33-2.14-2.62-.23-.29-.02-.45.13-.6.13-.13.3-.33.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.55-.9-2.12-.24-.57-.48-.49-.66-.49-.17 0-.37-.02-.57-.02-.2 0-.52.08-.8.37-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.16 5.04 4.43.71.31 1.26.48 1.69.62.71.22 1.34.2 1.85.12.57-.09 1.73-.7 1.98-1.39.25-.69.25-1.27.17-1.39-.07-.12-.27-.19-.55-.33z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}, (prev, next) => 
  prev.product.id === next.product.id &&
  prev.variant === next.variant &&
  prev.index === next.index
);