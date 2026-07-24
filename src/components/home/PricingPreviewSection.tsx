import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

const PricingPreviewSection = () => {
  const dbPlans = useQuery(api.pricing.listPlans);

  // Top 3 core plans sorted by sortOrder
  const displayPlans = dbPlans
    ? [...dbPlans]
        .sort((a, b) => (a.sortOrder ?? 1) - (b.sortOrder ?? 1))
        .slice(0, 3)
    : [];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-gold/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="sm:container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Membership <span className="text-brand-blue">Plans</span>
          </h2>
          <p className="section-subtitle">
            Choose the perfect plan to kickstart your fitness journey
          </p>
        </div>

        {/* Realistic Card Skeleton Loading State */}
        {dbPlans === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/60 bg-gray-50/50 dark:bg-gray-900/40 p-8 flex flex-col justify-between h-[440px] shadow-sm"
              >
                <div className="flex flex-col">
                  {/* Card Title Skeleton */}
                  <div className="w-1/2 h-7 bg-gray-200 dark:bg-gray-800/80 rounded-xl shimmer-bg mb-3" />
                  {/* Subtitle Skeleton */}
                  <div className="w-4/5 h-4 bg-gray-200/80 dark:bg-gray-800/50 rounded-lg shimmer-bg mb-6" />

                  {/* Price Skeleton */}
                  <div className="w-2/5 h-9 bg-gray-200 dark:bg-gray-800/80 rounded-xl shimmer-bg mb-6" />

                  {/* Feature Bullets Skeleton */}
                  <div className="space-y-3.5 mb-8">
                    {[1, 2, 3, 4].map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800/80 shimmer-bg shrink-0" />
                        <div className="w-3/4 h-4 bg-gray-200/80 dark:bg-gray-800/50 rounded-lg shimmer-bg" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="w-full h-12 rounded-full bg-gray-200 dark:bg-gray-800/80 shimmer-bg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-2">
            {displayPlans.map((plan, index) => {
              const isPopular = !!plan.popular;
              const isRecommended = !!plan.recommended;

              return (
                <div
                  key={plan._id}
                  className={`relative rounded-2xl transition-all duration-300 hover:shadow-xl animate-fade-in flex flex-col justify-between p-8 bg-white dark:bg-gray-800 ${
                    isRecommended
                      ? "border-2 border-brand-gold shadow-lg"
                      : isPopular
                      ? "border-2 border-brand-blue shadow-xl"
                      : "border border-border shadow-lg"
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Floating Top Badges */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md z-10 whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  {isRecommended && !isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md z-10 whitespace-nowrap">
                      Recommended
                    </div>
                  )}

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2 font-heading text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                      {plan.description || plan.tagline || "Flexible gym membership plan"}
                    </p>

                    <div className="mb-6">
                      <span className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">/monthly</span>
                    </div>

                    {plan.savings && (
                      <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2.5 py-1 rounded-full mb-4 w-fit font-semibold">
                        {plan.savings}
                      </span>
                    )}

                    {plan.features && plan.features.length > 0 && (
                      <div className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <HugeiconsIcon
                              icon={CheckmarkCircle01Icon}
                              size={18}
                              className="mr-2.5 text-green-500 shrink-0"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-4">
                      <Link
                        to={`/contact?source=home_pricing&plan=${encodeURIComponent(plan.name)}`}
                        className={`block text-center py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                          isPopular
                            ? "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md"
                            : isRecommended
                            ? "bg-brand-gold text-brand-dark hover:bg-brand-gold/90 font-bold shadow-md"
                            : "border-2 border-brand-blue text-brand-blue dark:text-white dark:border-brand-blue/80 hover:bg-brand-blue hover:text-white shadow-sm"
                        }`}
                        aria-label={`Choose ${plan.name} plan`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/pricing">
            <InteractiveHoverButton
              text="View All Pricing"
              className="w-auto px-8 bg-brand-blue border-brand-blue text-white font-heading"
              aria-label="View all pricing options"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPreviewSection;
