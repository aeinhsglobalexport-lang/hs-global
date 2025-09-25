import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MessageSquare, Building, Home, CheckCircle } from 'lucide-react';
import { initEmailJs, sendEmail } from '../lib/email';

interface LeadCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadCapturePopup: React.FC<LeadCapturePopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    clientType: '',
    services: [] as string[],
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countryQuery, setCountryQuery] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryWrapRef = useRef<HTMLDivElement | null>(null);

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' }
  ];

  const serviceOptions = [
    'Marble',
    'Granite', 
    'Furniture',
    'Marble Engraving'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        phone: digitsOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const filteredCountryCodes = countryCodes.filter((c) => {
    const q = (countryQuery || '').toLowerCase().trim();
    return !q || c.code.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
  }).slice(0, 20);

  const handlePickCountry = (code: string) => {
    setFormData(prev => ({ ...prev, countryCode: code }));
    setCountryQuery('');
    setShowCountryDropdown(false);
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.contact = 'Please provide either email or phone number';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone.trim() && formData.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.clientType) {
      newErrors.clientType = 'Please select client type';
    }

    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail(
        (import.meta as any).env.VITE_EMAILJS_TEMPLATE_POPUP || 'template_popup',
        {
          to_email: 'hsglobalexport@gmail.com',
          subject: 'New Lead (Website Popup)',
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          client_type: formData.clientType,
          services: formData.services.join(', '),
          message: formData.message || '-'
        }
      );

      // Also send to WhatsApp Business via server (if configured)
      const waText = [
        'New Lead (Website Popup)',
        `Name: ${formData.name}`,
        `Email: ${formData.email || '-'}`,
        `Phone: ${formData.countryCode} ${formData.phone}`,
        `Client Type: ${formData.clientType}`,
        `Services: ${formData.services.join(', ')}`,
        `Message: ${formData.message || '-'}`
      ].join('\n');
      try {
        await fetch('/api/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: '918107115116', text: waText })
        });
      } catch {}

      // Show success message
      setShowSuccess(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          email: '',
          countryCode: '+91',
          phone: '',
          clientType: '',
          services: [],
          message: ''
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      countryCode: '+91',
      phone: '',
      clientType: '',
      services: [],
      message: ''
    });
    setErrors({});
    setShowSuccess(false);
    onClose();
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => { initEmailJs(); }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md"
          onClick={handleClose}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden border-2 border-gray-100"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-white to-gray-50 border-b-2 border-gray-200 px-4 py-3 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Get Your Free Quote</h2>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm">Tell us about your project and we'll get back to you</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors border-2 border-transparent hover:border-gray-200"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-3 text-sm">
                  We've received your information and will contact you within 24 hours with a personalized quote.
                </p>
                <p className="text-xs text-gray-500">
                  This popup will close automatically...
                </p>
              </motion.div>
            )}

            {/* Form */}
            {!showSuccess && (
              <div 
                className="overflow-y-auto max-h-[calc(90vh-100px)]"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#000 #f3f4f6'
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    width: 6px;
                  }
                  div::-webkit-scrollbar-track {
                    background: #f3f4f6;
                    border-radius: 3px;
                  }
                  div::-webkit-scrollbar-thumb {
                    background: #000;
                    border-radius: 3px;
                  }
                  div::-webkit-scrollbar-thumb:hover {
                    background: #333;
                  }
                `}</style>
                <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <User className="w-3.5 h-3.5 inline mr-1.5" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Contact Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-3.5 h-3.5 inline mr-1.5" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Phone className="w-3.5 h-3.5 inline mr-1.5" />
                    Phone Number
                  </label>
                  <div className="flex w-full relative">
                    <div
                      className="relative"
                      tabIndex={0}
                      ref={countryWrapRef}
                      onBlur={() => {
                        setTimeout(() => {
                          const wrap = countryWrapRef.current;
                          const active = document.activeElement as HTMLElement | null;
                          if (wrap && active && wrap.contains(active)) return;
                          setShowCountryDropdown(false);
                        }, 0);
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(v => !v)}
                        className="px-2 py-2.5 border-2 border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white min-w-0 flex-shrink-0 text-sm w-[110px] flex items-center gap-1 justify-center"
                        aria-haspopup="listbox"
                        aria-expanded={showCountryDropdown}
                      >
                        <span className="text-base">
                          {(countryCodes.find(c => c.code === formData.countryCode) || { flag: '🌐' }).flag}
                        </span>
                        <span className="font-medium">{formData.countryCode}</span>
                        <svg className="w-3.5 h-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"/></svg>
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute left-0 top-full mt-1 w-56 max-h-64 overflow-auto bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20">
                          <div className="p-2 border-b border-gray-200">
                            <input
                              type="text"
                              value={countryQuery}
                              onChange={(e) => setCountryQuery(e.target.value)}
                              placeholder="Search country/code"
                              className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          {filteredCountryCodes.length === 0 && (
                            <div className="px-3 py-2 text-xs text-gray-500">No matches</div>
                          )}
                          {filteredCountryCodes.map((c) => (
                            <button
                              type="button"
                              key={c.code}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handlePickCountry(c.code)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                              role="option"
                            >
                              <span className="text-base">{c.flag}</span>
                              <span className="font-medium">{c.code}</span>
                              <span className="text-gray-500 text-xs">{c.country}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel"
                      className={`flex-1 px-3 py-2.5 border-2 rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all min-w-0 text-sm ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {errors.contact && (
                <p className="text-red-500 text-xs bg-red-50 p-2 rounded-lg">
                  {errors.contact}
                </p>
              )}

              {/* Client Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you looking for yourself or a client? *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, clientType: 'personal' }))}
                    className={`p-2.5 border-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                      formData.clientType === 'personal'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span className="text-xs">For Myself</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, clientType: 'client' }))}
                    className={`p-2.5 border-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                      formData.clientType === 'client'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span className="text-xs">For Client</span>
                  </button>
                </div>
                {errors.clientType && <p className="text-red-500 text-xs mt-1">{errors.clientType}</p>}
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What services are you interested in? *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceChange(service)}
                      className={`p-2.5 border-2 rounded-lg text-xs font-medium transition-all ${
                        formData.services.includes(service)
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1.5" />
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-sm"
                  placeholder="Tell us more about your project requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black hover:border-gray-800"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  We'll contact you within 24 hours with a personalized quote
                </p>
              </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCapturePopup;
