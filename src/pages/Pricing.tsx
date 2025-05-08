import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = {
  basic: [
    { name: "GYM SESSION (MONTHLY) ONCE DAILY", price: "₦10,000" },
    { name: "GYM SESSION (MONTHLY) TWICE DAILY", price: "₦15,000" },
    { name: "GYM SESSION (PER SESSION)", price: "₦1,000" },
    { name: "GYM SESSION (WEEKLY)", price: "₦3,500" },
    { name: "GYM SESSION (BI-WEEKLY)", price: "₦5,000" },
    { name: "3 MONTHS GYM SESSION", price: "₦27,000" },
    { name: "6 MONTHS GYM SESSION", price: "₦54,000" },
    { name: "BOXING CLASS (TWICE WEEKLY)", price: "₦12,000" }
  ],
  personal: [
    { name: "GYM SESSION (MONTHLY) ONCE DAILY", price: "₦18,000", recommended: true },
    { name: "GYM SESSION (MONTHLY) TWICE DAILY", price: "₦23,000" }
  ],
  special: [
    { name: "A MONTH FOR COUPLES", price: "₦18,000" },
    { name: "WEEKENDS ONLY (SATURDAYS IN A MONTH)", price: "₦3,500" },
    { name: "2 DAYS WEEKLY FOR A MONTH", price: "₦6,500" },
    { name: "3 DAYS WEEKLY FOR A MONTH", price: "₦8,500" }
  ],
  other: [
    { name: "DIET PLAN", price: "₦5,000" },
    { name: "DIET TRAINING", price: "₦10,000/M" },
    { name: "WORKOUT PLAN", price: "₦15,000" }
  ]
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-on-scroll');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Membership Pricing</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Affordable membership options designed to fit your needs and budget
            </p>
          </div>
        </div>
      </section>

      {/* Registration Fee */}
      <section className="py-12 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center animate-on-scroll opacity-0 blur-[5px]">
            <h2 className="text-3xl font-bold mb-2">GYM REGISTRATION</h2>
            <p className="text-5xl font-bold mb-4">₦2,000</p>
            <p className="max-w-lg mx-auto">
              One-time registration fee for all new members. Includes initial fitness assessment and personalized orientation.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Categories Tabs */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'all' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Plans
            </button>
            <button 
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'basic' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Basic Memberships
            </button>
            <button 
              onClick={() => setActiveTab('personal')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'personal' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Personal Training
            </button>
            <button 
              onClick={() => setActiveTab('special')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'special' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Special Packages
            </button>
            <button 
              onClick={() => setActiveTab('other')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'other' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Other Services
            </button>
          </div>

          {/* Basic Memberships */}
          {(activeTab === 'all' || activeTab === 'basic') && (
            <div className="mb-16 animate-on-scroll opacity-0 blur-[5px]">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Basic Memberships</h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pricingPlans.basic.map((plan, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="text-2xl font-bold mb-4">{plan.price}</div>
                      <h3 className="font-semibold mb-4">{plan.name}</h3>
                      <div className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span>Access to all equipment</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span>Locker room access</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span>Free wifi</span>
                        </div>
                      </div>
                      <Link 
                        to="/contact" 
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors"
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Training */}
          {(activeTab === 'all' || activeTab === 'personal') && (
            <div className="mb-16 animate-on-scroll opacity-0 blur-[5px]">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Personal Training</h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>
              
              <div className="relative max-w-lg mx-auto">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-gold text-brand-dark text-sm font-bold px-4 py-1 rounded-full">
                  Recommended for Beginners
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pricingPlans.personal.map((plan, index) => (
                    <div 
                      key={index} 
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 ${
                        plan.recommended ? 'border-2 border-brand-gold' : ''
                      }`}
                    >
                      <div className="p-6">
                        <div className="text-2xl font-bold mb-4">{plan.price}</div>
                        <h3 className="font-semibold mb-4">{plan.name}</h3>
                        <div className="flex flex-col gap-2 mb-6">
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span>Personal trainer</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span>Customized workout plan</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span>Progress tracking</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            <span>Nutritional guidance</span>
                          </div>
                        </div>
                        <Link 
                          to="/contact" 
                          className={`block text-center py-2 px-4 rounded-full transition-colors ${
                            plan.recommended 
                              ? 'bg-brand-gold text-black hover:bg-brand-gold/90' 
                              : 'bg-brand-blue text-white hover:bg-brand-blue/90'
                          }`}
                        >
                          Choose Plan
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Special Packages */}
          {(activeTab === 'all' || activeTab === 'special') && (
            <div className="mb-16 animate-on-scroll opacity-0 blur-[5px]">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Special Packages</h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingPlans.special.map((plan, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="text-2xl font-bold mb-4">{plan.price}</div>
                      <h3 className="font-semibold mb-4">{plan.name}</h3>
                      <Link 
                        to="/contact" 
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors"
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 flex max-w-2xl">
                <div className="text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0">
                  <Info size={24} />
                </div>
                <p>Additional ₦8,000 applies if a personal trainer is required for any of the special packages.</p>
              </div>
            </div>
          )}

          {/* Other Services */}
          {(activeTab === 'all' || activeTab === 'other') && (
            <div className="animate-on-scroll opacity-0 blur-[5px]">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Other Services</h2>
                <div className="h-px bg-border flex-grow ml-6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
                {pricingPlans.other.map((plan, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="text-2xl font-bold mb-4">{plan.price}</div>
                      <h3 className="font-semibold mb-4">{plan.name}</h3>
                      <Link 
                        to="/contact" 
                        className="block text-center py-2 px-4 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors"
                      >
                        Choose Service
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked <span className="text-brand-gold">Questions</span></h2>
            <p className="section-subtitle">
              Answers to common questions about our membership options and pricing
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid gap-6 animate-on-scroll opacity-0 blur-[5px]">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Do I need to pay the registration fee even if I'm only signing up for a month?</h3>
              <p>Yes, the registration fee is a one-time payment for all new members regardless of which membership plan you choose. It covers your initial fitness assessment and orientation.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">What's included in the personal training packages?</h3>
              <p>Our personal training packages include one-on-one sessions with a certified trainer, customized workout plans, form correction, progress tracking, and basic nutritional guidance.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Can I freeze my membership if I need to take a break?</h3>
              <p>Yes, we offer membership freezing for up to 30 days per year for monthly members. Additional freezing options may be available for long-term memberships.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Are there any hidden fees?</h3>
              <p>No, we believe in transparent pricing. All of our fees are clearly listed on our pricing page. The only additional cost would be if you choose to add a personal trainer to a standard membership plan.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Do you offer student or senior discounts?</h3>
              <p>Yes, we offer special rates for students and seniors. Please contact us or visit our gym with valid ID to learn about these special rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0 blur-[5px]">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Fitness Journey?</h2>
            <p className="text-xl mb-8">
              Take the first step towards a healthier lifestyle with a Shape Up Fitness membership that fits your needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                JOIN NOW
              </Link>
              <Link to="/contact" className="btn-secondary">
                SCHEDULE A TOUR
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
