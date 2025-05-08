
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? 'bg-background/90 backdrop-blur-lg shadow-md py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
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
            className="btn-primary"
          >
            JOIN NOW
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

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-background shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
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
            className="btn-secondary w-full text-center"
            onClick={toggleMenu}
          >
            JOIN NOW
          </Link>
        </div>
      </div>
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
