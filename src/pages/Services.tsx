import { useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Clock, Calendar, Trophy, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import AnimatedSection from "../components/ui/animated-section";

const services = [
  {
    id: 1,
    title: "Body Toning",
    description:
      "Our body toning program focuses on sculpting and defining your muscles through targeted exercises that improve muscle tone without adding bulk. Perfect for those looking to achieve a lean, defined physique.",
    icon: "💪",
    image: "/images/body-toning.jpg",
  },
  {
    id: 2,
    title: "Weight Loss",
    description:
      "Our comprehensive weight loss program combines effective cardio workouts, strength training, and nutritional guidance to help you shed unwanted pounds and create lasting lifestyle changes.",
    icon: "⚖️",
    image: "/images/weight-loss.jpg",
  },
  {
    id: 3,
    title: "Body Building",
    description:
      "Take your physique to the next level with our bodybuilding program designed to maximize muscle growth, improve symmetry, and enhance overall strength through progressive resistance training.",
    icon: "🏋️",
    image: "/images/body-building.jpg",
  },
  {
    id: 4,
    title: "Cardio Training",
    description:
      "Boost your cardiovascular health, increase stamina, and burn calories with our diverse cardio training options including HIIT, steady-state cardio, and circuit training.",
    icon: "🏃",
    image: "/images/cardio-training.jpg",
  },
  {
    id: 5,
    title: "Yoga Training",
    description:
      "Find balance, improve flexibility, and reduce stress with our yoga classes that cater to all levels, from beginners to advanced practitioners. Experience the holistic benefits of mind-body connection.",
    icon: "🧘‍♀️",
    image: "/images/yoga-training.jpg",
  },
  {
    id: 6,
    title: "Boxing Training",
    description:
      "Learn proper boxing techniques while getting an intense full-body workout that improves coordination, speed, power, and cardiovascular fitness under the guidance of experienced boxing coaches.",
    icon: "🥊",
    image: "/images/boxing-training.jpg",
  },
  {
    id: 7,
    title: "Dance Aerobics",
    description:
      "Enjoy fun, energetic dance routines that boost your mood and fitness simultaneously. Our dance aerobics classes combine choreographed movements with cardio benefits for an enjoyable workout experience.",
    icon: "💃",
    image: "/images/dance-aerobics.jpg",
  },
  {
    id: 8,
    title: "Diet Training",
    description:
      "Receive expert nutritional guidance tailored to your fitness goals, dietary preferences, and lifestyle. Learn how to make sustainable food choices that complement your workout routine.",
    icon: "🥗",
    image:
      "https://img.freepik.com/premium-photo/bowl-buddha-chicken-broccoli-chickpeas-pumpkin-avocado-carrot-tomato-lettuce-plate-with-knife-fork_156140-4658.jpg?semt=ais_hybrid&w=740",
  },
];

const sessions = [
  { name: "Morning", time: "7:00am - 10:00am" },
  { name: "Afternoon", time: "2:00pm - 4:00pm" },
  { name: "Evening", time: "6:00pm - 9:00pm" },
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
      <motion.section
        className="pt-32 pb-16 bg-brand-dark text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
        </div>
        <div className="sm:container mx-auto px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-crimson">
              Our Services
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Discover our comprehensive range of fitness services designed to
              help you achieve your goals
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
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
            {services.map((service, index) => (
              <motion.div key={service.id} variants={itemVariants}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                  <div className="relative h-60">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-4 left-4 bg-brand-dark text-white text-3xl p-2 rounded-lg">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm">
                      {service.description}
                    </p>
                    {/* <Link
                      to={`#${service.id}`}
                      className="inline-flex items-center text-brand-blue font-semibold hover:text-brand-gold transition-colors"
                    >
                      Learn more <ArrowRight size={16} className="ml-1" />
                    </Link> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sessions Times */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">
              Session <span className="text-brand-gold">Times</span>
            </h2>
            <p className="section-subtitle">
              Flexible training hours to fit your busy schedule
            </p>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sessions.map((session, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800 rounded-xl p-8 text-center hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/20 hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4 text-brand-gold">
                  <Clock size={48} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{session.name}</h3>
                <p className="text-xl">{session.time}</p>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-12" delay={0.6}>
            <p className="mb-6 max-w-2xl mx-auto">
              We offer flexible session times to accommodate your schedule.
              Whether you prefer morning workouts to energize your day,
              afternoon sessions for a midday boost, or evening training to
              release the day's stress, we've got you covered.
            </p>
            <Link to="/contact?source=services" className="btn-secondary">
              BOOK A SESSION
            </Link>
          </AnimatedSection>
        </div>
      </section>

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
              Our comprehensive approach combines expert guidance,
              state-of-the-art equipment, and a supportive community to help you
              achieve sustainable results.
            </p>
            <Link to="/contact" className="btn-primary">
              START YOUR JOURNEY
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
              <h3 className="text-2xl font-bold mb-6">
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

      {/* CTA Section */}
      <section className="bg-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <AnimatedSection className="max-w-4xl mx-auto bg-brand-blue rounded-2xl overflow-hidden shadow-xl">
            <div className="p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Fitness Journey?
              </h2>
              <p className="text-lg mb-8">
                Join Shape Up Fitness today and experience our comprehensive
                range of services designed to help you achieve your health and
                fitness goals.
              </p>
              <Link
                to="/contact?source=services_cta"
                className="btn-secondary inline-block"
              >
                GET STARTED TODAY
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
