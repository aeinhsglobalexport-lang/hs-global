import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingCartButton } from './FloatingCartButton';
import { CartDrawer } from './CartDrawer';
import { PhoneVerifyModal } from './PhoneVerifyModal';
import LeadCapturePopup from './LeadCapturePopup';
import { usePhoneVerification } from '../contexts/PhoneVerificationContext';
import { useCart } from '../contexts/CartContext';
import { useLeadCapturePopup } from '../hooks/useLeadCapturePopup';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isModalOpen, pendingProduct, closeModal } = usePhoneVerification();
  const { addItem, toggleCart, setPhoneVerified } = useCart();
  const { isOpen: isLeadPopupOpen, closePopup: closeLeadPopup } = useLeadCapturePopup();

  const handlePhoneVerified = (phoneNumber: string) => {
    // Set phone as verified in the cart context
    setPhoneVerified(phoneNumber);
    
    if (pendingProduct) {
      // Add to cart after verification
      addItem({
        id: pendingProduct.id,
        name: pendingProduct.name,
        image: pendingProduct.image,
        price: (pendingProduct as any).price || '₹2,499/m²',
        category: pendingProduct.category,
        subcategory: pendingProduct.subcategory,
      });
    }
    closeModal();
    // Auto-open cart drawer after verification
    setTimeout(() => {
      toggleCart();
    }, 1000); // Small delay to allow modal to close
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
      <PhoneVerifyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onVerified={handlePhoneVerified}
      />
      <LeadCapturePopup
        isOpen={isLeadPopupOpen}
        onClose={closeLeadPopup}
      />
    </div>
  );
};

export default Layout;