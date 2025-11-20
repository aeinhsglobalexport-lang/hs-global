import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const showcaseImages = [
  {
    url: "/slider/slider1.webp",
    title: "Luxury Kitchen Design",
    description: "Premium granite countertops and backsplashes",
  },
  {
    url: "/slider/slider2.webp",
    title: "Modern Bathroom",
    description: "Elegant marble vanity and flooring",
  },
  {
    url: "/slider/slider3.webp",
    title: "Elegant Living Room",
    description: "Custom-cut stone features and fireplace",
  },
  {
    url: "/slider/slider4.webp",
    title: "Commercial Space",
    description: "Large-format stone installations",
  },
  {
    url: "/slider/slider5.jpg",
    title: "Hotel Lobby",
    description: "Luxurious marble and granite combinations",
  },
];

const ImageShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const nextIndex = (currentIndex + 1) % showcaseImages.length;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), 700);
  }, [currentIndex, isAnimating, nextIndex]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length
    );
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-primary">
      {/* Main Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-1000"
              style={{
                backgroundImage: `url(${showcaseImages[currentIndex].url})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Image Preview */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-1/2 -translate-y-1/2 right-0 w-64 h-96 overflow-hidden hidden lg:block"
        >
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={handleNext}
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <div
                className="w-full h-full bg-cover bg-center filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                style={{
                  backgroundImage: `url(${showcaseImages[nextIndex].url})`,
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-300" />
            </motion.div>
            <div className="absolute bottom-8 left-6 right-6 text-white">
              <p className="text-sm font-medium mb-2 opacity-75">Next:</p>
              <p className="text-lg font-semibold mb-1">
                {showcaseImages[nextIndex].title}
              </p>
              <p className="text-sm opacity-75">
                {showcaseImages[nextIndex].description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {showcaseImages[currentIndex].title}
              </h2>
              <p className="text-xl text-white/80 mb-8">
                {showcaseImages[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center">
          {/* Thumbnails */}
          <div className="flex items-center space-x-4 mb-8">
            {showcaseImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => !isAnimating && setCurrentIndex(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-12 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-accent transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-accent transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcase;
