import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Layout from "../components/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, UserGroupIcon, Clock01Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { GridBackground } from "@/components/ui/grid-background";
import { responsiveUrl } from "@/lib/images";

const teamMembers = [
  {
    category: "adebayo-williams",
    name: "Adebayo Williams",
    role: "Founder & Head Coach",
    image: "",
    specialties: ["Body Building", "Strength Training", "Weight Loss", "Diet Training", "Boxing Training", "Cardio Training"],
  },
  {
    category: "eteng-elvis",
    name: "Eteng Elvis",
    role: "Assistant Coach",
    image: "",
    specialties: ["Body Building", "Strength Training", "Weight Loss", "Cardio Training"],
  },
  {
    category: "lawal-oluwatobi",
    name: "Lawal Oluwatobi",
    role: "Substitute Coach",
    image: "",
    specialties: ["Calisthenics", "Strength training"],
  },
  {
    category: "uthman-raheem",
    name: "Uthman Raheem",
    role: "Boxing Coach",
    image: "",
    specialties: ["Boxing"],
  },
  {
    category: "yusuf-mimololuwami",
    name: "Yusuf Mimololuwami",
    role: "Yoga instructor",
    image: "",
    specialties: ["Yoga", "Flexibility"],
  },
  {
    category: "akande-moses",
    name: "Akande Moses Oluwafemi",
    role: "Data Manager",
    image: "",
    specialties: ["Records Management", "Subscription Management"],
  },
];

function AboutStoryImage({ src }: { src?: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgUrl = responsiveUrl(src, "medium");

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-200 dark:bg-gray-800/80">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 shimmer-bg dark:shimmer-dark rounded-2xl z-10" />
      )}
      {src && (
        <img
          src={imgUrl}
          alt="Shape Up Fitness community outdoor group photo"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
            setLoaded(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

function TeamMemberImage({ src, alt }: { src?: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgUrl = responsiveUrl(src, "medium");

  return (
    <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800/80">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 shimmer-bg dark:shimmer-dark z-10" />
      )}
      {src && (
        <img
          src={imgUrl}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
            setLoaded(true);
          }}
          className={`w-full h-full object-cover object-top transition-all duration-500 hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

const About = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const aboutImages = useQuery(api.siteImages.listBySection, { section: "about-story" }) || [];
  const aboutImage = aboutImages[0]?.url;
  const rawTeamImages = useQuery(api.siteImages.listBySection, { section: "team" }) || [];
  const teamImageByCategory = Object.fromEntries(
    (rawTeamImages as { category?: string; url: string }[]).map((i) => [i.category, i.url])
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration } },
  };

  const teamWithImages = useMemo(() =>
    teamMembers.map((member) => ({
      ...member,
      image: (member.category && teamImageByCategory[member.category]) || member.image,
    })),
  [teamImageByCategory]);

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
              About Us
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Learn more about Shape Up Fitness, our mission, values, and the team behind our success.
            </p>
          </motion.div>
        </div>
      </GridBackground>

      <section className="section-padding bg-background">
        <div className="sm:container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <h2 className="section-title font-heading">
                Our <span className="text-brand-blue">Story</span>
              </h2>
              <p className="text-sm mb-6">
                Born in 2020 from an unwavering passion, Shape Up Fitness was
                envisioned as more than just a gym. Our dream was to forge a
                vibrant, inclusive fitness sanctuary — a true community where
                every individual, regardless of their starting point, could
                flourish, not just physically, but entirely.
              </p>
              <p className="text-sm mb-6">
                From humble beginnings in a modest space, fueled by sheer
                determination, we've blossomed into one of Akure's most
                cherished fitness destinations. Our reputation is built on a
                foundation of truly personalized guidance and an unshakeable
                commitment to seeing each member not just meet, but exceed their
                wildest fitness aspirations.
              </p>
              <p className="text-sm">
                Today, our dynamic fitness center located at Embassy Lodge, FUTA
                South Gate, offers a comprehensive array of training programs,
                meticulously designed specialized zones, and a fiercely
                dedicated team of expert trainers committed to sculpting your
                success.
              </p>
            </motion.div>
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.3 }}
            >
              <div className="relative">
                <AboutStoryImage src={aboutImage} />
                <div className="absolute -bottom-6 -right-6 text-3xl sm:text-5xl font-bold opacity-30 blur-[2px] text-brand-blue pointer-events-none">
                  #SHAPEUPFITNESS
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>

        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="section-title text-white">
              Why Choose <span className="text-brand-gold">Us</span>
            </h2>
            <p className="section-subtitle text-gray-300">
              What sets Shape Up Fitness apart from other fitness centers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-brand-blue transition-all duration-300"
            >
              <div className="text-brand-blue mb-4">
                <HugeiconsIcon icon={Award01Icon} size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Certified Trainers</h3>
              <p className="text-gray-300 text-sm">
                Our team of experienced and certified trainers are passionate about helping you achieve your personal fitness goals safely and efficiently.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-brand-gold transition-all duration-300"
            >
              <div className="text-brand-gold mb-4">
                <HugeiconsIcon icon={UserGroupIcon} size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Supportive Community</h3>
              <p className="text-gray-300 text-sm">
                Join a welcoming environment where members encourage each other, celebrate milestones, and grow together on their fitness journeys.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-brand-blue transition-all duration-300"
            >
              <div className="text-brand-blue mb-4">
                <HugeiconsIcon icon={Clock01Icon} size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Modern Equipment & Facilities</h3>
              <p className="text-gray-300 text-sm">
                Access top-of-the-line fitness equipment and clean, well-maintained facilities designed for optimal workout experiences.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="sm:container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="section-title">
              Meet Our <span className="text-brand-blue">Team</span>
            </h2>
            <p className="section-subtitle">
              The dedicated professionals behind Shape Up Fitness
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamWithImages.map((member, index) => (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="aspect-[3/4] overflow-hidden shrink-0">
                    <TeamMemberImage src={member.image} alt={member.name} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1 font-heading">
                      {member.name}
                    </h3>
                    <p className="text-brand-blue mb-3 text-sm font-medium">{member.role}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 dark:bg-gray-700 text-xs px-3 py-1 rounded-full text-gray-700 dark:text-gray-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-dark text-white py-20 relative overflow-hidden px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-brand-blue rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
          </div>
        </div>
        <div className="sm:container mx-auto relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 font-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              Ready to Start Your Fitness Journey?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.2 }}
            >
              Join Shape Up Fitness today and take the first step towards a healthier, stronger you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.4 }}
            >
              <Link to="/contact?source=about_cta">
                <InteractiveHoverButton
                  text="Join Now"
                  className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
                  aria-label="Join Shape Up Fitness now"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
