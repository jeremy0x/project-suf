
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Trophy, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Body Toning",
    description: "Our body toning program focuses on sculpting and defining your muscles through targeted exercises that improve muscle tone without adding bulk. Perfect for those looking to achieve a lean, defined physique.",
    icon: "💪",
    image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    title: "Weight Loss",
    description: "Our comprehensive weight loss program combines effective cardio workouts, strength training, and nutritional guidance to help you shed unwanted pounds and create lasting lifestyle changes.",
    icon: "⚖️",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "Body Building",
    description: "Take your physique to the next level with our bodybuilding program designed to maximize muscle growth, improve symmetry, and enhance overall strength through progressive resistance training.",
    icon: "🏋️",
    image: "https://images.unsplash.com/photo-1632781297772-1d68f375778f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 4,
    title: "Cardio Training",
    description: "Boost your cardiovascular health, increase stamina, and burn calories with our diverse cardio training options including HIIT, steady-state cardio, and circuit training.",
    icon: "🏃",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 5,
    title: "Yoga Training",
    description: "Find balance, improve flexibility, and reduce stress with our yoga classes that cater to all levels, from beginners to advanced practitioners. Experience the holistic benefits of mind-body connection.",
    icon: "🧘‍♀️",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1220&q=80"
  },
  {
    id: 6,
    title: "Boxing Training",
    description: "Learn proper boxing techniques while getting an intense full-body workout that improves coordination, speed, power, and cardiovascular fitness under the guidance of experienced boxing coaches.",
    icon: "🥊",
    image: "https://images.unsplash.com/photo-1560233026-ad254fa8c688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 7,
    title: "Dance Aerobics",
    description: "Enjoy fun, energetic dance routines that boost your mood and fitness simultaneously. Our dance aerobics classes combine choreographed movements with cardio benefits for an enjoyable workout experience.",
    icon: "💃",
    image: "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 8,
    title: "Diet Training",
    description: "Receive expert nutritional guidance tailored to your fitness goals, dietary preferences, and lifestyle. Learn how to make sustainable food choices that complement your workout routine.",
    icon: "🥗",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80"
  }
];

const sessions = [
  { name: "Morning", time: "7:00am - 10:00am" },
  { name: "Afternoon", time: "2:00pm - 4:00pm" },
  { name: "Evening", time: "6:00pm - 9:00pm" }
];

const Services = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Discover the comprehensive range of fitness programs and services we offer to help you achieve your goals
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="animate-on-scroll opacity-0 blur-[5px]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                  <div className="relative h-60">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-brand-dark text-white text-3xl p-2 rounded-lg">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {service.description}
                    </p>
                    <Link 
                      to={`#${service.id}`} 
                      className="inline-flex items-center text-brand-blue font-semibold hover:text-brand-gold transition-colors"
                    >
                      Learn more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions Times */}
      <section className="section-padding bg-brand-dark text-white diagonal-box">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Session <span className="text-brand-gold">Times</span></h2>
            <p className="section-subtitle">
              Flexible training hours to fit your busy schedule
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sessions.map((session, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl p-8 text-center animate-on-scroll opacity-0 blur-[5px] transition-all duration-300 hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/20 hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-4 text-brand-gold">
                  <Clock size={48} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{session.name}</h3>
                <p className="text-xl">{session.time}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.6s' }}>
            <p className="mb-6 max-w-2xl mx-auto">
              We offer flexible session times to accommodate your schedule. Whether you prefer morning workouts to energize your day, afternoon sessions for a midday boost, or evening training to release the day's stress, we've got you covered.
            </p>
            <Link to="/contact" className="btn-secondary">
              BOOK A SESSION
            </Link>
          </div>
        </div>
      </section>

      {/* Class Schedule */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Weekly <span className="text-brand-blue">Schedule</span></h2>
            <p className="section-subtitle">
              Find the perfect class that fits your schedule and interests
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-on-scroll opacity-0 blur-[5px]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">May 2025</h3>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-brand-blue hover:text-white transition-colors">
                    <Calendar size={18} />
                  </button>
                  <button className="p-2 bg-brand-blue text-white rounded-md">
                    Today
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-4 px-2 text-left">Time</th>
                      <th className="py-4 px-2 text-center">Monday</th>
                      <th className="py-4 px-2 text-center">Tuesday</th>
                      <th className="py-4 px-2 text-center">Wednesday</th>
                      <th className="py-4 px-2 text-center">Thursday</th>
                      <th className="py-4 px-2 text-center">Friday</th>
                      <th className="py-4 px-2 text-center">Saturday</th>
                      <th className="py-4 px-2 text-center">Sunday</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium">07:00 - 08:00</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">Cardio</td>
                      <td className="py-3 px-2 text-center bg-yellow-50 dark:bg-yellow-900/20">Yoga</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">HIIT</td>
                      <td className="py-3 px-2 text-center bg-yellow-50 dark:bg-yellow-900/20">Yoga</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">Cardio</td>
                      <td className="py-3 px-2 text-center bg-purple-50 dark:bg-purple-900/20">Boxing</td>
                      <td className="py-3 px-2 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium">08:00 - 09:00</td>
                      <td className="py-3 px-2 text-center bg-green-50 dark:bg-green-900/20">Weight Loss</td>
                      <td className="py-3 px-2 text-center bg-red-50 dark:bg-red-900/20">Body Building</td>
                      <td className="py-3 px-2 text-center bg-green-50 dark:bg-green-900/20">Weight Loss</td>
                      <td className="py-3 px-2 text-center bg-red-50 dark:bg-red-900/20">Body Building</td>
                      <td className="py-3 px-2 text-center bg-green-50 dark:bg-green-900/20">Weight Loss</td>
                      <td className="py-3 px-2 text-center bg-purple-50 dark:bg-purple-900/20">Boxing</td>
                      <td className="py-3 px-2 text-center bg-yellow-50 dark:bg-yellow-900/20">Yoga</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium">09:00 - 10:00</td>
                      <td className="py-3 px-2 text-center bg-pink-50 dark:bg-pink-900/20">Body Toning</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">HIIT</td>
                      <td className="py-3 px-2 text-center bg-pink-50 dark:bg-pink-900/20">Body Toning</td>
                      <td className="py-3 px-2 text-center bg-orange-50 dark:bg-orange-900/20">Dance</td>
                      <td className="py-3 px-2 text-center bg-pink-50 dark:bg-pink-900/20">Body Toning</td>
                      <td className="py-3 px-2 text-center bg-green-50 dark:bg-green-900/20">Weight Loss</td>
                      <td className="py-3 px-2 text-center bg-yellow-50 dark:bg-yellow-900/20">Yoga</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium">14:00 - 15:00</td>
                      <td className="py-3 px-2 text-center bg-yellow-50 dark:bg-yellow-900/20">Yoga</td>
                      <td className="py-3 px-2 text-center bg-pink-50 dark:bg-pink-900/20">Body Toning</td>
                      <td className="py-3 px-2 text-center bg-yellow-50 dark:bg-yellow-900/20">Yoga</td>
                      <td className="py-3 px-2 text-center bg-pink-50 dark:bg-pink-900/20">Body Toning</td>
                      <td className="py-3 px-2 text-center bg-yellow-50 dark:bg-yellow-900/20">Yoga</td>
                      <td className="py-3 px-2 text-center">-</td>
                      <td className="py-3 px-2 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium">15:00 - 16:00</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">Cardio</td>
                      <td className="py-3 px-2 text-center bg-green-50 dark:bg-green-900/20">Weight Loss</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">Cardio</td>
                      <td className="py-3 px-2 text-center bg-orange-50 dark:bg-orange-900/20">Dance</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">Cardio</td>
                      <td className="py-3 px-2 text-center">-</td>
                      <td className="py-3 px-2 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium">18:00 - 19:00</td>
                      <td className="py-3 px-2 text-center bg-red-50 dark:bg-red-900/20">Body Building</td>
                      <td className="py-3 px-2 text-center bg-purple-50 dark:bg-purple-900/20">Boxing</td>
                      <td className="py-3 px-2 text-center bg-red-50 dark:bg-red-900/20">Body Building</td>
                      <td className="py-3 px-2 text-center bg-purple-50 dark:bg-purple-900/20">Boxing</td>
                      <td className="py-3 px-2 text-center bg-red-50 dark:bg-red-900/20">Body Building</td>
                      <td className="py-3 px-2 text-center">-</td>
                      <td className="py-3 px-2 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium">19:00 - 20:00</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">HIIT</td>
                      <td className="py-3 px-2 text-center bg-orange-50 dark:bg-orange-900/20">Dance</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">HIIT</td>
                      <td className="py-3 px-2 text-center bg-orange-50 dark:bg-orange-900/20">Dance</td>
                      <td className="py-3 px-2 text-center bg-blue-50 dark:bg-blue-900/20">HIIT</td>
                      <td className="py-3 px-2 text-center">-</td>
                      <td className="py-3 px-2 text-center">-</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">20:00 - 21:00</td>
                      <td className="py-3 px-2 text-center bg-green-50 dark:bg-green-900/20">Weight Loss</td>
                      <td className="py-3 px-2 text-center bg-pink-50 dark:bg-pink-900/20">Body Toning</td>
                      <td className="py-3 px-2 text-center bg-green-50 dark:bg-green-900/20">Weight Loss</td>
                      <td className="py-3 px-2 text-center bg-pink-50 dark:bg-pink-900/20">Body Toning</td>
                      <td className="py-3 px-2 text-center bg-orange-50 dark:bg-orange-900/20">Dance</td>
                      <td className="py-3 px-2 text-center">-</td>
                      <td className="py-3 px-2 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-sm">Cardio/HIIT</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span className="text-sm">Yoga</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <span className="text-sm">Body Building</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-sm">Weight Loss</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-400 mr-2"></div>
                  <span className="text-sm">Body Toning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                  <span className="text-sm">Boxing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                  <span className="text-sm">Dance</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.4s' }}>
            <p className="max-w-2xl mx-auto mb-6">
              Schedule subject to change. Please check with us for the most updated class times and availability. Private sessions can be booked outside these hours.
            </p>
            <Link to="/contact" className="btn-primary">
              RESERVE YOUR SPOT
            </Link>
          </div>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="section-padding bg-brand-dark text-white diagonal-box">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Training <span className="text-brand-gold">Philosophy</span></h2>
            <p className="section-subtitle">
              The principles that guide our approach to fitness and wellness
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 animate-on-scroll opacity-0 blur-[5px]">
              <img 
                src="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80" 
                alt="Trainer working with client" 
                className="rounded-2xl shadow-xl"
              />
            </div>
            
            <div className="lg:w-1/2 animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-bold mb-6">Holistic Approach to Fitness</h3>
              <p className="mb-6">
                At Shape Up Fitness, we believe in taking a holistic approach to health and wellness. We understand that true fitness encompasses not just physical strength, but also mental wellbeing, proper nutrition, adequate recovery, and sustainable lifestyle habits.
              </p>
              <p className="mb-8">
                Our training methodology focuses on creating balanced programs that address all aspects of fitness, tailored to your unique body type, goals, and preferences. We emphasize proper form, progressive overload, and varied stimuli to ensure continuous improvement without plateaus or injuries.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <div className="text-brand-gold mb-4">
                    <Trophy size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Result-Oriented</h4>
                  <p className="text-gray-300">
                    We focus on measurable results through consistent tracking and program adjustments.
                  </p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl">
                  <div className="text-brand-gold mb-4">
                    <Users size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Personalized Approach</h4>
                  <p className="text-gray-300">
                    We tailor our programs to your unique body, goals, and fitness level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-brand-blue rounded-2xl overflow-hidden shadow-xl">
            <div className="p-12 text-center text-white animate-on-scroll opacity-0 blur-[5px]">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
              <p className="text-lg mb-8">
                Join Shape Up Fitness today and experience our comprehensive range of services designed to help you achieve your health and fitness goals.
              </p>
              <Link to="/contact" className="btn-secondary inline-block">
                GET STARTED TODAY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
