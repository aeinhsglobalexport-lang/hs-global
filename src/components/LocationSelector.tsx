import React, { useState, useRef, useEffect } from 'react';
import { Globe, DollarSign, X, MapPin, ChevronDown } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';

// Flag image component using flagcdn.com
const FlagImage: React.FC<{ code: string; className?: string }> = ({ code, className = "w-5 h-4" }) => (
  <img
    src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
    srcSet={`https://flagcdn.com/48x36/${code.toLowerCase()}.png 2x`}
    alt={code}
    className={`${className} object-cover rounded-sm inline-block`}
    loading="lazy"
  />
);

const LANGUAGES = [
  { code: 'en', name: 'English', countryCode: 'gb' },
  { code: 'es', name: 'Español', countryCode: 'es' },
  { code: 'fr', name: 'Français', countryCode: 'fr' },
  { code: 'de', name: 'Deutsch', countryCode: 'de' },
  { code: 'it', name: 'Italiano', countryCode: 'it' },
  { code: 'pt', name: 'Português', countryCode: 'pt' },
  { code: 'zh', name: '中文', countryCode: 'cn' },
  { code: 'ja', name: '日本語', countryCode: 'jp' },
  { code: 'ko', name: '한국어', countryCode: 'kr' },
  { code: 'ar', name: 'العربية', countryCode: 'sa' },
  { code: 'hi', name: 'हिन्दी', countryCode: 'in' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', countryCode: 'us' },
  { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'eu' },
  { code: 'GBP', symbol: '£', name: 'British Pound', countryCode: 'gb' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', countryCode: 'ae' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', countryCode: 'sa' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', countryCode: 'au' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', countryCode: 'ca' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', countryCode: 'sg' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', countryCode: 'jp' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', countryCode: 'cn' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', countryCode: 'kr' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', countryCode: 'my' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', countryCode: 'th' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', countryCode: 'id' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', countryCode: 'ph' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', countryCode: 'vn' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', countryCode: 'br' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', countryCode: 'mx' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', countryCode: 'za' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', countryCode: 'tr' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', countryCode: 'eg' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', countryCode: 'ng' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', countryCode: 'in' },
];

// Custom Select with Flag support
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; countryCode: string }[];
  disabled?: boolean;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  value, 
  onChange, 
  options, 
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-left transition-all ${
          disabled 
            ? 'bg-gray-100 cursor-not-allowed opacity-60' 
            : 'cursor-pointer hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-black'
        }`}
      >
        {selectedOption && (
          <FlagImage code={selectedOption.countryCode} className="w-5 h-3.5 flex-shrink-0" />
        )}
        <span className="flex-1 truncate">{selectedOption?.label || 'Select...'}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                value === option.value ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              <FlagImage code={option.countryCode} className="w-5 h-3.5 flex-shrink-0" />
              <span className="truncate">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const LocationSelector: React.FC = () => {
  const {
    language,
    currency,
    isAutoDetect,
    location,
    loading,
    setLanguage,
    setCurrency,
    toggleAutoDetect,
  } = useLocalization();

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (loading) {
    return (
      <button className="fixed md:relative bottom-4 left-4 md:bottom-auto md:left-auto p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 hover:shadow-lg transition-all z-40">
        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
      </button>
    );
  }

  const getCurrentLanguage = () => LANGUAGES.find(l => l.code === language);
  const getCurrentCurrency = () => CURRENCIES.find(c => c.code === currency);

  // Prepare options for custom select
  const languageOptions = LANGUAGES.map(l => ({
    value: l.code,
    label: l.name,
    countryCode: l.countryCode,
  }));

  const currencyOptions = CURRENCIES.map(c => ({
    value: c.code,
    label: `${c.symbol} ${c.code} - ${c.name}`,
    countryCode: c.countryCode,
  }));

  return (
    <div 
      className="fixed md:relative bottom-4 left-4 md:bottom-auto md:left-auto md:top-auto md:right-auto z-40"
      ref={popupRef}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg md:shadow-md border border-gray-200 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        title="Change language and currency"
      >
        <Globe className="w-4 h-4 text-gray-700" />
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
          <FlagImage code={getCurrentLanguage()?.countryCode || 'gb'} className="w-5 h-3.5" />
          {getCurrentCurrency()?.symbol}
        </span>
      </button>

      {/* Floating Popup */}
      {isOpen && (
        <div className="fixed md:absolute left-0 bottom-16 md:bottom-auto md:left-auto md:top-full md:right-0 mb-2 md:mb-0 md:mt-2 w-[calc(100vw-2rem)] md:w-80 max-w-sm bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in slide-in-from-bottom-4 md:slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-3 md:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 md:w-5 md:h-5" />
              <h3 className="font-semibold text-sm md:text-base">Preferences</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 md:p-4 space-y-3 md:space-y-4 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
            {/* Location Info */}
            {location && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2.5 md:p-3 border border-blue-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-blue-900">Detected Location</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FlagImage code={location.country} className="w-5 h-3.5" />
                      <p className="text-sm text-blue-800 truncate">{location.countryName}</p>
                    </div>
                    {location.city && (
                      <p className="text-xs text-blue-700 mt-0.5">{location.city}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Auto-detect Toggle */}
            <div className="flex items-center justify-between p-2.5 md:p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">Auto-Detect</p>
                <p className="text-xs text-gray-600">Set based on location</p>
              </div>
              <button
                onClick={toggleAutoDetect}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isAutoDetect ? 'bg-black' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    isAutoDetect ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Language
              </label>
              <CustomSelect
                value={language}
                onChange={setLanguage}
                options={languageOptions}
                disabled={isAutoDetect}
              />
            </div>

            {/* Currency Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                Currency
              </label>
              <CustomSelect
                value={currency}
                onChange={setCurrency}
                options={currencyOptions}
                disabled={isAutoDetect}
              />
            </div>

            {/* Info Text */}
            <div className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-2">
              {isAutoDetect ? (
                <p>🌍 Auto-detect is enabled. Settings are based on your location.</p>
              ) : (
                <p>✋ Manual mode. You can select your preferred language and currency.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;