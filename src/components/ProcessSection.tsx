import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Truck, CheckCircle, Search } from 'lucide-react';

const processes = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Material Selection',
    description: 'Choose from our premium selection of stones'
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: 'Expert Crafting',
    description: 'Precision cutting and polishing by skilled artisans'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Quality Control',
    description: 'Rigorous inspection for perfect finish'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Installation',
    description: 'Professional installation by our expert team'
  }
];

const ProcessSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From selection to installation, we ensure excellence at every step
          </p>
        </div>

        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processes.map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-secondary rounded-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent text-white">
                {process.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                {process.title}
              </h3>
              <p className="text-gray-600">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;