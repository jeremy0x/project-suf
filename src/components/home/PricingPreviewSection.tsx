import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

const pricingPlans = [
  {
    name: "Basic",
    price: "₦12,000",
    duration: "Monthly",
    popular: false,
    description: "Perfect for beginners",
    features: [
      "Once daily gym session",
      "Access to all equipment",
      "Locker room access",
      "Fitness assessment",
    ],
    buttonText: "Choose Plan",
  },
  {
    name: "Plus",
    price: "₦17,000",
    duration: "Monthly",
    popular: true,
    description: "Our most popular choice",
    features: [
      "Twice daily gym sessions",
      "Access to all equipment",
      "Access to all group classes",
      "Locker room access",
      "Fitness assessment",
      "Basic nutritional guidance",
    ],
    buttonText: "Choose Plan",
  },
  {
    name: "Premium",
    price: "₦22,000",
    duration: "Monthly",
    popular: false,
    description: "Recommended for beginners",
    features: [
      "Once daily gym session",
      "Personal trainer guidance",
      "Customized workout plan",
      "Access to all equipment",
      "Locker room access",
      "Detailed fitness assessment",
    ],
    buttonText: "Choose Plan",
  },
];

const PricingPreviewSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-gold/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="sm:container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Membership <span className="text-brand-blue">Plans</span>
          </h2>
          <p className="section-subtitle">
            Choose the perfect plan to kickstart your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in ${
                plan.popular
                  ? "border-2 border-brand-blue transform md:-translate-y-4 shadow-xl"
                  : "border border-border shadow-lg"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="bg-brand-blue text-white py-2 text-center font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-20">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">
                    /{plan.duration.toLowerCase()}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check
                        size={18}
                        className="mr-2 text-green-500 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/pricing"
                  className={`block text-center py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-brand-blue text-white hover:bg-brand-blue/90"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-brand-gold hover:text-black"
                  }`}
                  aria-label={`Choose ${plan.name} plan`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

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
