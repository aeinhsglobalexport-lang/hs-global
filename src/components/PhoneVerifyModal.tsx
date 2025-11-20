import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Shield, CheckCircle, ChevronDown } from 'lucide-react';
import { OTPInput } from './OTPInput';
import { countries, Country } from '../data/countries';
import { usePhoneVerification } from '../contexts/PhoneVerificationContext';
import { useCart } from '../contexts/CartContext';
import { useSlabCustomization } from '../contexts/SlabCustomizationContext';

export const PhoneVerifyModal: React.FC = () => {
  const { isModalOpen, pendingProduct, closeModal } = usePhoneVerification();
  const { setPhoneVerified } = useCart();
  const { openModal: openSlabModal } = useSlabCustomization();

  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === 'IN') || countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countryQuery, setCountryQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [lastTriedOtp, setLastTriedOtp] = useState('');
  const [autoSubmitEnabled, setAutoSubmitEnabled] = useState(true);
  const [otpToken, setOtpToken] = useState('');

  const flagFromCode = (cc: string) =>
    cc
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

  // Auto-submit OTP when all 6 digits are entered
  useEffect(() => {
    if (step === 'otp' && otp.length === 6 && !isLoading && autoSubmitEnabled && otp !== lastTriedOtp) {
      const timer = setTimeout(() => {
        setLastTriedOtp(otp);
        setAutoSubmitEnabled(false);
        handleOtpSubmit(new Event('submit') as any);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [otp, step, isLoading, autoSubmitEnabled, lastTriedOtp]);

  // Re-enable auto-submit when user changes OTP to a new value
  useEffect(() => {
    if (step === 'otp' && otp.length <= 6 && otp !== lastTriedOtp) {
      setAutoSubmitEnabled(true);
    }
  }, [otp, step, lastTriedOtp]);

  // Auto-focus first OTP input when OTP step opens
  useEffect(() => {
    if (step === 'otp') {
      const timer = setTimeout(() => {
        const firstInput = document.querySelector('[data-otp-input="0"]') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  // Reset form when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setError('');
      setLastTriedOtp('');
      setAutoSubmitEnabled(true);
    }
  }, [isModalOpen]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const minLength = selectedCountry.code === 'IN' ? 10 : 7;
    const maxLength = 10;
    
    if (!phoneNumber || phoneNumber.length < minLength || phoneNumber.length > maxLength) {
      setError(`Please enter a valid phone number (${minLength}-${maxLength} digits)`);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const full = `${selectedCountry.dialCode}${phoneNumber}`.replace(/\D/g, '');
      
      const resp = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ phone: full })
      });
      
      let data: any = null;
      try {
        const ct = resp.headers.get('content-type') || '';
        data = ct.includes('application/json') ? await resp.json() : null;
      } catch {
        data = null;
      }
      
      if (!resp.ok || !data || data.ok !== true) {
        const serverMsg = (data && (data.error || data.message)) || undefined;
        throw new Error(serverMsg || 'Failed to send OTP');
      }
      
      setOtpToken(String(data.otpToken || ''));
      setStep('otp');
    } catch (err: any) {
      setError(err?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const full = `${selectedCountry.dialCode}${phoneNumber}`.replace(/\D/g, '');
      
      const resp = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ phone: full, code: otp })
      });
      
      let data: any = null;
      try {
        const ct = resp.headers.get('content-type') || '';
        data = ct.includes('application/json') ? await resp.json() : null;
      } catch {
        data = null;
      }
      
      if (!resp.ok || !data || data.ok !== true) {
        const serverMsg = (data && (data.error || data.message)) || undefined;
        throw new Error(serverMsg || 'Invalid code');
      }

      // Set phone as verified
      const fullPhoneNumber = `${selectedCountry.dialCode}${phoneNumber}`;
      setPhoneVerified(fullPhoneNumber);

      // Save to localStorage
      try {
        localStorage.setItem('userDetails', JSON.stringify({
          name: '',
          email: '',
          phone: fullPhoneNumber,
        }));
      } catch (e) {
        console.warn('Failed to save phone to localStorage');
      }

      setStep('success');
      
      setTimeout(() => {
        // Check product category and open appropriate modal/drawer
        if (pendingProduct?.category === 'slabs') {
          // For slabs: Open customization modal
          closeModal();
          openSlabModal(pendingProduct, fullPhoneNumber);
        } else if (pendingProduct?.category === 'furniture') {
          // For furniture: Dispatch event to trigger add-to-cart in AddToCartButton
          closeModal();
          window.dispatchEvent(new CustomEvent('phone-verified', { 
            detail: { 
              phoneNumber: fullPhoneNumber,
              productId: pendingProduct?.id
            } 
          }));
        } else {
          // Default: just close
          closeModal();
        }
        
        // Reset form
        setStep('phone');
        setPhoneNumber('');
        setOtp('');
        setError('');
        setLastTriedOtp('');
        setAutoSubmitEnabled(true);
      }, 1200);
    } catch (err: any) {
      setError(err?.message || 'OTP verification failed');
      setAutoSubmitEnabled(false);
      // Keep cursor on last OTP box for quick correction
      setTimeout(() => {
        const last = document.querySelector('[data-otp-input="5"]') as HTMLInputElement | null;
        if (last) last.focus();
      }, 50);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    // Reset form
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
    setError('');
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white/70 backdrop-blur-xl text-black rounded-2xl shadow-2xl border border-black/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded-full">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    {step === 'phone' && 'Verify Phone Number'}
                    {step === 'otp' && 'Enter OTP'}
                    {step === 'success' && 'Verification Complete'}
                  </h2>
                  <p className="text-sm text-gray-700">
                    {step === 'phone' && (pendingProduct?.category === 'slabs' ? 'Required for quotation request' : 'Required to add items to cart')}
                    {step === 'otp' && `OTP sent to ${selectedCountry.dialCode} ${phoneNumber}`}
                    {step === 'success' && 'Your phone has been verified'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-black/10 rounded-full transition-colors border border-black/10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'phone' && (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Phone Number
                    </label>
                    
                    {/* Country Selection and Phone Input in Same Row */}
                    <div className="flex gap-2">
                      {/* Country Selection */}
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-2 p-3 border border-black/10 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black min-w-[110px] hover:bg-black/5 transition-colors shadow-sm"
                        >
                          <span className="text-lg">{flagFromCode(selectedCountry.code)}</span>
                          <span className="font-medium text-sm">{selectedCountry.dialCode}</span>
                          <ChevronDown className="w-3 h-3 text-gray-500" />
                        </button>
                        
                        {showCountryDropdown && (
                          <div className="absolute top-full left-0 z-10 mt-1 bg-white border border-black/10 rounded-xl shadow-xl w-72">
                            <div className="p-2 border-b border-black/10 sticky top-0 bg-white">
                              <input
                                autoFocus
                                placeholder="Search by name or code (e.g. +91)"
                                value={countryQuery}
                                onChange={(e) => setCountryQuery(e.target.value)}
                                className="w-full px-3 py-2 border border-black/10 rounded-lg bg-white text-black focus:ring-2 focus:ring-black"
                              />
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                            {countries
                              .filter(c => {
                                const raw = countryQuery.trim().toLowerCase();
                                if (!raw) return true;
                                const aliasMap: Record<string, string> = { 'usa': 'united states', 'uk': 'united kingdom', 'uae': 'united arab emirates' };
                                const q = aliasMap[raw] || raw;
                                return c.name.toLowerCase().includes(q) || c.dialCode.replace('+','').includes(q.replace('+',''));
                              })
                              .map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setShowCountryDropdown(false);
                                  setCountryQuery('');
                                }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-black/5 text-left"
                              >
                                <span className="text-lg">{flagFromCode(country.code)}</span>
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-black">{country.name}</div>
                                  <div className="text-xs text-gray-700">{country.dialCode}</div>
                                </div>
                              </button>
                            ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="Enter phone number"
                          className="w-full pl-10 pr-4 py-3 border border-black/10 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder-gray-500"
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 border border-red-200 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-red-600" />
                        </div>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || phoneNumber.length !== 10}
                    className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-black/10"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-4 text-center">
                      Enter OTP sent to {selectedCountry.dialCode} {phoneNumber}
                    </label>
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      length={6}
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 border border-red-200 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-red-600" />
                        </div>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="flex-1 py-3 px-4 border border-black/10 text-black font-semibold rounded-lg hover:bg-black/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      className="flex-1 py-3 px-4 bg-black text-white font-semibold rounded-lg hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-black/10"
                    >
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                </form>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 border border-black/10">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    Phone Verified Successfully!
                  </h3>
                  <p className="text-gray-700">
                    {pendingProduct?.category === 'slabs' 
                      ? 'Opening quotation request form...'
                      : 'Adding item to cart...'}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};