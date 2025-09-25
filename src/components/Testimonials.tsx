import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Interior Designer',
    content: 'HS-Globals transformed our client\'s living room with their premium marble. The quality and craftsmanship are unmatched.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Architect',
    content: 'Working with HS-Globals has been exceptional. Their attention to detail and professional installation team made all the difference.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'Property Developer',
    content: 'The variety and quality of granite options at HS-Globals are impressive. They\'ve become our go-to supplier for all our projects.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
  }
];

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section className="relative py-20 overflow-hidden" id="testimonials">
      {/* Fixed Background Image - Only in this section */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/banner/banner3.webp')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          What Our Clients Say
        </h2>
        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-primary">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;