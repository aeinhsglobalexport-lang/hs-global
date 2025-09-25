import React, { memo, useMemo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VirtualizedGridProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  columns: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = memo(({
  items,
  itemHeight,
  containerHeight,
  columns,
  renderItem,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    const handleResize = () => {
      setContainerWidth(container.clientWidth);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const visibleRange = useMemo(() => {
    const rowHeight = itemHeight;
    const visibleRows = Math.ceil(containerHeight / rowHeight) + 2; // Buffer
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.min(startRow + visibleRows, Math.ceil(items.length / columns));
    
    return { startRow, endRow };
  }, [scrollTop, containerHeight, itemHeight, items.length, columns]);

  const visibleItems = useMemo(() => {
    const { startRow, endRow } = visibleRange;
    const startIndex = startRow * columns;
    const endIndex = Math.min(endRow * columns, items.length);
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index
    }));
  }, [items, visibleRange, columns]);

  const totalHeight = Math.ceil(items.length / columns) * itemHeight;
  const offsetY = visibleRange.startRow * itemHeight;

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '1rem'
          }}
        >
          {visibleItems.map(({ item, index }) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: itemHeight }}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});




