import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

const stats = [
  { value: "100+", label: "Active Members" },
  { value: "5+", label: "Expert Trainers" },
  { value: "10+", label: "Fitness Programs" },
  { value: "5+", label: "Years Experience" },
];

const benefits = [
  "Personalized training programs",
  "Nutritional guidance",
  "Supportive community",
  "Expert coaching",
  "Regular fitness assessments",
  "Welcoming and workout friendly space",
];

const AboutSection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  return (
    <section
      id="about"
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-gold/10 rounded-full filter blur-3xl"></div>

      <div className="sm:container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glow">
                <img
                  src="/images/landing-page-about.jpg"
                  alt="Gym members performing barbell and goblet squats on green turf flooring"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-8 -right-8 bg-brand-dark text-white p-6 rounded-xl shadow-xl glass-dark"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration }}
              >
                <h3 className="text-xl font-bold mb-2 font-heading">
                  Get Started Today
                </h3>
                <p className="text-sm mb-3">
                  Take the first step towards a healthier you
                </p>
                <Link
                  to="/contact?source=about_cta"
                  className="text-brand-gold font-semibold font-heading"
                  aria-label="Join Shape Up Fitness now"
                >
                  Join Now →
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:w-1/2">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              About <span className="text-brand-blue">Shape Up</span>
            </motion.h2>
            <motion.p
              className="text-sm mb-6 text-gray-700 dark:text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.1 }}
            >
              Shape Up Fitness is more than just a gym — it's a community
              dedicated to helping you achieve your fitness goals. With our
              expert trainers, structured training programs designed for
              results, and supportive environment, we provide everything you
              need to transform your body and mind.
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 glass-card rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration, delay: 0.1 + index * 0.05 }}
                >
                  <div className="text-3xl font-bold text-brand-blue font-heading">
                    {stat.value}
                  </div>
                  <div className="text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 font-heading">
                Why Choose Us
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration, delay: 0.3 + index * 0.05 }}
                  >
                    <CheckCircle
                      className="text-brand-gold mr-2 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.4 }}
            >
              <Link to="/about">
                <InteractiveHoverButton 
                  text="Learn More About Us" 
                  className="w-auto px-6 bg-brand-blue border-brand-blue text-white font-heading"
                  aria-label="Learn more about Shape Up Fitness"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
