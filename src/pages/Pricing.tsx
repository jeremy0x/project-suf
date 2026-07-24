import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import Layout from "../components/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
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
import { GridBackground } from "@/components/ui/grid-background";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;
  const location = useLocation();

  const fetchedPlans = useQuery(api.pricing.listPlans);
  const fetchedCategories = useQuery(api.pricing.listCategories);
  const registrationConfig = useQuery(api.pricing.getConfig, { key: "registration" });

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);

  const categories = fetchedCategories || [];
  const plans = (fetchedPlans || []) as Doc<"pricingPlans">[];

  const tabs = [
    { key: "all", label: "All Plans" },
    ...categories.map((c) => ({ key: c.name, label: c.label })),
  ];

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

  const visibleCategories = categories.filter(
    (cat) => activeTab === "all" || activeTab === cat.name
  );

  const isLoading = fetchedPlans === undefined || fetchedCategories === undefined;

  return (
    <Layout>
      {/* Hero Section */}
      <GridBackground className="pt-32 pb-16 text-white">
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
      </GridBackground>

      {/* Registration Fee */}
      <section className="py-12 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white min-h-[160px] flex items-center justify-center">
        <div className="sm:container mx-auto px-8">
          {registrationConfig === undefined ? (
            /* Loading Skeleton for Registration Fee */
            <div className="text-center space-y-3 max-w-lg mx-auto">
              <div className="w-48 h-8 bg-white/20 shimmer-dark rounded-xl mx-auto" />
              <div className="w-32 h-10 bg-white/20 shimmer-dark rounded-xl mx-auto" />
              <div className="w-full h-4 bg-white/10 shimmer-dark rounded-lg mx-auto" />
            </div>
          ) : registrationConfig ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration }}
            >
              <h2 className="text-3xl font-bold mb-2 font-heading">
                {registrationConfig.title}
              </h2>
              <p className="text-4xl font-bold mb-4 font-heading">
                {registrationConfig.price}
              </p>
              {registrationConfig.description && (
                <p className="max-w-lg mx-auto text-sm text-white/90">
                  {registrationConfig.description}
                </p>
              )}
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Pricing Categories Tabs */}
      <section className="section-padding bg-background">
        <div className="sm:container mx-auto">
          {/* Loading Skeleton for Tabs & Cards */}
          {isLoading ? (
            <div>
              {/* Category Tabs Skeleton */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                  <div
                    key={t}
                    className="w-28 sm:w-36 h-10 rounded-full bg-gray-100 dark:bg-gray-800/80 shimmer-bg dark:shimmer-dark"
                  />
                ))}
              </div>

              {/* Realistic Cards Skeleton Grid */}
              <div className="space-y-12">
                {[1, 2].map((group) => (
                  <div key={group} className="space-y-6">
                    <div className="w-48 h-8 bg-gray-200 dark:bg-gray-800 rounded-xl shimmer-bg dark:shimmer-dark" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((c) => (
                        <div
                          key={c}
                          className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 h-[340px] flex flex-col justify-between"
                        >
                          <div>
                            <div className="w-2/5 h-8 bg-gray-200 dark:bg-gray-700/80 rounded-lg shimmer-bg dark:shimmer-dark mb-4" />
                            <div className="w-3/4 h-5 bg-gray-200 dark:bg-gray-700/80 rounded-lg shimmer-bg dark:shimmer-dark mb-4" />
                            <div className="space-y-3">
                              {[1, 2, 3].map((f) => (
                                <div key={f} className="flex items-center gap-2.5">
                                  <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700/80 shimmer-bg dark:shimmer-dark shrink-0" />
                                  <div className="w-2/3 h-4 bg-gray-100 dark:bg-gray-700/50 rounded shimmer-bg dark:shimmer-dark" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="w-full h-10 rounded-full bg-gray-200 dark:bg-gray-700/80 shimmer-bg dark:shimmer-dark mt-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <motion.div
                className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all ${
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

              {/* Dynamic Categories & Plans */}
              <div className="space-y-16">
                {visibleCategories.map((cat) => {
                  const categoryPlans = plans.filter((p) => p.category === cat.name);
                  if (categoryPlans.length === 0 && activeTab !== cat.name) {
                    return null;
                  }

                  return (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration }}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <h2 className="text-2xl font-bold font-heading">
                          {cat.label}
                        </h2>
                        {cat.name === "personal" && (
                          <span className="bg-brand-gold text-brand-dark text-sm font-bold px-3 py-1 rounded-full text-center">
                            Recommended for Beginners
                          </span>
                        )}
                        <div className="h-px bg-border flex-grow ml-auto hidden sm:block"></div>
                      </div>

                      {categoryPlans.length === 0 ? (
                        <p className="text-sm text-gray-500 italic py-4">
                          No plans available under this category currently.
                        </p>
                      ) : (
                        <motion.div
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2"
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {categoryPlans.map((plan) => (
                            <motion.div
                              key={plan._id}
                              variants={itemVariants}
                              className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full ${
                                plan.recommended
                                  ? "border-2 border-brand-gold"
                                  : plan.popular
                                  ? "border-2 border-brand-blue"
                                  : "border border-border"
                              }`}
                            >
                              {/* Floating Top Badges */}
                              {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md z-10 whitespace-nowrap">
                                  Most Popular
                                </div>
                              )}
                              {plan.recommended && !plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md z-10 whitespace-nowrap">
                                  Recommended
                                </div>
                              )}

                              <div className="p-6 flex flex-col flex-grow">
                                <div className="text-2xl font-bold mb-2 font-heading">
                                  {plan.price}
                                </div>
                                {plan.savings && (
                                  <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2.5 py-1 rounded-full mb-2 w-fit">
                                    {plan.savings}
                                  </span>
                                )}
                                <h3 className="font-semibold mb-2 font-heading">
                                  {plan.name}
                                </h3>

                                {plan.tagline && (
                                  <p className="text-sm text-brand-blue dark:text-brand-blue/80 font-medium mb-2">
                                    {plan.tagline}
                                  </p>
                                )}

                                {plan.description && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    {plan.description}
                                  </p>
                                )}

                                {plan.features && plan.features.length > 0 && (
                                  <div className="flex flex-col gap-2 mb-4 flex-grow">
                                    {plan.features.map((feat, idx) => (
                                      <div key={idx} className="flex items-center">
                                        <HugeiconsIcon
                                          icon={CheckmarkCircle01Icon}
                                          className="text-green-500 mr-2 shrink-0"
                                          size={16}
                                        />
                                        <span className="text-sm">{feat}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {plan.trainerAddOn && (
                                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                                    {plan.trainerAddOn}
                                  </div>
                                )}

                                 <div className="mt-auto pt-4">
                                   <Link
                                     to={`/contact?source=pricing_page&plan=${encodeURIComponent(plan.name)}`}
                                     className={`block text-center py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                                       plan.popular
                                         ? "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md"
                                         : plan.recommended
                                         ? "bg-brand-gold text-brand-dark hover:bg-brand-gold/90 font-bold shadow-md"
                                         : "border-2 border-brand-blue text-brand-blue dark:text-white dark:border-brand-blue/80 hover:bg-brand-blue hover:text-white font-semibold shadow-sm"
                                     }`}
                                   >
                                     Get Started
                                   </Link>
                                 </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding section-dark">
        <div className="sm:container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl font-bold mb-4 font-heading text-white">
              Frequently Asked <span className="text-brand-gold">Questions</span>
            </h2>
            <p className="text-gray-300">
              Got questions? We've got answers.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-gray-800/80 border border-gray-700 rounded-xl px-6">
                <AccordionTrigger className="text-white hover:no-underline font-semibold py-4 text-left">
                  What is included in the registration fee?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4 text-sm">
                  The one-time registration fee includes an initial fitness assessment, personalized orientation to our equipment, locker room access setup, and your member ID profile in our system.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-gray-800/80 border border-gray-700 rounded-xl px-6">
                <AccordionTrigger className="text-white hover:no-underline font-semibold py-4 text-left">
                  Can I pause or cancel my membership at any time?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4 text-sm">
                  Yes! We offer flexible membership plans without long-term lock-in contracts. You can pause or adjust your subscription by speaking to our front desk team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-gray-800/80 border border-gray-700 rounded-xl px-6">
                <AccordionTrigger className="text-white hover:no-underline font-semibold py-4 text-left">
                  Are personal trainers included in monthly plans?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4 text-sm">
                  Certain premium and personal training tiers include dedicated trainer guidance. For other plans, dedicated personal trainer add-ons are available for a small monthly fee.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-gray-800/80 border border-gray-700 rounded-xl px-6">
                <AccordionTrigger className="text-white hover:no-underline font-semibold py-4 text-left">
                  What are the gym operating hours?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4 text-sm">
                  We are open 6 days a week from Monday to Saturday, 6:00 AM to 9:00 PM. Weekend and special training schedules are also available.
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Need a Custom Plan for Your Group or Business?
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              We offer specialized corporate packages, team discounts, and home coaching plans tailored to your needs.
            </p>
            <Link to="/contact?source=pricing_custom_cta">
              <InteractiveHoverButton
                text="Contact Our Team"
                className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
                aria-label="Contact our team for custom pricing"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
