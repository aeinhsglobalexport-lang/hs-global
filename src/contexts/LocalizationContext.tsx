// src/contexts/LocalizationContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '../i18n';

const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

interface ExchangeRates {
  [key: string]: number;
}

interface LocationData {
  country: string;
  countryName: string;
  city: string;
}

interface LocalizationContextType {
  language: string;
  currency: string;
  exchangeRates: ExchangeRates;
  location: LocationData | null;
  loading: boolean;
  isAutoDetect: boolean;
  setLanguage: (lang: string) => void;
  setCurrency: (curr: string) => void;
  toggleAutoDetect: () => void;
  formatPrice: (priceUSD: number) => string;
  convertPrice: (priceUSD: number) => number;
  convertINRtoUSD: (priceINR: number) => number;
  convertToUserCurrency: (priceUSD: number) => number;
  getCurrencySymbol: () => string;
  getTaxRate: () => number;
  isIndia: () => boolean;
  isUSA: () => boolean;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
  SAR: '﷼',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  JPY: '¥',
  CNY: '¥',
  KRW: '₩',
  MYR: 'RM',
  THB: '฿',
  IDR: 'Rp',
  PHP: '₱',
  VND: '₫',
  BRL: 'R$',
  MXN: 'Mex$',
  ZAR: 'R',
  TRY: '₺',
  EGP: 'E£',
  NGN: '₦',
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  IN: 'USD', // Show USD in India
  GB: 'GBP',
  AE: 'AED',
  SA: 'SAR',
  AU: 'AUD',
  CA: 'CAD',
  SG: 'SGD',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  JP: 'JPY',
  CN: 'CNY',
  KR: 'KRW',
  MY: 'MYR',
  TH: 'THB',
  ID: 'IDR',
  PH: 'PHP',
  VN: 'VND',
  BR: 'BRL',
  MX: 'MXN',
  ZA: 'ZAR',
  TR: 'TRY',
  EG: 'EGP',
  NG: 'NGN',
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const [currency, setCurrencyState] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ USD: 1, INR: 83.12 });
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAutoDetect, setIsAutoDetect] = useState(true);

  // Fetch exchange rates from API with auto-refresh
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(EXCHANGE_API_URL);
        const data = await response.json();
        setExchangeRates(data.rates);
        console.log('[Currency] Exchange rates updated:', data.rates);
      } catch (error) {
        console.error('[Currency] Failed to fetch exchange rates:', error);
        setExchangeRates({
          USD: 1,
          INR: 83.12,
          EUR: 0.92,
          GBP: 0.79,
          AED: 3.67,
          SAR: 3.75,
          AUD: 1.52,
          CAD: 1.36,
          SGD: 1.34,
          JPY: 149.50,
          CNY: 7.24,
          KRW: 1320,
          MYR: 4.47,
          THB: 34.50,
          IDR: 15680,
          PHP: 56.20,
          VND: 24500,
          BRL: 5.02,
          MXN: 17.15,
          ZAR: 18.50,
          TRY: 32.50,
          EGP: 48.50,
          NGN: 1550,
        });
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 1800000); // 30 minutes
    return () => clearInterval(interval);
  }, []);

  // Detect user location and set currency automatically
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setLocation({
          country: data.country_code,
          countryName: data.country_name,
          city: data.city,
        });

        const detectedCurrency = COUNTRY_TO_CURRENCY[data.country_code] || 'USD';
        setCurrencyState(detectedCurrency);
        
        console.log('[Location] Detected:', data.country_name, '- Currency:', detectedCurrency);
        setLoading(false);
      } catch (error) {
        console.error('[Location] Detection failed:', error);
        setCurrencyState('USD');
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    setIsAutoDetect(false);
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    setIsAutoDetect(false);
  };

  const toggleAutoDetect = () => {
    if (!isAutoDetect && location) {
      const detectedCurrency = COUNTRY_TO_CURRENCY[location.country] || 'USD';
      setCurrencyState(detectedCurrency);
    }
    setIsAutoDetect(!isAutoDetect);
  };

  const convertINRtoUSD = (priceINR: number): number => {
    const inrRate = exchangeRates.INR || 83.12;
    return priceINR / inrRate;
  };

  const convertPrice = (priceUSD: number): number => {
    const rate = exchangeRates[currency] || 1;
    return priceUSD * rate;
  };

  const convertToUserCurrency = (priceUSD: number): number => {
    return convertPrice(priceUSD);
  };

  const getCurrencySymbol = (): string => {
    return CURRENCY_SYMBOLS[currency] || currency;
  };

  const formatPrice = (priceUSD: number): string => {
    const converted = convertPrice(priceUSD);
    const symbol = getCurrencySymbol();
    
    return `${symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: currency === 'JPY' || currency === 'KRW' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' || currency === 'KRW' ? 0 : 2,
    })}`;
  };

  const getTaxRate = (): number => {
    return location?.country === 'IN' ? 0.18 : 0;
  };

  const isIndia = (): boolean => {
    return location?.country === 'IN';
  };

  const isUSA = (): boolean => {
    return location?.country === 'US';
  };

  return (
    <LocalizationContext.Provider
      value={{
        language,
        currency,
        exchangeRates,
        location,
        loading,
        isAutoDetect,
        setLanguage,
        setCurrency,
        toggleAutoDetect,
        formatPrice,
        convertPrice,
        convertINRtoUSD,
        convertToUserCurrency,
        getCurrencySymbol,
        getTaxRate,
        isIndia,
        isUSA,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) throw new Error('useLocalization must be used within LocalizationProvider');
  return context;
};