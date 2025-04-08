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
    <section className="relative h-[100vh] overflow-hidden bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
            style={{ backgroundImage: `url(${slides[currentSlide].imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center text-white max-w-4xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light mb-6"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl mb-8 text-gray-200 px-4 md:px-0"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => {
                  navition(slides[currentSlide].navigation);
                }}
                className="bg-accent hover:bg-accent/90 text-white px-6 md:px-8 py-3 rounded-none transition-all duration-300 inline-flex items-center group"
              >
                Explore Collection
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 md:px-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="bg-white/10 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="bg-white/10 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-accent transition-colors"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-accent w-6 md:w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
