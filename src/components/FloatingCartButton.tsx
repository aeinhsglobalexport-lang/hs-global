import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const FloatingCartButton: React.FC = () => {
  const { state, toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 border-2 border-white"
          aria-label={`Shopping cart with ${totalItems} items`}
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-black"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
