
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Body Toning",
    description: "Sculpt and define your muscles with our specialized toning programs",
    icon: "💪",
  },
  {
    title: "Weight Loss",
    description: "Sustainable weight loss programs tailored to your goals",
    icon: "⚖️",
  },
  {
    title: "Body Building",
    description: "Build muscle mass and strength with expert guidance",
    icon: "🏋️",
  },
  {
    title: "Cardio Training",
    description: "Improve your cardiovascular health and endurance",
    icon: "🏃",
  },
  {
    title: "Yoga Training",
    description: "Enhance flexibility, balance, and mental wellness",
    icon: "🧘‍♀️",
  },
  {
    title: "Boxing Training",
    description: "Learn boxing techniques while getting an intense workout",
    icon: "🥊",
  },
  {
    title: "Dance Aerobics",
    description: "Fun, energetic workouts that improve coordination and fitness",
    icon: "💃",
  },
  {
    title: "Diet Training",
    description: "Nutritional guidance to complement your fitness routine",
    icon: "🥗",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = document.querySelectorAll('.service-card');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our <span className="text-brand-blue">Services</span></h2>
          <p className="section-subtitle">
            Comprehensive fitness solutions designed to help you achieve your goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <Link 
                  to="/services" 
                  className="arrow-link group"
                >
                  Learn more 
                  <ArrowRight size={16} className="ml-2 inline transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
