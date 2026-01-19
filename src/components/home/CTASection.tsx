import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

const CTASection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  return (
    <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
      </div>
      <div className="sm:container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join Shape Up Fitness today and take the first step towards a
            healthier, stronger you.
          </p>
          <Link to="/contact?source=home">
            <InteractiveHoverButton 
              text="Get Started Today" 
              className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
              aria-label="Get started with Shape Up Fitness today"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
