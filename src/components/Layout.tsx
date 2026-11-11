import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { useAnimation } from "../context/AnimationContext";
import { EASE_CLIP } from "./motion/ease";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { reduceMotion } = useAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Page curtain: an ink panel that clips away upward on every page load. */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: EASE_CLIP, delay: 0.05 }}
        />
      )}
      <Header />
      <main className="flex-grow">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Layout;
