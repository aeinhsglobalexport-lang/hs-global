import type { Category, Subcategory, Product } from './products';

type FileUrl = string;

// Vite will inline URLs to assets matched by these globs
// We grab every file under src/assets/Collection/**
const fileModules = import.meta.glob('/src/assets/Collection/**/*.{webp,jpg,jpeg,png}', {
  query: '?url',
  import: 'default',
  eager: true
}) as Record<string, FileUrl>;

// Normalize a segment into a nicer display name
const toTitle = (s: string): string => {
  return s
    .replace(/%20/g, ' ')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b(\w)/g, (_m, c) => c.toUpperCase());
};

const decodeSeg = (s: string): string => {
  try { return decodeURIComponent(s); } catch { return s; }
};

const sanitizeStoneName = (raw: string): string => {
  const decoded = toTitle(decodeSeg(raw));
  // Remove generic stone words
  const cleaned = decoded
    .replace(/\b(Marble|Granite|Onyx|Travertine|Sandstone)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.length ? cleaned : decoded;
};

const GENERIC_NAMES = new Set([
  'White','Black','Brown','Beige','Green','Red','Pink','Yellow','Gold','Blue','Grey','Gray','Silver','Orange','Rainbow','Multi Color','Multicolor','Cream'
]);

const disambiguate = (name: string, categoryKey: string, groupKey?: string): string => {
  const n = name.trim();
  if (GENERIC_NAMES.has(n)) {
    if (categoryKey === 'Granite' && groupKey) return `${sanitizeStoneName(groupKey)} ${n}`;
    return `${toTitle(categoryKey)} ${n}`;
  }
  return n;
};

interface BuildMaps {
  [category: string]: {
    [subOrProduct: string]: {
      [product: string]: {
        images: Set<string>;
        stand: Set<string>;
      };
    } | {
      __images: Set<string>;
      __stand: Set<string>;
    };
  };
}

export const generateSlabCategories = (): Category[] => {
  const maps: BuildMaps = {};

  // Use the module path keys to derive structure, and the url for rendering
  for (const [absPath, url] of Object.entries(fileModules)) {
    // absPath contains '/src/assets/Collection/...'
    const idx = absPath.indexOf('/Collection/');
    if (idx === -1) continue;
    const rel = absPath.slice(idx + '/Collection/'.length);
    const parts = rel.split('/');
    if (parts.length < 2) continue;

    // Ignore any path segment indicating missing assets
    const decodedParts = parts.map(p => decodeSeg(p));
    const lowerParts = decodedParts.map(p => p.toLowerCase());
    if (
      lowerParts.includes('not found') ||
      lowerParts.includes('notfound') ||
      lowerParts.some(p => p === 'not found' || p === 'notfound') ||
      lowerParts.some(p => p.includes('not found') || p.includes('notfound') || p.includes('not fount'))
    ) {
      continue;
    }

    const category = decodeSeg(parts[0]); // Granite | Marble | Onyx | Sandstone | Travertine
    if (!maps[category]) maps[category] = {} as any;

    // Different structures by category
    if (category === 'Granite') {
      // Granite/<Group>/<Product>/<file>
      if (parts.length < 3) continue;
      const group = decodeSeg(parts[1]);
      const product = decodeSeg(parts[2]);
      const file = url; // already a served URL from Vite
      const isStand = parts.map(p => p.toLowerCase()).includes('stand');
      if (!((maps[category] as any)[group])) (maps[category] as any)[group] = {} as any;
      if (!(((maps[category] as any)[group] as any)[product])) (((maps[category] as any)[group] as any)[product]) = { images: new Set<string>(), stand: new Set<string>() } as any;
      const entry = (((maps[category] as any)[group] as any)[product]) as { images: Set<string>; stand: Set<string> };
      (isStand ? entry.stand : entry.images).add(file);
    } else {
      // Marble/<Product>/<file> OR Onyx/... OR Sandstone/... OR Travertine/...
      const product = decodeSeg(parts[1]);
      const file = url;
      const isStand = parts.map(p => p.toLowerCase()).includes('stand');
      if (!((maps[category] as any)[product])) (maps[category] as any)[product] = { __images: new Set<string>(), __stand: new Set<string>() } as any;
      if (isStand) (((maps[category] as any)[product] as any).__stand as Set<string>).add(file);
      else (((maps[category] as any)[product] as any).__images as Set<string>).add(file);
    }
  }

  const categories: Category[] = [];

  Object.entries(maps).forEach(([categoryKey, subMap]) => {
    const cat: Category = {
      id: categoryKey.toLowerCase().replace(/\s+/g, '-'),
      name: toTitle(categoryKey),
      subcategories: []
    };

    if (categoryKey === 'Granite') {
      Object.entries(subMap as Record<string, Record<string, { images: Set<string>; stand: Set<string> }>>).forEach(([groupKey, productsMap]) => {
        const sub: Subcategory = {
          id: groupKey.toLowerCase().replace(/\s+/g, '-'),
          name: sanitizeStoneName(groupKey),
          products: []
        };
        Object.entries(productsMap).forEach(([prodKey, data]) => {
          const stand = Array.from(data.stand);
          const others = Array.from(data.images);
          const images = [...stand, ...others];
          const baseName = sanitizeStoneName(prodKey);
          const p: Product = {
            id: `${cat.id}-${sub.id}-${prodKey.toLowerCase().replace(/\s+/g, '-')}`,
            name: disambiguate(baseName, categoryKey, groupKey),
            category: 'slabs',
            subcategory: sub.id,
            image: images[0],
            images,
            description: `${disambiguate(baseName, categoryKey, groupKey)} granite slab — durable, low‑porosity, and ideal for countertops, flooring, and exterior cladding. Sourced from trusted quarries with strict QA.`
          };
          (sub.products as Product[]).push(p);
        });
        cat.subcategories.push(sub);
      });
    } else if (categoryKey === 'Marble') {
      // Single subcategory "marble" that contains all marble products
      const sub: Subcategory = {
        id: 'marble',
        name: 'Marble',
        products: []
      };
      Object.entries(subMap as Record<string, { __images: Set<string>; __stand: Set<string> }>).forEach(([prodKey, data]) => {
        const stand = Array.from(data.__stand || new Set<string>());
        const others = Array.from(data.__images || new Set<string>());
        const images = [...stand, ...others];
        const baseName = sanitizeStoneName(prodKey);
        const p: Product = {
          id: `${cat.id}-marble-${prodKey.toLowerCase().replace(/\s+/g, '-')}`,
          name: disambiguate(baseName, categoryKey),
          category: 'slabs',
          subcategory: 'marble',
          image: images[0],
          images,
          description: `${disambiguate(baseName, categoryKey)} marble slab — classic veining and premium finish for luxury interiors, countertops, vanities and wall cladding.`
        };
        (sub.products as Product[]).push(p);
      });
      // Sort products alphabetically
      (sub.products as Product[]).sort((a, b) => a.name.localeCompare(b.name));
      cat.subcategories.push(sub);
    } else if (categoryKey === 'Onyx' || categoryKey === 'Sandstone' || categoryKey === 'Travertine') {
      // Consolidate each into a single subcategory as requested
      const subId = categoryKey.toLowerCase();
      const sub: Subcategory = {
        id: subId,
        name: toTitle(categoryKey),
        products: []
      };
      Object.entries(subMap as Record<string, { __images: Set<string>; __stand: Set<string> }>).forEach(([prodKey, data]) => {
        const stand = Array.from(data.__stand || new Set<string>());
        const others = Array.from(data.__images || new Set<string>());
        const images = [...stand, ...others];
        const baseName = sanitizeStoneName(prodKey);
        const p: Product = {
          id: `${cat.id}-${subId}-${prodKey.toLowerCase().replace(/\s+/g, '-')}`,
          name: disambiguate(baseName, categoryKey),
          category: 'slabs',
          subcategory: subId,
          image: images[0],
          images,
          description: `${disambiguate(baseName, categoryKey)} ${toTitle(categoryKey)} — premium natural stone suitable for interiors, counters and wall features.`
        };
        (sub.products as Product[]).push(p);
      });
      (sub.products as Product[]).sort((a, b) => a.name.localeCompare(b.name));
      cat.subcategories.push(sub);
    } else {
      // Fallback: keep per-folder subcategories
      Object.entries(subMap as Record<string, { __images: Set<string> }>).forEach(([prodKey, data]) => {
        const sub: Subcategory = {
          id: prodKey.toLowerCase().replace(/\s+/g, '-'),
          name: toTitle(prodKey),
          products: [
            {
              id: `${cat.id}-${prodKey.toLowerCase().replace(/\s+/g, '-')}`,
              name: sanitizeStoneName(prodKey),
              category: 'slabs',
              subcategory: cat.id,
              image: Array.from(data.__images)[0],
              images: Array.from(data.__images),
              description: `${sanitizeStoneName(prodKey)} ${toTitle(cat.name)} slab — premium natural stone with refined aesthetics, suitable for luxury interiors and architectural applications.`
            }
          ]
        };
        cat.subcategories.push(sub);
      });
    }

    // Sort subcategories and products alphabetically
    cat.subcategories.sort((a, b) => a.name.localeCompare(b.name));
    cat.subcategories.forEach(s => {
      if (s.products) s.products.sort((a, b) => a.name.localeCompare(b.name));
    });

    categories.push(cat);
  });

  // Ensure a stable order of main categories
  const order = ['marble', 'granite', 'onyx', 'sandstone', 'travertine'];
  categories.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return categories;
};

export default generateSlabCategories;


