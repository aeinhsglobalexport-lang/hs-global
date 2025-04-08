import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/products/CategoryCard";

const categories = [
  {
    id: "granite",
    title: "Granite",
    description: "Premium granite surfaces for countertops and flooring",
    image: "/general/granite1.jpg",
  },
  {
    id: "marble",
    title: "Marble",
    description: "Luxurious marble for elegant interior designs",
    image: "/general/marble.jpg",
  },
  {
    id: "art",
    title: "art",
    description: "Engineered products for modern interiar designs",
    image: "/artphotos/main.jpg",
  },
];

const Products = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate(`/products/${categoryId}`);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Categories Hero */}
      <div className="relative h-[300px] bg-primary overflow-hidden">
        <img
          src="/banner/banner-imge.jpg"
          alt="Natural Stone Surfaces"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 ">
              Our Products
            </h1>
            <p className="text-xl text-white/80">
              Discover our premium collection of natural stone surfaces
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
