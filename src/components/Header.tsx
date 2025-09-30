import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "./QuoteModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
    { path: "/services", label: "Services" },
  ];

  useEffect(() => {
    // Header should not be sticky on Products list or Product details pages
    if (location.pathname === '/products' || location.pathname.startsWith('/productsinfo')) {
      setIsScrolled(false);
      return;
    }
    // Keep existing behavior for other pages except products list which is already handled
    const handleScroll = () => {
      const heroSection = document.querySelector('section[class*="h-[calc(100vh"]');
      if (heroSection) {
        const heroTop = heroSection.getBoundingClientRect().top;
        setIsScrolled(heroTop <= 0);
      } else {
        setIsScrolled(window.scrollY > 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="w-full px-4 py-0">
      {/* Logo Section - hidden on product detail pages */}
      {(!location.pathname.startsWith('/productsinfo')) && (
        <div className="max-w-6xl mx-auto mb-0">
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="HS Global Export Logo"
              className="h-44 md:h-52 lg:h-60 w-auto object-contain scale-150"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling && (e.currentTarget.nextElementSibling as HTMLElement).style.setProperty('display','block');
              }}
            />
            <div 
              className="hidden text-9xl md:text-[10rem] lg:text-[12rem] font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              style={{ display: 'none' }}
            >
              HS Global Export
            </div>
          </div>
        </div>
      )}

      <nav
        className={`max-w-6xl mx-auto transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-in-out ${
          isScrolled 
            ? "bg-white/10 backdrop-blur-3xl shadow-2xl fixed top-6 left-1/2 transform -translate-x-1/2 z-40 w-[calc(100%-3rem)] rounded-3xl border border-white/20" 
            : "bg-white/80 backdrop-blur-md rounded-2xl"
        } ${location.pathname.startsWith('/productsinfo') ? 'mt-4' : ''}`}
        style={{
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(8px)",
          WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(8px)",
          boxShadow: isScrolled 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className={`flex items-center justify-center transition-all duration-500 ease-in-out ${
          isScrolled ? "px-3 py-3" : "px-3 pb-4"
        }`}>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-black hover:text-gray-600 transition-all duration-300 ease-in-out font-medium ${
                  isScrolled ? "text-lg px-4 py-2 rounded-xl hover:bg-black/5" : "text-lg"
                } ${location.pathname === link.path ? "text-black font-semibold" : ""}`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </Link>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/918107115116?text=Hello%20HS%20Global%20Export%2C%20I%20would%20like%20to%20chat%20about%20products."
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-black hover:border-black transition-all duration-300 font-semibold ${
                isScrolled ? "px-6 py-3 shadow-lg" : "px-6 py-2"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-green-500">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.1 5.38.12 11.98c0 2.1.55 4.1 1.52 5.86L0 24l6.3-1.6a12.02 12.02 0 0 0 5.76 1.46h.03c6.6 0 11.97-5.36 12-11.96a11.94 11.94 0  0 0-3.57-8.42zM12.09 21.3h-.02a9.9 9.9 0  0 1-5.04-1.38l-.36-.2-3.74.95.99-3.64-.24-.38a9.36 9.36 0  0 1-1.45-4.96c-.02-5.16 4.18-9.38 9.34-9.4 2.5 0 4.86.98 6.64 2.77a9.32 9.32 0  0 1 2.75 6.65c-.02 5.16-4.22 9.39-9.37 9.39zm5.35-7.26c-.29-.15-1.72-.84-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.92 1.12-.17.19-.34.22-.62.08-.29-.15-1.2-.44-2.28-1.41-1.68-1.5-1.92-2.33-2.14-2.62-.23-.29-.02-.45.13-.6.13-.13.3-.33.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.55-.9-2.12-.24-.57-.48-.49-.66-.49-.17 0-.37-.02-.57-.02-.2 0-.52.08-.8.37-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.16 5.04 4.43.71.31 1.26.48 1.69.62.71.22 1.34.2 1.85.12.57-.09 1.73-.7 1.98-1.39.25-.69.25-1.27.17-1.39-.07-.12-.27-.19-.55-.33z"/>
              </svg>
              Chat on WhatsApp
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden px-6 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-black hover:text-gray-600 transition-colors text-lg font-medium ${
                      location.pathname === link.path
                        ? "text-black font-semibold"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black border-2 border-black hover:border-white transition-all duration-300 font-semibold">
                  Get Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </header>
  );
};

export default Header;
