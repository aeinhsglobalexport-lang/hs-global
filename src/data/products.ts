// products.ts - FIXED VERSION with Console Tables and Benches

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  price?: string;
  images?: string[];
  available?: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  products?: Product[];
  subcategories?: Subcategory[];
}

import generateSlabCategories from './slabs.loader';
import { getFurnitureSpecs } from './furnitureSpecs';

const furnitureFiles = import.meta.glob('/src/assets/furnitures/**/*.{webp,jpg,jpeg,png}', {
  query: '?url',
  import: 'default',
  eager: true
}) as Record<string, string>;

const decode = (s: string) => decodeURIComponent(s.replace(/\+/g, ' '));
const toSlug = (s: string) => decode(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const toTitle = (s: string) =>
  decode(s).replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());

const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

const SUBCATEGORY_TO_PRODUCT_TYPE: Record<string, string> = {
  'coffee table': 'Table',
  'console table': 'Table',
  'dining table': 'Table',
  'side table': 'Table',
  'center table': 'Table',
  'pedestal': 'Wash Basin',
  'countertop': 'Wash Basin',
  'benches': 'Bench',
  'flower pots': 'Flower Pot',
  'water fountain': 'Water Fountain',
  'bowls': 'Bowl',
  'urli': 'Urli',
  'sculpture': 'Sculpture'
};

const getFurniturePriceFromSpecs = (
  productName: string,
  subcategory: string
): { price: string | undefined; available: boolean } => {
  const specs = getFurnitureSpecs(productName);
  
  if (!specs) {
    return { price: undefined, available: false };
  }

  const expectedProductType = SUBCATEGORY_TO_PRODUCT_TYPE[normalize(subcategory)];
  
  if (expectedProductType && specs.product !== expectedProductType) {
    return { price: undefined, available: false };
  }

  const isAvailable = specs.price !== 'UNAVAILABLE' && specs.price !== undefined;
  
  return {
    price: isAvailable ? specs.price : undefined,
    available: isAvailable
  };
};

export const isProductAvailable = (productName: string, subcategory: string): boolean => {
  const { available } = getFurniturePriceFromSpecs(productName, subcategory);
  return available;
};

const buildFurnitureCategories = (): Subcategory[] => {
  type Agg = { id: string; name: string; images: string[]; image: string };
  const tree = new Map<string, Map<string | null, Map<string, Agg>>>();

  Object.entries(furnitureFiles).forEach(([absPath, url]) => {
    const parts = absPath.split('/').filter(Boolean);
    const i = parts.indexOf('furnitures');
    if (i === -1) return;
    const rawMain = parts[i + 1] ? decode(parts[i + 1]) : null;
    const main = rawMain ? (/(wash\s*basins?|washbasins)/i.test(rawMain) ? 'Wash Basins' : toTitle(rawMain)) : null;
    if (!main) return;

    let sub: string | null = null;
    let product: string | null = null;

    // Handle Tables and Wash Basins with subcategories
    if ((main === 'Tables' || main === 'Wash Basins') && parts[i + 3]) {
      sub = toTitle(parts[i + 2]);
      product = toTitle(parts[i + 3]);
    } 
    // Handle other categories (Benches, Flower Pots, etc.) - directly under main
    else if (parts[i + 2]) {
      sub = null;
      product = toTitle(parts[i + 2]);
    } else {
      return;
    }

    const fileName = decode(parts[parts.length - 1]).trim();
    if (!/\.(webp|jpg|jpeg|png)$/i.test(fileName)) return;

    if (!tree.has(main)) tree.set(main, new Map());
    const subMap = tree.get(main)!;
    if (!subMap.has(sub)) subMap.set(sub, new Map());
    const prodMap = subMap.get(sub)!;

    if (!prodMap.has(product!)) {
      const id = ['furniture', main, sub || 'root', product!].map(toSlug).join('-');
      prodMap.set(product!, { id, name: product!, images: [], image: '' });
    }
    const agg = prodMap.get(product!)!;
    if (!agg.images.includes(url)) agg.images.push(url);
  });

  // Select primary image
  tree.forEach((subMap) => {
    subMap.forEach((prodMap) => {
      const arr = Array.from(prodMap.values());
      arr.forEach(p => {
        p.image = p.images.find(i => /stand|cover|main|01|1\./i.test(i)) || p.images[0] || '';
      });
      prodMap.clear();
      arr.forEach(p => prodMap.set(p.name, p));
    });
  });

  const out: Subcategory[] = [];

  const pushMain = (main: string, children?: string[]) => {
    const subMap = tree.get(main);
    if (!subMap) return;
    
    if (children && children.length) {
      // Has subcategories
      const subs: Subcategory[] = [];
      children.forEach((childName) => {
        const prodMap = subMap.get(toTitle(childName)) || new Map<string, Agg>();
        const products = Array.from(prodMap.values()).map<Product>((p) => {
          const { price, available } = getFurniturePriceFromSpecs(p.name, childName);
          
          return {
            id: p.id,
            name: p.name,
            category: 'furniture',
            subcategory: childName,
            image: p.image,
            images: p.images,
            description: `${p.name} - ${childName}`,
            price: price,
            available: available
          };
        });
        if (products.length) subs.push({ id: toSlug(childName), name: childName, products });
      });
      if (subs.length) out.push({ id: toSlug(main), name: main, subcategories: subs });
    } else {
      // No subcategories - products directly under main category
      const prodMap = subMap.get(null) || new Map<string, Agg>();
      const products = Array.from(prodMap.values()).map<Product>((p) => {
        const { price, available } = getFurniturePriceFromSpecs(p.name, main);
        return {
          id: p.id,
          name: p.name,
          category: 'furniture',
          subcategory: main,
          image: p.image,
          images: p.images,
          description: `${p.name} - ${main}`,
          price: price,
          available: available
        };
      });
      if (products.length) {
        out.push({ id: toSlug(main), name: main, products });
      }
    }
  };

  // Push in custom order - FIXED to include Console Tables and others
  pushMain('Tables', ['Coffee Table', 'Console Table', 'Dining Table', 'Side Table', 'Center Table']);
  pushMain('Wash Basins', ['Pedestal', 'Countertop']);
  pushMain('Benches'); // No subcategories
  pushMain('Flower Pots'); // No subcategories
  pushMain('Water Fountain'); // No subcategories
  pushMain('Bowls'); // No subcategories
  pushMain('Urli'); // No subcategories
  pushMain('Sculptures'); // No subcategories
  pushMain('Others'); // No subcategories

  return out;
};

export const categories: Category[] = [
  {
    id: 'furniture',
    name: 'Furniture',
    subcategories: buildFurnitureCategories(),
  },
  {
    id: 'slabs',
    name: 'Slabs',
    subcategories: generateSlabCategories(),
  }
];

export const getAllProducts = (): Product[] => {
  const allProducts: Product[] = [];

  const extractProducts = (subcategories: Subcategory[]) => {
    subcategories.forEach(subcategory => {
      if (subcategory.products) {
        allProducts.push(...subcategory.products);
      }
      if (subcategory.subcategories) {
        extractProducts(subcategory.subcategories);
      }
    });
  };

  categories.forEach(category => {
    extractProducts(category.subcategories);
  });

  return allProducts;
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];

  const products: Product[] = [];
  const extractProducts = (subcategories: Subcategory[]) => {
    subcategories.forEach(subcategory => {
      if (subcategory.products) {
        products.push(...subcategory.products);
      }
      if (subcategory.subcategories) {
        extractProducts(subcategory.subcategories);
      }
    });
  };

  extractProducts(category.subcategories);
  return products;
};