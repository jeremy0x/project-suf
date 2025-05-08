
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const stats = [
  { value: "500+", label: "Active Members" },
  { value: "15+", label: "Expert Trainers" },
  { value: "20+", label: "Fitness Programs" },
  { value: "8+", label: "Years Experience" }
];

const benefits = [
  "State-of-the-art equipment",
  "Personalized training programs",
  "Nutritional guidance",
  "Supportive community",
  "Expert coaching",
  "Regular fitness assessments"
];

const AboutSection = () => {
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

    document.querySelectorAll('.about-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-gold/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <div className="lg:w-1/2 about-animate opacity-0">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Gym interior with modern equipment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-brand-dark text-white p-6 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold mb-2">Get Started Today</h3>
                <p className="text-sm mb-3">Take the first step towards a healthier you</p>
                <Link to="/contact" className="text-brand-gold font-semibold">Join Now →</Link>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-1/2 about-animate opacity-0">
            <h2 className="section-title">About <span className="text-brand-blue">Shape Up</span></h2>
            <p className="text-lg mb-6">
              Shape Up Fitness is more than just a gym — it's a community dedicated to helping you achieve your fitness goals. With our expert trainers, state-of-the-art equipment, and supportive environment, we provide everything you need to transform your body and mind.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-3xl font-bold text-brand-blue">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-brand-gold mr-2 flex-shrink-0" size={20} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Link to="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
