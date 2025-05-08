
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

const stats = [
  { value: "500+", label: "Active Members" },
  { value: "15+", label: "Expert Trainers" },
  { value: "20+", label: "Fitness Programs" },
  { value: "8+", label: "Years Experience" }
];

const benefits = [
  "State-of-the-art equipment",
  "Personalized training programs",
  "Nutritional guidance",
  "Supportive community",
  "Expert coaching",
  "Regular fitness assessments"
];

const AboutSection = () => {
  const { reduceMotion } = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: reduceMotion ? 0 : 0.6 
      }
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-gold/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glow">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Gym interior with modern equipment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-brand-dark text-white p-6 rounded-xl shadow-xl glass-dark"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-2 font-crimson">Get Started Today</h3>
                <p className="text-sm mb-3">Take the first step towards a healthier you</p>
                <Link to="/contact" className="text-brand-gold font-semibold">Join Now →</Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              About <span className="text-brand-blue">Shape Up</span>
            </motion.h2>
            <motion.p 
              className="text-lg mb-6 text-gray-700 dark:text-gray-200"
              variants={itemVariants}
            >
              Shape Up Fitness is more than just a gym — it's a community dedicated to helping you achieve your fitness goals. With our expert trainers, state-of-the-art equipment, and supportive environment, we provide everything you need to transform your body and mind.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-4 glass-card rounded-xl"
                  variants={itemVariants}
                >
                  <div className="text-3xl font-bold text-brand-blue font-crimson">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mb-8"
              variants={containerVariants}
            >
              <motion.h3 
                className="text-xl font-bold mb-4 font-crimson"
                variants={itemVariants}
              >
                Why Choose Us
              </motion.h3>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                variants={containerVariants}
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center"
                    variants={itemVariants}
                  >
                    <CheckCircle className="text-brand-gold mr-2 flex-shrink-0" size={20} />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
