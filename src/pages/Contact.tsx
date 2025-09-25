import React, { useEffect, useState } from "react";
import { initEmailJs, sendEmail } from "../lib/email";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Contact = () => {
  // Preload hero image and add CSS for smooth fixed backgrounds
  useEffect(() => {
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg';

    // Add CSS to ensure fixed backgrounds work immediately
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Enter a valid email";
    }
    if (!subject.trim()) e.subject = "Subject is required";
    if (!message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    initEmailJs();
  }, []);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setSendError("");
      setSubmitted(false);
      setIsSending(true);
      await sendEmail(
        (import.meta as any).env.VITE_EMAILJS_TEMPLATE_CONTACT || 'template_contact',
        {
          to_email: 'hsglobalexport@gmail.com',
          subject: 'New Contact Form Submission',
          name,
          email,
          subject_line: subject,
          message,
          time: new Date().toLocaleString()
        }
      );
      // Also send to WhatsApp Business via server (if configured)
      const waText = [
        'New Contact Form Submission',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Message: ${message}`,
        `Time: ${new Date().toLocaleString()}`
      ].join('\n');
      try {
        await fetch('/api/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: '918107115116', text: waText })
        });
      } catch {}
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch (e) {
      setSendError('Failed to send message. Please verify EmailJS configuration.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[80vh] overflow-hidden">
        <div 
          className="fixed-bg absolute inset-0"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-3 md:mb-4">
                Get In Touch.<br />
                <span className="font-bold">Contact Us.</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                Connect with our natural stone experts
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Minimalist Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
                Get In Touch
              </h2>
              <div className="w-24 h-px bg-gray-900 mx-auto"></div>
            </motion.div>

            {/* Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-20">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-light text-gray-900 mb-10">Send Message</h3>

                <form className="space-y-8" onSubmit={onSubmit} noValidate>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:ring-0 placeholder-gray-400 transition-all duration-300 text-gray-900 focus:outline-none ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-300'}`}
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 focus-within:w-full"></div>
                      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:ring-0 placeholder-gray-400 transition-all duration-300 text-gray-900 focus:outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-300'}`}
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 focus-within:w-full"></div>
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:ring-0 placeholder-gray-400 transition-all duration-300 text-gray-900 focus:outline-none ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-300'}`}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 focus-within:w-full"></div>
                    {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                  </div>
                  
                  <div className="relative">
                    <textarea
                      rows={5}
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:ring-0 placeholder-gray-400 resize-none transition-all duration-300 text-gray-900 focus:outline-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-300'}`}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 focus-within:w-full"></div>
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  {!!sendError && (
                    <div className="rounded-lg border border-red-300 bg-red-50 text-red-800 p-3 text-sm">{sendError}</div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    className={`group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gray-900 hover:text-gray-900 hover:bg-white border-2 border-gray-900 transition-all duration-300 overflow-hidden ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      {isSending && <span className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />}
                      <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-2xl font-light text-gray-900 mb-10">Information</h3>
                
                <div className="space-y-12">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Email</h4>
                      <p className="text-gray-600">hsglobalexport@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Phone</h4>
                      <p className="text-gray-600">+91 8107115116</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Location</h4>
                      <div className="space-y-3 text-gray-600">
                        <p>
                          <span className="font-medium">Corporate Office:</span><br />
                          C-108, Titanium Business Park,<br />
                          Makarba, Ahmedabad - 380051
                        </p>
                        <p>
                          <span className="font-medium">Factory:</span><br />
                          Indra Puri Colony,<br />
                          Behind Tanu Hotel,<br />
                          Jalor, Rajasthan - 343001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div 
              className="text-center mt-24 py-16 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-xl text-gray-600 mb-6">
                Ready to start your project?
              </p>
              <p className="text-4xl font-light text-gray-900">
                Let's create something beautiful together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Success Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank you!</h3>
            <p className="text-gray-600 mb-6">Your message has been sent. We will get back to you soon.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center justify-center px-6 py-3 text-white bg-gray-900 hover:text-gray-900 hover:bg-white border-2 border-gray-900 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
