import React from "react";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Gem, Wrench, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: <Gem className="w-8 h-8" />,
    title: "Premium Materials",
    description: "Sourced from the finest quarries worldwide",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Expert Installation",
    description: "Professional installation by certified craftsmen",
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Global Delivery",
    description: "Worldwide shipping with careful handling",
  },
];

const Services = () => {
  const navigation = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      className="py-20 bg-[url('/banner/service.jpg')] bg-cover bg-top"
      id="services"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary text-center mb-12">
          Our Services
        </h2>
        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <button
                onClick={() => {
                  navigation("/services");
                }}
                className="inline-flex items-center text-accent hover:text-primary transition-colors"
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
