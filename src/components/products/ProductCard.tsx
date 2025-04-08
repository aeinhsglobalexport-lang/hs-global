import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
    description: string;
  };
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
      onClick={() => onClick(product.id)}
    >
      <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-semibold">{product.price}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center text-accent group-hover:translate-x-2 transition-transform">
          <span className="font-medium mr-2">View Details</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;