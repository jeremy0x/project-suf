import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Check, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BeamsBackground } from "@/components/ui/beams-background";

const pricingPlans = {
  basic: [
    { name: "Gym Session (Monthly) Once Daily", price: "₦12,000" },
    { name: "Gym Session (Monthly) Twice Daily", price: "₦17,000" },
    { name: "Gym Session (Per Session)", price: "₦1,500" },
    { name: "Gym Session (Weekly)", price: "₦5,000" },
    { name: "Gym Session (Bi-weekly)", price: "₦7,500" },
    { name: "2 Months Gym Session", price: "₦23,000", savings: "saves ₦1,000" },
    { name: "3 Months Gym Session", price: "₦33,000", savings: "saves ₦3,000" },
    { name: "6 Months Gym Session", price: "₦66,000", savings: "saves ₦6,000" },
    { name: "Boxing Class (Twice Weekly) / Month", price: "₦14,000" },
    { name: "Boxing Session with Trainer (Daily)", price: "₦5,000" },
    { name: "Boxing Session without Trainer (Daily)", price: "₦3,000" },
  ],
  personal: [
    {
      name: "Gym Session (Monthly) Once Daily",
      price: "₦22,000",
      recommended: true,
    },
    { name: "Gym Session (Monthly) Twice Daily", price: "₦25,000" },
  ],
  special: [
    {
      name: "Couples Plan / Monthly",
      price: "₦22,000",
      savings: "saves ₦2,000",
    },
    { name: "Weekends Only (Saturdays) / Monthly", price: "₦5,000" },
    { name: "2 Days Weekly for a Month", price: "₦8,000" },
    { name: "3 Days Weekly for a Month", price: "₦10,000" },
  ],
  inHome: [
    { name: "3 Sessions Weekly for a Month", price: "₦60,000" },
    { name: "2 Sessions Weekly for a Month", price: "₦40,000" },
    { name: "1 Session Weekly for a Month", price: "₦20,000" },
  ],
  online: [
    { name: "4 Sessions Weekly for a Month", price: "₦40,000" },
    { name: "3 Sessions Weekly for a Month", price: "₦30,000" },
    { name: "2 Sessions Weekly for a Month", price: "₦20,000" },
  ],
  other: [
    { name: "Customized Diet Plan", price: "₦7,000" },
    { name: "Diet Training (Monthly)", price: "₦15,000" },
    { name: "Custom Workout Plan", price: "₦25,000" },
  ],
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;
  const location = useLocation();

  // Handle hash scroll on mount and location change
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

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
      <BeamsBackground className="pt-32 pb-16 text-white" intensity="strong">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Membership Plans
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Choose the perfect plan that fits your fitness goals and budget
            </p>
          </motion.div>
        </div>
      </BeamsBackground>

      {/* Registration Fee */}
      <motion.section
        className="py-12 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration }}
      >
        <div className="sm:container mx-auto px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl font-bold mb-2 font-heading">
              Gym Registration
            </h2>
            <p className="text-4xl font-bold mb-4 font-heading">₦2,500</p>
            <p className="max-w-lg mx-auto text-sm">
              One-time registration fee for all new members. Includes initial
              fitness assessment and personalized orientation.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Categories Tabs */}
      <section className="section-padding bg-background">
        <div className="sm:container mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            {[
              { key: "all", label: "All Plans" },
              { key: "basic", label: "Basic Memberships" },
              { key: "personal", label: "Personal Training" },
              { key: "special", label: "Special Packages" },
              { key: "inHome", label: "In Home Training" },
              { key: "online", label: "Online Training" },
              { key: "other", label: "Other Services" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-brand-blue text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-label={`View ${tab.label}`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Basic Memberships */}
          {(activeTab === "all" || activeTab === "basic") && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold font-heading">
                  Basic Memberships
                </h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {pricingPlans.basic.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold mb-2 font-heading">
                        {plan.price}
                      </div>
                      {plan.savings && (
                        <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full mb-2 w-fit">
                          {plan.savings}
                        </span>
                      )}
                      <h3 className="font-semibold mb-4 font-heading">
                        {plan.name}
                      </h3>
                      <div className="flex flex-col gap-2 mb-6 flex-grow">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-sm">
                            Access to all equipment
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-sm">Dressing room access</span>
                        </div>
                      </div>
                      <Link
                        to={`/contact?source=pricing&plan=${encodeURIComponent(
                          plan.name,
                        )}`}
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors font-heading mt-auto"
                        aria-label={`Choose ${plan.name} plan`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Personal Training */}
          {(activeTab === "all" || activeTab === "personal") && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold font-heading">
                  Personal Training
                </h2>
                <span className="bg-brand-gold text-brand-dark text-sm font-bold px-3 py-1 rounded-full text-center">
                  Recommended for Beginners
                </span>
                <div className="h-px bg-border flex-grow ml-auto hidden sm:block"></div>
              </div>

              <div className="relative max-w-3xl mx-auto">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {pricingPlans.personal.map((plan, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full relative ${
                        plan.recommended ? "border-2 border-brand-gold" : ""
                      }`}
                    >
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="text-2xl font-bold mb-4 font-heading">
                          {plan.price}
                        </div>
                        <h3 className="font-semibold mb-4 font-heading">
                          {plan.name}
                        </h3>
                        <div className="flex flex-col gap-2 mb-6 flex-grow">
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span className="text-sm">Personal trainer</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span className="text-sm">
                              Customized workout plan
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span className="text-sm">Progress tracking</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span className="text-sm">
                              Nutritional guidance
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/contact?source=pricing&plan=${encodeURIComponent(
                            plan.name,
                          )}`}
                          className={`block text-center py-2 px-4 rounded-full transition-colors mt-auto font-heading ${
                            plan.recommended
                              ? "bg-brand-gold text-black hover:bg-brand-gold/90"
                              : "bg-brand-blue text-white hover:bg-brand-blue/90"
                          }`}
                          aria-label={`Choose ${plan.name} plan`}
                        >
                          Choose Plan
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Special Packages */}
          {(activeTab === "all" || activeTab === "special") && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold font-heading">
                  Special Packages
                </h2>
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full text-center">
                  + Trainer Fee if Required
                </span>
                <div className="h-px bg-border flex-grow ml-auto hidden sm:block"></div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {pricingPlans.special.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold mb-2 font-heading">
                        {plan.price}
                      </div>
                      {plan.savings && (
                        <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full mb-2 w-fit">
                          {plan.savings}
                        </span>
                      )}
                      <h3 className="font-semibold mb-4 font-heading flex-grow">
                        {plan.name}
                      </h3>
                      <Link
                        to={`/contact?source=pricing&plan=${encodeURIComponent(
                          plan.name,
                        )}`}
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors font-heading mt-auto"
                        aria-label={`Choose ${plan.name} plan`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* In Home Training */}
          {(activeTab === "all" || activeTab === "inHome") && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold font-heading">
                  In Home Training
                </h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {pricingPlans.inHome.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold mb-4 font-heading">
                        {plan.price}
                      </div>
                      <h3 className="font-semibold mb-4 font-heading flex-grow">
                        {plan.name}
                      </h3>
                      <div className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-sm">
                            Personal trainer at your home
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-sm">
                            Customized workout plan
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/contact?source=pricing&plan=${encodeURIComponent(
                          plan.name,
                        )}`}
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors font-heading mt-auto"
                        aria-label={`Choose ${plan.name} plan`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Online Training */}
          {(activeTab === "all" || activeTab === "online") && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold font-heading">
                  Online Training
                </h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {pricingPlans.online.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold mb-4 font-heading">
                        {plan.price}
                      </div>
                      <h3 className="font-semibold mb-4 font-heading flex-grow">
                        {plan.name}
                      </h3>
                      <div className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-sm">
                            Virtual training sessions
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-sm">Video call guidance</span>
                        </div>
                      </div>
                      <Link
                        to={`/contact?source=pricing&plan=${encodeURIComponent(
                          plan.name,
                        )}`}
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors font-heading mt-auto"
                        aria-label={`Choose ${plan.name} plan`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Other Services */}
          {(activeTab === "all" || activeTab === "other") && (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration }}
            >
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold font-heading">
                  Other Services
                </h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {pricingPlans.other.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold mb-4 font-heading">
                        {plan.price}
                      </div>
                      <h3 className="font-semibold mb-4 font-heading flex-grow">
                        {plan.name}
                      </h3>
                      <Link
                        to={`/contact?source=pricing&plan=${encodeURIComponent(
                          plan.name,
                        )}`}
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors font-heading mt-auto"
                        aria-label={`Choose ${plan.name} service`}
                      >
                        Choose Service
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="section-padding bg-brand-dark text-white">
        <div className="sm:container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="section-title font-heading">
              Frequently Asked{" "}
              <span className="text-brand-gold">Questions</span>
            </h2>
            <p className="text-sm max-w-2xl mx-auto">
              Answers to common questions about our membership options and
              pricing
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-gray-800/60 rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-heading hover:no-underline">
                  Do I need to pay the registration fee even if I'm only signing
                  up for a month?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300">
                  Yes, the registration fee is a one-time payment for all new
                  members regardless of which membership plan you choose. It
                  covers your initial fitness assessment and orientation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-gray-800/60 rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-heading hover:no-underline">
                  What's included in the personal training packages?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300">
                  Our personal training packages include one-on-one sessions
                  with a certified trainer, customized workout plans, form
                  correction, progress tracking, and basic nutritional guidance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-gray-800/60 rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-heading hover:no-underline">
                  Can I freeze my membership if I need to take a break?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300">
                  While direct pausing of a gym subscription isn't an option
                  once it's active, rest assured that your membership clock only
                  starts ticking from your first activation, even if you've
                  completed your payment in advance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-gray-800/60 rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-heading hover:no-underline">
                  Are there any hidden fees?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300">
                  No, we believe in transparent pricing. All of our fees are
                  clearly listed on our pricing page. The only additional cost
                  would be if you choose to add a personal trainer to a standard
                  membership plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-gray-800/60 rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-heading hover:no-underline">
                  Do you offer student discounts?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300">
                  Yes, we offer special rates for students. Please contact us or
                  visit our gym with valid ID to learn about these special
                  rates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="bg-gray-800/60 rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-heading hover:no-underline">
                  Can I pay my gym subscription in installments?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300">
                  Yes, we offer the convenience of paying your gym subscription
                  in two installments. This option is available to help make
                  managing your membership more flexible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background px-8">
        <div className="sm:container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl font-bold mb-6 font-heading">
              Ready to Begin Your Fitness Journey?
            </h2>
            <p className="text-base mb-8">
              Take the first step towards a healthier lifestyle with a Shape Up
              Fitness membership that fits your needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact?source=pricing_join">
                <InteractiveHoverButton
                  text="Join Now"
                  className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
                  aria-label="Join Shape Up Fitness now"
                />
              </Link>
              <Link to="/contact?source=pricing_tour">
                <InteractiveHoverButton
                  text="Schedule a Tour"
                  className="w-auto px-8 bg-brand-gold border-brand-gold text-brand-dark font-heading"
                  aria-label="Schedule a facility tour"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
