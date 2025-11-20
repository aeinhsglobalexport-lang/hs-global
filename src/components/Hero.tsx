import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const slides = [
    {
      imageUrl: "/banner.webp",
      title: t("home.hero_title"),
      subtitle: t("home.hero_subtitle"),
      description: t("home.hero_subtitle_2"),
      navigation: "/products",
    },
  ];

  return (
    <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-primary">
      {/* Fixed Background Image - Second Slide */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage: `url(${slides[0].imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10" />
      </div>


      {/* Content */}
      <div className="absolute inset-0 flex items-start justify-center px-4 pt-32">
        <div className="text-center text-white max-w-4xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2"
          >
            {slides[0].title}
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-6"
          >
            {slides[0].subtitle}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl mb-8 text-gray-200 px-4 md:px-0"
          >
            {slides[0].description}
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => navigate("/products")}
            className="bg-black hover:bg-white text-white hover:text-black border-2 border-black hover:border-white px-6 md:px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center group font-semibold"
          >
            {t("home.explore_button") || "Explore Collection"}
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
