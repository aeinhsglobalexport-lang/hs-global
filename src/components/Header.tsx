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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed w-full z-50 px-4 py-4">
      <nav
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            HS-Global export
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-primary hover:text-accent transition-colors ${
                  location.pathname === link.path ? "text-accent" : ""
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsQuoteModalOpen(true)}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors"
            >
              Get Quote
            </motion.button>
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
                    className={`text-primary hover:text-accent transition-colors ${
                      location.pathname === link.path
                        ? "text-accent font-medium"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors mt-2">
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
