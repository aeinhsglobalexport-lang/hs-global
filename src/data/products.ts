// products.ts — Updated to guarantee "first" folder is always main image

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  priceUSD?: number;
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

import generateSlabCategories from "./slabs.loader";
import { getFurnitureSpecs } from "./furnitureSpecs";

// ⭐ IMPORTANT CHANGE — store both url AND original path
const furnitureFiles = import.meta.glob(
  "/src/assets/furnitures/**/*.{webp,jpg,jpeg,png}",
  {
    query: "?url",
    import: "default",
    eager: true,
  }
) as Record<string, string>;

const decode = (s: string) => decodeURIComponent(s.replace(/\+/g, " "));
const toSlug = (s: string) =>
  decode(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const toTitle = (s: string) =>
  decode(s)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

const SUBCATEGORY_TO_PRODUCT_TYPE: Record<string, string> = {
  "coffee table": "Table",
  "console table": "Table",
  "dining table": "Table",
  "side table": "Table",
  "center table": "Table",
  pedestal: "Wash Basin",
  countertop: "Wash Basin",
  benches: "Bench",
  "flower pots": "Flower Pot",
  "water fountain": "Water Fountain",
  bowls: "Bowl",
  urli: "Urli",
  sculpture: "Sculpture",
};

const getFurniturePriceUSD = (
  productName: string,
  subcategory: string
): { priceUSD: number | undefined; available: boolean } => {
  const specs = getFurnitureSpecs(productName);

  if (!specs?.priceUSD) {
    return { priceUSD: undefined, available: false };
  }

  const expected = SUBCATEGORY_TO_PRODUCT_TYPE[normalize(subcategory)];
  if (expected && specs.product !== expected) {
    return { priceUSD: undefined, available: false };
  }

  return {
    priceUSD: specs.priceUSD,
    available: true,
  };
};

export const isProductAvailable = (productName: string, subcategory: string) => {
  return getFurniturePriceUSD(productName, subcategory).available;
};

// ===========================
// ⭐ BUILD FURNITURE CATEGORIES
// ===========================
const buildFurnitureCategories = (): Subcategory[] => {
  type Agg = {
    id: string;
    name: string;
    images: { url: string; path: string }[];
    image: string;
  };

  const tree = new Map<
    string,
    Map<string | null, Map<string, Agg>>
  >();

  // GROUP IMAGES
  Object.entries(furnitureFiles).forEach(([path, url]) => {
    const parts = path.split("/").filter(Boolean);
    const i = parts.indexOf("furnitures");
    if (i === -1) return;

    const rawMain = parts[i + 1] ? decode(parts[i + 1]) : null;
    const main = rawMain
      ? /(wash\s*basins?|washbasins)/i.test(rawMain)
        ? "Wash Basins"
        : toTitle(rawMain)
      : null;
    if (!main) return;

    let sub: string | null = null;
    let product: string | null = null;

    if ((main === "Tables" || main === "Wash Basins") && parts[i + 3]) {
      sub = toTitle(parts[i + 2]);
      product = toTitle(parts[i + 3]);
    } else if (parts[i + 2]) {
      sub = null;
      product = toTitle(parts[i + 2]);
    } else return;

    const fileName = decode(parts.at(-1)!);
    if (!/\.(webp|jpg|jpeg|png)$/i.test(fileName)) return;

    if (!tree.has(main)) tree.set(main, new Map());
    const subMap = tree.get(main)!;
    if (!subMap.has(sub)) subMap.set(sub, new Map());
    const prodMap = subMap.get(sub)!;

    if (!prodMap.has(product!)) {
      const id =
        ["furniture", main, sub || "root", product!].map(toSlug).join("-");
      prodMap.set(product!, { id, name: product!, images: [], image: "" });
    }

    const agg = prodMap.get(product!)!;

    // ⭐ Store both path + URL
    agg.images.push({ url, path });
  });

  // CHOOSE MAIN IMAGE — guaranteed "first" folder priority
  tree.forEach((subMap) =>
    subMap.forEach((prodMap) => {
      const arr = [...prodMap.values()];

      arr.forEach((p) => {
        // Sort: FIRST folder ALWAYS first
        p.images.sort((a, b) => {
          const aFirst = a.path.toLowerCase().includes("/first/");
          const bFirst = b.path.toLowerCase().includes("/first/");
          if (aFirst && !bFirst) return -1;
          if (!aFirst && bFirst) return 1;
          return 0;
        });

        // Actual MAIN image
        const firstImg = p.images.find((img) =>
          img.path.toLowerCase().includes("/first/")
        );

        p.image = firstImg
          ? firstImg.url
          : p.images[0]?.url || "";
      });

      prodMap.clear();
      arr.forEach((p) => prodMap.set(p.name, p));
    })
  );

  // TRANSFORM TO FINAL STRUCTURE
  const result: Subcategory[] = [];

  const pushMain = (main: string, children?: string[]) => {
    const subMap = tree.get(main);
    if (!subMap) return;

    if (children?.length) {
      const subs: Subcategory[] = [];

      children.forEach((child) => {
        const prodMap = subMap.get(toTitle(child)) || new Map();

        const products = [...prodMap.values()].map<Product>((p) => {
          const { priceUSD, available } = getFurniturePriceUSD(p.name, child);

          return {
            id: p.id,
            name: p.name,
            category: "furniture",
            subcategory: child,
            image: p.image,
            images: p.images.map((i) => i.url),
            description: `${p.name} - ${child}`,
            priceUSD,
            available,
          };
        });

        if (products.length)
          subs.push({ id: toSlug(child), name: child, products });
      });

      if (subs.length)
        result.push({ id: toSlug(main), name: main, subcategories: subs });
    } else {
      const prodMap = subMap.get(null) || new Map();

      const products = [...prodMap.values()].map<Product>((p) => {
        const { priceUSD, available } = getFurniturePriceUSD(p.name, main);

        return {
          id: p.id,
          name: p.name,
          category: "furniture",
          subcategory: main,
          image: p.image,
          images: p.images.map((i) => i.url),
          description: `${p.name} - ${main}`,
          priceUSD,
          available,
        };
      });

      if (products.length)
        result.push({ id: toSlug(main), name: main, products });
    }
  };

  pushMain("Tables", [
    "Coffee Table",
    "Console Table",
    "Dining Table",
    "Side Table",
    "Center Table",
  ]);
  pushMain("Wash Basins", ["Pedestal", "Countertop"]);
  pushMain("Benches");
  pushMain("Flower Pots");
  pushMain("Water Fountain");
  pushMain("Bowls");
  pushMain("Urli");
  pushMain("Sculptures");
  pushMain("Lamps");

  return result;
};

export const categories: Category[] = [
  {
    id: "furniture",
    name: "Furniture",
    subcategories: buildFurnitureCategories(),
  },
  {
    id: "slabs",
    name: "Slabs",
    subcategories: generateSlabCategories(),
  },
];

export const getAllProducts = (): Product[] => {
  const out: Product[] = [];

  const extract = (subs: Subcategory[]) => {
    subs.forEach((s) => {
      if (s.products) out.push(...s.products);
      if (s.subcategories) extract(s.subcategories);
    });
  };

  categories.forEach((c) => extract(c.subcategories));
  return out;
};
