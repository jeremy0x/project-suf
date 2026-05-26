import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { responsiveUrl } from "@/lib/images";

const services = [
  { title: "Body Toning", category: "body-toning", description: "Sculpt and define your muscles with our specialized toning programs" },
  { title: "Weight Loss", category: "weight-loss", description: "Sustainable weight loss programs tailored to your goals" },
  { title: "Body Building", category: "body-building", description: "Build muscle mass and strength with expert guidance" },
  { title: "Cardio Training", category: "cardio", description: "Improve your cardiovascular health and endurance" },
  { title: "Yoga Training", category: "yoga", description: "Enhance flexibility, balance, and mental wellness" },
  { title: "Boxing Training", category: "boxing", description: "Learn boxing techniques while getting an intense workout" },
  { title: "Dance Aerobics", category: "dance", description: "Fun, energetic workouts that improve coordination and fitness" },
  { title: "Diet Training", category: "diet", description: "Nutritional guidance to complement your fitness routine" },
  { title: "Gym Accessories", category: "gym-accessories", description: "Quality gym wear, bags, and gloves" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ServicesSection = () => {
  const { reduceMotion } = useAnimation();
  const rawIcons = useQuery(api.siteImages.listBySection, { section: "service-icons" }) || [];
  const iconsByCategory = Object.fromEntries(
    (rawIcons as { category?: string; url: string }[]).map((i) => [i.category, i.url])
  );

  const servicesWithIcons = useMemo(() =>
    services.map((s) => ({
      ...s,
      icon: iconsByCategory[`${s.category}-icon`],
    })),
  [iconsByCategory]);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-brand-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-brand-gold/10 rounded-full filter blur-3xl"></div>

      <div className="sm:container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <h2 className="section-title">
            What We <span className="text-brand-blue">Offer</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive fitness services tailored to your needs
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesWithIcons.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card bg-white/50 dark:bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:translate-y-[-5px]"
            >
              <div className="p-6">
                {service.icon && (
                  <img src={responsiveUrl(service.icon, "thumb")} alt={service.title} className="w-12 h-12 mb-4 object-contain" />
                )}
                <h3 className="text-md font-bold mb-2 font-heading">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {service.description}
                </p>
                <Link 
                  to="/services" 
                  className="arrow-link group font-heading"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn more
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.3, delay: 0.2 }}
        >
          <Link to="/services">
            <InteractiveHoverButton 
              text="View All Services" 
              className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
              aria-label="View all services offered at Shape Up Fitness"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
