import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import TextReveal from "../components/TextReveal";
import { Award, Users, Globe, Target, ChevronRight } from "lucide-react";

const YouTubeVideo = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative w-full bg-gray-900 overflow-hidden"
      style={{ paddingBottom: "56.25%" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {inView && (
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=1&controls=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </motion.div>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { t } = useTranslation();

  useEffect(() => {
    const criticalImages = ["/about-hero.jpg", "/export.jpg"];
    criticalImages.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .fixed-bg {
        background-attachment: fixed !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        will-change: background-position;
        contain: layout style paint;
      }
      iframe {
        will-change: transform;
        contain: strict;
      }
      section {
        contain: layout style paint;
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{
            backgroundImage: "url('/about-hero.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-3 sm:px-6 lg:px-12 text-center">
            <TextReveal className="text-xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("about.hero_title")}
            </TextReveal>

            <TextReveal className="text-sm sm:text-xl text-white mb-8">
              {t("about.hero_subtitle")}
            </TextReveal>

            <motion.a
              href="/products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors text-base group"
            >
              {t("about.hero_button")}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
              {t("about.heritage_tag")}
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-6">
              {t("about.heritage_title")}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t("about.heritage_paragraph_1")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="fixed-bg relative h-[400px] md:h-[500px] w-full mb-8 overflow-hidden"
              style={{ backgroundImage: "url('/export.webp')" }}
            />

            <p className="text-gray-600 leading-relaxed mb-8">
              {t("about.heritage_paragraph_2")}
            </p>

            <div className="mb-8">
              <YouTubeVideo
                videoId="GJVq2byJkbg"
                title={t("about.video_title_1")}
              />
            </div>
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
            <span className="text-accent uppercase tracking-wider">
              {t("about.marble_tag")}
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-6">
              {t("about.marble_title")}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t("about.marble_paragraph_1")}
            </p>

            <div className="mb-8">
              <YouTubeVideo
                videoId="vE9QEk9uzRc"
                title={t("about.video_title_2")}
              />
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {t("about.marble_paragraph_2")}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t("about.marble_paragraph_3")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="fixed-bg relative h-[400px] md:h-[500px] w-full mb-8 overflow-hidden"
              style={{ backgroundImage: "url('/marble-solutions.webp')" }}
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
              {t("about.granite_tag")}
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-6">
              {t("about.granite_title")}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t("about.granite_paragraph_1")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="fixed-bg relative h-[400px] md:h-[500px] w-full mb-8 overflow-hidden"
              style={{ backgroundImage: "url('/granite-solutions.webp')" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent uppercase tracking-wider">
            {t("about.global_tag")}
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-12">
            {t("about.global_title")}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("about.global_network_title")}
              </h3>
              <p className="text-white/80">{t("about.global_network_text")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6"
            >
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("about.global_team_title")}
              </h3>
              <p className="text-white/80">{t("about.global_team_text")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6"
            >
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("about.global_success_title")}
              </h3>
              <p className="text-white/80">{t("about.global_success_text")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="p-6"
            >
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("about.global_awards_title")}
              </h3>
              <p className="text-white/80">{t("about.global_awards_text")}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
