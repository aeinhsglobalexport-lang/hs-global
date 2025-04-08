import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ZoomIn, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const galleryImages = [
  {
    id: 2,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen1.jpg",
  },
  {
    id: 3,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen2.jpg",
  },
  {
    id: 4,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen3.jpg",
  },
  {
    id: 5,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen4.jpg",
  },
  {
    id: 6,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "kitchen/kitchen5.jpg",
  },
  {
    id: 7,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen6.jpg",
  },
  {
    id: 8,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen7.jpg",
  },
  {
    id: 9,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen8.jpg",
  },
  {
    id: 10,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen9.jpg",
  },
  {
    id: 11,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: "/kitchen/kitchen10.jpg",
  },
  {
    id: 12,
    title: "Art 12",
    category: "art",
    image: "/art/art1.jpg",
  },
  {
    id: 13,
    title: "Art 13",
    category: "art",
    image: "/art/art2.jpg",
  },
  {
    id: 14,
    title: "Art 14",
    category: "art",
    image: "/art/art3.jpg",
  },
  {
    id: 15,
    title: "Art 15",
    category: "art",
    image: "/art/art4.jpg",
  },
  {
    id: 16,
    title: "Art 16",
    category: "art",
    image: "/art/art5.jpg",
  },
  {
    id: 17,
    title: "Art 17",
    category: "art",
    image: "/art/art6.jpg",
  },
  {
    id: 18,
    title: "Art 18",
    category: "art",
    image: "/art/art7.jpg",
  },
  {
    id: 19,
    title: "Art 19",
    category: "art",
    image: "/art/art8.jpg",
  },
  {
    id: 20,
    title: "Art 20",
    category: "art",
    image: "/art/art9.jpg",
  },
  {
    id: 21,
    title: "Art 21",
    category: "art",
    image: "/art/art10.jpg",
  },
  {
    id: 22,
    title: "Art 22",
    category: "art",
    image: "/art/art11.jpg",
  },
  {
    id: 23,
    title: "Art 23",
    category: "art",
    image: "/art/art12.jpg",
  },
  {
    id: 24,
    title: "Art 24",
    category: "art",
    image: "/art/art13.jpg",
  },
  {
    id: 25,
    title: "Art 25",
    category: "art",
    image: "/art/art14.jpg",
  },
  {
    id: 26,
    title: "Art 26",
    category: "art",
    image: "/art/art15.jpg",
  },
  {
    id: 27,
    title: "Art 27",
    category: "art",
    image: "/art/art16.jpg",
  },
  {
    id: 28,
    title: "Art 28",
    category: "art",
    image: "/art/art17.jpg",
  },
  {
    id: 29,
    title: "Art 29",
    category: "art",
    image: "/art/art18.jpg",
  },
  {
    id: 30,
    title: "Art 30",
    category: "art",
    image: "/art/art19.jpg",
  },
  {
    id: 31,
    title: "Art 31",
    category: "art",
    image: "/art/art20.jpg",
  },
  {
    id: 32,
    title: "Art 32",
    category: "art",
    image: "/art/art21.jpg",
  },
  {
    id: 33,
    title: "Art 33",
    category: "art",
    image: "/art/art22.jpg",
  },
  {
    id: 34,
    title: "Art 34",
    category: "art",
    image: "/art/art23.jpg",
  },
  {
    id: 35,
    title: "Art 35",
    category: "art",
    image: "/art/art24.jpg",
  },
  {
    id: 36,
    title: "Art 36",
    category: "art",
    image: "/art/art25.jpg",
  },
];

const categories = [
  { id: "all", name: "All" },
  { id: "kitchen", name: "Kitchen" },
  { id: "bathroom", name: "Bathroom" },
  { id: "living", name: "Living Room" },
  { id: "commercial", name: "Commercial" },
  { id: "art", name: "Art" },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredItems = galleryImages.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (id: number) => {
    setSelectedImage(id);
  };

  const handleNavigate = (id: number) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-20 ">

        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 text-center ">Our Gallery</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Explore our stunning collection of completed projects
          </p>
        </div>
      </section>

      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:ring-accent focus:border-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-md transition-colors ${activeCategory === category.id
                    ? "bg-accent text-white"
                    : "bg-white text-gray-600 hover:bg-accent/10"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <div className="flex gap-2 justify-center">
                      <button
                        className="inline-flex items-center space-x-2 bg-accent px-4 py-2 rounded-md hover:bg-accent/90 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(item.id);
                        }}
                      >
                        View Details
                      </button>
                      <button className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-white/30 transition-colors">
                        <ZoomIn className="w-4 h-4" />
                        <span>Zoom</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={
                  galleryImages.find((img) => img.id === selectedImage)?.image
                }
                alt="Zoomed view"
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
