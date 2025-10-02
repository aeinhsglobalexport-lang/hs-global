import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { AddToCartButton } from './AddToCartButton';
import { QuantityHandler } from './QuantityHandler';
import { usePhoneVerification } from '../contexts/PhoneVerificationContext';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  variant: 'modern' | 'luxury' | 'industrial' | 'elegant';
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product, variant, index }) => {
  const { openModal } = usePhoneVerification();
  const { state } = useCart();
  const priceText = (product as any).price ?? '₹2,499/m²';

  const slideshowImages = useMemo(() => {
    const imgs = [product.image, ...((product as any).images || [])].filter(Boolean);
    return Array.from(new Set(imgs));
  }, [product]);

  const [isHovering, setIsHovering] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const hoverTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    // Start after brief hover delay (50ms)
    if (isHovering) {
      hoverTimerRef.current = window.setTimeout(() => {
        intervalRef.current = window.setInterval(() => {
          setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
        }, 1100);
      }, 50);
    } else {
      // cleanup when hover ends
      if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      hoverTimerRef.current = null;
      intervalRef.current = null;
      setSlideIndex(0);
    }
    return () => {
      if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      hoverTimerRef.current = null;
      intervalRef.current = null;
    };
  }, [isHovering, slideshowImages.length]);


  return (
    <motion.div
      data-variant={variant}
      className={`relative overflow-hidden group transition-transform duration-300 bg-white shadow-lg hover:shadow-xl rounded-lg`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      style={{ aspectRatio: '3/4' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image / Slideshow stack wrapped for navigation */}
      <Link to={`/productsinfo/${product.id}`} aria-label={`View details for ${product.name}`} className="absolute inset-0 block">
        {slideshowImages.length === 0 ? (
          <div className="absolute inset-0 animate-pulse bg-gray-100" />
        ) : slideshowImages.map((src, idx) => (
          <img
            key={`${src}-${idx}`}
            src={src}
            alt={product.name}
            className={`absolute inset-0 w-full h-full ${product.category === 'furniture' ? 'object-cover group-hover:brightness-100' : 'object-cover group-hover:brightness-75'} transition-all duration-500 ${
              idx === slideIndex ? 'opacity-100' : 'opacity-0'
            } ${product.category === 'slabs' ? 'scale-95 -translate-y-9 origin-center' : ''}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchpriority={idx === 0 ? 'high' : 'auto'}
            decoding={idx === 0 ? 'sync' : 'async'}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
        ))}
      </Link>

      {/* Subtle border to separate from white background */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5 rounded-lg" />

      {/* Top-left price badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-block px-3 py-1.5 text-xs md:text-sm font-semibold tracking-wide rounded-full bg-amber-100/95 text-amber-900 border border-amber-300 shadow-sm">
          {priceText ? priceText : 'Price on request'}
        </span>
      </div>


      {/* Bottom content overlay: Row1 name, Row2 buttons */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-white/90 via-white/70 to-transparent backdrop-blur-[2px]">
        <div className="space-y-3">
          {/* Row 1: Name */}
          <h3 className="text-[1.075rem] md:text-lg font-semibold md:font-bold text-gray-900 text-center leading-snug tracking-wide">
            {product.name}
          </h3>
          {/* Row 2: Buttons */}
          <div className="grid grid-cols-5 gap-1">
            <div className="col-span-4">
              {state.items.find(item => item.id === product.id) ? (
                <QuantityHandler 
                  product={product}
                  className="w-full h-full"
                />
              ) : (
                <AddToCartButton 
                  product={product} 
                  variant="compact" 
                  className="w-full h-full bg-white text-black hover:bg-black hover:text-white border-2 border-black hover:border-black transition-all duration-300 font-semibold text-xs md:text-sm"
                  onPhoneVerificationRequired={() => openModal(product)}
                />
              )}
            </div>
            <a
              href={`https://wa.me/918107115116?text=${encodeURIComponent('Inquiry about ' + product.name)}`}
              target="_blank"
              rel="noreferrer"
              className="col-span-1 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white border-2 border-black hover:border-black transition-all duration-300 font-semibold"
              aria-label="Inquire on WhatsApp"
              title="Inquire on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5 fill-green-500">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.1 5.38.12 11.98c0 2.1.55 4.1 1.52 5.86L0 24l6.3-1.6a12.02 12.02 0 0 0 5.76 1.46h.03c6.6 0 11.97-5.36 12-11.96a11.94 11.94 0  0 0-3.57-8.42zM12.09 21.3h-.02a9.9 9.9 0 0 1-5.04-1.38l-.36-.2-3.74.95.99-3.64-.24-.38a9.36 9.36 0  0 1-1.45-4.96c-.02-5.16 4.18-9.38 9.34-9.4 2.5 0 4.86.98 6.64 2.77a9.32 9.32 0  0 1 2.75 6.65c-.02 5.16-4.22 9.39-9.37 9.39zm5.35-7.26c-.29-.15-1.72-.84-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.92 1.12-.17.19-.34.22-.62.08-.29-.15-1.2-.44-2.28-1.41-1.68-1.5-1.92-2.33-2.14-2.62-.23-.29-.02-.45.13-.6.13-.13.3-.33.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.55-.9-2.12-.24-.57-.48-.49-.66-.49-.17 0-.37-.02-.57-.02-.2 0-.52.08-.8.37-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.16 5.04 4.43.71.31 1.26.48 1.69.62.71.22 1.34.2 1.85.12.57-.09 1.73-.7 1.98-1.39.25-.69.25-1.27.17-1.39-.07-.12-.27-.19-.55-.33z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});


