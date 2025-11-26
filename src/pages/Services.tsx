import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Shield, PackageSearch, Boxes, Globe2, Factory, Hammer, Gem, Ruler, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services: React.FC = () => {
  const {t} = useTranslation();
  // Ensure fixed backgrounds behave like About/Products
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .fixed-bg{background-attachment:fixed !important;background-size:cover !important;background-position:center !important;background-repeat:no-repeat !important}
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Preload only hero image
  useEffect(() => {
    const i = new Image();
    i.src = '/services-hero.webp';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="fixed-bg absolute inset-0" style={{ backgroundImage: "url('/services-hero.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t('services.hero_title')}
            </motion.h1>
            <motion.p
              className="text-white/85 text-base md:text-lg max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {t('services.hero_subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview badges */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              {icon: Factory, label: t('services.badge_1')},
              {icon: Hammer, label: t('services.badge_2')},
              {icon: Truck, label: t('services.badge_3')},
              {icon: Shield, label: t('services.badge_4')}
            ].map(({icon: Icon, label}) => (
              <div key={label} className="flex items-center gap-3 bg-white border-2 border-black rounded-xl px-4 py-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm md:text-base font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing & Fabrication */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span className="uppercase tracking-wider text-black/70">{t('services.manufacturing_header')}</span>
              <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">{t('services.manufacturing_title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('services.manufacturing_para_1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('services.manufacturing_para_2')}
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  t('services.manufacturing_grid_1'),
                  t('services.manufacturing_grid_2'),
                  t('services.manufacturing_grid_3'),
                  t('services.manufacturing_grid_4'),
                  t('services.manufacturing_grid_5'),
                  t('services.manufacturing_grid_6')
                ].map(i => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-black" />
                    <span className="text-gray-800">{i}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.1}} className="border-2 border-black rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Ruler className="w-5 h-5" />
                <h3 className="text-xl font-semibold">{t('services.manufacturing_box_title_1')}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t('services.manufacturing_box_para_1')}</p>
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="w-5 h-5" />
                <h3 className="text-xl font-semibold">{t('services.manufacturing_box_title_2')}</h3>
              </div>
              <p className="text-gray-700">{t('services.manufacturing_box_para_2')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Export & Logistics */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span className="uppercase tracking-wider text-black/70">{t('services.export_header')}</span>
              <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">{t('services.export_title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('services.export_para_1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('services.export_para_2')}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {i: Truck, l: t('services.export_grid_1')},
                  {i: Boxes, l: t('services.export_grid_2')},
                  {i: Globe2, l: t('services.export_grid_3')},
                  {i: PackageSearch, l: t('services.export_grid_4')}
                ].map(({i: Icon, l}) => (
                  <div key={l} className="flex items-center gap-3 border-2 border-black rounded-lg px-3 py-2">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.1}} className="border-2 border-black rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">{t('services.export_box_title')}</h3>
              <ul className="space-y-3">
                {[
                  t('services.export_box_point_1'),
                  t('services.export_box_point_2'),
                  t('services.export_box_point_3'),
                  t('services.export_box_point_4')
                ].map(i => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-black" />
                    <span className="text-gray-800">{i}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Focus */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <span className="uppercase tracking-wider text-black/70">{t('services.material_header')}</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2">{t('services.material_title')}</h2>
            <p className="text-gray-700 mt-3 max-w-4xl">{t('services.material_para')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: t('services.material_box_1_title'),
                icon: Gem,
                pts: [
                  t('services.material_box_1_point_1'),
                  t('services.material_box_1_point_2'),
                  t('services.material_box_1_point_3'),
                  t('services.material_box_1_point_4')
                ]
              },
              {
                title: t('services.material_box_2_title'),
                icon: Hammer,
                pts: [
                  t('services.material_box_2_point_1'),
                  t('services.material_box_2_point_2'),
                  t('services.material_box_2_point_3'),
                  t('services.material_box_2_point_4')
                ]
              }
            ].map(({title, icon: Icon, pts}) => (
              <div key={title} className="border-2 border-black rounded-2xl p-5 md:p-6 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {pts.map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5" />
                      <span className="text-gray-800 text-sm md:text-base">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO‑focused details */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('services.stone_title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4 max-w-5xl">
            {t('services.stone_para_1_part_1')} <strong>{t('services.stone_para_1_part_2')}</strong>
            {t('services.stone_para_1_part_3')}<strong>{t('services.stone_para_1_part_4')}</strong>
            {t('services.stone_para_1_part_5')}<strong>{t('services.stone_para_1_part_6')}</strong>
            {t('services.stone_para_1_part_7')}<strong>{t('services.stone_para_1_part_8')}</strong>
            {t('services.stone_para_1_part_9')}<strong>{t('services.stone_para_1_part_10')}</strong>
            {t('services.stone_para_1_part_11')}<strong>{t('services.stone_para_1_part_12')}</strong>
            {t('services.stone_para_1_part_13')}<strong>{t('services.stone_para_1_part_14')}</strong>
            {t('services.stone_para_1_part_15')}<strong>{t('services.stone_para_1_part_16')}</strong>
            {t('services.stone_para_1_part_17')}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 max-w-5xl">
            {t('services.stone_para_2_part_1')}<strong>{t('services.stone_para_2_part_2')}</strong>
            {t('services.stone_para_2_part_3')}<strong>{t('services.stone_para_2_part_4')}</strong>
            {t('services.stone_para_2_part_5')}<strong>{t('services.stone_para_2_part_6')}</strong>
            {t('services.stone_para_2_part_7')}<strong>{t('services.stone_para_2_part_8')}</strong>
            {t('services.stone_para_2_part_9')}<strong>{t('services.stone_para_2_part_10')}</strong>
            {t('services.stone_para_2_part_11')}<strong>{t('services.stone_para_2_part_12')}</strong>
            {t('services.stone_para_2_part_13')}
          </p>
          <ul className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
            {[
              t('services.stone_service_1'),
              t('services.stone_service_2'),
              t('services.stone_service_3'),
              t('services.stone_service_4'),
              t('services.stone_service_5'),
              t('services.stone_service_6')
            ].map(i => (
              <li key={i} className="flex items-start gap-3 border-2 border-black rounded-xl px-4 py-3">
                <CheckCircle className="w-5 h-5 text-black" />
                <span className="text-gray-800">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="border-2 border-black rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">{t('services.cta_title')}</h3>
              <p className="text-gray-700 mt-2 max-w-2xl">{t('services.cta_text')}</p>
            </div>
            <a href="https://wa.me/918107115116?text=I%20want%20to%20discuss%20stone%20services" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 border-2 border-black rounded-lg bg-black text-white hover:bg-white hover:text-black transition-colors">
              {t('services.cta_btn')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;