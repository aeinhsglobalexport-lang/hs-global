import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { categories as productCategories, Subcategory } from "../data/products";

interface SliderItem { id: string; title: string; image: string; }

const useFurnitureSlides = (): SliderItem[] => {
  return useMemo(() => {
    const furniture = productCategories.find(c => c.id === 'furniture');
    if (!furniture) return [];
    const slides: SliderItem[] = [];
    const pushFromSub = (sub: Subcategory) => {
      const img = sub.products && sub.products[0]?.image;
      if (img) slides.push({ id: sub.id, title: sub.name, image: img });
    };
    furniture.subcategories.forEach(main => {
      if (Array.isArray(main.subcategories) && main.subcategories.length) {
        main.subcategories.forEach(child => pushFromSub(child));
      } else if (Array.isArray(main.products) && main.products.length) {
        pushFromSub(main);
      }
    });
    return slides;
  }, []);
};

const CategoriesSlider: React.FC = () => {
  const navigate = useNavigate();
  const furnitureSlides = useFurnitureSlides();

  return (
    <section className="relative z-10 py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Explore Marble Furniture</h2>
            <p className="text-gray-600">Handcrafted categories carved from premium marble and stone</p>
          </div>
        </div>

        <div className="relative">
          <div className="hidden md:flex gap-2 absolute -top-12 right-0">
            <button className="hs-cat-prev px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Prev</button>
            <button className="hs-cat-next px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Next</button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: ".hs-cat-prev", nextEl: ".hs-cat-next" }}
            autoplay={{ delay: 1800, disableOnInteraction: false }}
            loop
            spaceBetween={18}
            breakpoints={{
              0: { slidesPerView: 1.05 },
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            className="!px-1"
          >
            {furnitureSlides.map((cat) => (
              <SwiperSlide key={cat.id}>
                <button
                  onClick={() => {
                    // Pass both URL and state for robust deep linking
                    navigate(`/products?cat=furniture#${cat.id}` , { state: { targetCategory: 'furniture', target: cat.id } });
                  }}
                  className="group w-full text-left"
                  aria-label={`View ${cat.title}`}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-md bg-white border-2 border-black">
                    <div className="w-full" style={{ aspectRatio: '897 / 1147' }}>
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <span className="inline-block text-[10px] tracking-wider uppercase text-white/80">Furniture</span>
                      <h3 className="text-white text-lg md:text-xl font-bold leading-tight drop-shadow-sm">{cat.title}</h3>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-black/5 rounded-xl" />
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;


