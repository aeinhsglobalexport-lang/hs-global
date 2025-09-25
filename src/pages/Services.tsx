import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Shield, PackageSearch, Boxes, Globe2, Factory, Hammer, Gem, Ruler, Wrench } from 'lucide-react';

const Services: React.FC = () => {
  // Ensure fixed backgrounds behave like About/Products
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .fixed-bg{background-attachment:fixed !important;background-size:cover !important;background-position:center !important;background-repeat:no-repeat !important}
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Preload only hero image
  useEffect(() => {
    const i = new Image();
    i.src = '/services-hero.jpg';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="fixed-bg absolute inset-0" style={{ backgroundImage: "url('/services-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              End‑to‑End Natural Stone Services
            </motion.h1>
            <motion.p
              className="text-white/85 text-base md:text-lg max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              We manufacture, fabricate, and export premium marble and granite with global logistics, strict QA, and bespoke craftsmanship.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview badges */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[{icon:Factory, label:'In‑house Manufacturing'}, {icon:Hammer, label:'Custom Fabrication'}, {icon:Truck, label:'Global Logistics'}, {icon:Shield, label:'Strict QA'}].map(({icon:Icon,label})=> (
              <div key={label} className="flex items-center gap-3 bg-white border-2 border-black rounded-xl px-4 py-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm md:text-base font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing & Fabrication (text only) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span className="uppercase tracking-wider text-black/70">Manufacturing • Fabrication</span>
              <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Precision‑engineered Marble & Granite</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                HS Global Export operates dedicated marble and granite manufacturing units equipped with CNC bridge saws, 5‑axis water‑jet machines, mono‑wire and gang‑saw lines, resin treatment plants, and multi‑head polishing lines. Our teams convert raw blocks into calibrated slabs, tiles, stair treads, window sills, vanity tops, kitchen countertops, thresholds, and bespoke architectural components with tight dimensional tolerances and consistent surface finishes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We support end‑to‑end value engineering for hospitality, retail, corporate, and luxury residential projects—covering material submittals, mockups, book‑matching strategies, vein‑matching drawings, dry‑lay approvals, edge profiling, cut‑outs, sink recesses, and on‑time packing for phased site deliveries. Our finishing capabilities include polished, honed, leather, flamed, brushed, bush‑hammered, and antique textures to meet performance and aesthetic goals.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {["CNC shaping & 5‑axis profiling","Book‑/vein‑matched selections","Surface calibration & thickness QA","Cut‑to‑size packages by zone","Detailed shop drawings & dry‑lay","Sustainable slurry & water recycling"].map(i=> (
                  <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-black" /><span className="text-gray-800">{i}</span></li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.1}} className="border-2 border-black rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3"><Ruler className="w-5 h-5" /><h3 className="text-xl font-semibold">Fabrication Capabilities</h3></div>
              <p className="text-gray-700 mb-4">Countertops with mitred edges, waterfall ends, full‑height backsplashes, shower jambs, and elevator lobby cladding are produced with millimetre accuracy. Complex radius pieces and inlays are achieved using templating and water‑jet precision.</p>
              <div className="flex items-center gap-3 mb-3"><Wrench className="w-5 h-5" /><h3 className="text-xl font-semibold">Site & Installation Readiness</h3></div>
              <p className="text-gray-700">Each lot ships with room‑wise manifests, edge details, fixing recommendations, maintenance guides, and labeled crates for faster on‑site execution.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Export & Logistics (text only) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span className="uppercase tracking-wider text-black/70">Export • Logistics</span>
              <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Global Shipping, Packing & Compliance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a marble and granite exporter, we manage complete export documentation—commercial invoices, packing lists, HS codes, certificates of origin, fumigation and ISPM‑15 compliance, insurance, and inspection reports. Crates are vacuum‑sealed with moisture barriers and shock‑resistant corner protections to minimise transit damage.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our logistics network supports FCL/LCL sea freight and time‑critical air shipments with door‑to‑door solutions. Batch‑level traceability, pre‑dispatch photographs, and third‑party testing ensure transparency for architects, contractors, and stone distributors worldwide.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[{i:Truck,l:'Door‑to‑door freight'},{i:Boxes,l:'Crating & moisture barriers'},{i:Globe2,l:'Multi‑country compliance'},{i:PackageSearch,l:'Batch‑level traceability'}].map(({i:Icon,l})=> (
                  <div key={l} className="flex items-center gap-3 border-2 border-black rounded-lg px-3 py-2">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.1}} className="border-2 border-black rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">Export Advantages</h3>
              <ul className="space-y-3">
                {["ISPM‑15 pallets & anti‑rust packaging","Insurance & inspection coordination","Multi‑port loading flexibility","Clear QC photos before dispatch"].map(i => (
                  <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-black" /><span className="text-gray-800">{i}</span></li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Focus (text only) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <span className="uppercase tracking-wider text-black/70">Materials</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2">Marble & Granite Expertise</h2>
            <p className="text-gray-700 mt-3 max-w-4xl">We curate Italian marble (Statuario, Calacatta, Carrara) and premium Indian marble along with high‑performance Indian granite (Black Galaxy, Absolute Black, Tan Brown, Kashmir White). Our programs support luxury interiors, high‑traffic commercial fit‑outs, exterior cladding, paving, landscaping, and façade applications with weather‑resistant specifications.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[{title:'Marble Programs',icon:Gem,pts:['Italian & Indian quarry selections','Book‑matching & vein‑matching expertise','Luxury lobby, bath & kitchen solutions','Surface finishes: polished, honed, leather']},{title:'Granite Programs',icon:Hammer,pts:['High‑traffic & exterior durability','Slip‑resistant textures: flamed, bush‑hammered','Cut‑to‑size for façades & landscaping','Heat/scratch‑resistant performance']}].map(({title,icon:Icon,pts})=> (
              <div key={title} className="border-2 border-black rounded-2xl p-5 md:p-6 bg-white">
                <div className="flex items-center gap-3 mb-4"><Icon className="w-5 h-5" /><h3 className="text-xl font-semibold">{title}</h3></div>
                <ul className="space-y-2">
                  {pts.map(p=> (<li key={p} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5" /><span className="text-gray-800 text-sm md:text-base">{p}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO‑focused details */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Stone Services for Architects, Contractors & Distributors</h2>
          <p className="text-gray-700 leading-relaxed mb-4 max-w-5xl">As a full‑service marble and granite company, HS Global Export provides <strong>natural stone manufacturing</strong>, <strong>custom fabrication</strong>, and <strong>international export</strong> under one roof. Our teams collaborate with architects and general contractors to optimise drawings, select the right stone, and deliver <strong>cut‑to‑size marble</strong>, <strong>granite slabs</strong>, and <strong>project‑ready packages</strong> that reduce on‑site rework and save time. With rigorous <strong>quality control</strong>, batch‑wise inspection, and robust <strong>export packing</strong>, we ensure consistent results for multi‑location rollouts and prestige builds.</p>
          <p className="text-gray-700 leading-relaxed mb-4 max-w-5xl">Whether you require <strong>kitchen countertops</strong>, <strong>bathroom vanities</strong>, <strong>stair treads</strong>, <strong>hotel lobby cladding</strong>, <strong>exterior paving</strong>, or <strong>façade stone</strong>, we support the entire lifecycle—from sample approval and mockups to dry‑lay, dispatch and after‑sales care. Our global logistics partners enable reliable deliveries across the Middle East, Europe, North America and APAC.</p>
          <ul className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
            {["Marble & granite sourcing from trusted quarries","CAD shop drawings, nesting & optimisation","Calibrated slabs and tiles with tight tolerances","Edge profiles: bevel, bullnose, ogee, mitred","Surface finishes for design & performance needs","Project documentation and maintenance guides"].map(i => (
              <li key={i} className="flex items-start gap-3 border-2 border-black rounded-xl px-4 py-3"><CheckCircle className="w-5 h-5 text-black" /><span className="text-gray-800">{i}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="border-2 border-black rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Let’s build your stone program</h3>
              <p className="text-gray-700 mt-2 max-w-2xl">Share drawings, schedules, and target specs. We’ll propose materials, finishing, and logistics tailored to your project.</p>
            </div>
            <a href="https://wa.me/918107115116?text=I%20want%20to%20discuss%20stone%20services" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 border-2 border-black rounded-lg bg-black text-white hover:bg-white hover:text-black transition-colors">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;