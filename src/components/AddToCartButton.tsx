import React, { useEffect, useRef } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../data/products';
import { getFurnitureSpecs } from '../data/furnitureSpecs';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
  onPhoneVerificationRequired?: () => void;
  preselectedCustomization?: {
    finish: string;
    thickness: string;
  };
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  variant = 'default',
  className = '',
  onPhoneVerificationRequired,
  preselectedCustomization,
}) => {
  const { addItem, state, toggleCart } = useCart();
  const pendingAddRef = useRef(false);

  // Listen for phone verification success event
  useEffect(() => {
    const handlePhoneVerified = (e: CustomEvent) => {
      console.log('🎉 Phone verified event received:', e.detail);
      
      // Check if this is for our product
      if (e.detail?.productId === product.id && pendingAddRef.current) {
        console.log('✅ Adding product to cart after verification:', product.name);
        
        // Reset pending flag
        pendingAddRef.current = false;
        
        // Add product to cart
        addProductToCart();
        
        // Open cart drawer
        setTimeout(() => {
          console.log('📂 Opening cart drawer');
          toggleCart();
        }, 100);
      }
    };

    window.addEventListener('phone-verified', handlePhoneVerified as EventListener);
    
    return () => {
      window.removeEventListener('phone-verified', handlePhoneVerified as EventListener);
    };
  }, [product.id]);

  const addProductToCart = () => {
    // Get price in USD
    let priceUSD = 0;

    if (product.priceUSD) {
      priceUSD = product.priceUSD;
    } else if (product.category === 'furniture') {
      const specs = getFurnitureSpecs(product.name);
      if (specs?.priceUSD) {
        priceUSD = specs.priceUSD;
      }
    } else if (product.category === 'slabs') {
      priceUSD = 2499;
    }

    console.log('💰 Adding item with price USD:', priceUSD);

    // Add to cart with USD price
    addItem({
      id: product.id,
      name: product.name,
      image: product.image || (product.images?.[0] ?? ''),
      priceUSD: priceUSD,
      category: product.category,
      subcategory: product.subcategory,
      customization: preselectedCustomization ? {
        finish: preselectedCustomization.finish,
        thickness: preselectedCustomization.thickness,
        requirement: 1,
        pricePerSqFt: priceUSD,
      } : undefined,
    });

    console.log('✅ Item added to cart');
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('🖱️ Add to cart clicked for:', product.name);
    console.log('📱 Phone verified:', state.isPhoneVerified);

    // Check phone verification
    if (!state.isPhoneVerified && onPhoneVerificationRequired) {
      console.log('⚠️ Phone not verified, opening verification modal');
      pendingAddRef.current = true;
      onPhoneVerificationRequired();
      return;
    }

    // Phone already verified - add directly
    console.log('✅ Phone already verified, adding directly');
    addProductToCart();
    
    // Auto-open cart after adding
    setTimeout(() => {
      toggleCart();
    }, 100);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors ${className}`}
        aria-label="Add to cart"
      >
        <Plus className="w-4 h-4" />
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${className}`}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors ${className}`}
    >
      <ShoppingCart className="w-5 h-5" />
      <span>Add to Cart</span>
    </button>
  );
};