import React from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigation = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const features = [
    "Premium quality granite and marble",
    "Wide range of products from decorative lights to chairs",
    "Custom designs tailored for your needs",
    "Trusted by thousands of clients globally",
  ];

  return (
    <section className="py-20 bg-[#FAF5F0]">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative h-[600px]">
            <img
              src="/feature/feature.webp"
              alt="Luxury Marble Installation"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#3D2B1F]">
              Why Choose HS-Globals?
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4  rounded-lg"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#708238]" />
                  <p className="text-[#3D2B1F]">{feature}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigation("/about")}
              className="bg-[#708238] text-white px-8 py-3 rounded-md hover:bg-[#5C4033] transition-colors"
            >
              Learn More
            </button>`
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
