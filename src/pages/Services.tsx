import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon, ChampionIcon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import AnimatedSection from "../components/ui/animated-section";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { GridBackground } from "@/components/ui/grid-background";
import SessionsSection from "@/components/home/SessionsSection";
import { responsiveUrl } from "@/lib/images";

const services = [
  { id: 1, category: "body-toning", title: "Body Toning", description: "Get that firm, fit look you've always wanted." },
  { id: 2, category: "weight-loss", title: "Weight Loss", description: "Burn fat and feel lighter with workouts that actually work." },
  { id: 3, category: "body-building", title: "Body Building", description: "Build serious muscle and get stronger every week." },
  { id: 4, category: "cardio", title: "Cardio Training", description: "Get your heart pumping and energy levels up." },
  { id: 5, category: "yoga", title: "Yoga Training", description: "Stretch, relax, and find your inner calm." },
  { id: 6, category: "boxing", title: "Boxing Training", description: "Learn to throw punches while getting a killer workout." },
  { id: 7, category: "dance", title: "Dance Aerobics", description: "Have fun dancing while burning calories." },
  { id: 8, category: "diet", title: "Diet Training", description: "Learn what to eat to reach your fitness goals faster." },
  { id: 9, category: "gym-accessories", title: "Gym Accessories", description: "Get quality gym wear, bags, and gloves from us." },
];

const Services = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const rawServiceImages = useQuery(api.siteImages.listBySection, { section: "services" });
  const rawServiceIcons = useQuery(api.siteImages.listBySection, { section: "service-icons" });
  const rawPhilosophy = useQuery(api.siteImages.listBySection, { section: "philosophy" });
  const dbImages = (rawServiceImages || []) as { category?: string; url: string }[];
  const dbIcons = (rawServiceIcons || []) as { category?: string; url: string }[];
  const imageByCategory = Object.fromEntries(dbImages.map((i) => [i.category, i.url]));
  const iconByCategory = Object.fromEntries(dbIcons.map((i) => [i.category, i.url]));
  const philosophyImage = ((rawPhilosophy || []) as { url: string }[])[0]?.url;

  const servicesWithDbImages = services.map((s) => ({
    ...s,
    image: s.category ? imageByCategory[s.category] : undefined,
    icon: s.category ? iconByCategory[`${s.category}-icon`] : undefined,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration } },
  };

  return (
    <Layout>
      <GridBackground className="pt-32 pb-16 text-white">
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
              Discover our comprehensive range of fitness services designed to help you achieve your goals
            </p>
          </motion.div>
        </div>
      </GridBackground>

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
            {servicesWithDbImages.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                  <img
                    src={responsiveUrl(service.image, "medium")}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                    {service.icon ? (
                      <img src={responsiveUrl(service.icon, "thumb")} alt={service.title} className="w-10 h-10 object-contain" onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} />
                    ) : null}
                  </div>

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

      <SessionsSection />

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
                <HugeiconsIcon icon={UserGroupIcon} size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Personalized Programs</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Custom training programs tailored to your fitness level and goals, with expert guidance every step of the way.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-brand-blue mb-4">
                <HugeiconsIcon icon={ChampionIcon} size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Advanced tracking of your body composition, strength, and performance metrics to keep you on target.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-brand-blue mb-4">
                <HugeiconsIcon icon={Calendar01Icon} size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Flexible Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Multiple daily sessions and class options to fit seamlessly into your schedule.
              </p>
            </motion.div>
          </motion.div>

          <AnimatedSection className="mt-12 text-center">
            <p className="max-w-2xl mx-auto mb-6">
              Our comprehensive approach combines expert guidance, personalized training programs, and a supportive community to help you achieve sustainable results.
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
                src={responsiveUrl(philosophyImage, "medium")}
                alt="Trainer"
                className="rounded-2xl shadow-xl"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
              />
            </AnimatedSection>

            <AnimatedSection className="lg:w-1/2" delay={0.3}>
              <h3 className="text-xl font-bold mb-6">Holistic Approach to Fitness</h3>
              <p className="mb-6">
                At Shape Up Fitness, we believe in taking a holistic approach to health and wellness. We understand that true fitness encompasses not just physical strength, but also mental wellbeing, proper nutrition, adequate recovery, and sustainable lifestyle habits.
              </p>
              <p className="mb-8">
                Our training methodology focuses on creating balanced programs that address all aspects of fitness, tailored to your unique body type, goals, and preferences. We emphasize proper form, progressive overload, and varied stimuli to ensure continuous improvement without plateaus or injuries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <div className="text-brand-gold mb-4">
                    <HugeiconsIcon icon={ChampionIcon} size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Result-Oriented</h4>
                  <p className="text-gray-300">
                    We focus on measurable results through consistent tracking and program adjustments.
                  </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl">
                  <div className="text-brand-gold mb-4">
                    <HugeiconsIcon icon={UserGroupIcon} size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Personalized Approach</h4>
                  <p className="text-gray-300">
                    We tailor our programs to your unique body, goals, and fitness level.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background px-8">
        <div className="sm:container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-lg mb-8">
              Join Shape Up Fitness today and experience our comprehensive range of services designed to help you achieve your health and fitness goals.
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
