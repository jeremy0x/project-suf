
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

const membershipPlans = [
  {
    name: "BASIC",
    price: "₦10,000/Month",
    features: [
      "Limited gym access",
      "One gym session daily"
    ]
  },
  {
    name: "PLUS",
    price: "₦35,000/Month",
    features: [
      "Full gym access",
      "Two gym sessions daily",
      "Personal training",
      "Gym vouchers",
      "Free bottle water"
    ]
  },
  {
    name: "PREMIUM",
    price: "₦50,000/Month",
    features: [
      "Full gym access",
      "Three gym sessions daily",
      "Personal training",
      "Gym vouchers",
      "Free bottle water",
      "One guest pass",
      "All group classes",
      "10% off gym wears"
    ]
  }
];

const MembershipPlansSection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;
  
  return (
    <section className="section-padding bg-brand-dark text-white relative overflow-hidden px-8">
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration }}
        >
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.ibb.co/27MsdB5r/suf-logo.png"
              alt="Shape Up Fitness Logo" 
              className="h-16"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-crimson">GYM MEMBERSHIP PLANS</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration, delay: index * 0.1 }}
              className="rounded-lg border-2 border-brand-blue p-6 flex flex-col"
            >
              <h3 className="text-3xl font-bold mb-6 text-center font-crimson">{plan.name}</h3>
              
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
                <div className="bg-brand-blue text-white text-center py-2 px-4 rounded-full font-bold text-lg font-crimson">
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
          <Link to="/pricing" className="btn-primary font-crimson">
            View Full Pricing Details
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipPlansSection;
