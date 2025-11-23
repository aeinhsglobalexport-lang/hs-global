// CartDrawer.tsx - Fixed pricing flow
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';

export const CartDrawer: React.FC = () => {
  const { 
    formatPriceFromUSD, 
    getCurrencySymbol, 
    convertUserCurrencyToINR,
    currency,
    isIndia,
    getTaxRate,
  } = useLocalization();
  
  const { 
    state, 
    updateQuantity, 
    removeItem, 
    closeCart, 
    getTotalPriceUSD, 
    clearCart 
  } = useCart();

  const [step, setStep] = useState<'cart' | 'details' | 'confirm' | 'success'>('cart');
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
  const [razorpayReady, setRazorpayReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('userDetails');
      if (saved) {
        const parsed = JSON.parse(saved);
        setName(parsed.name || '');
        setEmail(parsed.email || '');
        setPhone(parsed.phone || phone);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (state.phoneNumber && state.isPhoneVerified) {
      setPhone(state.phoneNumber);
    }
  }, [state.phoneNumber, state.isPhoneVerified]);

  // ⭐ Base calculations in USD
  const subtotalUSD = useMemo(() => getTotalPriceUSD(), [state.items, getTotalPriceUSD]);
  
  // ⭐ Convert to display currency for cart view (NO TAX HERE)
  const subtotalDisplay = useMemo(() => {
    const converted = formatPriceFromUSD(subtotalUSD);
    return converted;
  }, [subtotalUSD, formatPriceFromUSD]);

  // ⭐ Final calculations (with tax for India only) - shown at CONFIRM step
  const taxRate = getTaxRate();
  const taxUSD = useMemo(() => Math.round(subtotalUSD * taxRate), [subtotalUSD, taxRate]);
  const shippingUSD = useMemo(() => subtotalUSD > 5500 ? 0 : 110, [subtotalUSD]); // Free shipping over $5500
  const packagingUSD = useMemo(() => 55, []); // $55 packaging
  const finalTotalUSD = useMemo(() => {
    return subtotalUSD + taxUSD + shippingUSD + packagingUSD;
  }, [subtotalUSD, taxUSD, shippingUSD, packagingUSD]);

  // Convert final amounts for display
  const taxDisplay = useMemo(() => formatPriceFromUSD(taxUSD), [taxUSD, formatPriceFromUSD]);
  const shippingDisplay = useMemo(() => formatPriceFromUSD(shippingUSD), [shippingUSD, formatPriceFromUSD]);
  const packagingDisplay = useMemo(() => formatPriceFromUSD(packagingUSD), [packagingUSD, formatPriceFromUSD]);
  const finalTotalDisplay = useMemo(() => formatPriceFromUSD(finalTotalUSD), [finalTotalUSD, formatPriceFromUSD]);

  // ⭐ Convert final USD to INR for Razorpay
  const razorpayAmountINR = useMemo(() => {
    return convertUserCurrencyToINR(finalTotalUSD);
  }, [finalTotalUSD, convertUserCurrencyToINR]);

  const handleClose = () => {
    if (step === 'success') {
      try { clearCart(); } catch {}
      setName('');
      setEmail('');
      setAddress1('');
      setAddress2('');
      setCity('');
      setRegion('');
      setPostalCode('');
      setStep('cart');
      setPaymentInfo(null);
      setPaymentError(null);
    }
    closeCart();
  };

  const isEmailValid = useMemo(() => /^(?=.*@).+\..+$/i.test(email.trim()), [email]);

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: typeof state.items } = {};
    state.items.forEach(item => {
      const category = item.category || 'Other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [state.items]);

  useEffect(() => {
    if (!state.isCartOpen) return;
    if (window.Razorpay) {
      setRazorpayReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => setRazorpayReady(false);
    document.body.appendChild(script);
  }, [state.isCartOpen]);

  // ⭐ Payment - convert to INR paise
  const handlePay = async () => {
    const amountPaise = Math.round(razorpayAmountINR * 100);
    
    try {
      setIsCreatingOrder(true);
      setPaymentError(null);
      
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: razorpayAmountINR,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}` 
        }),
      });
      
      if (!orderRes.ok) {
        const errorData = await orderRes.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create payment order');
      }
      
      const orderData = await orderRes.json();
      
      if (!orderData.ok || !orderData.order) {
        throw new Error('Invalid order response from server');
      }
      
      const { order, keyId } = orderData;
  
      if (!window.Razorpay) {
        alert('Payment library failed to load. Please refresh and try again.');
        setIsCreatingOrder(false);
        return;
      }
  
      const options = {
        key: keyId,
        amount: order.amount,
        currency: 'INR',
        name: 'HS Global Export',
        description: 'Product Order Payment',
        order_id: order.id,
        prefill: { name, email, contact: phone },
        notes: { 
          address: [address1, address2, city, region, postalCode, country].filter(Boolean).join(', '),
          customer_name: name,
          customer_email: email,
          displayed_currency: currency,
          displayed_amount: finalTotalDisplay,
        },
        theme: { color: '#000000' },
        modal: {
          ondismiss: () => {
            setPaymentError('Payment was cancelled. Please try again.');
            setIsCreatingOrder(false);
          },
        },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            
            if (!verifyRes.ok) throw new Error('Payment verification failed');
            
            const verifyJson = await verifyRes.json();
            
            if (verifyJson.ok && verifyJson.valid) {
              setPaymentInfo({ 
                paymentId: response.razorpay_payment_id, 
                orderId: response.razorpay_order_id, 
                amount: order.amount 
              });
              setStep('success');
              setPaymentError(null);
            } else {
              throw new Error(verifyJson.error || 'Payment verification failed');
            }
          } catch (e: any) {
            setPaymentError(e.message || 'Payment verification error.');
          } finally {
            setIsCreatingOrder(false);
          }
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (e: any) {
      setPaymentError(e.message || 'Payment failed. Please try again.');
      setIsCreatingOrder(false);
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) removeItem(id);
    else updateQuantity(id, newQuantity);
  };

  return (
    <AnimatePresence>
      {state.isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/70 backdrop-blur-xl text-black shadow-2xl z-50 flex flex-col border-l border-black/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded-full">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    {step === 'success' ? 'Order Successful' : 'Shopping Cart'}
                  </h2>
                  {step !== 'success' && (
                    <p className="text-sm text-gray-700">{state.items.length} item{state.items.length !== 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-black/10 rounded-full transition-colors border border-black/10">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Body */}
            <div className={`flex-1 p-6 custom-scrollbar ${step !== 'success' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-black mb-2">Your cart is empty</h3>
                  <p className="text-gray-700 mb-6">Add some products to get started</p>
                  <button onClick={handleClose} className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90">
                    Continue Shopping
                  </button>
                </div>
              ) : step === 'cart' ? (
                <div className="space-y-6">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-black capitalize">{category}</h3>
                        <div className="flex-1 h-px bg-black/10"></div>
                      </div>
                      
                      <div className="space-y-3">
                        {items.map((item) => (
                          <motion.div key={item.id} className="flex gap-4 p-4 bg-white/60 backdrop-blur-md rounded-xl border border-black/10">
                            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-black/10">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-black truncate">{item.name}</h3>
                              <p className="text-sm text-gray-700">{formatPriceFromUSD(item.priceUSD)}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="p-2 text-gray-500 hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : step === 'details' ? (
                <div className="space-y-4">
                  <div className="bg-white/60 backdrop-blur-md rounded-xl border border-black/10 p-4 space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Name</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black" />
                      {!isEmailValid && email && <p className="mt-1 text-xs text-red-600">Please enter a valid email.</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Phone</label>
                      <input value={phone} readOnly className="w-full px-3 py-2 border border-black/10 rounded-lg bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Address Line 1</label>
                      <input value={address1} onChange={(e) => setAddress1(e.target.value)} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Address Line 2</label>
                      <input value={address2} onChange={(e) => setAddress2(e.target.value)} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">City</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">State/Region</label>
                        <input value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Postal Code</label>
                        <input value={postalCode} onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Country</label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white focus:ring-2 focus:ring-black">
                          <option>India</option>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ) : step === 'success' ? (
                <div className="space-y-4">
                  <div className="bg-white/60 rounded-xl border border-black/10 p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">✓</div>
                    <h3 className="text-xl font-semibold mb-1">Payment Successful</h3>
                    <p className="text-gray-700">Thank you for your order.</p>
                  </div>
                  <div className="bg-white/60 rounded-xl border border-black/10 p-4 text-sm space-y-2">
                    <div className="flex justify-between"><span>Payment ID</span><span className="font-medium">{paymentInfo?.paymentId}</span></div>
                    <div className="flex justify-between"><span>Order ID</span><span className="font-medium">{paymentInfo?.orderId}</span></div>
                    <div className="flex justify-between"><span>Amount Paid</span><span className="font-medium">₹{((paymentInfo?.amount || 0) / 100).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
              ) : (
                /* Confirm Step - SHOW ALL COSTS HERE */
                <div className="space-y-4">
                  <div className="bg-white/60 rounded-xl border border-black/10 p-4 text-sm grid grid-cols-2 gap-3">
                    <div><p className="text-gray-500">Name</p><p className="font-medium truncate">{name || '-'}</p></div>
                    <div><p className="text-gray-500">Email</p><p className="font-medium truncate">{email || '-'}</p></div>
                    <div><p className="text-gray-500">Phone</p><p className="font-medium">{phone || '-'}</p></div>
                    <div className="col-span-2"><p className="text-gray-500">Address</p><p className="font-medium">{[address1, address2, city, region, postalCode, country].filter(Boolean).join(', ') || '-'}</p></div>
                  </div>

                  <div className="bg-white/60 rounded-xl border border-black/10 p-4">
                    {paymentError && <div className="mb-3 p-3 rounded-lg border border-red-300 bg-red-50 text-sm text-red-700">{paymentError}</div>}
                    
                    <div className="space-y-2 text-sm">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                          <span>{formatPriceFromUSD(item.priceUSD * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-black/10 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-700"><span>Subtotal</span><span>{subtotalDisplay}</span></div>
                      
                      {/* ⭐ Show tax ONLY for India */}
                      {isIndia() && (
                        <div className="flex justify-between text-gray-700"><span>Tax (18% GST)</span><span>{taxDisplay}</span></div>
                      )}
                      
                      <div className="flex justify-between text-gray-700"><span>Shipping</span><span>{shippingUSD === 0 ? 'FREE' : shippingDisplay}</span></div>
                      <div className="flex justify-between text-gray-700"><span>Packaging</span><span>{packagingDisplay}</span></div>
                      
                      <div className="flex justify-between border-t border-black/10 pt-2">
                        <span className="font-semibold">Total</span>
                        <span className="text-lg font-bold">{finalTotalDisplay}</span>
                      </div>
                      
                      <p className="text-xs text-gray-500 text-right">Payment: ₹{razorpayAmountINR.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && step !== 'success' && (
              <div className="border-t border-black/10 p-6 space-y-3">
                {step === 'cart' ? (
                  <>
                    {/* ⭐ Cart footer - show ONLY subtotal, NO tax/shipping */}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold">{subtotalDisplay}</span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep('details')} className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-white hover:text-black border-2 border-black transition-all">Proceed</button>
                    </div>
                    <button onClick={handleClose} className="w-full py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all">Continue Shopping</button>
                  </>
                ) : step === 'details' ? (
                  <div className="flex gap-3">
                    <button onClick={() => setStep('cart')} className="flex-1 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all">Back</button>
                    <button onClick={() => setStep('confirm')} disabled={!name || !isEmailValid || !phone || !address1 || !city || !region || !postalCode} className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-white hover:text-black border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed transition-all">Review</button>
                  </div>
                ) : (
                  <>
                    {/* ⭐ Confirm footer - show final total */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Final Total</span>
                      <div className="text-right">
                        <span className="text-xl font-bold">{finalTotalDisplay}</span>
                        <p className="text-xs text-gray-500">₹{razorpayAmountINR.toLocaleString('en-IN')} INR</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep('details')} disabled={isCreatingOrder} className="flex-1 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white disabled:opacity-50 transition-all">Back</button>
                      <button onClick={handlePay} disabled={isCreatingOrder || !name || !isEmailValid || !phone || !address1 || !city || !region || !postalCode} className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-white hover:text-black border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                        {isCreatingOrder ? <><div className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />Processing...</> : 'Pay Now'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};