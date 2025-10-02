export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  price?: string;
  images?: string[]; // optional additional images for hover slideshow
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

// Enhanced product data with all subcategories
import generateSlabCategories from './slabs.loader';

// Dynamically load Furniture from /src/assets/furnitures
const furnitureFiles = import.meta.glob('/src/assets/furnitures/**/*.{webp,jpg,jpeg,png}', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

const decode = (s: string) => decodeURIComponent(s.replace(/\+/g, ' '));

const buildFurnitureCategories = (): Subcategory[] => {
  // Expected new structure:
  // furnitures/
  //   Tables/(Coffee Table|Console Table|Dining Table|Side Table)/<ProductName>/*images*
  //   Sculpture/<ProductName>/*images*
  //   Water Fountain/<ProductName>/*images*
  //   Washbasins/(Pedestal|Countertop)/<ProductName>/*images*

  const toSlug = (s: string) => decode(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const toTitle = (s: string) => decode(s).replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());

  type Agg = { id: string; name: string; images: string[]; image: string };
  const tree = new Map<string, Map<string | null, Map<string, Agg>>>();

  Object.entries(furnitureFiles).forEach(([absPath, url]) => {
    // absPath like /src/assets/furnitures/... use it to derive structure
    const parts = absPath.split('/').filter(Boolean);
    const i = parts.indexOf('furnitures');
    if (i === -1) return;
    const rawMain = parts[i + 1] ? decode(parts[i + 1]) : null;
    const main = rawMain ? (/(wash\s*basins?|washbasins)/i.test(rawMain) ? 'Wash Basins' : toTitle(rawMain)) : null;
    if (!main) return;

    // Determine sub and product
    let sub: string | null = null;
    let product: string | null = null;
    if (main === 'Tables' && parts[i + 3]) {
      sub = toTitle(parts[i + 2]);
      product = toTitle(parts[i + 3]);
    } else if (main === 'Wash Basins' && parts[i + 3]) {
      sub = toTitle(parts[i + 2]);
      product = toTitle(parts[i + 3]);
    } else if (parts[i + 2]) {
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
    const urlClean = url; // served URL from Vite
    if (!agg.images.includes(urlClean)) agg.images.push(urlClean);
  });

  // Select primary image and sort
  tree.forEach((subMap) => {
    subMap.forEach((prodMap) => {
      const arr = Array.from(prodMap.values());
      arr.forEach(p => {
        p.image = p.images.find(i => /stand|cover|main|01|1\./i.test(i)) || p.images[0] || '';
      });
      arr.sort((a, b) => a.name.localeCompare(b.name));
      // rewrite map in sorted order
      prodMap.clear();
      arr.forEach(p => prodMap.set(p.name, p));
    });
  });

  // Build final categories in the requested order
  const out: Subcategory[] = [];

  const pushMain = (main: string, children?: string[]) => {
    const subMap = tree.get(main);
    if (!subMap) return;
    if (children && children.length) {
      const subs: Subcategory[] = [];
      children.forEach((childName) => {
        const prodMap = subMap.get(toTitle(childName)) || new Map<string, Agg>();
        const products = Array.from(prodMap.values()).map<Product>((p) => ({
          id: p.id,
          name: p.name,
          category: 'furniture',
          subcategory: childName,
          image: p.image,
          images: p.images,
          description: `${p.name} - ${childName}`,
        }));
        if (products.length) subs.push({ id: toSlug(childName), name: childName, products });
      });
      if (subs.length) out.push({ id: toSlug(main), name: main, subcategories: subs });
    } else {
      const prodMap = subMap.get(null) || new Map<string, Agg>();
      const products = Array.from(prodMap.values()).map<Product>((p) => ({
        id: p.id,
        name: p.name,
        category: 'furniture',
        subcategory: main,
        image: p.image,
        images: p.images,
        description: `${p.name} - ${main}`,
      }));
      if (products.length) out.push({ id: toSlug(main), name: main, products });
    }
  };

  pushMain('Tables', ['Coffee Table', 'Console Table', 'Dining Table', 'Side Table', 'Center Table']);
  pushMain('Sculpture');
  pushMain('Water Fountain');
  pushMain('Wash Basins', ['Pedestal', 'Countertop']);
  pushMain('Benches');
  pushMain('Bowls');
  pushMain('Flower Pots');
  pushMain('Urli');

  return out;
};

export const categories: Category[] = [
  {
    id: 'slabs',
    name: 'Slabs',
    subcategories: generateSlabCategories(),
  },
  {
    id: 'furniture',
    name: 'Furniture',
    subcategories: buildFurnitureCategories()
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


