
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { CheckCircle, Award, Users, Clock } from 'lucide-react';

const About = () => {
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
      <section className="pt-32 pb-16 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Learn more about Shape Up Fitness, our mission, values, and the team behind our success.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-on-scroll opacity-0 blur-[5px]">
              <h2 className="section-title">Our <span className="text-brand-blue">Story</span></h2>
              <p className="text-lg mb-6">
                Founded in 2015, Shape Up Fitness was born from a passion to create a fitness center that wasn't just about physical transformation, but about building a supportive community where people of all fitness levels could thrive.
              </p>
              <p className="text-lg mb-6">
                Starting with just a small space and limited equipment, we've grown into one of Akure's premier fitness destinations, known for our personalized approach and commitment to helping members achieve their goals.
              </p>
              <p className="text-lg">
                Today, our state-of-the-art facility at Embassy Lodge, FUTA South Gate, features modern equipment, specialized training zones, and a team of expert trainers dedicated to your success.
              </p>
            </div>
            <div className="lg:w-1/2 animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
                  alt="Gym interior" 
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 text-5xl font-bold opacity-10 text-brand-blue">
                  SINCE 2015
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-brand-dark text-white diagonal-box-reverse">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Our <span className="text-brand-gold">Mission & Values</span></h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg animate-on-scroll opacity-0 blur-[5px]">
              <div className="mb-4 text-brand-gold">
                <Award size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p>
                We strive for excellence in everything we do, from our facility maintenance to our training programs and customer service.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.2s' }}>
              <div className="mb-4 text-brand-gold">
                <Users size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p>
                We foster a supportive, inclusive community where members motivate each other and celebrate achievements together.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.4s' }}>
              <div className="mb-4 text-brand-gold">
                <Clock size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4">Dedication</h3>
              <p>
                We're dedicated to your success, providing the guidance, tools, and support you need to reach your fitness goals.
              </p>
            </div>
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto text-center animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg mb-6">
              To inspire and empower individuals to transform their lives through fitness, providing expert guidance and a supportive community that motivates everyone to reach their full potential.
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-20 bg-brand-gold rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Our <span className="text-brand-blue">Team</span></h2>
            <p className="section-subtitle">
              Meet the experts committed to your fitness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Emmanuel Adeniyi",
                role: "Founder & Head Trainer",
                image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                specialties: ["Body Building", "Strength Training"]
              },
              {
                name: "Blessing Okonkwo",
                role: "Yoga & Pilates Instructor",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
                specialties: ["Yoga", "Flexibility"]
              },
              {
                name: "Michael Oladele",
                role: "Boxing Coach",
                image: "https://images.unsplash.com/photo-1567013127542-490d757e6349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                specialties: ["Boxing", "HIIT"]
              },
              {
                name: "Amina Yahaya",
                role: "Nutrition Specialist",
                image: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                specialties: ["Nutrition", "Weight Loss"]
              }
            ].map((member, index) => (
              <div key={index} className="animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-brand-blue mb-3">{member.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-sm px-3 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Our <span className="text-brand-gold">Facility</span></h2>
            <p className="section-subtitle">
              Explore our state-of-the-art gym equipped with everything you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Modern Equipment",
                description: "Latest cardio and strength training machines",
                image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Functional Area",
                description: "Open space for functional training and classes",
                image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
              },
              {
                title: "Boxing Zone",
                description: "Professional boxing equipment and training area",
                image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Free Weights",
                description: "Comprehensive selection of dumbbells and barbells",
                image: "https://images.unsplash.com/photo-1638805981949-362f5154661a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              },
              {
                title: "Yoga Studio",
                description: "Peaceful space for yoga and mindfulness classes",
                image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Locker Rooms",
                description: "Clean, modern changing facilities with showers",
                image: "https://images.unsplash.com/photo-1631385309729-d5577864181d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
            ].map((item, index) => (
              <div key={index} className="animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="rounded-xl overflow-hidden h-full shadow-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 bg-gray-800">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Why <span className="text-brand-blue">Choose Us</span></h2>
            <p className="section-subtitle">
              What makes Shape Up Fitness different from other gyms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Expert Trainers",
                description: "Our certified trainers bring years of experience and specialized knowledge to help you achieve your goals safely and efficiently."
              },
              {
                title: "Personalized Approach",
                description: "We believe everyone's fitness journey is unique, which is why we offer customized programs tailored to your specific needs and goals."
              },
              {
                title: "Supportive Community",
                description: "Join a community of like-minded individuals who support and motivate each other on their fitness journeys."
              },
              {
                title: "Comprehensive Services",
                description: "From weight loss and muscle building to yoga and boxing, we offer a wide range of services to suit diverse fitness interests."
              },
              {
                title: "Nutrition Guidance",
                description: "We provide expert nutritional advice to complement your workout routine and maximize your results."
              },
              {
                title: "Modern Facilities",
                description: "Enjoy working out in our clean, well-maintained facility equipped with the latest fitness technology and equipment."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="flex-shrink-0 text-brand-blue">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-brand-blue rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll opacity-0 blur-[5px]">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl mb-8 text-gray-300 animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.2s' }}>
              Join Shape Up Fitness today and take the first step towards a healthier, stronger you.
            </p>
            <div className="animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.4s' }}>
              <a href="/contact" className="btn-primary">
                GET STARTED TODAY
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
