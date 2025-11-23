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
    name: 'Ramesh P.',
    position: 'Contractor',
    company: 'Prestige Constructions',
    content:
      'HS Global Export made the entire process seamless. Great granite quality, perfect color match, and timely delivery.',
    image:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Luxury Villa Construction',
    location: 'Jaipur, India',
  },
  {
    id: 2,
    name: 'Aisha Khan',
    position: 'Interior Designer',
    company: 'Studio A Interiors',
    content:
      'We sourced marble for a hotel lobby project and the finish was simply stunning. HS Global’s polish and quality control were top-notch. The team understood our design needs perfectly.',
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Hotel Lobby Design',
    location: 'Dubai, UAE',
  },
  {
    id: 3,
    name: 'David Kim',
    position: 'Hospitality Owner',
    company: 'Premium Stay Group',
    content:
      'Their granite reception desks and marble coffee tables became instant highlights in our properties. The export quality and timely delivery exceeded expectations.',
    image:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Hotel Furniture Supply',
    location: 'Seoul, South Korea',
  },
  {
    id: 4,
    name: 'Neha Sharma',
    position: 'Homeowner',
    company: 'Private Residence',
    content:
      'The marble console table I ordered was absolutely beautiful. You can feel the craftsmanship and attention to detail in every inch. It’s a true centerpiece in my living room.',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Custom Furniture Order',
    location: 'Mumbai, India',
  },
  {
    id: 5,
    name: 'Ali Rehman',
    position: 'Stone Distributor',
    company: 'Al Noor Trading',
    content:
      'I’ve worked with several suppliers, but HS Global stands out for reliability and transparency. Their granite and marble shipments are always consistent in quality and finish.',
    image:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Bulk Stone Import',
    location: 'Muscat, Oman',
  },
  {
    id: 6,
    name: 'Lina D.',
    position: 'Boutique Owner',
    company: 'Casa di Luxe Interiors',
    content:
      'We customized marble tabletops for our boutique and the result was just perfect. HS Global’s team helped match the color tones with our décor — professional from start to finish.',
    image:
      'https://images.pexels.com/photos/774548/pexels-photo-774548.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
    project: 'Retail Store Design',
    location: 'Singapore',
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
          backgroundImage: "url('/banner4.webp')",
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
                return `<span class="${className} !bg-black !w-3 !h-3"></span>`;
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
                  className="bg-white/85 backdrop-blur-sm rounded-2xl overflow-hidden p-8 min-h-[22rem] flex flex-col justify-between border border-transparent hover:border-black/40 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <p className="text-gray-800 text-lg leading-relaxed mb-6 flex-grow">"{testimonial.content}"</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover shadow-lg mr-4 ring-2 ring-black/30"
                      />
                      <div>
                        <h4 className="text-gray-900 font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-black font-semibold">{testimonial.position}</p>
                        <p className="text-gray-600 text-sm">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-black bg-black/10 px-3 py-1 rounded-full">{testimonial.project}</span>
                      <span className="text-gray-700">{testimonial.location}</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 hover:border-black/50">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 hover:border-black/50">
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


