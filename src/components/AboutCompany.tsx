import React from "react";
import { useNavigate } from "react-router-dom";

const AboutCompany: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/feature/about-company.jpg"
              alt="HS-Globals facility"
              className="w-full h-[280px] md:h-[420px] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
              About HS Global
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Rooted in a rich heritage of natural stone, HS‑Globals has grown from a family venture into a design‑forward brand trusted worldwide. For over five decades we have blended traditional craftsmanship with modern technology to deliver premium granite, marble and bespoke stone furniture.
              </p>
              <p>
                With thousands of projects completed and a global network, our team focuses on sustainable practices, precise engineering and timeless design that elevates homes, hospitality and commercial spaces.
              </p>
            </div>
            <button
              onClick={() => navigate("/about")}
              className="mt-6 inline-flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              Read More
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;


