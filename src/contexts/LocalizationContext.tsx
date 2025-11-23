import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import i18n from "../i18n";

// ⭐ CORE PRINCIPLE: Everything stored in USD, convert at display time
const USD_TO_INR_RATE = 89.5; // Update this periodically

const EXCHANGE_API_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_CBTw7osGZWPzVoVTpZqBWhgPlk6T3atERepC7QDF&base_currency=USD";

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
  
  // ⭐ CORE FUNCTIONS - All work with USD base
  convertUSDtoUserCurrency: (priceUSD: number) => number;
  formatPriceFromUSD: (priceUSD: number) => string;
  convertUserCurrencyToINR: (priceUserCurrency: number) => number;
  getCurrencySymbol: () => string;
  getTaxRate: () => number;
  isIndia: () => boolean;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AED: "د.إ",
  SAR: "﷼",
  AUD: "A$",
  CAD: "C$",
  SGD: "S$",
  JPY: "¥",
  CNY: "¥",
  KRW: "₩",
  MYR: "RM",
  THB: "฿",
  IDR: "Rp",
  PHP: "₱",
  VND: "₫",
  BRL: "R$",
  MXN: "Mex$",
  ZAR: "R",
  TRY: "₺",
  EGP: "E£",
  NGN: "₦",
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: "USD", 
  IN: "USD", // ⭐ USD for India by default
  CA: "CAD", 
  MX: "MXN",
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", BE: "EUR",
  AT: "EUR", PT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR", LU: "EUR",
  SK: "EUR", SI: "EUR", EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR",
  GB: "GBP", 
  CH: "USD", NO: "USD", SE: "USD", DK: "USD",
  PL: "USD", CZ: "USD", HU: "USD", RO: "USD",
  JP: "JPY", CN: "CNY", KR: "KRW", SG: "SGD",
  MY: "MYR", TH: "THB", ID: "IDR", PH: "PHP", VN: "VND",
  HK: "USD", TW: "USD",
  AE: "AED", SA: "SAR", QA: "USD", KW: "USD", BH: "USD", OM: "USD",
  AU: "AUD", NZ: "USD",
  ZA: "ZAR", EG: "EGP", NG: "NGN",
  BR: "BRL", AR: "USD", CL: "USD", CO: "USD",
  TR: "TRY",
};

const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  US: "en", GB: "en", AU: "en", NZ: "en", CA: "en", IE: "en", SG: "en",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es", EC: "es",
  FR: "fr", BE: "fr", CH: "fr", LU: "fr",
  DE: "de", AT: "de",
  IT: "it",
  PT: "pt", BR: "pt",
  CN: "zh", TW: "zh", HK: "zh",
  JP: "ja",
  KR: "ko",
  SA: "ar", AE: "ar", EG: "ar", QA: "ar", KW: "ar", BH: "ar", OM: "ar",
  IN: "en",
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState("en");
  const [currency, setCurrencyState] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    USD: 1,
    INR: USD_TO_INR_RATE,
    EUR: 0.92,
    GBP: 0.79,
  });
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAutoDetect, setIsAutoDetect] = useState(true);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(EXCHANGE_API_URL);
        const data = await response.json();
        const normalized: ExchangeRates = { USD: 1 };
        Object.entries(data.data).forEach(([code, info]: any) => {
          normalized[code] = info.value;
        });
        setExchangeRates(normalized);
        console.log("[Currency] Rates updated");
      } catch (error) {
        console.error("[Currency] Failed to fetch rates:", error);
        setExchangeRates({
          USD: 1, INR: USD_TO_INR_RATE, EUR: 0.92, GBP: 0.79, AED: 3.67,
          SAR: 3.75, AUD: 1.52, CAD: 1.36, SGD: 1.34, JPY: 149.5,
          CNY: 7.24, KRW: 1320, MYR: 4.47, THB: 35.5, IDR: 15800,
          PHP: 56.5, VND: 24500, BRL: 4.97, MXN: 17.2, ZAR: 18.5,
          TRY: 32.5, EGP: 30.9, NGN: 1550,
        });
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 1800000);
    return () => clearInterval(interval);
  }, []);

  // Location detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryCode = data.country_code;
        
        setLocation({
          country: countryCode,
          countryName: data.country_name,
          city: data.city,
        });

        const detectedCurrency = COUNTRY_TO_CURRENCY[countryCode] || "USD";
        const detectedLanguage = COUNTRY_TO_LANGUAGE[countryCode] || "en";

        setCurrencyState(detectedCurrency);
        setLanguageState(detectedLanguage);
        console.log("[Location] Detected:", data.country_name, "→", detectedLanguage, detectedCurrency);
      } catch (error) {
        console.error("[Location] Detection failed:", error);
      } finally {
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
    setIsAutoDetect(false);
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    setIsAutoDetect(false);
  };

  const toggleAutoDetect = () => {
    if (!isAutoDetect && location) {
      const detectedCurrency = COUNTRY_TO_CURRENCY[location.country] || "USD";
      const detectedLanguage = COUNTRY_TO_LANGUAGE[location.country] || "en";
      setCurrencyState(detectedCurrency);
      setLanguageState(detectedLanguage);
    }
    setIsAutoDetect(!isAutoDetect);
  };

  const getCurrencySymbol = useCallback((): string => {
    return CURRENCY_SYMBOLS[currency] || currency;
  }, [currency]);

  // ⭐ Convert USD to user's currency
  const convertUSDtoUserCurrency = useCallback((priceUSD: number): number => {
    const targetRate = exchangeRates[currency] || 1;
    return Math.round(priceUSD * targetRate);
  }, [exchangeRates, currency]);

  // ⭐ Format price from USD with NO decimals
  const formatPriceFromUSD = useCallback((priceUSD: number): string => {
    const converted = convertUSDtoUserCurrency(priceUSD);
    const symbol = getCurrencySymbol();
    return `${symbol}${converted.toLocaleString('en-US')}`;
  }, [convertUSDtoUserCurrency, getCurrencySymbol]);

  // ⭐ Convert user currency to INR for Razorpay
  const convertUserCurrencyToINR = useCallback((priceUserCurrency: number): number => {
    const targetRate = exchangeRates[currency] || 1;
    const priceUSD = priceUserCurrency / targetRate;
    return Math.round(priceUSD * USD_TO_INR_RATE);
  }, [exchangeRates, currency]);

  // ⭐ Tax only for India
  const getTaxRate = useCallback((): number => {
    return location?.country === "IN" ? 0.18 : 0;
  }, [location]);

  const isIndia = useCallback(() => location?.country === "IN", [location]);

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
        convertUSDtoUserCurrency,
        formatPriceFromUSD,
        convertUserCurrencyToINR,
        getCurrencySymbol,
        getTaxRate,
        isIndia,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context)
    throw new Error("useLocalization must be used within LocalizationProvider");
  return context;
};

// ==================== DEMO USAGE ====================
function PricingDemo() {
  const { 
    formatPriceFromUSD, 
    convertUserCurrencyToINR,
    currency,
    location,
    getTaxRate,
    isIndia,
  } = useLocalization();

  const productPriceUSD = 3000; // ⭐ Always store in USD
  const displayPrice = formatPriceFromUSD(productPriceUSD);
  const taxRate = getTaxRate();
  
  // Calculate final price
  const taxAmount = Math.round(productPriceUSD * taxRate);
  const finalPriceUSD = productPriceUSD + (isIndia() ? taxAmount : 0);
  const finalPriceDisplay = formatPriceFromUSD(finalPriceUSD);
  
  // For Razorpay (convert displayed price to INR)
  const priceINR = convertUserCurrencyToINR(finalPriceUSD);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Pricing Demo</h2>
        
        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Location</p>
            <p className="text-lg font-semibold">{location?.countryName || 'Detecting...'}</p>
          </div>
          
          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Display Currency</p>
            <p className="text-lg font-semibold">{currency}</p>
          </div>
          
          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Product Price (Cart)</p>
            <p className="text-2xl font-bold text-green-600">{displayPrice}</p>
            <p className="text-xs text-gray-500">No tax shown in cart - just base price</p>
          </div>
          
          {isIndia() && (
            <div className="border-b pb-3 bg-amber-50 p-3 rounded">
              <p className="text-sm text-gray-600">Tax (18% GST - India only)</p>
              <p className="text-lg font-semibold">{formatPriceFromUSD(taxAmount)}</p>
            </div>
          )}
          
          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Final Price (Checkout)</p>
            <p className="text-2xl font-bold text-blue-600">{finalPriceDisplay}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded">
            <p className="text-sm text-gray-600 mb-2">Razorpay Payment Amount</p>
            <p className="text-xl font-bold">₹{priceINR.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-500 mt-1">
              Converted from {finalPriceDisplay} to INR for payment
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default PricingDemo;