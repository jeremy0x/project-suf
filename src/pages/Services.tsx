import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Calendar, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import AnimatedSection from "../components/ui/animated-section";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BeamsBackground } from "@/components/ui/beams-background";
import SessionsSection from "@/components/home/SessionsSection";

const services = [
  {
    id: 1,
    title: "Body Toning",
    description: "Sculpt and define your muscles for a lean, toned physique.",
    icon: "💪",
    image: "/images/body-toning.jpg",
  },
  {
    id: 2,
    title: "Weight Loss",
    description: "Effective cardio and strength programs to shed unwanted pounds.",
    icon: "⚖️",
    image: "/images/016.jpg",
  },
  {
    id: 3,
    title: "Body Building",
    description: "Maximize muscle growth and strength with progressive training.",
    icon: "🏋️",
    image: "/images/004.jpg",
  },
  {
    id: 4,
    title: "Cardio Training",
    description: "Boost stamina and burn calories with HIIT and circuit training.",
    icon: "🏃",
    image: "/images/cardio-training.jpg",
  },
  {
    id: 5,
    title: "Yoga Training",
    description: "Improve flexibility, balance, and reduce stress for all levels.",
    icon: "🧘‍♀️",
    image: "/images/yoga-training.jpg",
  },
  {
    id: 6,
    title: "Boxing Training",
    description: "Learn boxing techniques with an intense full-body workout.",
    icon: "🥊",
    image: "/images/boxing-training.jpg",
  },
  {
    id: 7,
    title: "Dance Aerobics",
    description: "Fun, energetic dance routines that boost mood and fitness.",
    icon: "💃",
    image: "/images/dance-aerobics.jpg",
  },
  {
    id: 8,
    title: "Diet Training",
    description: "Expert nutritional guidance tailored to your fitness goals.",
    icon: "🥗",
    image:
      "https://img.freepik.com/premium-photo/bowl-buddha-chicken-broccoli-chickpeas-pumpkin-avocado-carrot-tomato-lettuce-plate-with-knife-fork_156140-4658.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 9,
    title: "Gym Accessories",
    description: "Quality workout gear including clothes, bags, and gloves.",
    icon: "🛒",
    image: "/images/008.jpg",
  },
];

const Services = () => {
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
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <BeamsBackground className="pt-32 pb-16 text-white" intensity="medium">
        <div className="sm:container mx-auto px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Our Services
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Discover our comprehensive range of fitness services designed to
              help you achieve your goals
            </p>
          </motion.div>
        </div>
      </BeamsBackground>

      {/* Services Grid - Full-height images with glass overlay */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <div className="relative h-[400px] rounded-xl overflow-hidden group">
                  {/* Full-height background image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  
                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-sm text-3xl p-3 rounded-lg border border-white/10">
                    {service.icon}
                  </div>
                  
                  {/* Content with glass effect */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20">
                      <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                      <p className="text-gray-200 text-sm line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sessions Times */}
      <SessionsSection />

      {/* Training Approach */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">
              Our Training <span className="text-brand-blue">Approach</span>
            </h2>
            <p className="section-subtitle">
              A comprehensive approach to help you achieve your fitness goals
            </p>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-brand-blue mb-4">
                <Users size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Personalized Programs
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Custom training programs tailored to your fitness level and
                goals, with expert guidance every step of the way.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-brand-blue mb-4">
                <Trophy size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Progress Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Advanced tracking of your body composition, strength, and
                performance metrics to keep you on target.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-brand-blue mb-4">
                <Calendar size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Multiple daily sessions and class options to fit seamlessly into
                your schedule.
              </p>
            </motion.div>
          </motion.div>

          <AnimatedSection className="mt-12 text-center">
            <p className="max-w-2xl mx-auto mb-6">
              Our comprehensive approach combines expert guidance, personalized
              training programs, and a supportive community to help you achieve
              sustainable results.
            </p>
            <Link to="/contact">
              <InteractiveHoverButton 
                text="Start Your Journey" 
                className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
                aria-label="Start your fitness journey"
              />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">
              Our Training <span className="text-brand-gold">Philosophy</span>
            </h2>
            <p className="section-subtitle">
              The principles that guide our approach to fitness and wellness
            </p>
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <AnimatedSection className="lg:w-1/2">
              <img
                src="/images/trainer.jpg"
                alt="Trainer"
                className="rounded-2xl shadow-xl"
              />
            </AnimatedSection>

            <AnimatedSection className="lg:w-1/2" delay={0.3}>
              <h3 className="text-xl font-bold mb-6">
                Holistic Approach to Fitness
              </h3>
              <p className="mb-6">
                At Shape Up Fitness, we believe in taking a holistic approach to
                health and wellness. We understand that true fitness encompasses
                not just physical strength, but also mental wellbeing, proper
                nutrition, adequate recovery, and sustainable lifestyle habits.
              </p>
              <p className="mb-8">
                Our training methodology focuses on creating balanced programs
                that address all aspects of fitness, tailored to your unique
                body type, goals, and preferences. We emphasize proper form,
                progressive overload, and varied stimuli to ensure continuous
                improvement without plateaus or injuries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <div className="text-brand-gold mb-4">
                    <Trophy size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Result-Oriented</h4>
                  <p className="text-gray-300">
                    We focus on measurable results through consistent tracking
                    and program adjustments.
                  </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl">
                  <div className="text-brand-gold mb-4">
                    <Users size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">
                    Personalized Approach
                  </h4>
                  <p className="text-gray-300">
                    We tailor our programs to your unique body, goals, and
                    fitness level.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section - Styled like Pricing page */}
      <section className="py-20 bg-background px-8">
        <div className="sm:container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-lg mb-8">
              Join Shape Up Fitness today and experience our comprehensive
              range of services designed to help you achieve your health and
              fitness goals.
            </p>
            <Link to="/contact?source=services_cta">
              <InteractiveHoverButton 
                text="Get Started Today" 
                className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
                aria-label="Get started with Shape Up Fitness today"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
