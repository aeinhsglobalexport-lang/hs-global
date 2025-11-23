import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { TopTabsNav } from "./Navigation/TopTabsNav";
import { ProductCard } from "./ProductCard";
import { categories, Subcategory, Product } from "../data/products";
import { useTranslation } from "react-i18next";

export const ProductsModernVariant: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ------------------ Scroll Restore ------------------
  const hasRestoredScrollRef = useRef(false);
  useEffect(() => {
    if (!hasRestoredScrollRef.current) {
      const savedY = sessionStorage.getItem("scrollY");
      if (savedY) {
        const scrollTimeout = setTimeout(() => {
          window.scrollTo(0, parseInt(savedY, 10));
          sessionStorage.removeItem("scrollY");
          hasRestoredScrollRef.current = true;
        }, 100);
        return () => clearTimeout(scrollTimeout);
      }
      hasRestoredScrollRef.current = true;
    }
  }, []);

  // ------------------ Refs & State ------------------
  const heroRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [navDims, setNavDims] = useState({ height: 0, top: 0, offsetTop: 0 });
  const [navForceFixed, setNavForceFixed] = useState(false);

  const programmaticScrollRef = useRef(false);
  const userInteractedRef = useRef(false);
  const categoryTransitionRef = useRef(false);
  const initialLoadRef = useRef(true);

  // ------------------ Helper: Get ordered subcategory IDs ------------------
  const getOrderedSubcategoryIds = useCallback((categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return [];
    const ids: string[] = [];
    const recurse = (subs: Subcategory[]) => {
      subs.forEach((s) => {
        if (s.products) ids.push(s.id);
        if (s.subcategories) recurse(s.subcategories);
      });
    };
    recurse(category.subcategories);
    return ids;
  }, []);

  // ------------------ Helper: Find category for section ------------------
  const findCategoryForSection = useCallback((sectionId: string): string | null => {
    for (const cat of categories) {
      const ids = getOrderedSubcategoryIds(cat.id);
      if (ids.includes(sectionId)) return cat.id;
    }
    return null;
  }, [getOrderedSubcategoryIds]);

  // ------------------ Flatten Subcategories (moved up) ------------------
  const allSubcategories = useMemo(() => {
    const out: { id: string; name: string; products: Product[] }[] = [];
    const extract = (subs: Subcategory[]) => {
      subs.forEach((s) => {
        if (s.products) out.push({ id: s.id, name: s.name, products: s.products });
        if (s.subcategories) extract(s.subcategories);
      });
    };
    categories.forEach((c) => extract(c.subcategories));
    return out;
  }, []);

  // ------------------ Initialize from URL ------------------
  const getInitialState = useCallback(() => {
    const catParam = searchParams.get("cat");
    const hash = location.hash.replace("#", "");
    const navState = location.state as any;

    // Priority 1: If coming from navigation with state (like from ChooseStone)
    if (navState?.targetMain) {
      const targetCategory = navState.targetMain;
      const targetSubcategory = navState.targetSubcategory;
      
      // If there's a target product, find its section
      if (navState.targetProduct && targetSubcategory) {
        const orderedIds = getOrderedSubcategoryIds(targetCategory);
        let targetSection = targetSubcategory;

        // Verify the section exists and contains the product
        for (const sec of orderedIds) {
          const sub = allSubcategories.find(s => s.id === sec);
          if (!sub) continue;
          
          if (sub.products.some(p => p.name.toLowerCase() === navState.targetProduct.toLowerCase())) {
            targetSection = sec;
            break;
          }
        }

        return { category: targetCategory, section: targetSection };
      }
      
      // If only subcategory is provided (View More case)
      if (targetSubcategory) {
        const orderedIds = getOrderedSubcategoryIds(targetCategory);
        if (orderedIds.includes(targetSubcategory)) {
          return { category: targetCategory, section: targetSubcategory };
        }
      }
      
      // Otherwise just use first section of category
      const firstSection = getOrderedSubcategoryIds(targetCategory)[0] || "";
      return { category: targetCategory, section: firstSection };
    }

    // Priority 2: cat param + hash combination (for slabs like ?cat=slabs#marble)
    if (catParam && hash) {
      const categoryIds = getOrderedSubcategoryIds(catParam);
      if (categoryIds.includes(hash)) {
        return { category: catParam, section: hash };
      }
    }

    // Priority 3: If hash exists alone, find its category
    if (hash) {
      const hashCategory = findCategoryForSection(hash);
      if (hashCategory) {
        return { category: hashCategory, section: hash };
      }
    }

    // Priority 4: Use cat param if valid, otherwise default to furniture
    const category = catParam && categories.some(c => c.id === catParam) ? catParam : "furniture";
    const firstSection = getOrderedSubcategoryIds(category)[0] || "";
    
    return { category, section: firstSection };
  }, [searchParams, location.hash, location.state, findCategoryForSection, getOrderedSubcategoryIds, allSubcategories]);

  const initialState = useMemo(() => getInitialState(), [getInitialState]);
  const [activeCategory, setActiveCategory] = useState<string>(initialState.category);
  const [activeSection, setActiveSection] = useState<string>(initialState.section);
  const activeSectionRef = useRef<string>(initialState.section);

  // Update ref when state changes
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // ------------------ Handle scroll to target product from navigation ------------------
  useEffect(() => {
    const navState = location.state as any;
    
    if (!navState?.targetMain) {
      return;
    }

    programmaticScrollRef.current = true;

    const timeoutId = setTimeout(() => {
      const sectionId = activeSection;
      const el = sectionRefs.current[sectionId];
      if (el) {
        const offset = (navDims.height || 80) + 16;
        const targetTop = window.scrollY + el.getBoundingClientRect().top - offset;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
        
        setTimeout(() => {
          programmaticScrollRef.current = false;
        }, 1500);
      } else {
        programmaticScrollRef.current = false;
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [location.state, activeSection, navDims.height]);

  // ------------------ Sync URL on category/section change ------------------
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    // Build new URL
    const newParams = new URLSearchParams();
    newParams.set("cat", activeCategory);
    
    // Only set hash if section is not the first one in category
    const orderedIds = getOrderedSubcategoryIds(activeCategory);
    const isFirstSection = orderedIds[0] === activeSection;
    
    const newUrl = `/products?${newParams.toString()}${!isFirstSection && activeSection ? `#${activeSection}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [activeCategory, activeSection, getOrderedSubcategoryIds]);

  // ------------------ Handle initial hash scroll ------------------
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && initialLoadRef.current && !location.state?.targetMain) {
      const hashCategory = findCategoryForSection(hash);
      if (hashCategory && hashCategory !== activeCategory) {
        setActiveCategory(hashCategory);
      }
      
      // Scroll to hash section after a short delay
      setTimeout(() => {
        const el = sectionRefs.current[hash];
        if (el) {
          const offset = (navDims.height || 80) + 16;
          const targetTop = window.scrollY + el.getBoundingClientRect().top - offset;
          window.scrollTo({ top: targetTop, behavior: "smooth" });
          setActiveSection(hash);
        }
      }, 300);
    }
  }, []);

  // ------------------ User Interaction Tracking ------------------
  useEffect(() => {
    const mark = () => (userInteractedRef.current = true);
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("mousedown", mark);
    window.addEventListener("touchstart", mark, { passive: true });
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("mousedown", mark);
      window.removeEventListener("touchstart", mark);
    };
  }, []);

  // ------------------ Gallery Loader ------------------
  const galleryLoaders = useMemo(
    () =>
      import.meta.glob("/public/gallery/**/*.{webp,jpg,jpeg,png}", { as: "url" }) as Record<
        string,
        () => Promise<string>
      >,
    []
  );

  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  useEffect(() => {
    let mounted = true;
    const timeoutId = setTimeout(() => {
      (async () => {
        try {
          const keys = Object.keys(galleryLoaders);
          if (!keys.length) return;
          const shuffled = [...keys].sort(() => Math.random() - 0.5);
          const slice = shuffled.slice(0, 6);
          const resolved = await Promise.all(slice.map((k) => galleryLoaders[k]()));
          if (mounted) setGalleryPreview(resolved.map((u) => u.replace(/^\/public/, "")));
        } catch {}
      })();
    }, 1000);
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [galleryLoaders]);

  // ------------------ Ordered IDs ------------------
  const orderedIds = useMemo(() => getOrderedSubcategoryIds(activeCategory), [
    activeCategory,
    getOrderedSubcategoryIds,
  ]);

  const categoryFilteredSubcategories = useMemo(
    () =>
      allSubcategories
        .filter((s) => orderedIds.includes(s.id))
        .sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id)),
    [allSubcategories, orderedIds]
  );

  // ------------------ Nav Measurement ------------------
  const handleMeasure = useCallback((d: { height: number; top: number; offsetTop: number }) => {
    setNavDims((prev) => {
      if (prev.height === d.height && prev.top === d.top && prev.offsetTop === d.offsetTop) return prev;
      return d;
    });
  }, []);

  // ------------------ Scroll to Section ------------------
  const scrollToSection = useCallback(
    (sectionId: string) => {
      programmaticScrollRef.current = true;
      const el = sectionRefs.current[sectionId];
      if (!el) {
        programmaticScrollRef.current = false;
        return;
      }
      const offset = (navDims.height || 80) + 16;
      const targetTop = window.scrollY + el.getBoundingClientRect().top - offset;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      setActiveSection(sectionId);

      setTimeout(() => {
        programmaticScrollRef.current = false;
      }, 700);
    },
    [navDims.height]
  );

  // ------------------ Intersection Observer ------------------
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-120px 0px -40px 0px",
      threshold: 0.35,
    };

    let rafId: number | null = null;
    let lastUpdateTime = 0;
    const UPDATE_THROTTLE = 200;

    const observer = new IntersectionObserver((entries) => {
      if (programmaticScrollRef.current || categoryTransitionRef.current) return;

      let mostVisible: string | null = null;
      let maxRatio = 0;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisible = entry.target.id;
        }
      });

      if (!mostVisible || mostVisible === activeSectionRef.current) return;

      const now = performance.now();
      if (now - lastUpdateTime < UPDATE_THROTTLE) return;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      const sectionToUpdate = mostVisible;
      rafId = requestAnimationFrame(() => {
        setActiveSection(sectionToUpdate);
        activeSectionRef.current = sectionToUpdate;
        lastUpdateTime = performance.now();
        rafId = null;
      });
    }, observerOptions);

    const sections = Object.values(sectionRefs.current).filter(Boolean);
    sections.forEach((el) => el && observer.observe(el));

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [activeCategory]);

  // ------------------ Nav Force Fixed ------------------
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const hero = heroRef.current;
          const heroBottomY = hero ? hero.offsetTop + hero.offsetHeight : 0;
          setNavForceFixed(window.scrollY >= heroBottomY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ------------------ Category Change ------------------
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      if (newCategory === activeCategory) return;

      categoryTransitionRef.current = true;
      programmaticScrollRef.current = true;

      // Get first section of new category
      const firstSectionId = getOrderedSubcategoryIds(newCategory)[0] || "";

      // Update state
      setActiveCategory(newCategory);
      setActiveSection(firstSectionId);
      activeSectionRef.current = firstSectionId;

      // Update URL - clear hash when switching categories
      const newUrl = `/products?cat=${newCategory}`;
      window.history.replaceState(null, "", newUrl);

      // Scroll to top
      window.scrollTo(0, 0);

      // Reset flags after transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            categoryTransitionRef.current = false;
            programmaticScrollRef.current = false;
          }, 300);
        });
      });
    },
    [activeCategory, getOrderedSubcategoryIds]
  );

  // ------------------ Render ------------------
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/products-hero.webp')" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}>
              {t("product.hero_title")}
            </motion.h1>
            <motion.p className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}>
              {t("product.hero_subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Top Tabs Navigation */}
      <TopTabsNav
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        onMeasure={handleMeasure}
        forceFixed={navForceFixed}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      {navForceFixed && <div style={{ height: navDims.height }} />}

      {/* Product Sections */}
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
                whileInView={{ opacity: 1, y: 0 }}
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
                    <React.Suspense
                      key={product.id}
                      fallback={
                        <div className="bg-white shadow-lg rounded-lg animate-pulse" style={{ aspectRatio: "4/5" }}>
                          <div className="w-full h-full bg-gray-200" />
                        </div>
                      }
                    >
                      <ProductCard product={product} variant="modern" index={index} />
                    </React.Suspense>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section id="gallery-cta" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-4xl font-light text-gray-800">{t("product.gallery_title")}</h2>
              <a href="/gallery" className="text-amber-600 hover:text-amber-700 font-semibold">{t("product.gallery_viewall")}</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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