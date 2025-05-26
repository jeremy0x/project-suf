import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import { ArrowRight, ChevronDown } from "lucide-react";
import { JoinNowButton } from "../ui/join-now-button";

const HeroSection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("services");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-brand-dark text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
      </div>
      <div className="sm:container mx-auto px-8 min-h-[100dvh] flex flex-col md:flex-row items-center justify-center  gap-10 md:justify-between py-16 md:py-0 relative">
        {/* Content */}
        <motion.div
          className="md:w-1/2 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-crimson max-md:pt-10"
            variants={itemVariants}
          >
            GET <span className="text-brand-gold">IN SHAPE</span>
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl font-medium mb-6 opacity-90 font-crimson"
            variants={itemVariants}
          >
            Transform your body, transform your life
          </motion.h2>
          <motion.p
            className="text-sm mb-8 max-w-lg opacity-80"
            variants={itemVariants}
          >
            Join Shape Up Fitness and experience top notch training with the
            full support system of expert coaches dedicated to helping you
            achieve your fitness goals.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <JoinNowButton />
            <Link to="/services" className="glow-gold">
              <div className="bg-brand-gold text-brand-dark font-crimson font-bold py-3 px-8 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(254,191,0,0.6)] flex items-center justify-center">
                <span>EXPLORE SESSIONS</span>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 bg-brand-blue rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-brand-gold rounded-full filter blur-3xl opacity-30"></div>

            {/* Image with circular clip */}
            <div className="bg-gray-800 rounded-full overflow-hidden relative z-10 w-full h-full border-4 border-brand-blue shadow-xl shadow-brand-blue/20">
              <img
                src="/images/hero-image.jpg"
                alt="Fitness trainer with kettlebell"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll Down Button */}
        <motion.button
          onClick={scrollToNextSection}
          className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
