
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-brand-dark text-white diagonal-box overflow-hidden">
      <div className="container mx-auto px-4 min-h-[90vh] flex flex-col md:flex-row items-center justify-between py-16 md:py-0 relative">
        {/* Content */}
        <motion.div 
          className="md:w-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-crimson"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            GET <span className="text-brand-gold">IN SHAPE</span>
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl font-medium mb-6 opacity-90 font-crimson"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Transform your body, transform your life
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 max-w-lg opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Join Shape Up Fitness and experience world-class training with state-of-the-art equipment and expert coaches dedicated to helping you achieve your fitness goals.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <Link to="/contact" className="glow-blue">
              <div className="bg-brand-blue text-white font-bold py-3 px-8 rounded-full transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_15px_rgba(14,178,241,0.6)] flex items-center justify-center space-x-2">
                <span>JOIN NOW</span>
                <span className="bg-white text-brand-blue rounded-full w-6 h-6 flex items-center justify-center text-xs ml-2">→</span>
              </div>
            </Link>
            <Link to="/services" className="glow-gold">
              <div className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-full transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_15px_rgba(254,191,0,0.6)] flex items-center justify-center">
                <span>EXPLORE SESSIONS</span>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 bg-brand-blue rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-brand-gold rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Image with circular clip */}
            <div className="bg-gray-800 rounded-full overflow-hidden relative z-10 w-full h-full border-4 border-brand-blue shadow-xl shadow-brand-blue/20">
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Fitness trainer with kettlebell" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
