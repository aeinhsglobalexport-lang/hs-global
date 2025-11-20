import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Layers, Send, Loader2, CheckCircle } from 'lucide-react';
import { useSlabCustomization } from '../contexts/SlabCustomizationContext';
import emailjs from '@emailjs/browser';

const FINISHES = [
  'Polish', 'Flaming', 'Sand Blast', 'Shot Blast', 
  'Bush Hammer', 'River Wash', 'Honed', 'Leather', 'Lepatora'
];

const THICKNESSES = ['12mm', '15mm', '18mm', '20mm', '25mm', '30mm'];

export const SlabCustomizationModal: React.FC = () => {
  const { isModalOpen, pendingProduct, customization, phoneNumber, closeModal, setCustomization } = useSlabCustomization();
  
  const [finish, setFinish] = useState(customization.finish);
  const [thickness, setThickness] = useState(customization.thickness);
  const [requirement, setRequirement] = useState(customization.requirement);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    if (isModalOpen) {
      setFinish(customization.finish);
      setThickness(customization.thickness);
      setRequirement(customization.requirement);
      setIsSuccess(false);
    }
  }, [isModalOpen, customization]);

  const handleSubmit = async () => {
    if (!pendingProduct) return;

    setIsSubmitting(true);
    
    try {
      // EmailJS configuration
      const templateParams = {
        to_email: 'inquiry@hsglobalexport.com',
        product_name: pendingProduct.name,
        customer_phone: phoneNumber,
        finish_type: finish,
        thickness: thickness,
        requirement: `${requirement} sq ft`,
        message: `New quotation request received for ${pendingProduct.name}. Customer details: Phone - ${phoneNumber}, Finish - ${finish}, Thickness - ${thickness}, Requirement - ${requirement} sq ft.`
      };

      // Replace with your EmailJS credentials
      await emailjs.send(
        'service_5d0ylks',  // Replace with your EmailJS service ID
        'template_rq2cw01', // Replace with your EmailJS template ID
        templateParams,
        'E7nX2-yGe6MFC64-p'   // Replace with your EmailJS public key
      );
      
      setCustomization({ finish, thickness, requirement });
      setIsSuccess(true);
setShowToast(true);

setTimeout(() => {
  setShowToast(false);
}, 3000); // Toast disappears after 3 seconds

setTimeout(() => {
  closeModal();
}, 2500);

    } catch (error) {
      console.error('Quote request error:', error);
      alert('Failed to send quotation request. Please try WhatsApp or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && pendingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {isSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Request Sent!</h3>
                <p className="text-gray-600">We'll contact you shortly with pricing details at {phoneNumber}</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10 rounded-t-2xl">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-black rounded-full flex-shrink-0">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-black">Request Quotation</h2>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{pendingProduct.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Phone Display */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-gray-600 mb-1">Contact Number</div>
                    <div className="font-semibold text-sm sm:text-base">{phoneNumber}</div>
                  </div>

                  {/* Finish Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Finish Type</label>
                    <select
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      {FINISHES.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Thickness Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thickness</label>
                    <div className="grid grid-cols-3 gap-2">
                      {THICKNESSES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setThickness(t)}
                          className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-all ${
                            thickness === t
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Requirement Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requirement (sq ft)</label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        value={requirement}
                        onChange={(e) => setRequirement(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-amber-50 rounded-lg p-3 sm:p-4 border border-amber-200">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Request Summary</h4>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Product:</span>
                        <span className="font-medium truncate ml-2 max-w-[60%]">{pendingProduct.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finish:</span>
                        <span className="font-medium">{finish}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thickness:</span>
                        <span className="font-medium">{thickness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-medium">{requirement} sq ft</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-6 border-t sticky bottom-0 bg-white rounded-b-2xl">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Quote Request
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

{showToast && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 right-6 z-[110] bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
    >
      <CheckCircle className="w-5 h-5" />
      <span className="text-sm">Quote request sent successfully!</span>
    </motion.div>
  )}
    </AnimatePresence>
  );
};