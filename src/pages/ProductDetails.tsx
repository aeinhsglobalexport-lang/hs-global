import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Shield, Clock, ChevronRight } from "lucide-react";
import { productDetail } from "../static/productDetail";

const ProductDetails = () => {
  const { id }: { id: string } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const numid = parseInt(id);
  const product = productDetail(numid);

  return (
    <div className="pt-20 min-h-screen bg-secondary">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-primary overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0  " />
        <div className="absolute inset-0 flex items-center bg ">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center text-white/80">
                <Link to="/products" className="hover:text-accent">
                  Products
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span>{product.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Product Gallery */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>

            {/* Selected Image Preview */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 aspect-[16/9] rounded-lg overflow-hidden"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

            </motion.div>

            {/* Product Description */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Product Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Grid */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-500 capitalize">
                        {key}
                      </div>
                      <div className="font-semibold text-primary mt-1">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="text-3xl font-bold text-primary mb-4">
                {product.price}
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Truck className="w-5 h-5 mr-3" />
                  <span>Free shipping on orders over $2000</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 mr-3" />
                  <span>10-year warranty</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>Installation within 7-10 business days</span>
                </div>
              </div>
              <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition-colors mb-4">
                Request Quote
              </button>
              <button className="w-full border-2 border-accent text-accent py-3 rounded-lg hover:bg-accent hover:text-white transition-colors">
                Schedule Consultation
              </button>
              {/* Related Products */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Related Products
                </h3>
                <div className="space-y-4">
                  {product.relatedProducts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/products/${related.id}`}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-primary group-hover:text-accent transition-colors">
                          {related.name}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
