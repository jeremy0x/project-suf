
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

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
  return (
    <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.ibb.co/svHjJR5M/suf-logo.png"
              alt="Shape Up Fitness Logo" 
              className="h-16"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">GYM MEMBERSHIP PLANS</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <div 
              key={index}
              className="rounded-lg border-2 border-brand-blue p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-3xl font-bold mb-6 text-center">{plan.name}</h3>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="bg-brand-blue rounded-full p-1 mr-3 flex-shrink-0">
                      <Check size={18} className="text-white" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto">
                <div className="bg-brand-blue text-white text-center py-2 px-4 rounded-full font-bold text-lg">
                  {plan.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/pricing" className="btn-primary">
            View Full Pricing Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlansSection;
