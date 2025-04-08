import React from "react";
import { Search, Filter } from "lucide-react";

interface ProductFilterProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  onSearch,
  onCategoryChange,
  activeCategory,
}) => {
  const categories = ["All", "Granite", "Marble", "products"];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full border border-gray-300 focus:ring-accent focus:border-accent"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Filter className="text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-accent hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
