import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Oscar",
    initials: "OS",
    quote:
      "Starting workout at SUF gym, physically: I see nothing as being too heavy (not gym iron o😂) like other things, mentally: the gym has helped me with self discipline, what pain could be more painful than this😅",
    rating: 5,
  },
  {
    id: 2,
    name: "Tclassic",
    initials: "TC",
    quote: "Joining SUF gym has given me more confidence and focus",
    rating: 5,
  },
  {
    id: 3,
    name: "Timoty",
    initials: "TM",
    quote:
      "Working out at SUF gym has boosted my consistency in doing other activities apart from working out, and it also improved my stamina.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ifetundun",
    initials: "IF",
    quote:
      "I used to have weak legs, but using shape up fitness gym has made my legs more stronger",
    rating: 5,
  },
  {
    id: 5,
    name: "Olushola",
    initials: "OL",
    quote:
      "Ever since I started using shape up fitness gym my reaction time got faster",
    rating: 5,
  },
  {
    id: 6,
    name: "Trinity",
    initials: "TR",
    quote:
      "Omg Coach you actually a God send! Thank you so much! Literally everyone has complimented me and said I've done really well since starting your gym and I am truly happy. Now just to keep it up and keep it pushing 💪🏾🤞🏾☺️",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-heading">
            What Our <span className="text-brand-blue">Members</span> Say
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Our members' success stories speak for themselves. Discover how Shape Up Fitness has transformed their lives through dedication and expert guidance.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < testimonial.rating
                            ? "text-brand-gold fill-brand-gold"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-brand-blue">
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-brand-blue text-white font-semibold text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground font-heading">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SUF Member
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
