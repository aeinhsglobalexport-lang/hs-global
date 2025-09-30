import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { categories, Subcategory } from '../../data/products';

interface TopTabsNavProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onMeasure?: (dims: { height: number; top: number; offsetTop: number }) => void;
  forceFixed?: boolean;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const TopTabsNav: React.FC<TopTabsNavProps> = ({ 
  activeSection, 
  onSectionClick, 
  onMeasure, 
  forceFixed,
  activeCategory,
  onCategoryChange,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const subNavRef = useRef<HTMLDivElement | null>(null);
  const [selectedChildren, setSelectedChildren] = useState<Record<string, string>>({});
  const [expandedParentId, setExpandedParentId] = useState<string | null>(null);

  const activeCategoryObj = useMemo(() => 
    categories.find(c => c.id === activeCategory), 
    [activeCategory]
  );

  useEffect(() => {
    setExpandedParentId(null);
  }, [activeCategory]);

  const firstLevelSubs = useMemo(() => {
    if (!activeCategoryObj) return [] as Array<{ id: string; name: string; hasChildren: boolean; hasProducts: boolean; children: Subcategory[] }>;
  
    return activeCategoryObj.subcategories.map((s) => {
      const normalizedId = (s.id || '').trim().toLowerCase();
      const isConsolidated = ['marble', 'onyx', 'sandstone', 'travertine'].includes(normalizedId);
      let hasChildren = Array.isArray(s.subcategories) && s.subcategories.length > 0;
      if (activeCategory === 'slabs' && isConsolidated) {
        hasChildren = false;
      }
  
      const hasProducts = Array.isArray(s.products) && s.products.length > 0;
  
      return {
        id: s.id,
        name: s.name,
        hasChildren,
        hasProducts,
        children: s.subcategories || []
      };
    });
  }, [activeCategoryObj]);
  
  

  // Build child to parent mapping for active section tracking
  const childToParent = useMemo(() => {
    const map: Record<string, { parentId: string; parentName: string }> = {};
    const walk = (subs: Subcategory[], parentId?: string, parentName?: string) => {
      subs.forEach((s) => {
        if (parentId && parentName) {
          map[s.id] = { parentId, parentName };
        }
        if (s.subcategories) {
          walk(s.subcategories, s.id, s.name);
        }
      });
    };
    if (activeCategoryObj) {
      walk(activeCategoryObj.subcategories);
    }
    return map;
  }, [activeCategoryObj]);

  // Update selected children when active section changes
  useEffect(() => {
    const parentInfo = childToParent[activeSection];
    if (parentInfo) {
      setSelectedChildren(prev => ({
        ...prev,
        [parentInfo.parentId]: activeSection
      }));
    }
  }, [activeSection, childToParent]);

  // Report dimensions to parent (ResizeObserver + resize)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const report = () => {
      const rect = el.getBoundingClientRect();
      const topStr = getComputedStyle(el).top;
      const top = parseFloat(topStr) || 0;
      const offsetTop = rect.top + window.scrollY;
      onMeasure?.({ height: rect.height, top, offsetTop });
    };

    const ro = new ResizeObserver(() => report());
    ro.observe(el);
    window.addEventListener('resize', report);
    // initial report
    report();

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', report);
    };
  }, [onMeasure]);

  // No global click listeners needed with inline row

  const handleSubcategoryClick = (subcategory: typeof firstLevelSubs[0]) => {
    // eslint-disable-next-line no-console
    console.log('[TopTabsNav] click subcategory', { id: subcategory.id, name: subcategory.name, hasChildren: subcategory.hasChildren, hasProducts: subcategory.hasProducts });
    if (!subcategory.hasChildren) {
      // Scroll directly if it has no children
      onSectionClick(subcategory.id);
      setTimeout(() => {
        const tryIds = [
          subcategory.id,
          (subcategory.id || '').toLowerCase(),
          (subcategory.id || '').replace(/\s+/g, '-').toLowerCase(),
          (subcategory.id || '').replace(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase(),
        ];
        for (const id of tryIds) {
          const el = document.getElementById(id);
          if (el) {
            const navH = rootRef.current ? rootRef.current.getBoundingClientRect().height : 96;
            const offset = navH + 16;
            const targetTop = window.scrollY + el.getBoundingClientRect().top - offset;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
            break;
          }
        }
      }, 0);
      setExpandedParentId(null);
      return;
    }
    // Toggle inline children row
    setExpandedParentId(prev => (prev === subcategory.id ? null : subcategory.id));
  };
  
  // Also allow clicking the label area to scroll when there are no children
  const onLabelClick = (subcategory: typeof firstLevelSubs[0]) => {
    if (!subcategory.hasChildren) {
      handleSubcategoryClick(subcategory);
    }
  };

  // reserved: horizontal scroll handler if we add arrows later

  const handleChildSelection = (parentId: string, childId: string) => {
    setSelectedChildren(prev => ({ ...prev, [parentId]: childId }));
    onSectionClick(childId);
    setExpandedParentId(null);
  };

  const getDisplayName = (subcategory: typeof firstLevelSubs[0]) => {
    const selectedChildId = selectedChildren[subcategory.id];
    if (selectedChildId && subcategory.hasChildren) {
      const selectedChild = subcategory.children.find(child => child.id === selectedChildId);
      if (selectedChild) {
        return `${subcategory.name} > ${selectedChild.name}`;
      }
    }
    return subcategory.name;
  };

  return (
    <motion.div
      ref={rootRef}
      className={`${
        forceFixed ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
      } z-40 border-b transition-all duration-300 ${forceFixed ? 'bg-white/70 supports-[backdrop-filter]:bg-white/50 backdrop-blur-md border-gray-200/70 shadow-sm' : 'bg-transparent backdrop-blur-0 border-transparent shadow-none'}`}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ willChange: 'transform, opacity, backdropFilter' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Categories */}
        <div className="flex justify-center py-3 md:py-4">
          <div className="inline-flex items-center gap-1 md:gap-2 bg-white rounded-full p-1 shadow-inner border-2 border-black">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setExpandedParentId(null);
                    // Scroll to top of products list when switching top category
                    const anchor = document.getElementById('products');
                    if (anchor) {
                      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    // Update URL hash to reflect selected top category
                    try {
                      const newHash = `#${category.id}`;
                      const url = `${window.location.pathname}${newHash}`;
                      window.history.replaceState(null, '', url);
                    } catch {}
                }}
                className={`px-3 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-black text-white border-2 border-black'
                    : 'text-black hover:text-white hover:bg-black border-2 border-transparent hover:border-black'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories: show for active category; no side buttons, with soft fades */}
        {firstLevelSubs.length > 0 && (
          <div className="pb-3 md:pb-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative flex-1 overflow-visible">
                {/* side fades removed for slabs as requested */}
                <div ref={subNavRef} className="overflow-x-auto overflow-y-visible no-scrollbar">
                  <div className="flex flex-nowrap justify-center gap-2 md:gap-3 px-1 md:px-2">
                  {firstLevelSubs.map((subcategory) => {
                const isActive = activeSection === subcategory.id || 
                  (selectedChildren[subcategory.id] && 
                   activeSection === selectedChildren[subcategory.id]);
                
                return (
                  <div key={subcategory.id} className="relative flex-shrink-0">
                    <motion.button
                      onClick={() => handleSubcategoryClick(subcategory)}
                      className={`px-3 md:px-5 py-2 md:py-2.5 text-sm md:text-base font-medium rounded-full transition-all duration-300 whitespace-nowrap border-2 backdrop-blur flex items-center gap-2 ${
                        isActive
                          ? 'bg-black text-white border-black shadow-md'
                          : 'text-black border-black hover:text-white hover:bg-black bg-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="truncate max-w-[200px] md:max-w-none" onClick={() => onLabelClick(subcategory)}>
                        {getDisplayName(subcategory)}
                      </span>
                      {subcategory.hasChildren && (
                        <ChevronDown className={`h-3 w-3 md:h-4 md:w-4 transition-transform ${expandedParentId === subcategory.id ? 'rotate-180' : ''}`} />
                      )}
                    </motion.button>
                  </div>
                );
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline expanded children row */}
      {expandedParentId && activeCategoryObj && (
        <div className="border-t border-black/10 bg-white">
          <div className="container mx-auto px-4 md:px-6 py-2 md:py-3">
            {firstLevelSubs
              .filter(s => s.id === expandedParentId)
              .map(parent => (
                <div key={parent.id} className="flex flex-wrap gap-2">
                  {parent.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => handleChildSelection(parent.id, child.id)}
                      className="px-3 py-1.5 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white text-sm md:text-base"
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};