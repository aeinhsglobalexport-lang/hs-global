import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
  { query: '?url', import: 'default', eager: true }
) as Record<string, string>;

function toTitle(text: string): string {
  return decodeURIComponent(text)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
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
    // Map productName -> representative image (prefer a path containing "/stand/" or similar)
    const representativeByProduct = new Map<string, string>();

    Object.entries(collectionFiles).forEach(([absPath, url]) => {
      // absPath is the source file path; use it to derive structure
      const idx = absPath.indexOf("/Collection/");
      if (idx === -1) return;
      const rel = absPath.slice(idx + "/Collection/".length);
      const parts = rel.split("/").filter(Boolean);
      // Expect: <Category>/<Product>/.../<file>
      if ((parts[0] || '').toLowerCase() !== cat.folder.toLowerCase()) return;
      // Skip if any path segment is exactly "NOT FOUND"
      if (parts.some((p) => p.toLowerCase() === "not found")) return;
      // For Granite: Collection/Granite/<Group>/<Product>/file
      // For others:  Collection/<Category>/<Product>/file
      const product = cat.folder === 'Granite' ? (parts[2] || '') : (parts[1] || '');
      if (!product) return;

      const current = representativeByProduct.get(product);
      const candidate = url; // served URL from Vite
      const isStand = absPath.toLowerCase().includes("/stand/");
      if (!current) {
        representativeByProduct.set(product, candidate);
      } else if (isStand) {
        // Prefer stand image if found
        representativeByProduct.set(product, candidate);
      }
    });

    // Convert to items array
    const items: StoneItem[] = Array.from(representativeByProduct.entries()).map(([product, image], idx) => ({
      id: `${cat.key}-${idx}`,
      name: toTitle(product),
      image,
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

//

const ChooseStone: React.FC = () => {
  const navigate = useNavigate();
  const DEMO_IMG = "/general/marble.jpg";
  const groups = useMemo(() => buildGroupsFromCollection(), []);

  const handleClick = (stone: StoneItem) => {
    // Pass target product name for deep scrolling and also hint category
    navigate(`/products`, { state: { targetProduct: stone.name, targetCategory: 'slabs' } });
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Choose Your Stone</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Pick your perfect stone and craft a masterpiece. Click an option to see furniture made from that slab.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {groups.slice(0, 4).map((group) => (
            <div key={group.title} className="rounded-xs p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{group.title}</h3>
                <button
                  onClick={() => navigate(`/products#${group.title.toLowerCase()}` , { state: { target: group.title.toLowerCase(), targetCategory: 'slabs' }})}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View more
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {group.stones.slice(0, 8).map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => handleClick(stone)}
                    className="group flex flex-col items-center text-center"
                    aria-label={`View products in ${stone.name}`}
                  >
                    <span className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mb-2 border-2 border-black">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="w-full h-full object-cover transform scale-[2.00] group-hover:scale-[2.10] transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEMO_IMG;
                        }}
                        loading="lazy"
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
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{groups[4].title}</h3>
                <button
                  onClick={() => navigate(`/products#${groups[4].title.toLowerCase()}` , { state: { target: groups[4].title.toLowerCase(), targetCategory: 'slabs' }})}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View more
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {groups[4].stones.slice(0, 8).map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => handleClick(stone)}
                    className="group flex flex-col items-center text-center"
                    aria-label={`View products in ${stone.name}`}
                  >
                    <span className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mb-2 border-2 border-black">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="w-full h-full object-cover transform scale-[2.00] group-hover:scale-[2.10] transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEMO_IMG;
                        }}
                        loading="lazy"
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


