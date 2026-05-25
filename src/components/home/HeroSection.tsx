import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const scrollBtn = (
  <button
    onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
    className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300 z-10"
    aria-label="Scroll to next section"
  >
    <div className="animate-bounce-chevron">
      <HugeiconsIcon icon={ArrowDown01Icon} size={32} />
    </div>
  </button>
);

const HeroSection = () => {
  const { reduceMotion } = useAnimation();
  const heroImages = useQuery(api.siteImages.listBySection, { section: "hero" }) || [];
  const heroImage = heroImages[0]?.url || "/images/hero-image.jpg";
  const duration = reduceMotion ? 0 : 0.3;

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-brand-dark text-white">
      {/* Ambient grid dots */}
      <div
        className="absolute inset-0 z-0 opacity-[0.09]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: `32px 32px`,
        }}
      />

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/15 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-brand-blue/15 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/15 blur-[120px]" />
      </div>

      <div className="sm:container mx-auto px-8 flex flex-col md:flex-row items-center justify-center gap-10 md:justify-between py-16 md:py-0 relative z-10">
        <motion.div
          className="md:w-1/2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading max-md:pt-10"
            variants={itemVariants}
          >
            Get <span className="text-brand-gold">In Shape</span>
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl font-medium mb-6 opacity-90 font-heading"
            variants={itemVariants}
          >
            Transform your body, transform your life
          </motion.h2>
          <motion.p
            className="text-base mb-8 max-w-lg opacity-80"
            variants={itemVariants}
          >
            Join Shape Up Fitness and experience top notch training with the
            full support system of expert coaches dedicated to helping you
            achieve your fitness goals.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Link to="/contact?source=hero">
              <InteractiveHoverButton 
                text="Join Now" 
                className="w-auto px-6 bg-brand-blue border-brand-blue text-white font-heading"
                aria-label="Join Shape Up Fitness now"
              />
            </Link>
            <Link to="/services">
              <InteractiveHoverButton 
                text="Explore Sessions" 
                className="w-auto px-6 bg-brand-gold border-brand-gold text-brand-dark font-heading"
                aria-label="Explore our fitness sessions"
              />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, delay: 0.4, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 bg-brand-blue rounded-full blur-3xl opacity-30" />
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-brand-gold rounded-full blur-3xl opacity-30" />
            <div className="bg-gray-800 rounded-full overflow-hidden relative z-10 w-full h-full border-4 border-brand-blue shadow-xl shadow-brand-blue/20">
              <img
                src={heroImage}
                alt="Shape Up Fitness hero"
                className="w-full h-full object-cover object-center"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {scrollBtn}
    </div>
  );
};

export default HeroSection;
