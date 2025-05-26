import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Oscar",
    // image: "", // Image commented out
    quote:
      "Starting workout at SUF gym, physically: I see nothing as being too heavy (not gym iron o😂) like other things, mentally: the gym has helped me with self discipline, what pain could be more painful than this😅",
    rating: 5,
  },
  {
    id: 2,
    name: "Tclassic",
    // image: "",
    quote: "Joining SUF gym has given me more confidence and focus",
    rating: 5,
  },
  {
    id: 3,
    name: "Timoty",
    // image: "",
    quote:
      "Working out at SUF gym has boosted my consistency in doing other activities apart from working out, and it also improved my stamina.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ifetundun",
    // image: "",
    quote:
      "I used to have weak legs, but using shape up fitness gym has made my legs more stronger",
    rating: 5,
  },
  {
    id: 5,
    name: "Olushola",
    // image: "",
    quote:
      "Ever since I started using shape up fitness gym my reaction time got faster",
    rating: 5,
  },
  {
    id: 6,
    name: "Trinity",
    // image: "",
    quote:
      "Omg Coach you actually a God send! Thank you so much! Literally everyone has complimented me and said I've done really well since starting your gym and I am truly happy. Now just to keep it up and keep it pushing 💪🏾🤞🏾☺️",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;
  const autoScrollInterval = 5000;
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll effect
  React.useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScroll]);

  // Pause auto-scroll on user interaction
  const handleUserInteraction = (callback: () => void) => {
    setAutoScroll(false);
    callback();
    setTimeout(() => setAutoScroll(true), autoScrollInterval);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <motion.section
      layout
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
      </div>
      <div className="sm:container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What Our Members Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our amazing members
            about their experiences.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Testimonial Slider */}
          <motion.div
            layout
            className="overflow-hidden rounded-2xl bg-white shadow-lg p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="flex flex-col items-center gap-4 p-4">
                  {/* Image removed for now */}
                  {/* <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden border-4 border-brand-gold shadow-lg shadow-brand-gold/20">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div> */}
                  <div className="w-full text-center">
                    <div className="flex items-center justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < testimonials[currentIndex].rating
                              ? "text-brand-gold fill-brand-gold"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg mb-6 leading-relaxed text-foreground max-w-2xl mx-auto">
                      "{testimonials[currentIndex].quote}"
                    </blockquote>
                    <div className="font-bold text-xl text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons - moved below the card */}
          <div className="flex flex-col items-center mt-6 space-y-4">
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => handleUserInteraction(goToPrev)}
                className="bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-brand-gold transition-colors duration-300"
                aria-label="Previous testimonial"
                disabled={isAnimating}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => handleUserInteraction(goToNext)}
                className="bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-brand-gold transition-colors duration-300"
                aria-label="Next testimonial"
                disabled={isAnimating}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            {/* Indicators */}
            <div className="flex justify-center space-x-2 mt-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleUserInteraction(() => setCurrentIndex(index))
                  }
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentIndex === index ? "bg-brand-gold" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
