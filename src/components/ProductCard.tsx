// ProductCard.tsx - Request Quote for Slabs, Add to Cart for Furniture

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

interface ProductCardProps {
  product: Product;
  variant: 'modern' | 'luxury' | 'industrial' | 'elegant';
  index: number;
}

const normalizeName = (name: string) =>
  name.replace(/[^a-z0-9\s]/gi, ' ')
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
    const stand = images.filter(img => img.toLowerCase().includes('stand'));
    const others = images.filter(img => !img.toLowerCase().includes('stand'));
    return [...stand, ...others];
  }
  const patterns = [/1\.|01\.|main|cover|primary|_01\.|1-|stand|front|hero|^a\./i];
  const score = (img: string) => {
    const name = img.split('/').pop()?.toLowerCase() || '';
    if (patterns[0].test(name)) return 0;
    const num = name.match(/(\d+)\./);
    return num ? 100 + Number(num[1]) : 1000;
  };
  return [...images].sort((a, b) => score(a) - score(b));
};

export const ProductCard: React.FC<ProductCardProps> = memo(({ product, variant, index }) => {
  const { openModal } = usePhoneVerification();
  const { openModal: openSlabModal } = useSlabCustomization();
  const { state } = useCart();
  const { formatPriceFromUSD } = useLocalization();

  // ⭐ Get USD price
  const priceUSD = useMemo(() => {
    // Direct price on product
    if (product.priceUSD) return product.priceUSD;
    
    // Get from furniture specs
    if (product.category === 'furniture') {
      const specs = getFurnitureSpecs(product.name);
      if (specs?.priceUSD) return specs.priceUSD;
    }
    
    return 0;
  }, [product]);

  // ⭐ Format display price using localization
  const displayPrice = useMemo(() => {
    if (priceUSD > 0) {
      return formatPriceFromUSD(priceUSD);
    }
    return "Get Quote";
  }, [priceUSD, formatPriceFromUSD]);

  // Image handling
  const rawImages = useMemo(() => {
    return product.category === "slabs"
      ? [...(product.images || [])]
      : [product.image, ...(product.images || [])];
  }, [product]);

  const uniqueRaw = useMemo(
    () => Array.from(new Set(rawImages.filter(Boolean))),
    [rawImages]
  );

  const [resolvedImages, setResolvedImages] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    if (product.category !== "slabs") {
      setResolvedImages(sortImagesByPriority(uniqueRaw, product.category));
      return;
    }
    Promise.all(uniqueRaw.map(p => getImageUrl(p))).then(urls => {
      if (active) {
        setResolvedImages(sortImagesByPriority(urls.filter(Boolean), product.category));
      }
    });
    return () => { active = false; };
  }, [uniqueRaw, product.category]);

  const primaryImage = resolvedImages[0] || "";

  const [isHovering, setIsHovering] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [videoState, setVideoState] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [showVideo, setShowVideo] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [primaryImageLoaded, setPrimaryImageLoaded] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const videoCheckedRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isSlab = product.category === 'slabs';
  const isFurniture = product.category === 'furniture';

  useEffect(() => {
    if (!cardRef.current) return;
    if (index < 12) { setIsNearViewport(true); return; }
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: "800px", threshold: 0.01 }
    );
    observerRef.current.observe(cardRef.current);
    return () => observerRef.current?.disconnect();
  }, [index]);

  const videoUrl = isFurniture
    ? getProductVideoUrl(product.name, product.category, (product as any).subcategory || '')
    : null;

  useEffect(() => {
    if (!isFurniture || !videoUrl || !isNearViewport || videoCheckedRef.current) return;
    videoCheckedRef.current = true;
    setVideoState('checking');
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    const cleanup = () => { video.src = ''; video.load(); };
    const timeout = setTimeout(() => { setVideoState('unavailable'); cleanup(); }, 2500);
    video.onloadedmetadata = () => { clearTimeout(timeout); setVideoState('available'); cleanup(); };
    video.onerror = () => { clearTimeout(timeout); setVideoState('unavailable'); cleanup(); };
    video.src = videoUrl;
    return () => { clearTimeout(timeout); cleanup(); };
  }, [isFurniture, videoUrl, isNearViewport]);

  useEffect(() => {
    if (isFurniture && isHovering && videoState === 'available') setShowVideo(true);
    else setShowVideo(false);
  }, [isFurniture, isHovering, videoState]);

  useEffect(() => {
    const shouldSlideshow = isHovering && resolvedImages.length > 1 && (!isFurniture || videoState !== 'available');
    if (!shouldSlideshow) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isHovering) setSlideIndex(0);
      return;
    }
    const delay = setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setSlideIndex(prev => (prev + 1) % resolvedImages.length);
      }, 1200);
    }, 150);
    return () => { clearTimeout(delay); if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovering, resolvedImages.length, videoState, isSlab]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => { setIsHovering(false); setShowVideo(false); setSlideIndex(0); };
  const handleCardClick = () => sessionStorage.setItem('scrollY', window.scrollY.toString());

  const specs = useMemo(() => {
    if (product.category === 'furniture') return getFurnitureSpecs(product.name);
    return null;
  }, [product.name, product.category]);

  const etsyUrl = specs?.etsyUrl || null;

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/productsinfo/${product.id}`}
        onClick={handleCardClick}
        className="relative block overflow-hidden bg-gray-100"
        style={{ aspectRatio: '4/5' }}
      >
        {showVideo && videoUrl && (
          <video key={videoUrl} src={videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-20" />
        )}

        {isNearViewport && primaryImage && (
          <>
            <img
              src={primaryImage}
              alt={product.name}
              loading={index < 12 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${primaryImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setPrimaryImageLoaded(true)}
            />
            {isHovering && primaryImageLoaded && resolvedImages.length > 1 &&
              resolvedImages.map((src, idx) =>
                idx > 0 && (
                  <img
                    key={src}
                    src={src}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === slideIndex ? "opacity-100" : "opacity-0"}`}
                  />
                )
              )}
          </>
        )}

        {!isNearViewport && <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />}
        {isNearViewport && !primaryImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image</span>
          </div>
        )}

        {/* ⭐ Price badge - using converted price with NO decimals */}
        {isFurniture && priceUSD > 0 && (
          <div className="absolute top-3 left-3 z-30">
            <span className="inline-block px-3 py-1.5 text-xs md:text-sm font-semibold rounded-full bg-amber-100/95 text-amber-900 border border-amber-300 shadow-sm">
              {displayPrice}
            </span>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5 rounded-lg" />
      </Link>

      <div className="flex flex-col flex-grow p-4 md:p-5">
        <Link to={`/productsinfo/${product.id}`} onClick={handleCardClick}>
          <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 mb-3">{product.name}</h3>
        </Link>

        {/* ⭐ Fixed button layout with proper flex distribution */}
        <div className="mt-auto pt-2 flex gap-2">
          {/* Main button - takes more space */}
          <div className="flex-1 min-w-0">
            {product.category === 'slabs' ? (
              // ⭐ Slabs: Show Request Quote button
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(product);
                }}
                className="w-full h-11 md:h-12 bg-black text-white border-2 border-black hover:bg-black transition-all rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Request Quote
              </button>
            ) : state.items.find(i => i.id === product.id) ? (
              // ⭐ Furniture: Show quantity handler if in cart
              <QuantityHandler product={product} className="w-full h-11 md:h-12" />
            ) : (
              // ⭐ Furniture: Show add to cart button
              <AddToCartButton
                product={product}
                variant="compact"
                className="w-full h-11 md:h-12 bg-black text-white border-2 border-black hover:bg-gray-800 transition-all rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap"
                onPhoneVerificationRequired={() => openModal(product)}
              />
            )}
          </div>

          {/* Icon buttons - fixed width */}
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