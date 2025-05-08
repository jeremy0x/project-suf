
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

const sessions = [
  { name: "Morning", time: "7:00am - 10:00am" },
  { name: "Afternoon", time: "2:00pm - 4:00pm" },
  { name: "Evening", time: "6:00pm - 9:00pm" }
];

const SessionsSection = () => {
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;
  
  useEffect(() => {
    const determineCurrentSession = () => {
      const now = new Date();
      const hours = now.getHours();
      
      if (hours >= 7 && hours < 10) {
        setCurrentSession("Morning");
      } else if (hours >= 14 && hours < 16) {
        setCurrentSession("Afternoon");
      } else if (hours >= 18 && hours < 21) {
        setCurrentSession("Evening");
      } else {
        setCurrentSession(null);
      }
    };
    
    determineCurrentSession();
    const interval = setInterval(determineCurrentSession, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-brand-dark text-white diagonal-box-reverse px-8">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration }}
        >
          <h2 className="section-title">Session <span className="text-brand-gold">Times</span></h2>
          <p className="section-subtitle text-sm">
            Choose a session that fits your schedule
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration, staggerChildren: 0.1 }}
        >
          {sessions.map((session, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration, delay: index * 0.1 }}
              className={`glass-card rounded-xl p-8 text-center transition-all duration-300 transform hover:scale-105 ${
                currentSession === session.name 
                  ? 'bg-brand-blue/20 shadow-lg shadow-brand-blue/20 border border-brand-blue/30' 
                  : 'bg-gray-800/30'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2 font-crimson">{session.name}</h3>
              <p className="text-xl mb-4">{session.time}</p>
              {currentSession === session.name && (
                <div className="glow-blue rounded-full px-4 py-1 inline-flex items-center justify-center bg-brand-blue/10 border border-brand-blue/30">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm font-crimson">In Progress</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration, delay: 0.2 }}
        >
          <p className="mb-6 max-w-2xl mx-auto text-sm">
            Our sessions are designed to accommodate various schedules. Whether you're an early bird or prefer evening workouts, we have a time slot that works for you.
          </p>
          <a href="#" className="btn-secondary font-crimson">
            BOOK A SESSION
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SessionsSection;
