
import { useEffect, useState } from 'react';

const sessions = [
  { name: "Morning", time: "7:00am - 10:00am" },
  { name: "Afternoon", time: "2:00pm - 4:00pm" },
  { name: "Evening", time: "6:00pm - 9:00pm" }
];

const SessionsSection = () => {
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  
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
    <section className="section-padding bg-brand-dark text-white diagonal-box-reverse">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Session <span className="text-brand-gold">Times</span></h2>
          <p className="section-subtitle">
            Choose a session that fits your schedule
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sessions.map((session, index) => (
            <div 
              key={index}
              className={`rounded-xl p-8 text-center animate-fade-in transition-all duration-300 transform hover:scale-105 ${
                currentSession === session.name 
                  ? 'bg-brand-blue shadow-lg shadow-brand-blue/20' 
                  : 'bg-gray-800'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-2xl font-bold mb-2">{session.name}</h3>
              <p className="text-xl mb-4">{session.time}</p>
              {currentSession === session.name && (
                <div className="flex items-center justify-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm">In Progress</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="mb-6 max-w-2xl mx-auto">
            Our sessions are designed to accommodate various schedules. Whether you're an early bird or prefer evening workouts, we have a time slot that works for you.
          </p>
          <a href="#" className="btn-secondary">
            BOOK A SESSION
          </a>
        </div>
      </div>
    </section>
  );
};

export default SessionsSection;
