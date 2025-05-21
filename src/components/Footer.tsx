import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { MapPinIcon, PhoneIcon, MailIcon, ArrowUpIcon } from "lucide-react";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark text-white border-t border-white/10">
      <div className="container mx-auto px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Logo and About */}
          <div>
            <Logo variant="footer" />
            <p className="mt-4 text-gray-300 text-sm">
              Discover your fitness potential at Akure's premier destination. We
              help you achieve your goals through a blend of expert coaching and
              transformative training programs tailored just for you.
            </p>
            <div className="flex mt-4 space-x-4">
              <SocialIcon
                icon={<BsInstagram size={20} />}
                href="https://www.instagram.com/shapeupfitnessonline"
                label="Instagram"
              />
              <SocialIcon
                icon={<BsFacebook size={20} />}
                href="https://facebook.com"
                label="Facebook"
              />
              <SocialIcon
                icon={<BsTwitterX size={20} />}
                href="https://x.com/shapeupfitness6"
                label="X (Twitter)"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/services" label="Services" />
              <FooterLink to="/pricing" label="Membership" />
              <FooterLink to="/gallery" label="Gallery" />
              <FooterLink to="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-gold">Services</h3>
            <ul className="space-y-2">
              <FooterLink to="/services" label="Body Toning" />
              <FooterLink to="/services" label="Weight Loss" />
              <FooterLink to="/services" label="Body Building" />
              <FooterLink to="/services" label="Cardio Training" />
              <FooterLink to="/services" label="Yoga Training" />
              <FooterLink to="/services" label="Boxing Training" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-gold">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPinIcon className="mr-2 flex-shrink-0 text-brand-blue mt-1 size-4" />
                <p>
                  Embassy Lodge, FUTA South Gate, Akure, Ondo State, Nigeria
                </p>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="mr-2 flex-shrink-0 text-brand-blue size-4" />
                <a
                  href="tel:08134460609"
                  className="hover:text-brand-blue transition-colors"
                >
                  08134460609
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon className="mr-2 flex-shrink-0 text-brand-blue size-4" />
                <a
                  href="mailto:shapeupfitnessclub326@gmail.com"
                  className="hover:text-brand-blue transition-colors"
                >
                  shapeupfitnessclub326@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        {/* <div className="py-8 border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 text-gray-300">
              Stay updated with our latest offers, tips and events
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue bg-gray-900 text-white flex-grow"
              />
              <button type="submit" className="btn-primary sm:flex-shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="py-6 text-center text-sm text-gray-400 border-t border-gray-800 relative">
          <motion.button
            onClick={scrollToTop}
            className="absolute right-0 top-0 transform -translate-y-1/2 bg-brand-blue text-white p-3 rounded-full hover:bg-brand-gold transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUpIcon size={24} />
          </motion.button>
          <p>
            © {new Date().getFullYear()} Shape Up Fitness. All rights reserved.
          </p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/terms" className="hover:text-white ml-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 p-2 rounded-full hover:bg-brand-blue transition-colors duration-300"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    aria-label={label}
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClick = (e: React.MouseEvent) => {
    if (location.pathname === to) {
      e.preventDefault();
      scrollToTop();
    }
  };
  return (
    <li>
      <Link
        to={to}
        onClick={handleClick}
        className="text-gray-300 hover:text-brand-blue transition-colors duration-300 text-sm"
      >
        {label}
      </Link>
    </li>
  );
};

export default Footer;
