import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";

const services = [
  {
    title: "Body Toning",
    description:
      "Sculpt and define your muscles with our specialized toning programs",
    icon: "💪",
  },
  {
    title: "Weight Loss",
    description: "Sustainable weight loss programs tailored to your goals",
    icon: "⚖️",
  },
  {
    title: "Body Building",
    description: "Build muscle mass and strength with expert guidance",
    icon: "🏋️",
  },
  {
    title: "Cardio Training",
    description: "Improve your cardiovascular health and endurance",
    icon: "🏃",
  },
  {
    title: "Yoga Training",
    description: "Enhance flexibility, balance, and mental wellness",
    icon: "🧘‍♀️",
  },
  {
    title: "Boxing Training",
    description: "Learn boxing techniques while getting an intense workout",
    icon: "🥊",
  },
  {
    title: "Dance Aerobics",
    description:
      "Fun, energetic workouts that improve coordination and fitness",
    icon: "💃",
  },
  {
    title: "Diet Training",
    description: "Nutritional guidance to complement your fitness routine",
    icon: "🥗",
  },
];

const ServicesSection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  };

  return (
    <section
      id="services"
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
      </div>
      <div className="sm:container mx-auto relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration }}
        >
          <h2 className="section-title">
            Our <span className="text-brand-blue">Services</span>
          </h2>
          <p className="section-subtitle text-sm">
            Comprehensive fitness solutions designed to help you achieve your
            goals
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card bg-white/50 dark:bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-crimson">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {service.description}
                </p>
                <Link to="/services" className="arrow-link group font-crimson">
                  Learn more
                  <ArrowRight
                    size={16}
                    className="ml-2 inline transform transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration, delay: 0.2 }}
        >
          <Link to="/services" className="btn-primary font-crimson">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
