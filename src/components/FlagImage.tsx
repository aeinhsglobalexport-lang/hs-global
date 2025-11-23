import React from 'react';

interface FlagImageProps {
  /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'IN', 'GB') */
  code: string;
  /** CSS class for sizing - default: "w-5 h-4" */
  className?: string;
  /** Alt text - defaults to country code */
  alt?: string;
}

/**
 * Renders a country flag image using flagcdn.com
 * 
 * Usage:
 * ```tsx
 * <FlagImage code="US" />
 * <FlagImage code="IN" className="w-6 h-4" />
 * <FlagImage code="GB" className="w-8 h-6" alt="United Kingdom" />
 * ```
 */
export const FlagImage: React.FC<FlagImageProps> = ({ 
  code, 
  className = "w-5 h-4",
  alt 
}) => {
  const lowerCode = code.toLowerCase();
  
  return (
    <img
      src={`https://flagcdn.com/24x18/${lowerCode}.png`}
      srcSet={`https://flagcdn.com/48x36/${lowerCode}.png 2x, https://flagcdn.com/72x54/${lowerCode}.png 3x`}
      alt={alt || code}
      className={`${className} object-cover rounded-sm inline-block`}
      loading="lazy"
      onError={(e) => {
        // Fallback: hide image if flag not found
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

/**
 * Flag with country name displayed next to it
 */
export const FlagWithName: React.FC<{
  code: string;
  name: string;
  flagClassName?: string;
  nameClassName?: string;
}> = ({ code, name, flagClassName = "w-5 h-4", nameClassName = "text-sm" }) => (
  <span className="inline-flex items-center gap-2">
    <FlagImage code={code} className={flagClassName} alt={name} />
    <span className={nameClassName}>{name}</span>
  </span>
);

/**
 * Get flag URL for use in CSS background-image or other contexts
 */
export const getFlagUrl = (
  countryCode: string, 
  size: '16x12' | '20x15' | '24x18' | '32x24' | '48x36' | '64x48' = '24x18'
): string => `https://flagcdn.com/${size}/${countryCode.toLowerCase()}.png`;

/**
 * Get srcSet for responsive flag images
 */
export const getFlagSrcSet = (countryCode: string) => {
  const code = countryCode.toLowerCase();
  return {
    src: `https://flagcdn.com/24x18/${code}.png`,
    srcSet: `https://flagcdn.com/48x36/${code}.png 2x, https://flagcdn.com/72x54/${code}.png 3x`,
  };
};

export default FlagImage;