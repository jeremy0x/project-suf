import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import { RainbowButton } from "./ui/rainbow-button";

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/pricing", label: "Pricing" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="sm:container mx-auto px-4 md:px-8">
        <nav
          className={`flex items-center justify-between h-16 rounded-full px-4 transition-all duration-300 ${
            scrolled
              ? "bg-white/75 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }`}
        >
          {/* Logo - Left */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo variant={scrolled ? "header" : "white"} />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  scrolled={scrolled}
                />
              ))}
            </div>
          </div>

          {/* Join Now Button - Right */}
          <div className="hidden md:block flex-shrink-0">
            <Link to="/contact?source=navbar">
              <RainbowButton className="font-heading text-sm">
                Join Now
              </RainbowButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-full transition-colors ${
              scrolled
                ? "text-brand-dark hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full bg-white text-brand-dark md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b">
                  <Link to="/" onClick={toggleMenu}>
                    <Logo variant="header" />
                  </Link>
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                  <div className="flex flex-col space-y-1 px-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <MobileNavItem
                          to={item.to}
                          label={item.label}
                          onClick={toggleMenu}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="p-6 border-t"
                >
                  <Link to="/contact?source=navbar" onClick={toggleMenu}>
                    <RainbowButton className="w-full font-heading">
                      Join Now
                    </RainbowButton>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavItem = ({
  to,
  label,
  scrolled,
}: {
  to: string;
  label: string;
  scrolled: boolean;
}) => (
  <Link
    to={to}
    className={`font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-blue after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
      scrolled
        ? "text-brand-dark hover:text-brand-blue"
        : "text-white hover:text-brand-blue"
    }`}
  >
    {label}
  </Link>
);

const MobileNavItem = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-6 py-4 text-lg font-medium text-brand-dark hover:bg-gray-50 transition-colors rounded-lg"
  >
    {label}
  </Link>
);

export default Header;
