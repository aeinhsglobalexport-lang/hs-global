import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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

  // Reset expanded parent and selected children when category changes
  useEffect(() => {
    setExpandedParentId(null);
    setSelectedChildren({});
  }, [activeCategory]);

  const firstLevelSubs = useMemo(() => {
    if (!activeCategoryObj) return [];
  
    return activeCategoryObj.subcategories.map((s) => {
      const normalizedId = (s.id || '').trim().toLowerCase();
      const isConsolidated = ['marble', 'onyx', 'sandstone', 'travertine'].includes(normalizedId);
      let hasChildren = Array.isArray(s.subcategories) && s.subcategories.length > 0;
      if (activeCategory === 'slabs' && isConsolidated) {
        hasChildren = false;
      }

      return {
        id: s.id,
        name: s.name,
        hasChildren,
        hasProducts: Array.isArray(s.products) && s.products.length > 0,
        children: s.subcategories || []
      };
    });
  }, [activeCategoryObj, activeCategory]);
  
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

  // Update selected children based on active section
  useEffect(() => {
    const parentInfo = childToParent[activeSection];
    if (parentInfo) {
      setSelectedChildren(prev => ({
        ...prev,
        [parentInfo.parentId]: activeSection
      }));
    }
  }, [activeSection, childToParent]);

  // Report dimensions
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const report = () => {
      const rect = el.getBoundingClientRect();
      const topStr = getComputedStyle(el).top;
      const top = parseFloat(topStr) || 0;
      onMeasure?.({ height: rect.height, top, offsetTop: rect.top + window.scrollY });
    };

    const ro = new ResizeObserver(report);
    ro.observe(el);
    window.addEventListener('resize', report);
    report();

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', report);
    };
  }, [onMeasure]);

  const scrollToElement = useCallback((sectionId: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const navH = rootRef.current?.getBoundingClientRect().height || 96;
        const targetTop = window.scrollY + el.getBoundingClientRect().top - navH - 16;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  }, []);

  const handleSubcategoryClick = useCallback((subcategory: typeof firstLevelSubs[0]) => {
    if (!subcategory.hasChildren) {
      onSectionClick(subcategory.id);
      scrollToElement(subcategory.id);
      setExpandedParentId(null);
    } else {
      setExpandedParentId(prev => prev === subcategory.id ? null : subcategory.id);
    }
  }, [onSectionClick, scrollToElement]);

  const handleChildSelection = useCallback((parentId: string, childId: string) => {
    setSelectedChildren(prev => ({ ...prev, [parentId]: childId }));
    onSectionClick(childId);
    setExpandedParentId(null);
    scrollToElement(childId);
  }, [onSectionClick, scrollToElement]);

  // Category change - delegate entirely to parent
  const handleCategoryChange = useCallback((categoryId: string) => {
    if (categoryId === activeCategory) return;
    
    // Just call parent handler - it manages URL and state
    onCategoryChange(categoryId);
    setExpandedParentId(null);
    setSelectedChildren({});
  }, [activeCategory, onCategoryChange]);

  const getDisplayName = useCallback((subcategory: typeof firstLevelSubs[0]) => {
    const selectedChildId = selectedChildren[subcategory.id];
    if (selectedChildId && subcategory.hasChildren) {
      const selectedChild = subcategory.children.find(child => child.id === selectedChildId);
      if (selectedChild) {
        return `${subcategory.name} > ${selectedChild.name}`;
      }
    }
    return subcategory.name;
  }, [selectedChildren]);

  return (
    <motion.div
      ref={rootRef}
      className={`${
        forceFixed ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
      } z-40 border-b transition-all duration-200 ${
        forceFixed 
          ? 'bg-white/70 supports-[backdrop-filter]:bg-white/50 backdrop-blur-md border-gray-200/70 shadow-sm' 
          : 'bg-transparent backdrop-blur-0 border-transparent shadow-none'
      }`}
      initial={false}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Categories */}
        <div className="flex justify-center py-3 md:py-4">
          <div className="inline-flex items-center gap-1 md:gap-2 bg-white rounded-full p-1 shadow-inner border-2 border-black">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-3 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold tracking-wide transition-colors duration-150 ${
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

        {/* Subcategories */}
        {firstLevelSubs.length > 0 && (
          <div className="pb-3 md:pb-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative flex-1 overflow-hidden">
                <div
                  ref={subNavRef}
                  className="overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pb-2"
                >
                  <div className="flex flex-nowrap gap-2 px-1 md:flex-nowrap md:justify-start">
                    {firstLevelSubs.map((subcategory) => {
                      const isActive =
                        activeSection === subcategory.id ||
                        subcategory.children?.some(child => child.id === activeSection);
                      return (
                        <div key={subcategory.id} className="relative flex-shrink-0">
                          <button
                            onClick={() => handleSubcategoryClick(subcategory)}
                            className={`px-3 md:px-4 py-2 text-sm md:text-sm font-medium rounded-full transition-colors duration-150 whitespace-nowrap border-2 backdrop-blur flex items-center gap-2 min-w-[8rem] max-w-[12rem] ${
                              isActive
                                ? 'bg-black text-white border-black shadow-md'
                                : 'text-black border-black hover:text-white hover:bg-black bg-white'
                            }`}
                          >
                            <span className="truncate max-w-[200px] md:max-w-none">
                              {getDisplayName(subcategory)}
                            </span>
                            {subcategory.hasChildren && (
                              <ChevronDown
                                className={`h-3 w-3 md:h-4 md:w-4 transition-transform ${
                                  expandedParentId === subcategory.id ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </button>
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

      {/* Expanded children */}
      {expandedParentId && (
        <div className="border-t border-black/10 bg-white">
          <div className="container mx-auto px-4 md:px-6 py-2 md:py-3">
            {firstLevelSubs
              .filter(s => s.id === expandedParentId)
              .map(parent => (
                <div key={parent.id} className="flex flex-wrap gap-2 mt-2">
                  {parent.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => handleChildSelection(parent.id, child.id)}
                      className={`px-3 py-1.5 rounded-full border-2 border-black text-sm md:text-base min-w-[100px] text-center transition-colors duration-150 ${
                        activeSection === child.id
                          ? 'bg-black text-white'
                          : 'bg-white text-black hover:bg-black hover:text-white'
                      }`}
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