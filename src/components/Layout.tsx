
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Layout;
