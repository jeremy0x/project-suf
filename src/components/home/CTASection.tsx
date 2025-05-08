
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

const CTASection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;
  
  return (
    <section className="bg-white text-brand-dark py-24 relative overflow-hidden px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-gold opacity-10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-crimson">
            Ready to <span className="text-brand-blue">Shape Up</span>?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-700 font-crimson">
            Join our community today and start your journey to a healthier, stronger you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary font-crimson">
              JOIN NOW
            </Link>
            <Link to="/services" className="btn-secondary font-crimson">
              EXPLORE SERVICES
            </Link>
          </div>
          <div className="mt-12 text-gray-600">
            <p className="text-sm">Embassy Lodge, FUTA South Gate, Akure, Ondo State, Nigeria</p>
            <p className="mt-2 text-sm"><a href="tel:08134460609" className="hover:text-brand-blue transition-colors">08134460609</a></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
