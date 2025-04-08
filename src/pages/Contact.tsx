import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Get in touch with our team of experts for personalized solutions
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary">
                Get in Touch
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-accent text-white px-8 py-3 rounded-md hover:bg-accent/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary">
                Contact Information
              </h2>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-gray-600">info@hsglobalexport.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-gray-600">+91 8017115116</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-accent/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">
                      Corporate Office
                    </h3>
                    <p className="text-gray-600">
                      5th Floor, Shivalik Shilp, ISKCON Cross Road, <br /> SG
                      Highway, Ahmedabad
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">
                      Factory Address
                    </h3>
                    <p className="text-gray-600">
                      Inania Complex, near Maruti Showroom,
                      <br />
                      3-Phase, Jalore, 343001.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
