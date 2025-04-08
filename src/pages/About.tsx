import React from "react";
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Interior Design"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <TextReveal className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Journey in Stone
            </TextReveal>
            <TextReveal className="text-3xl md:text-5xl font-bold text-accent mb-8">
              Crafting excellence in natural stone for over five decades
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-xl max-w-2xl mx-auto mb-8"
            >
              Crafting excellence in natural stone for over five decades
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 inline-flex items-center group"
            >
              Discover Our Story
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-accent uppercase tracking-wider">
                Our Heritage
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 1970, HS-Globals began as a small family business
                with a passion for natural stone. Today, we stand as an industry
                leader, having transformed countless spaces with our premium
                granite and marble solutions.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-accent">50+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent">10K+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                alt="Heritage"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                    alt="Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc"
                    alt="Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-accent uppercase tracking-wider">
                Our Craft
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Mastery in Stone</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our craftsmen combine traditional techniques with modern
                technology to create stunning stone installations that stand the
                test of time.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Wrench className="w-6 h-6 text-accent mr-3" />
                  <span>Precision cutting technology</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-6 h-6 text-accent mr-3" />
                  <span>Quality assurance at every step</span>
                </li>
                <li className="flex items-center">
                  <Gem className="w-6 h-6 text-accent mr-3" />
                  <span>Premium material selection</span>
                </li>
              </ul>
            </div>
          </div>
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

      {/* Innovation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-accent uppercase tracking-wider">
              Innovation
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-4">
              Pioneering the Future
            </h2>
            <p className="text-gray-600">
              We continuously invest in cutting-edge technology and sustainable
              practices to lead the industry forward.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">
                Sustainable Practices
              </h3>
              <p className="text-gray-600">
                Implementing eco-friendly extraction and processing methods to
                minimize environmental impact.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-secondary p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">
                Digital Integration
              </h3>
              <p className="text-gray-600">
                Using advanced 3D modeling and visualization tools for precise
                project planning.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-secondary p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Quality Control</h3>
              <p className="text-gray-600">
                Implementing AI-powered quality inspection systems for
                consistent excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent uppercase tracking-wider">
                Community Impact
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Building Better Communities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe in giving back to the communities where we operate.
                Through various initiatives, we support local development and
                sustainable practices.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span>Educational programs for aspiring craftsmen</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span>Environmental conservation projects</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span>Local workforce development</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea"
                alt="Community Impact"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision for the Future Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent uppercase tracking-wider">
            Looking Forward
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-8">
            Our Vision for the Future
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-white/80 mb-8">
              We envision a future where sustainable luxury and innovative
              design come together to create spaces that inspire and endure.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 inline-flex items-center group"
            >
              Join Our Journey
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
