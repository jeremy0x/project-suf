import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import Logo from "../../components/Logo";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

const MembershipPlansSection = () => {
  const { reduceMotion } = useAnimation();
  const dbPlans = useQuery(api.pricing.listPlans);

  // Top 3 core plans sorted by sortOrder
  const displayPlans = dbPlans
    ? [...dbPlans]
        .sort((a, b) => (a.sortOrder ?? 1) - (b.sortOrder ?? 1))
        .slice(0, 3)
    : [];

  const headerAnimProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: { duration: reduceMotion ? 0 : 0.3 },
  };

  const ctaAnimProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: { duration: reduceMotion ? 0 : 0.3, delay: 0.4 },
  };

  return (
    <section className="section-padding section-dark relative overflow-hidden">
      <div className="sm:container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          {...headerAnimProps}
        >
          <div className="flex justify-center">
            <Logo variant="white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-white font-heading">
            Membership Plans
          </h2>
        </motion.div>

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>

        {/* Realistic Card Skeleton Loading State */}
        {dbPlans === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 flex flex-col justify-between h-[380px]"
              >
                <div>
                  <div className="w-1/2 h-7 bg-white/10 rounded-xl shimmer-dark mx-auto mb-6" />
                  <div className="space-y-4 mb-8">
                    {[1, 2, 3].map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-white/10 shimmer-dark shrink-0" />
                        <div className="w-3/4 h-4 bg-white/5 rounded-lg shimmer-dark" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full h-11 rounded-full bg-white/10 shimmer-dark mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-2">
            {displayPlans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.3, delay: index * 0.1 }}
                className={`relative rounded-xl p-6 flex flex-col justify-between ${
                  plan.popular
                    ? "border-2 border-brand-blue bg-gray-900/80 shadow-xl"
                    : "border-2 border-brand-blue/60 bg-gray-900/40"
                }`}
              >
                {/* Floating Top Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md z-10 whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-6 text-center font-heading text-white pt-2">
                  {plan.name}
                </h3>

                {plan.features && plan.features.length > 0 && (
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-200">
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} className="text-brand-blue shrink-0 mr-3" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto">
                  <div className="bg-brand-blue text-white text-center py-2.5 px-4 rounded-full font-bold text-lg font-heading">
                    {plan.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          {...ctaAnimProps}
        >
          <Link to="/pricing">
            <InteractiveHoverButton
              text="View Full Pricing"
              className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
              aria-label="View full pricing details"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipPlansSection;
