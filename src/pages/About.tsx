import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TextReveal from "../components/TextReveal";
import {
  Award,
  Users,
  Globe,
  Target,
  Clock,
  Shield,
  Wrench,
  Gem,
  ChevronRight,
} from "lucide-react";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Preload images to prevent flickering
  useEffect(() => {
    const imageUrls = [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Add CSS to ensure fixed backgrounds work immediately
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .fixed-bg {
        background-attachment: fixed !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/about-hero.jpg')",
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <TextReveal className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Granite & Marble Manufacturer
            </TextReveal>
            <TextReveal className="text-2xl md:text-4xl font-semibold text-white mb-8">
              Export-grade slabs, tiles & countertops with custom finishes and global delivery
            </TextReveal>
            <motion.a
              href="/products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-white hover:text-black inline-flex items-center group"
            >
              See Our Products
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-white">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full px-4 md:px-8 lg:px-12"
          >
            <span className="text-accent uppercase tracking-wider">
              HS Global Export
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-6">
              Leading Natural Stone Export Excellence
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              HS Global Export stands as India's premier natural stone export company, specializing in premium granite, marble, and quartzite exports to global markets. With over five decades of expertise in stone processing, manufacturing, and international trade, we have established ourselves as trusted suppliers of high-quality natural stone products to architects, contractors, and distributors worldwide. Our state-of-the-art processing facilities, advanced cutting-edge technology, and stringent quality control measures ensure that every slab, tile, and custom-cut stone meets international standards for durability, aesthetics, and precision. From luxury residential projects to commercial developments, HS Global Export delivers exceptional natural stone solutions that transform spaces with timeless elegance and superior craftsmanship.
            </p>
            
            {/* Full-width image between paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="fixed-bg relative h-[400px] md:h-[500px] w-full mb-8 overflow-hidden"
              style={{
                backgroundImage: "url('/export.jpg')"
              }}
            />
            
            <p className="text-gray-600 leading-relaxed">
              As a leading stone export company, we maintain strategic partnerships with quarries across India, ensuring consistent supply of premium natural stone materials including Italian marble, Brazilian granite, and exotic quartzite varieties. Our comprehensive export services include custom fabrication, precision cutting, quality inspection, and reliable logistics support to over 25 countries worldwide. Whether you're sourcing natural stone for kitchen countertops, bathroom vanities, flooring tiles, or architectural cladding, HS Global Export provides end-to-end solutions with competitive pricing, timely delivery, and exceptional customer service that exceeds international expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marble Section */}
      <section className="py-20 bg-secondary">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full px-4 md:px-8 lg:px-12"
          >
            <span className="text-accent uppercase tracking-wider">About HS Global Export</span>
            <h2 className="text-4xl font-bold mt-2 mb-6">Granite & Marble Experts for Projects Worldwide</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              HS Global Export delivers export‑grade granite, marble, sandstone, onyx and travertine with reliable sourcing, precision processing and on‑time logistics. From premium slabs and tiles to bespoke stone furniture, we support architects, builders and homeowners with consistent quality, competitive pricing and expert guidance across selection, finishes and installation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our catalogs cover kitchen countertops, bathroom vanities, flooring, wall cladding, staircases and exterior applications. Each slab is inspected for color harmony, structural integrity and polish. With strict QA, moisture and thickness checks, and professional packing, we ensure your stone arrives project‑ready anywhere in the world.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Looking for a specific shade or texture? Share your specification and we will shortlist active quarry lots with live photos and videos. We also offer edge profiling, water‑jet cutting, book‑matching and custom size calibration to simplify site work and reduce wastage.
            </p>
            
            {/* Full-width image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="fixed-bg relative h-[400px] md:h-[500px] w-full mb-8 overflow-hidden"
              style={{
                backgroundImage: "url('/marble-solutions.jpg')"
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Granite Section */}
      <section className="py-20 bg-white">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full px-4 md:px-8 lg:px-12"
          >
            <span className="text-accent uppercase tracking-wider">
              Premium Granite Collection
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-6">Durable Granite Solutions</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              HS Global Export offers an extensive range of premium granite varieties, featuring the finest Indian granite including Black Galaxy, Absolute Black, Kashmir White, Tan Brown, and Ubatuba Green, each selected for their exceptional durability, unique color variations, and superior quality standards. Our granite collection encompasses a diverse spectrum of colors and patterns, from deep black granite perfect for modern kitchen countertops to light-colored granite ideal for bathroom vanities and commercial flooring. We source our granite from the most reputable quarries across India, Brazil, and other international locations, ensuring consistent quality and authentic natural beauty. Our advanced granite processing facilities employ cutting-edge technology including diamond-tipped saws, precision polishing machines, and computer-controlled cutting systems to create flawless granite slabs, tiles, and custom-cut pieces. Whether you're designing high-traffic commercial spaces, luxury residential kitchens, durable bathroom installations, or robust architectural cladding, our granite products deliver unmatched strength, resistance to heat and scratches, and long-lasting performance. From office buildings to residential homes, HS Global Export provides premium granite solutions that combine natural beauty with exceptional durability and reliability for any application.
            </p>
            
            {/* Full-width image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="fixed-bg relative h-[400px] md:h-[500px] w-full mb-8 overflow-hidden"
              style={{
                backgroundImage: "url('/granite-solutions.jpg')"
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent uppercase tracking-wider">
            Global Presence
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-12">
            Worldwide Recognition
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Network</h3>
              <p className="text-white/80">Operating in 30+ countries</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6"
            >
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-white/80">500+ skilled professionals</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6"
            >
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Project Success</h3>
              <p className="text-white/80">98% client satisfaction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="p-6"
            >
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Industry Awards</h3>
              <p className="text-white/80">20+ excellence awards</p>
            </motion.div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;
