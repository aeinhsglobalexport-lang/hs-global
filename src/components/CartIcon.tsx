import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const CartIcon: React.FC = () => {
  const { state, toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleCart}
      className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </motion.div>
      )}
    </motion.button>
  );
};

