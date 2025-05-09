import Layout from "../components/Layout";
import { CheckCircle, Award, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";

const About = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <div className="container mx-auto px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-crimson">
              About Us
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Learn more about Shape Up Fitness, our mission, values, and the
              team behind our success.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="section-padding bg-background px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <h2 className="section-title font-crimson">
                Our <span className="text-brand-blue">Story</span>
              </h2>
              <p className="text-sm mb-6">
                Founded in 2015, Shape Up Fitness was born from a passion to
                create a fitness center that wasn't just about physical
                transformation, but about building a supportive community where
                people of all fitness levels could thrive.
              </p>
              <p className="text-sm mb-6">
                Starting with just a small space and limited equipment, we've
                grown into one of Akure's premier fitness destinations, known
                for our personalized approach and commitment to helping members
                achieve their goals.
              </p>
              <p className="text-sm">
                Today, our state-of-the-art facility at Embassy Lodge, FUTA
                South Gate, features modern equipment, specialized training
                zones, and a team of expert trainers dedicated to your success.
              </p>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.3 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                  alt="Gym interior"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 text-5xl font-bold opacity-10 text-brand-blue">
                  SINCE 2015
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-brand-dark text-white px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="section-title font-crimson">
              Our <span className="text-brand-gold">Mission & Values</span>
            </h2>
            <p className="section-subtitle text-sm">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/60 p-8 rounded-xl shadow-lg glass-card"
            >
              <div className="mb-4 text-brand-gold">
                <Award size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-crimson">
                Excellence
              </h3>
              <p className="text-sm">
                We strive for excellence in everything we do, from our facility
                maintenance to our training programs and customer service.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800/60 p-8 rounded-xl shadow-lg glass-card"
            >
              <div className="mb-4 text-brand-gold">
                <Users size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-crimson">Community</h3>
              <p className="text-sm">
                We foster a supportive, inclusive community where members
                motivate each other and celebrate achievements together.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800/60 p-8 rounded-xl shadow-lg glass-card"
            >
              <div className="mb-4 text-brand-gold">
                <Clock size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-crimson">
                Dedication
              </h3>
              <p className="text-sm">
                We're dedicated to your success, providing the guidance, tools,
                and support you need to reach your fitness goals.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 font-crimson">
              Our Mission
            </h3>
            <p className="text-sm mb-6">
              To inspire and empower individuals to transform their lives
              through fitness, providing expert guidance and a supportive
              community that motivates everyone to reach their full potential.
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-20 bg-brand-gold rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="section-title font-crimson">
              Our <span className="text-brand-blue">Team</span>
            </h2>
            <p className="section-subtitle text-sm">
              Meet the experts committed to your fitness journey
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Emmanuel Adeniyi",
                role: "Founder & Head Trainer",
                image:
                  "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                specialties: ["Body Building", "Strength Training"],
              },
              {
                name: "Blessing Okonkwo",
                role: "Yoga & Pilates Instructor",
                image:
                  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
                specialties: ["Yoga", "Flexibility"],
              },
              {
                name: "Michael Oladele",
                role: "Boxing Coach",
                image:
                  "https://images.unsplash.com/photo-1567013127542-490d757e6349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                specialties: ["Boxing", "HIIT"],
              },
              {
                name: "Amina Yahaya",
                role: "Nutrition Specialist",
                image:
                  "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                specialties: ["Nutrition", "Weight Loss"],
              },
            ].map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 font-crimson">
                      {member.name}
                    </h3>
                    <p className="text-brand-blue mb-3">{member.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 dark:bg-gray-700 text-sm px-3 py-1 rounded-full"
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

      {/* CTA Section */}
      <section className="bg-brand-dark text-white py-20 relative overflow-hidden px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-brand-blue rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
          </div>
        </div>
        <div className="container mx-auto relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 font-crimson"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              Ready to Start Your Fitness Journey?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.2 }}
            >
              Join Shape Up Fitness today and take the first step towards a
              healthier, stronger you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration, delay: 0.4 }}
            >
              <a
                href="/contact?source=about_cta"
                className="btn-primary font-crimson"
              >
                GET STARTED TODAY
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
