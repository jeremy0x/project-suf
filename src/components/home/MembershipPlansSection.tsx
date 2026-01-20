import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import Logo from "../../components/Logo";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

const membershipPlans = [
  {
    name: "Basic",
    price: "₦12,000/Month",
    features: ["Limited gym access", "One gym session daily"],
  },
  {
    name: "Plus",
    price: "₦40,000/Month",
    features: [
      "Full gym access",
      "Two gym sessions daily",
      "Personal training",
      "Gym vouchers",
      "Free bottle water",
    ],
  },
  {
    name: "Premium",
    price: "₦55,000/Month",
    features: [
      "Full gym access",
      "Personal trainer",
      "Customized workout plan",
      "Progress tracking",
      "Nutritional guidance",
    ],
  },
];

const MembershipPlansSection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  return (
    <section className="section-padding section-dark relative overflow-hidden">
      <div className="sm:container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration }}
        >
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <Logo variant="white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-white">
              Membership Plans
            </h2>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration, delay: index * 0.1 }}
              className="rounded-xl border-2 border-brand-blue p-6 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-6 text-center font-heading">
                {plan.name}
              </h3>

              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="bg-brand-blue rounded-full p-1 mr-3 flex-shrink-0">
                      <Check size={18} className="text-white" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <div className="bg-brand-blue text-white text-center py-2 px-4 rounded-full font-bold text-lg font-heading">
                  {plan.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration, delay: 0.4 }}
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
