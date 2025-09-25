import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

const FooterVariant1: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 relative overflow-hidden">
      {/* <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div> */}
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-black">Premium granite and marble solutions</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Crafting exceptional spaces with the finest marble and granite. Where luxury meets precision in every cut.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', Icon: Facebook, href: '#' },
                { name: 'Instagram', Icon: Instagram, href: '#' },
                { name: 'LinkedIn', Icon: Linkedin, href: '#' },
              ].map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-white transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-700 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Products</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Marble', href: '/products/marble' },
                { label: 'Granite', href: '/products/granite' },
                { label: 'Onyx', href: '/products/onyx' },
                { label: 'Sandstone', href: '/products/sandstone' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 hover:text-amber-500 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Pages</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 hover:text-amber-500 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center group">
                <MapPin className="w-5 h-5 text-amber-500 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-600 text-sm">C-108, Titanium Business Park, Makarba, Ahmedabad - 380051.</span>
              </div>
              <div className="flex items-center group">
                <Phone className="w-5 h-5 text-amber-500 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-600 text-sm">+91 81071 15116</span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-5 h-5 text-amber-500 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-600 text-sm">hsglobalexport@gmail.com</span>
              </div>
              <div className="flex items-center group">
                <Clock className="w-5 h-5 text-amber-500 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-600 text-sm">Mon-Fri: 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {currentYear} Premium Stone Works. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-200">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterVariant1;
