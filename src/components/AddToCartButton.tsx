import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, FileText } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useSlabCustomization } from '../contexts/SlabCustomizationContext';
import { Product } from '../data/products';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'default' | 'compact';
  className?: string;
  onPhoneVerificationRequired?: () => void;
  preselectedCustomization?: {
    finish?: string;
    thickness?: string;
  };
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  variant = 'default',
  className = '',
  onPhoneVerificationRequired,
  preselectedCustomization,
}) => {
  const { state, addItem, toggleCart } = useCart();
  const { openModal: openSlabModal, setCustomization } = useSlabCustomization();
  const [isAdded, setIsAdded] = useState(false);

  // Listen for phone verification completion
  useEffect(() => {
    const handlePhoneVerified = (e: Event) => {
      const customEvent = e as CustomEvent;
      const verifiedProductId = customEvent.detail?.productId;
  
      if (product.category === 'furniture' && verifiedProductId === product.id) {
        addItem({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price || '₹2,499',
          category: product.category,
          subcategory: product.subcategory,
        });
  
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
          toggleCart();
        }, 500);
      }
    };
  
    window.addEventListener('phone-verified', handlePhoneVerified);
    return () => window.removeEventListener('phone-verified', handlePhoneVerified);
  }, [product, addItem, toggleCart]);
  

  const handleClick = () => {
    // For slabs: Request quotation (phone verification first)
    if (product.category === 'slabs') {
      // Apply preselected customization if provided
      if (preselectedCustomization) {
        setCustomization((prev) => ({
          ...prev,
          ...(preselectedCustomization.finish && { finish: preselectedCustomization.finish }),
          ...(preselectedCustomization.thickness && { thickness: preselectedCustomization.thickness }),
        }));
      }
      
      // Check if phone is already verified
      if (!state.isPhoneVerified && onPhoneVerificationRequired) {
        onPhoneVerificationRequired();
      } else {
        openSlabModal(product, state.phoneNumber);
      }
      return;
    }

    // For furniture: Add to cart (phone verification required)
    if (!state.isPhoneVerified && onPhoneVerificationRequired) {
      onPhoneVerificationRequired();
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price || '₹2,499',
      category: product.category,
      subcategory: product.subcategory,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // For slabs, show "Request Quotation" button
  if (product.category === 'slabs') {
    if (variant === 'compact') {
      return (
        <button
          onClick={handleClick}
          className={`px-3 py-2 text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1 ${className}`}
        >
          <FileText className="w-3 h-3" />
          <span>Request Quote</span>
        </button>
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`px-5 py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${className}`}
      >
        <FileText className="w-4 h-4" />
        Request Quotation
      </motion.button>
    );
  }

  // For furniture, show "Add to Cart" button
  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
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
      onClick={handleClick}
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