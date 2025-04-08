import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";
const products: Product[] = [
  {
    id: "1",
    name: "Absolute Black Granite",
    category: "Granite",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "Premium black granite with timeless elegance",
  },
  {
    id: "2",
    name: "Fantasy Brown Marble",
    category: "Marble",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "Exotic brown marble with stunning patterns",
  },
  {
    id: "3",
    name: "Blue Dunes Granite",
    category: "Granite",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    description: "Luxurious blue-toned granite for modern spaces",
  },
];

const Products = () => {
  const navigation = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && productsRef.current) {
      gsap.from(productsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [inView]);

  return (
    <section className="py-20 bg-background" id="products">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-4">
          Our Best Selling Indian Granite
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover our premium collection of natural stones, carefully selected
          from the finest quarries
        </p>

        <div ref={productsRef} className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-200 mb-4">{product.description}</p>
                  <button
                    onClick={() => {
                      navigation("/products/");
                    }}
                    className="bg-accent text-white px-6 py-2 rounded-none hover:bg-accent/90 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
