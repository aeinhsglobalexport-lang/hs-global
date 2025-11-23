import React, { useEffect, useMemo, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout: React.FC = () => {
  const { state, removeItem, updateQuantity, getTotalPriceUSD, clearCart } = useCart();
  const { 
    formatPriceFromUSD, 
    convertUserCurrencyToINR,
    currency,
    isIndia,
    getTaxRate,
  } = useLocalization();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(state.phoneNumber || '');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{paymentId: string; orderId: string; amount: number} | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    try {
      const user = localStorage.getItem('userDetails');
      if (user) {
        const parsed = JSON.parse(user);
        setName(parsed.name || '');
        setEmail(parsed.email || '');
        setPhone(parsed.phone || phone);
      }
    } catch {}
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Base calculations in USD
  const subtotalUSD = useMemo(() => getTotalPriceUSD(), [state.items, getTotalPriceUSD]);
  const taxRate = getTaxRate();
  const taxUSD = useMemo(() => Math.round(subtotalUSD * taxRate), [subtotalUSD, taxRate]);
  const shippingUSD = useMemo(() => subtotalUSD > 5500 ? 0 : 110, [subtotalUSD]);
  const packagingUSD = useMemo(() => 55, []);
  const totalUSD = useMemo(() => subtotalUSD + taxUSD + shippingUSD + packagingUSD, [subtotalUSD, taxUSD, shippingUSD, packagingUSD]);

  // Convert for display
  const subtotalDisplay = useMemo(() => formatPriceFromUSD(subtotalUSD), [subtotalUSD, formatPriceFromUSD]);
  const taxDisplay = useMemo(() => formatPriceFromUSD(taxUSD), [taxUSD, formatPriceFromUSD]);
  const shippingDisplay = useMemo(() => formatPriceFromUSD(shippingUSD), [shippingUSD, formatPriceFromUSD]);
  const packagingDisplay = useMemo(() => formatPriceFromUSD(packagingUSD), [packagingUSD, formatPriceFromUSD]);
  const totalDisplay = useMemo(() => formatPriceFromUSD(totalUSD), [totalUSD, formatPriceFromUSD]);

  // Convert total USD to INR for Razorpay
  const razorpayAmountINR = useMemo(() => convertUserCurrencyToINR(totalUSD), [totalUSD, convertUserCurrencyToINR]);

  const isEmailValid = useMemo(() => /^(?=.*@).+\..+$/i.test(email.trim()), [email]);

  const handlePay = async () => {
    if (!window.Razorpay) {
      setPaymentError('Payment system is loading. Please wait a moment and try again.');
      return;
    }

    try {
      setIsCreatingOrder(true);
      setPaymentError(null);

      // ⭐ For testing/demo: Create order directly without backend
      // In production, you should call your backend API here
      const amountPaise = Math.round(razorpayAmountINR * 100);

      const options = {
        key: 'rzp_test_eSYhXQ8wHLbSLW', // ⭐ Test key - Replace with your actual test key
        amount: amountPaise,
        currency: 'INR',
        name: 'HS Global Export',
        description: 'Product Order Payment',
        image: '/logo.png', // Optional: Add your logo
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        notes: {
          address: [address1, address2, city, region, postalCode, country].filter(Boolean).join(', '),
          customer_name: name,
          customer_email: email,
          displayed_currency: currency,
          displayed_amount: totalDisplay,
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: () => {
            setPaymentError('Payment was cancelled. Please try again.');
            setIsCreatingOrder(false);
          },
        },
        handler: async (response: any) => {
          try {
            // Payment successful
            console.log('Payment successful:', response);

            setPaymentInfo({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id || `order_${Date.now()}`,
              amount: amountPaise,
            });

            setPaymentSuccess(true);
            setPaymentError(null);

            // Clear cart
            clearCart();
          } catch (e: any) {
            console.error('Payment processing error:', e);
            setPaymentError(e.message || 'Payment processing error.');
          } finally {
            setIsCreatingOrder(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e: any) {
      console.error('Payment initialization error:', e);
      setPaymentError(e.message || 'Payment failed to initialize. Please try again.');
      setIsCreatingOrder(false);
    }
  };

  // Payment success screen
  if (paymentSuccess && paymentInfo) {
    return (
      <div className="max-w-2xl mx-auto p-6 pt-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/70 backdrop-blur-xl border border-black/10 rounded-2xl p-8 shadow-lg text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your order. We'll process it shortly.</p>

          <div className="bg-white/60 rounded-xl border border-black/10 p-4 text-left space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-medium text-black">{paymentInfo.paymentId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium text-black">{paymentInfo.orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-medium text-black">₹{((paymentInfo.amount || 0) / 100).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-black/10 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold text-black mb-6">Shopping Cart</h2>
          
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link
                to="/products"
                className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-black/90"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-black/10">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-black/10 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-black">{item.name}</h3>
                        <span className="text-sm font-medium text-gray-700 ml-2">
                          {formatPriceFromUSD(item.priceUSD)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                          className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-black">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="border-t border-black/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">{subtotalDisplay}</span>
                </div>
                
                {isIndia() && (
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Tax (18% GST)</span>
                    <span className="font-medium">{taxDisplay}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">{shippingUSD === 0 ? 'FREE' : shippingDisplay}</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Packaging</span>
                  <span className="font-medium">{packagingDisplay}</span>
                </div>
                
                <div className="flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="text-lg font-bold text-black">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-black">{totalDisplay}</span>
                    <p className="text-xs text-gray-500 mt-1">
                      ≈ ₹{razorpayAmountINR.toLocaleString('en-IN')} (Payment in INR)
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Billing Form */}
        {state.items.length > 0 && (
          <div className="bg-white/70 backdrop-blur-xl border border-black/10 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold text-black mb-6">Billing Details</h2>
            
            {paymentError && (
              <div className="mb-4 p-3 rounded-lg border border-red-300 bg-red-50 text-sm text-red-700">
                {paymentError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="john@example.com"
                  required
                />
                {email && !isEmailValid && (
                  <p className="mt-1 text-xs text-red-600">Please enter a valid email address</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} 
                  maxLength={15} 
                  className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                <input 
                  value={address1} 
                  onChange={(e) => setAddress1(e.target.value)} 
                  className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="Street address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                <input 
                  value={address2} 
                  onChange={(e) => setAddress2(e.target.value)} 
                  className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Region *</label>
                  <input 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)} 
                    className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                    placeholder="State"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input 
                    value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))} 
                    className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent" 
                    placeholder="123456"
                    maxLength={10}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePay}
              disabled={
                isCreatingOrder || 
                !name || 
                !isEmailValid || 
                !phone || 
                !address1 || 
                !city || 
                !region || 
                !postalCode
              }
              className="mt-6 w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isCreatingOrder ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>Pay ₹{razorpayAmountINR.toLocaleString('en-IN')}</>
              )}
            </motion.button>
            
            <p className="mt-3 text-xs text-gray-500 text-center">
              Secure payment powered by Razorpay
            </p>
            <p className="mt-1 text-xs text-gray-400 text-center">
              Test mode: Use Razorpay test cards
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;