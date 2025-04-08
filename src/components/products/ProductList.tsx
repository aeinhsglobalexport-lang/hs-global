import React from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductListProps {
  products: Product[];
  category: string;
  onProductClick: (id: number) => void;
  onBack: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  category,
  onProductClick,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="relative h-[300px] bg-primary overflow-hidden">
        <img
          src={products[0]?.image || ""}
          alt={category}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category}
            </h1>
            <p className="text-xl text-white/80">
              Premium Selection of {category} Surfaces
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="relative w-full max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${category.toLowerCase()}...`}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-accent focus:border-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => onProductClick(product.id)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover  transform group-hover:scale-110 transition-transform duration-500"
                />
                {product.isNew && (
                  <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 text-sm rounded">
                    New
                  </div>
                )}
              </div>
              <h3 className="text-primary font-medium group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
