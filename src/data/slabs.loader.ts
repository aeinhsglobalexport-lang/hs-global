// ===============================================
//  LAZY SLAB LOADER - Smooth performance
// ===============================================

import type { Category, Subcategory, Product } from './products';

// -------------------------------
// LAZY LOAD - Only load when needed (like furniture)
// -------------------------------
const fileModules = import.meta.glob(
  '/src/assets/Collection/**/*.{webp,jpg,jpeg,png}',
  {
    query: '?url',
    import: 'default',
    eager: true // MUST remain eager: true (as you required)
  }
);

// Vite eager glob returns:  { "/path/img.webp": "url" }
// Lazy returns:             { "/path/img.webp": () => import() }
// We support both.
const filePaths = Object.keys(fileModules);

// Cache final URLs
const urlCache = new Map<string, string>();

// -------------------------------
// UTILITIES
// -------------------------------
const toTitle = (s: string): string =>
  s
    .replace(/%20/g, ' ')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b(\w)/g, (_m, c) => c.toUpperCase());

const decodeSeg = (s: string): string => {
  try { return decodeURIComponent(s); }
  catch { return s; }
};

const sanitizeStoneName = (raw: string): string => {
  const decoded = toTitle(decodeSeg(raw));
  const cleaned = decoded
    .replace(/\b(Marble|Granite|Onyx|Travertine|Sandstone)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.length ? cleaned : decoded;
};

const GENERIC_NAMES = new Set([
  'White','Black','Brown','Beige','Green','Red','Pink','Yellow','Gold',
  'Blue','Grey','Gray','Silver','Orange','Rainbow','Multi Color',
  'Multicolor','Cream'
]);

const disambiguate = (name: string, categoryKey: string, groupKey?: string): string => {
  const n = name.trim();
  if (GENERIC_NAMES.has(n)) {
    if (categoryKey === 'Granite' && groupKey) return `${sanitizeStoneName(groupKey)} ${n}`;
    return `${toTitle(categoryKey)} ${n}`;
  }
  return n;
};

// -------------------------------
// IMAGE URL GETTER — FIXED
// -------------------------------
export const getImageUrl = async (path: string): Promise<string> => {
  if (urlCache.has(path)) return urlCache.get(path)!;

  const mod = fileModules[path];
  if (!mod) return '';

  try {
    let url: string;

    // FIX: Support eager (string) & lazy (function)
    if (typeof mod === 'string') {
      url = mod; // EAGER result → direct URL
    } else {
      // LAZY loader → call it
      url = await mod();
    }

    urlCache.set(path, url);
    return url;
  } catch {
    return '';
  }
};

// Batch load multiple images
export const loadImageUrls = async (paths: string[]): Promise<string[]> => {
  return Promise.all(paths.map(p => getImageUrl(p)));
};

// Preload first image of each product (optimized)
export const preloadFirstImages = async (products: Product[]): Promise<void> => {
  const firstImagePaths = products
    .map(p => p.image)
    .filter(Boolean)
    .slice(0, 20);

  await Promise.all(firstImagePaths.map(path =>
    filePaths.includes(path) ? getImageUrl(path) : Promise.resolve('')
  ));
};

export const clearImageCache = () => {
  urlCache.clear();
};

// -------------------------------
// CATEGORY GENERATOR (unchanged logic)
// -------------------------------

let cached: Category[] | null = null;

export const generateSlabCategories = (): Category[] => {
  if (cached) return cached;

  const maps: Record<string, Record<string, any>> = {};

  for (const fullPath of filePaths) {
    const parts = fullPath.split('/Collection/')[1]?.split('/');
    if (!parts || parts.length < 2) continue;

    const [categoryRaw, ...rest] = parts;
    const category = decodeSeg(categoryRaw);

    maps[category] ||= {};

    // GRANITE
    if (category === 'Granite') {
      if (rest.length < 2) continue;
      const groupRaw = decodeSeg(rest[0]);
      const productRaw = decodeSeg(rest[1]);
      const isStand = rest.some((p) => p.toLowerCase() === 'stand');

      maps[category][groupRaw] ||= {};
      maps[category][groupRaw][productRaw] ||= { imagePaths: [], standPaths: [] };

      if (isStand) maps[category][groupRaw][productRaw].standPaths.push(fullPath);
      else maps[category][groupRaw][productRaw].imagePaths.push(fullPath);
    }

    // OTHER STONES
    else {
      const productRaw = decodeSeg(rest[0]);
      const isStand = rest.some((p) => p.toLowerCase() === 'stand');

      maps[category][productRaw] ||= { imagePaths: [], standPaths: [] };

      if (isStand) maps[category][productRaw].standPaths.push(fullPath);
      else maps[category][productRaw].imagePaths.push(fullPath);
    }
  }

  const output: Category[] = [];

  for (const [categoryKey, groups] of Object.entries(maps)) {
    const cat: Category = {
      id: categoryKey.toLowerCase(),
      name: toTitle(categoryKey),
      subcategories: []
    };

    if (categoryKey === 'Granite') {
      for (const [groupKey, products] of Object.entries(groups)) {
        const sub: Subcategory = {
          id: groupKey.toLowerCase().replace(/\s+/g, '-'),
          name: sanitizeStoneName(groupKey),
          products: []
        };

        for (const [prodKey, data] of Object.entries(products)) {
          const paths = [...data.standPaths, ...data.imagePaths];
          const baseName = sanitizeStoneName(prodKey);

          sub.products.push({
            id: `${cat.id}-${sub.id}-${prodKey.toLowerCase().replace(/\s+/g, '-')}`,
            name: disambiguate(baseName, categoryKey, groupKey),
            category: 'slabs',
            subcategory: sub.id,
            image: paths[0] || '',
            images: paths,
            description: `${disambiguate(baseName, categoryKey, groupKey)} granite slab`
          });
        }

        sub.products.sort((a, b) => a.name.localeCompare(b.name));
        cat.subcategories.push(sub);
      }
    }

    else {
      const subId = categoryKey.toLowerCase();
      const sub: Subcategory = {
        id: subId,
        name: toTitle(categoryKey),
        products: []
      };

      for (const [prodKey, data] of Object.entries(groups)) {
        const paths = [...data.standPaths, ...data.imagePaths];
        const baseName = sanitizeStoneName(prodKey);

        sub.products.push({
          id: `${cat.id}-${prodKey.toLowerCase().replace(/\s+/g, '-')}`,
          name: disambiguate(baseName, categoryKey),
          category: 'slabs',
          subcategory: subId,
          image: paths[0] || '',
          images: paths,
          description: `${disambiguate(baseName, categoryKey)} ${categoryKey} slab`
        });
      }

      sub.products.sort((a, b) => a.name.localeCompare(b.name));
      cat.subcategories.push(sub);
    }

    output.push(cat);
  }

  const order = ['granite', 'marble', 'onyx', 'sandstone', 'travertine'];
  output.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  cached = output;
  return output;
};

export default generateSlabCategories;
