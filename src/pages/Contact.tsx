
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-crimson">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Get in touch with us for any inquiries or to start your fitness journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              className="glass-card p-8 rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 font-crimson">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition"
                    placeholder="Message subject"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition min-h-[150px]"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="glass-card p-8 rounded-xl space-y-6">
                <h2 className="text-3xl font-bold mb-4 font-crimson">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-brand-blue mr-4 flex-shrink-0 mt-1" size={24} />
                    <p>Embassy Lodge, FUTA South Gate, Akure, Ondo State, Nigeria</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-brand-blue mr-4" size={24} />
                    <a href="tel:08134460609" className="hover:text-brand-blue transition-colors">08134460609</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-brand-blue mr-4" size={24} />
                    <a href="mailto:info@shapeupfitness.com" className="hover:text-brand-blue transition-colors">info@shapeupfitness.com</a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">Operating Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>7:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>8:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Google Maps */}
              <div className="overflow-hidden rounded-xl shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.534866495809!2d5.151262976181846!3d7.293640292713871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478ec5897919af%3A0xac22bf85d219fa3a!2sEmbassy%20Lodge!5e0!3m2!1sen!2snl!4v1746723293150!5m2!1sen!2snl" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shape Up Fitness Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
