
import { ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-brand-dark text-white diagonal-box overflow-hidden">
      <div className="container mx-auto px-4 min-h-[90vh] flex flex-col md:flex-row items-center justify-between py-16 md:py-0 relative">
        {/* Content */}
        <div className="md:w-1/2 z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
            GET <span className="text-brand-gold">IN SHAPE</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transform your body, transform your life
          </h2>
          <p className="text-lg mb-8 max-w-lg opacity-80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Join Shape Up Fitness and experience world-class training with state-of-the-art equipment and expert coaches dedicated to helping you achieve your fitness goals.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/contact" className="btn-primary">
              JOIN NOW
            </Link>
            <Link to="/services" className="btn-secondary">
              EXPLORE SESSIONS
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 bg-brand-blue rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-brand-gold rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Image with circular clip */}
            <div className="bg-gray-800 rounded-full overflow-hidden relative z-10 w-full h-full border-4 border-brand-blue shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Fitness trainer with kettlebell" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Arrow graphic */}
            <div className="absolute -bottom-12 -left-12 transform rotate-45">
              <ArrowDownRight size={120} className="text-brand-gold opacity-70" />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
