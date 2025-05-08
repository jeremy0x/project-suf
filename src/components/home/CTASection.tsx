
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-gold opacity-20 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Arrow Decoration */}
      <div className="absolute top-12 left-12 opacity-10">
        <ArrowUpRight size={120} className="text-white" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to <span className="text-brand-gold">Shape Up</span>?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Join our community today and start your journey to a healthier, stronger you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              JOIN NOW
            </Link>
            <Link to="/services" className="btn-secondary">
              EXPLORE SERVICES
            </Link>
          </div>
          <div className="mt-12 text-gray-400">
            <p>Embassy Lodge, FUTA South Gate, Akure, Ondo State, Nigeria</p>
            <p className="mt-2"><a href="tel:08134460609" className="hover:text-brand-blue transition-colors">08134460609</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
