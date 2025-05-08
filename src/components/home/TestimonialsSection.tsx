
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Member since 2021",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    quote: "Shape Up Fitness completely transformed my life. I've lost over 30kg and gained so much confidence. The trainers are incredibly supportive and the community keeps me motivated.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Member since 2022",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    quote: "The personal training sessions are worth every penny. My trainer created a customized plan that fits my busy schedule, and I'm seeing results faster than I ever expected.",
    rating: 5
  },
  {
    id: 3,
    name: "David Chen",
    role: "Member since 2020",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    quote: "I've been to many gyms over the years, but Shape Up Fitness stands out for its clean facilities, up-to-date equipment, and the genuine care from all staff members.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <motion.section 
      className="section-padding bg-brand-dark text-white px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration }}
        >
          <h2 className="section-title">Success <span className="text-brand-gold">Stories</span></h2>
          <p className="section-subtitle text-sm">
            Hear what our members have to say about their journey with Shape Up Fitness
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full px-4 flex-shrink-0"
                >
                  <div className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="md:w-1/3 mb-4 md:mb-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-brand-gold">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={18} 
                              className={i < testimonial.rating ? "text-brand-gold fill-brand-gold" : "text-gray-400"} 
                            />
                          ))}
                        </div>
                        <blockquote className="text-sm italic mb-4">"{testimonial.quote}"</blockquote>
                        <div className="font-bold text-xl font-crimson">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 md:-translate-x-6 bg-brand-blue text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-brand-gold transition-colors duration-300"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 md:translate-x-6 bg-brand-blue text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-brand-gold transition-colors duration-300"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <ChevronRight />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 300);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? 'bg-brand-gold' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
