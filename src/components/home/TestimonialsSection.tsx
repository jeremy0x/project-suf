
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
          <div className="overflow-hidden rounded-2xl glass-card bg-gray-900/50 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 p-4">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden border-4 border-brand-gold shadow-lg shadow-brand-gold/20">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < testimonials[currentIndex].rating ? "text-brand-gold fill-brand-gold" : "text-gray-500"} 
                        />
                      ))}
                    </div>
                    <blockquote className="text-sm italic mb-6 leading-relaxed">"{testimonials[currentIndex].quote}"</blockquote>
                    <div className="font-bold text-xl font-crimson">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-brand-gold">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 md:-translate-x-6 bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-brand-gold transition-colors duration-300"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 md:translate-x-6 bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-brand-gold transition-colors duration-300"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
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
                  currentIndex === index ? 'bg-brand-gold glow-gold' : 'bg-gray-600'
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
