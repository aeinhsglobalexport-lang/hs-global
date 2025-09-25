import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const slides = [
  {
    imageUrl: "/banner/banner1.jpg",
    title: "CREATING WINSOME",
    subtitle: "VISIONS",
    description: "Premium Italian marble and granite for luxury spaces",
    navigation: "/products/marble/",
  },
  {
    imageUrl: "/banner/banner2.jpg",
    title: "LUXURY DEFINED",
    subtitle: "BY NATURE",
    description: "Exclusive collection of imported stones",
    navigation: "/products/granite/",
  },
  {
    imageUrl: "/banner/banner3.webp",
    title: "CRAFTING ELEGANCE",
    subtitle: "IN STONE",
    description: "Bespoke designs for discerning clients",
    navigation: "/products/",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const navition = useNavigate();
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  return (
    <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-primary">
      {/* Fixed Background Image - Second Slide */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${slides[1].imageUrl})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10" />
      </div>
      {/* Preload hero images with high priority */}
      <link rel="preload" as="image" href={slides[0].imageUrl} />
      <link rel="preload" as="image" href={slides[1].imageUrl} />
      <link rel="preload" as="image" href={slides[2].imageUrl} />

      {/* Content - Positioned Higher */}
      <div className="absolute inset-0 flex items-start justify-center px-4 pt-32">
        <div className="text-center text-white max-w-4xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2"
          >
            {slides[1].title}
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-6"
          >
            {slides[1].subtitle}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl mb-8 text-gray-200 px-4 md:px-0"
          >
            {slides[1].description}
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => {
              navition(slides[1].navigation);
            }}
            className="bg-black hover:bg-white text-white hover:text-black border-2 border-black hover:border-white px-6 md:px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center group font-semibold"
          >
            Explore Collection
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
