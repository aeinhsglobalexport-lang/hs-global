import { useEffect, useRef, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const ProductDetails = () => {
  const { id }: { id?: string } = useParams<{ id?: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const { state: cartState } = useCart();
  const { openModal } = usePhoneVerification();
  
  // Resolve product from generated catalog
  const allProducts = useMemo(() => getAllProducts(), []);
  const resolved: ProductType | undefined = useMemo(() => allProducts.find(p => p.id === id), [allProducts, id]);

  // Build a rich product object with sensible fallbacks
  const product = useMemo(() => {
    const baseImages = resolved?.images && resolved.images.length > 0 ? resolved.images : (resolved?.image ? [resolved.image] : ["/demo2.webp"]);
    const relatedPool = allProducts.filter(p => {
      const notSelf = p.id !== (resolved?.id || id);
      const sameCategory = resolved?.category ? p.category === resolved.category : true;
      const sameSubForFurniture = resolved?.category === 'furniture' && resolved?.subcategory
        ? p.subcategory === resolved.subcategory
        : true;
      return notSelf && sameCategory && sameSubForFurniture;
    });
    const relatedPick = relatedPool.slice(0, 10).map(p => ({ id: p.id, name: p.name, image: p.image }));
    return {
      id: resolved?.id || id || 'demo-product',
      name: resolved?.name || 'Premium Stone',
      category: resolved?.category || 'slabs',
      subcategory: resolved?.subcategory || 'marble',
      image: baseImages[0],
      price: "Price on Request",
      moq: "MOQ: 20 m²",
      images: baseImages,
      description: resolved?.description || 'Premium natural stone slab ideal for countertops, vanities, flooring and wall cladding with strict quality selection.',
      specs: {
        finish: "Polished",
        thickness: "20 mm",
        origin: "India",
        material: (resolved?.subcategory || 'Stone').toString().replace(/-/g,' '),
        application: "Indoor / Outdoor",
      } as Record<string, string>,
      relatedProducts: relatedPick
    };
  }, [resolved, id, allProducts]);

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
  const slideWidth = 250; // Fixed width per card
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
    
    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Auto-scroll effect
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
      {/* Breadcrumb and title */}
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

      {/* Centered main image (no crop) */}
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

        {/* Thumbnails below main image */}
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

      {/* CTA bar: price + MOQ + buttons */}
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-xl border border-amber-200/40 p-5 bg-gradient-to-r from-amber-50/20 to-transparent">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <div className="text-2xl font-bold text-gray-900">{product.price}</div>
              <div className="text-sm font-medium text-gray-600">{product.moq}</div>
            </div>
            <div className="flex items-center gap-3">
              {isInCart ? (
                <QuantityHandler product={product} />
              ) : (
                <AddToCartButton 
                  product={product} 
                  onPhoneVerificationRequired={() => openModal(product)} 
                  className="h-11 inline-flex items-center gap-2 px-6 rounded-full bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:border-black shadow-lg hover:shadow-xl transition-all duration-300"
                />
              )}
              <a
                href={`https://wa.me/918107115116?text=${encodeURIComponent('Inquiry about ' + product.name)}`}
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 inline-flex items-center justify-center rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="WhatsApp Inquiry"
                title="WhatsApp Inquiry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-green-500">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.1 5.38.12 11.98c0 2.1.55 4.1 1.52 5.86L0 24l6.3-1.6a12.02 12.02 0 0 0 5.76 1.46h.03c6.6 0 11.97-5.36 12-11.96a11.94 11.94 0  0 0-3.57-8.42zM12.09 21.3h-.02a9.9 9.9 0 0 1-5.04-1.38l-.36-.2-3.74.95.99-3.64-.24-.38a9.36 9.36 0  0 1-1.45-4.96c-.02-5.16 4.18-9.38 9.34-9.4 2.5 0 4.86.98 6.64 2.77a9.32 9.32 0  0 1 2.75 6.65c-.02 5.16-4.22 9.39-9.37 9.39zm5.35-7.26c-.29-.15-1.72-.84-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.92 1.12-.17.19-.34.22-.62.08-.29-.15-1.2-.44-2.28-1.41-1.68-1.5-1.92-2.33-2.14-2.62-.23-.29-.02-.45.13-.6.13-.13.3-.33.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.55-.9-2.12-.24-.57-.48-.49-.66-.49-.17 0-.37-.02-.57-.02-.2 0-.52.08-.8.37-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.16 5.04 4.43.71.31 1.26.48 1.69.62.71.22 1.34.2 1.85.12.57-.09 1.73-.7 1.98-1.39.25-.69.25-1.27.17-1.39-.07-.12-.27-.19-.55-.33z"/>
                </svg>
              </a>
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
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-gray-200 p-4 bg-white/30 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-wider text-gray-500">{key}</div>
                <div className="mt-1 font-semibold text-gray-900">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6 text-gray-800">
            <p className="leading-relaxed">
              This stone offers a smooth, polished surface with subtle veining that elevates both contemporary and classic interiors. Its durability and low maintenance make it suitable for kitchens, bathrooms, living areas and commercial lobbies.
            </p>
            <p className="leading-relaxed">
              For best results, seal annually and clean with pH‑neutral stone cleaners. Avoid harsh acids. We provide guidance on slab selection, edge profiles, and installation practices tailored to your project.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-amber-200/50 p-6 bg-gradient-to-br from-amber-50/40 to-transparent">
            <div className="flex items-start">
              <Quote className="w-6 h-6 text-amber-600 mr-3" />
              <p className="text-gray-800 leading-relaxed">
                Crafted by nature over millennia, this marble delivers timeless elegance to modern spaces. Request a live video of current slabs to choose your exact piece.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related photos slider with buttons - cards styled like Products */}
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
