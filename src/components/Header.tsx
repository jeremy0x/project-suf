
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { reduceMotion } = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className={`container mx-auto px-12 backdrop-blur-lg ${scrolled ? 'bg-background/70 shadow-lg' : 'bg-transparent'} rounded-full transition-all duration-300`}>
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavItem to="/" label="Home" />
            <NavItem to="/about" label="About" />
            <NavItem to="/services" label="Services" />
            <NavItem to="/pricing" label="Pricing" />
            <NavItem to="/gallery" label="Gallery" />
            <NavItem to="/contact" label="Contact" />
            <Link 
              to="/contact" 
              className="bg-brand-blue hover:bg-brand-gold text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] flex items-center font-crimson"
            >
              <span>JOIN NOW</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg shadow-lg"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <MobileNavItem to="/" label="Home" onClick={toggleMenu} />
          <MobileNavItem to="/about" label="About" onClick={toggleMenu} />
          <MobileNavItem to="/services" label="Services" onClick={toggleMenu} />
          <MobileNavItem to="/pricing" label="Pricing" onClick={toggleMenu} />
          <MobileNavItem to="/gallery" label="Gallery" onClick={toggleMenu} />
          <MobileNavItem to="/contact" label="Contact" onClick={toggleMenu} />
          <Link 
            to="/contact" 
            className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-full text-center shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] transition-all duration-300 font-crimson flex items-center justify-center"
            onClick={toggleMenu}
          >
            <span>JOIN NOW</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <Link 
    to={to} 
    className="font-medium hover:text-brand-blue transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-blue after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
  >
    {label}
  </Link>
);

const MobileNavItem = ({ 
  to, 
  label, 
  onClick 
}: { 
  to: string; 
  label: string;
  onClick: () => void;
}) => (
  <Link 
    to={to} 
    className="font-medium hover:text-brand-blue py-2 transition-colors duration-300 border-b border-border"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;
