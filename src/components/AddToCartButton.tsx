import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../data/products';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'default' | 'compact';
  className?: string;
  onPhoneVerificationRequired?: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  variant = 'default',
  className = '',
  onPhoneVerificationRequired,
}) => {
  const { state, addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Check if phone verification is required
    if (!state.isPhoneVerified && onPhoneVerificationRequired) {
      onPhoneVerificationRequired();
      return;
    }

    // Add to cart
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: (product as any).price || '₹2,499/m²',
      category: product.category,
      subcategory: product.subcategory,
    });

    // Show success feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleAddToCart}
        className={`px-3 py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${className}`}
      >
        {isAdded ? (
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3" />
            Added
          </div>
        ) : (
          'Add to Cart'
        )}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAddToCart}
      className={`px-5 py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </>
      )}
    </motion.button>
  );
};

