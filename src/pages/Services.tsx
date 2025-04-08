import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gem, Wrench, Ruler, Truck, Shield, Clock } from 'lucide-react';

const services = [
  {
    icon: <Gem className="w-8 h-8" />,
    title: 'Custom Countertops',
    description: 'Premium granite and marble countertops tailored to your kitchen or bathroom specifications.',
    features: ['Custom edge profiles', 'Seamless installation', 'Wide range of stone options']
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: 'Stone Restoration',
    description: 'Professional restoration services to bring your natural stone surfaces back to their original glory.',
    features: ['Deep cleaning', 'Crack repair', 'Surface polishing']
  },
  {
    icon: <Ruler className="w-8 h-8" />,
    title: 'Commercial Projects',
    description: 'Large-scale stone solutions for commercial spaces and architectural projects.',
    features: ['Project consultation', 'Custom fabrication', 'Professional installation']
  }
];

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-primary overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Services Hero"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Comprehensive stone solutions for residential and commercial projects
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div ref={ref} className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Why Choose Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and secure delivery of materials</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Premium materials and craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timely Completion</h3>
              <p className="text-gray-600">Projects delivered on schedule</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;