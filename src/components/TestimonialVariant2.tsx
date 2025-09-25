import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  {
    id: 1,
    name: 'James Wellington',
    position: 'Executive Chef',
    company: 'Michelin Star Restaurant',
    content:
      'The marble kitchen countertops have revolutionized our culinary workspace. The non-porous surface and temperature resistance make it perfect for our high-end kitchen operations.',
    image:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Commercial Kitchen Setup',
    location: 'London, UK',
  },
  {
    id: 2,
    name: 'Isabella Rodriguez',
    position: 'Interior Architect',
    company: 'Luxury Homes International',
    content:
      'Working with them on our Mediterranean villa project was exceptional. The travertine furniture pieces perfectly captured the essence of luxury living with timeless elegance.',
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Villa Furniture Collection',
    location: 'Barcelona, Spain',
  },
  {
    id: 3,
    name: 'David Kim',
    position: 'Hotel Chain Owner',
    company: 'Premium Hospitality Group',
    content:
      'Their granite reception desks and marble coffee tables have been conversation starters in all our properties. The export quality and timely delivery exceeded our expectations.',
    image:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Multi-Hotel Furnishing',
    location: 'Seoul, South Korea',
  },
  {
    id: 4,
    name: 'Catherine Dubois',
    position: 'Gallery Director',
    company: 'Artistic Stone Gallery',
    content:
      'The custom marble pedestals and display furniture showcase our art pieces beautifully. Their understanding of both functionality and aesthetics is remarkable.',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Gallery Display Systems',
    location: 'Paris, France',
  },
  {
    id: 5,
    name: 'Ahmed Hassan',
    position: 'Resort Developer',
    company: 'Luxury Resorts Middle East',
    content:
      'The outdoor stone furniture collection withstands our harsh climate perfectly. Beautiful craftsmanship combined with practical durability - exactly what we needed.',
    image:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Resort Outdoor Furniture',
    location: 'Dubai, UAE',
  },
];

const TestimonialVariant2: React.FC = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fixed Background Image - Only in this section */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/banner/banner4.jpg')",
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-amber-400 mr-3" />
            <h2 className="text-5xl font-bold text-white">Client Testimonials</h2>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover why discerning clients worldwide trust us for their premium stone and marble furniture needs
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-6"></div> */}
        </motion.div>

        <div className="relative -mt-6">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            effect="coverflow"
            coverflowEffect={{ rotate: 25, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
            pagination={{
              clickable: true,
              renderBullet: (_i, className) => {
                return `<span class="${className} !bg-amber-400 !w-3 !h-3"></span>`;
              },
            }}
            navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="testimonial-swiper pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  //   whileHover={{ y: -4 }}
                  className="bg-white/85 backdrop-blur-sm rounded-2xl overflow-hidden p-8 min-h-[22rem] flex flex-col justify-between border border-transparent hover:border-amber-400/60 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <p className="text-gray-800 text-lg leading-relaxed mb-6 flex-grow">"{testimonial.content}"</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover shadow-lg mr-4 ring-2 ring-amber-400/50"
                      />
                      <div>
                        <h4 className="text-gray-900 font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-amber-600 font-semibold">{testimonial.position}</p>
                        <p className="text-gray-600 text-sm">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-amber-700 bg-amber-400/25 px-3 py-1 rounded-full">{testimonial.project}</span>
                      <span className="text-gray-700">{testimonial.location}</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 hover:border-amber-400/50">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 hover:border-amber-400/50">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          {/* <p className="text-slate-200 mb-6">Join hundreds of satisfied clients worldwide</p>
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-full font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105">
            Get Your Quote Today
          </button> */}
        </motion.div>
      </div>

      <style>
        {`
        .testimonial-swiper .swiper-pagination { bottom: 0 !important; }
        .testimonial-swiper .swiper-pagination-bullet { opacity: 0; }
        .testimonial-swiper .swiper-pagination-bullet-active { opacity: 0; }
        .testimonial-swiper .swiper-slide > * { border-radius: 1rem; overflow: hidden; }
        `}
      </style>
    </section>
  );
};

export default TestimonialVariant2;


