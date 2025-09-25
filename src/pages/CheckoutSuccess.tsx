import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';

const CheckoutSuccess = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll send you a confirmation email shortly and our team will contact you to discuss delivery details.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Link
              to="/products"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg"
          >
            <p className="text-sm text-amber-800">
              <strong>Need help?</strong> Contact us at{' '}
              <a href="tel:+91-1234567890" className="text-amber-600 hover:underline">
                +91-1234567890
              </a>{' '}
              or{' '}
              <a href="mailto:hsglobalexport@gmail.com" className="text-amber-600 hover:underline">
                hsglobalexport@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;

