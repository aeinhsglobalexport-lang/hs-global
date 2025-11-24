import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

type MainCategory = "marble" | "granite" | "sandstone" | "onyx" | "travertine";

interface StoneItem {
  id: string;
  name: string;
  image: string;
  category: MainCategory;
}

interface StoneGroup {
  title: string;
  stones: StoneItem[];
}

// Dynamically read images from src/assets/Collection
const collectionFiles = import.meta.glob(
  "/src/assets/Collection/**/*.{webp,jpg,jpeg,png}",
  { eager: true, import: "default" }
) as Record<string, string>;

function toTitle(text: string): string {
  return decodeURIComponent(text)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Helper to get best quality image for a product
function getBestImage(paths: string[]): string {
  if (paths.length === 0) return "";
  
  // Priority: Stand images first (usually higher quality close-ups)
  const standImages = paths.filter(p => p.toLowerCase().includes("/stand/"));
  if (standImages.length > 0) return standImages[0];
  
  // Otherwise, return first available
  return paths[0];
}

function buildGroupsFromCollection(): StoneGroup[] {
  const mainCategories: { key: MainCategory; folder: string; title: string }[] = [
    { key: "marble", folder: "Marble", title: "Marble" },
    { key: "granite", folder: "Granite", title: "Granite" },
    { key: "sandstone", folder: "Sandstone", title: "Sandstone" },
    { key: "onyx", folder: "Onyx", title: "Onyx" },
    { key: "travertine", folder: "Travertine", title: "Travertine" },
  ];

  const result: StoneGroup[] = [];

  for (const cat of mainCategories) {
    // Store ALL images for each product to select the best one
    const imagesByProduct = new Map<string, string[]>();

    Object.entries(collectionFiles).forEach(([absPath, url]) => {
      const idx = absPath.indexOf("/Collection/");
      if (idx === -1) return;
      const rel = absPath.slice(idx + "/Collection/".length);
      const parts = rel.split("/").filter(Boolean);
      
      if ((parts[0] || '').toLowerCase() !== cat.folder.toLowerCase()) return;
      if (parts.some((p) => p.toLowerCase() === "not found")) return;
      
      const product = cat.folder === 'Granite' ? (parts[2] || '') : (parts[1] || '');
      if (!product) return;

      if (!imagesByProduct.has(product)) {
        imagesByProduct.set(product, []);
      }
      imagesByProduct.get(product)!.push(url);
    });

    const items: StoneItem[] = Array.from(imagesByProduct.entries()).map(([product, images], idx) => ({
      id: `${cat.key}-${idx}`,
      name: toTitle(product),
      image: getBestImage(images),
      category: cat.key,
    }));

    // Shuffle and take up to 8
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    result.push({ title: cat.title, stones: items.slice(0, 8) });
  }

  return result;
}

const ChooseStone: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const DEMO_IMG = "/general/marble.jpg";
  const groups = useMemo(() => buildGroupsFromCollection(), []);

  const handleClick = (stone: StoneItem) => {
    console.log("🪨 Stone clicked:", {
      stoneName: stone.name,
      stoneCategory: stone.category,
    });
    
    const navigationState = { 
      targetProduct: stone.name,
      targetMain: 'slabs',
      targetSubcategory: stone.category,
      targetCategory: 'slabs'
    };
    
    console.log("🚀 Navigating to /products?cat=slabs with state:", {
      targetMain: navigationState.targetMain,
      targetSubcategory: navigationState.targetSubcategory,
      targetProduct: navigationState.targetProduct,
    });
    
    navigate(`/products?cat=slabs`, { 
      state: navigationState,
      replace: false
    });
  };

  const handleViewMore = (categoryTitle: string) => {
    const categoryKey = categoryTitle.toLowerCase();
    
    console.log("👁️ View More clicked:", {
      categoryTitle,
      categoryKey,
    });
    
    const navigationState = { 
      targetMain: 'slabs',
      targetSubcategory: categoryKey,
      targetCategory: 'slabs'
    };
    
    console.log("🚀 Navigating with state:", navigationState);
    
    navigate(`/products?cat=slabs`, { 
      state: navigationState,
      replace: false
    });
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
            {t('home.choose_stone')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('home.choose_stone_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {groups.slice(0, 4).map((group) => (
            <div key={group.title} className="rounded-xs p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {group.title}
                </h3>
                <button
                  onClick={() => handleViewMore(group.title)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t('home.view_more')}
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {group.stones.slice(0, 8).map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => handleClick(stone)}
                    className="group flex flex-col items-center text-center min-w-0"
                    aria-label={`View ${stone.name} products`}
                  >
                    <span className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 shadow-sm mb-2 border-2 border-black">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="min-w-full min-h-full w-auto h-auto max-w-none object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                        style={{ 
                          imageRendering: '-webkit-optimize-contrast',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEMO_IMG;
                        }}
                        loading="lazy"
                        fetchpriority="high"
                      />
                    </span>
                    <span className="text-xs md:text-sm text-gray-700 group-hover:text-primary font-medium">
                      {stone.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {groups.length > 4 && (
          <div className="mt-6 md:mt-10 flex justify-center">
            <div className="w-full max-w-3xl rounded-xs p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {groups[4].title}
                </h3>
                <button
                  onClick={() => handleViewMore(groups[4].title)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t('home.view_more')}
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {groups[4].stones.slice(0, 8).map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => handleClick(stone)}
                    className="group flex flex-col items-center text-center min-w-0"
                    aria-label={`View ${stone.name} products`}
                  >
                    <span className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 shadow-sm mb-2 border-2 border-black">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="min-w-full min-h-full w-auto h-auto max-w-none object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                        style={{ 
                          imageRendering: '-webkit-optimize-contrast',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEMO_IMG;
                        }}
                        loading="lazy"
                        fetchpriority="high"
                      />
                    </span>
                    <span className="text-xs md:text-sm text-gray-700 group-hover:text-primary font-medium">
                      {stone.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChooseStone;