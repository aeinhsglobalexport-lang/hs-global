import { useEffect, useRef, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2 } from 'lucide-react';
import {
  ChevronRight,
  Quote,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { AddToCartButton } from "../components/AddToCartButton";
import { QuantityHandler } from "../components/QuantityHandler";
import { useCart } from "../contexts/CartContext";
import { usePhoneVerification } from "../contexts/PhoneVerificationContext";
import { getAllProducts, Product as ProductType, categories as catalogCategories, Subcategory } from "../data/products";
import { getFurnitureSpecs, formatFurnitureSpecs } from "../data/furnitureSpecs";
import { useLocalization } from '../contexts/LocalizationContext';


const ProductDetails = () => {
  const { formatPrice } = useLocalization();
  const { id }: { id?: string } = useParams<{ id?: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const { state: cartState } = useCart();
  const { openModal } = usePhoneVerification();
  const [selectedFinish, setSelectedFinish] = useState('Polish');
  const [selectedThickness, setSelectedThickness] = useState('20mm');
  
  // Resolve product from generated catalog
  const allProducts = useMemo(() => getAllProducts(), []);
  const resolved: ProductType | undefined = useMemo(() => allProducts.find(p => p.id === id), [allProducts, id]);

  // Get furniture specs if this is a furniture product
  const furnitureSpecs = useMemo(() => {
    if (resolved?.category === 'furniture' && resolved?.name) {
      return getFurnitureSpecs(resolved.name);
    }
    return null;
  }, [resolved]);

  const etsyUrl = furnitureSpecs?.etsyUrl;

  // Build a rich product object with sensible fallbacks
  const product = useMemo(() => {
    const baseImages = resolved?.images && resolved.images.length > 0
      ? resolved.images
      : (resolved?.image ? [resolved.image] : ["/demo2.webp"]);
  
    const category = resolved?.category || 'slabs';
    const subcategory = resolved?.subcategory || 'marble';
  
    const relatedPool = allProducts.filter(p => {
      const notSelf = p.id !== (resolved?.id || id);
      const sameCategory = resolved?.category ? p.category === resolved.category : true;
      const sameSubForFurniture = resolved?.category === 'furniture' && resolved?.subcategory
        ? p.subcategory === resolved.subcategory
        : true;
      return notSelf && sameCategory && sameSubForFurniture;
    });
  
    const relatedPick = relatedPool.slice(0, 10).map(p => ({
      id: p.id,
      name: p.name,
      image: p.image,
    }));

    // Build specs based on category
  let specs: Record<string, string> = {};
  
  if (category === 'furniture' && furnitureSpecs) {
    specs = formatFurnitureSpecs(furnitureSpecs);
  } else {
    specs = {
      finish: selectedFinish,
      thickness: selectedThickness,
      origin: "India",
      material: (subcategory || 'Stone').toString().replace(/-/g,' '),
      application: "Indoor / Outdoor",
    };
  }

  // Determine price - USE RESOLVED PRICE FIRST (from products.ts)
  let displayPrice = "Price on Request";
  const isAvailable = resolved?.available !== false;
  
  if (!isAvailable) {
    displayPrice = "Currently Unavailable";
  } else if (resolved?.price) {
    // If price is already set from products.ts, use it
    displayPrice = formatPrice(resolved.price);
  } else if (category === 'furniture' && furnitureSpecs?.price) {
    // Fallback to furnitureSpecs if needed
    displayPrice = formatPrice(furnitureSpecs.price);
  }

  // Determine MOQ
  const moq = category === 'slabs' ? "MOQ: 20 m²" : "";

  return {
    id: resolved?.id || id || 'demo-product',
    name: resolved?.name || 'Premium Stone',
    category,
    subcategory,
    image: baseImages[0],
    price: displayPrice,
    moq: moq,
    images: baseImages,
    description: resolved?.description || 'Premium natural stone slab ideal for countertops, vanities, flooring and wall cladding with strict quality selection.',
    specs,
    relatedProducts: relatedPick,
    available: isAvailable
  };
}, [resolved, id, allProducts, selectedFinish, selectedThickness, furnitureSpecs]);

  // Build breadcrumb path from catalog tree
  type CrumbNode = { id: string; name: string };
  const breadcrumbPath: { top: CrumbNode | null; chain: CrumbNode[] } = useMemo(() => {
    if (!product?.id) return { top: null, chain: [] };

    const path: CrumbNode[] = [];
    let topNode: CrumbNode | null = null;

    const visitSubs = (subs: Subcategory[], acc: CrumbNode[]): boolean => {
      for (const sub of subs) {
        const nextAcc = [...acc, { id: sub.id, name: sub.name }];
        if (sub.products && sub.products.some(p => p.id === product.id)) {
          path.push(...nextAcc);
          return true;
        }
        if (sub.subcategories && sub.subcategories.length > 0) {
          if (visitSubs(sub.subcategories as Subcategory[], nextAcc)) return true;
        }
      }
      return false;
    };

    for (const cat of catalogCategories) {
      topNode = { id: cat.id, name: cat.name };
      const found = visitSubs(cat.subcategories as Subcategory[], []);
      if (found) return { top: topNode, chain: path };
    }
    return { top: topNode, chain: path };
  }, [product?.id]);

  // Check if product is in cart
  const isInCart = cartState.items.some(item => item.id === product.id);

  // Slow autoplay for main image
  useEffect(() => {
    const t = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [product.images.length]);

  // Related slider control with proper button navigation
  const relatedRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideWidth = 250;
  const gap = 20;
  
  const scrollToSlide = (index: number) => {
    const el = relatedRef.current;
    if (!el) return;
    const scrollPosition = index * (slideWidth + gap);
    el.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setCurrentSlide(index);
  };

  const scrollRelated = (dir: "left" | "right") => {
    const maxSlides = product.relatedProducts.length;
    if (maxSlides === 0) return;
    
    setIsAutoPlaying(false);
    
    let newIndex;
    if (dir === "right") {
      newIndex = (currentSlide + 1) % maxSlides;
    } else {
      newIndex = (currentSlide - 1 + maxSlides) % maxSlides;
    }
    
    scrollToSlide(newIndex);
    
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} from HS Global Export`,
      url: window.location.href,
    };
  
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    if (!isAutoPlaying || product.relatedProducts.length === 0) return;
    
    const interval = setInterval(() => {
      const maxSlides = product.relatedProducts.length;
      const nextIndex = (currentSlide + 1) % maxSlides;
      scrollToSlide(nextIndex);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, product.relatedProducts.length]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-0">
        <div className="flex items-center text-gray-600 text-sm bg-white/60 backdrop-blur rounded-lg px-3 py-2 inline-flex">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link
            to={breadcrumbPath.top ? `/products?cat=${breadcrumbPath.top.id}` : '/products'}
            className="hover:text-accent"
          >
            Products
          </Link>
          {breadcrumbPath.top && (
            <>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to={`/products?cat=${breadcrumbPath.top.id}`} className="hover:text-accent">
                {breadcrumbPath.top.name}
              </Link>
            </>
          )}
          {breadcrumbPath.chain.map((node, idx) => (
            <span key={node.id} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to={`/products?cat=${breadcrumbPath.top?.id || ''}#${node.id}`} className="hover:text-accent">
                {node.name}
              </Link>
            </span>
          ))}
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main image */}
      <div className="container mx-auto px-4 py-3">
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-4xl rounded-xl overflow-hidden"
        >
          <div className="w-full" style={{ height: '62vh' }}>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          {product.images.slice(0, 5).map((img, idx) => (
            <button
              key={img}
              onClick={() => setSelectedImage(idx)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border transition transform hover:scale-[1.02] ${selectedImage === idx ? "border-amber-500 ring-2 ring-amber-300" : "border-gray-300 hover:border-gray-400"}`}
              aria-label={`Select image ${idx + 1}`}
            >
              <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain bg-white" />
            </button>
          ))}
        </div>
      </div>

      {/* CTA bar */}
      <div className="container mx-auto px-4">
        <div className={`mx-auto max-w-3xl rounded-xl border ${product.available ? 'border-amber-200/40 bg-gradient-to-r from-amber-50/20 to-transparent' : 'border-gray-200/40 bg-gradient-to-r from-gray-50/20 to-transparent'} p-5`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Price or Get Quote */}
            <div className="flex items-baseline gap-4">
              <div className={`text-2xl font-bold ${product.available ? 'text-gray-900' : 'text-gray-600'}`}>
                {product.category === 'slabs' ? 'Get Custom Quote' : product.price}
              </div>
              {product.moq && product.available && product.category !== 'slabs' && (
                <div className="text-sm font-medium text-gray-600">{product.moq}</div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.available ? (
                <>
                  {product.category === 'slabs' ? (
                    <AddToCartButton 
                      product={product}
                      onPhoneVerificationRequired={() => openModal(product)}
                      preselectedCustomization={{
                        finish: selectedFinish,
                        thickness: selectedThickness
                      }}
                      className="h-11 inline-flex items-center gap-2 px-6 rounded-full bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:border-black shadow-lg hover:shadow-xl transition-all duration-300"
                    />
                  ) : (
                    isInCart ? (
                      <QuantityHandler product={product} />
                    ) : (
                      <AddToCartButton 
                        product={product}
                        onPhoneVerificationRequired={() => openModal(product)}
                        className="h-11 inline-flex items-center gap-2 px-6 rounded-full bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:border-black shadow-lg hover:shadow-xl transition-all duration-300"
                      />
                    )
                  )}

            {/* Etsy Button */}
            {etsyUrl && (
              <a
                href={etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 inline-flex items-center gap-2 px-6 rounded-full bg-orange-500 text-white border-2 border-orange-500 hover:bg-white hover:text-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.31 0a1.38 1.38 0 0 1 .99.42c.27.28.42.64.42 1.02v17.12c0 .38-.15.74-.42 1.02-.27.28-.63.42-.99.42H1.38c-.38 0-.74-.15-1.02-.42A1.38 1.38 0 0 1 0 18.56V1.44C0 1.06.15.7.36.42A1.38 1.38 0 0 1 1.38 0h14.93zM6.45 2.69c-.38.05-.64.13-.96.25-.34.13-.61.3-.87.54-.52.47-.78 1.07-.78 1.8 0 .31.04.58.13.82.09.23.23.45.42.65.19.2.41.37.66.51.25.14.53.27.83.38.3.11.6.22.9.33.3.11.58.24.83.38.25.14.47.31.66.51.19.2.33.42.42.65.09.23.13.5.13.82 0 .4-.08.75-.23 1.05-.15.3-.36.55-.62.75-.26.2-.57.35-.92.45-.35.1-.72.15-1.11.15-.42 0-.82-.08-1.2-.24-.38-.16-.71-.4-1-.7-.29-.3-.52-.66-.69-1.08-.17-.42-.25-.88-.25-1.38h-2.3c0 .74.13 1.42.38 2.03.25.61.61 1.14 1.08 1.59.47.45 1.04.8 1.71 1.05.67.25 1.42.38 2.25.38.7 0 1.36-.09 1.98-.28.62-.19 1.17-.47 1.65-.84.48-.37.86-.84 1.14-1.4.28-.56.42-1.21.42-1.95 0-.38-.04-.74-.13-1.07-.09-.33-.23-.63-.42-.9-.19-.27-.41-.51-.66-.72-.25-.21-.53-.39-.83-.54-.3-.15-.6-.28-.9-.39-.3-.11-.58-.21-.83-.3-.25-.09-.47-.18-.66-.27-.19-.09-.33-.18-.42-.27-.09-.09-.13-.18-.13-.27 0-.19.05-.36.15-.51.1-.15.24-.28.42-.38.18-.1.38-.18.6-.23.22-.05.45-.08.69-.08.36 0 .68.06.96.18.28.12.52.28.72.48.2.2.35.43.45.69.1.26.15.54.15.84h2.31c0-.74-.13-1.39-.38-1.95-.25-.56-.6-1.03-1.05-1.41-.45-.38-.99-.67-1.62-.87-.63-.2-1.32-.3-2.07-.3-.6 0-1.17.08-1.71.24z"/>
                </svg>
                Buy on Etsy
              </a>
            )}

            {/* WhatsApp */}
            <a
              href={`https://wa.me/918107115116?text=${encodeURIComponent('Inquiry about ' + product.name)}`}
              target="_blank"
              rel="noreferrer"
              className="h-11 w-11 inline-flex items-center justify-center rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="WhatsApp Inquiry"
              title="WhatsApp Inquiry"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-green-500">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.1 5.38.12 11.98c0 2.1.55 4.1 1.52 5.86L0 24l6.3-1.6a12.02 12.02 0 0 0 5.76 1.46h.03c6.6 0 11.97-5.36 12-11.96a11.94 11.94 0 0 0-3.57-8.42zM12.09 21.3h-.02a9.9 9.9 0 0 1-5.04-1.38l-.36-.2-3.74.95.99-3.64-.24-.38a9.36 9.36 0 0 1-1.45-4.96c-.02-5.16 4.18-9.38 9.34-9.4 2.5 0 4.86.98 6.64 2.77a9.32 9.32 0 0 1 2.75 6.65c-.02 5.16-4.22 9.39-9.37 9.39zm5.35-7.26c-.29-.15-1.72-.84-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.92 1.12-.17.19-.34.22-.62.08-.29-.15-1.2-.44-2.28-1.41-1.68-1.5-1.92-2.33-2.14-2.62-.23-.29-.02-.45.13-.6.13-.13.3-.33.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.55-.9-2.12-.24-.57-.48-.49-.66-.49-.17 0-.37-.02-.57-.02-.2 0-.52.08-.8.37-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.16 5.04 4.43.71.31 1.26.48 1.69.62.71.22 1.34.2 1.85.12.57-.09 1.73-.7 1.98-1.39.25-.69.25-1.27.17-1.39-.07-.12-.27-.19-.55-.33z" />
              </svg>
            </a>

            {/* Share */}
            <button
              onClick={handleShare}
              className="h-11 w-11 inline-flex items-center justify-center rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Share Product"
              title="Share this product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/918107115116?text=${encodeURIComponent('Inquiry about ' + product.name + ' availability')}`}
              target="_blank"
              rel="noreferrer"
              className="h-11 inline-flex items-center gap-2 px-6 rounded-full bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Contact for Availability
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


      {/* Premium content area */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">About {product.name}</h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-700">
            {product.description}
          </p>
          
          {/* Specs Grid - Different for Slabs vs Furniture */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {product.category === 'slabs' ? (
              <>
                <div className="rounded-lg border border-gray-200 p-4 bg-white/30 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Finish</div>
                  <select
                    value={selectedFinish}
                    onChange={(e) => setSelectedFinish(e.target.value)}
                    className="w-full font-semibold text-gray-900 bg-transparent border-none focus:ring-0"
                  >
                    {['Polish', 'Flaming', 'Sand Blast', 'Shot Blast', 'Bush Hammer', 'River Wash', 'Honed', 'Leather', 'Lepatora'].map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="rounded-lg border border-gray-200 p-4 bg-white/30 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Thickness</div>
                  <select
                    value={selectedThickness}
                    onChange={(e) => setSelectedThickness(e.target.value)}
                    className="w-full font-semibold text-gray-900 bg-transparent border-none focus:ring-0"
                  >
                    {['12mm', '15mm', '18mm', '20mm', '25mm', '30mm'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                {Object.entries(product.specs).filter(([key]) => key !== 'finish' && key !== 'thickness').map(([key, value]) => (
                  <div key={key} className="rounded-lg border border-gray-200 p-4 bg-white/30 backdrop-blur-sm">
                    <div className="text-xs uppercase tracking-wider text-gray-500">{key}</div>
                    <div className="mt-1 font-semibold text-gray-900">{value}</div>
                  </div>
                ))}
              </>
            ) : (
              // Furniture specs - just display, no selectors
              Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="rounded-lg border border-gray-200 p-4 bg-white/30 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-gray-500">{key}</div>
                  <div className="mt-1 font-semibold text-gray-900">{value}</div>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 space-y-6 text-gray-800">
            <p className="leading-relaxed">
              {product.category === 'furniture' 
                ? 'This handcrafted furniture piece combines natural stone elegance with functional design. Each piece is meticulously crafted to order, ensuring unique character and premium quality.'
                : 'This stone offers a smooth, polished surface with subtle veining that elevates both contemporary and classic interiors. Its durability and low maintenance make it suitable for kitchens, bathrooms, living areas and commercial lobbies.'
              }
            </p>
            <p className="leading-relaxed">
              {product.category === 'furniture'
                ? 'Custom dimensions and finishes available. We work closely with designers and homeowners to create bespoke pieces that perfectly complement your space.'
                : 'For best results, seal annually and clean with pH‑neutral stone cleaners. Avoid harsh acids. We provide guidance on slab selection, edge profiles, and installation practices tailored to your project.'
              }
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-amber-200/50 p-6 bg-gradient-to-br from-amber-50/40 to-transparent">
            <div className="flex items-start">
              <Quote className="w-6 h-6 text-amber-600 mr-3" />
              <p className="text-gray-800 leading-relaxed">
                {product.category === 'furniture'
                  ? 'Each furniture piece is a unique work of art, combining traditional craftsmanship with modern design sensibilities. Request custom specifications to match your vision.'
                  : 'Crafted by nature over millennia, this marble delivers timeless elegance to modern spaces. Request a live video of current slabs to choose your exact piece.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related photos slider */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-primary">Related Photos</h3>
          <div className="flex gap-2">
            <button onClick={() => scrollRelated('left')} className="h-9 w-9 rounded-full bg-white/90 ring-1 ring-black/20 shadow flex items-center justify-center hover:bg-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scrollRelated('right')} className="h-9 w-9 rounded-full bg-white/90 ring-1 ring-black/20 shadow flex items-center justify-center hover:bg-white">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div 
            ref={relatedRef} 
            className="flex gap-5 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {product.relatedProducts.map((p, i) => (
              <Link
                key={p.id}
                to={`/productsinfo/${p.id}`}
                className="relative overflow-hidden group transition-transform duration-300 bg-white shadow-md hover:shadow-lg shrink-0"
                style={{ 
                  width: `${slideWidth}px`, 
                  aspectRatio: '3/4',
                  scrollSnapAlign: 'start'
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 -translate-y-10 scale-[0.88] group-hover:scale-[0.99]"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white/85 via-white/60 to-transparent">
                  <h4 className="text-sm font-semibold text-gray-900 -translate-y-2 text-center leading-snug">{p.name}</h4>
                  <div className="mt-2 flex justify-center">
                    <span className="inline-flex px-6 py-2 text-xs font-semibold border border-gray-900 bg-gray-900 text-white hover:bg-white hover:text-gray-900 transition-colors duration-200 rounded-none">Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;