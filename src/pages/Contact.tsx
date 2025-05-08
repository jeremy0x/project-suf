
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactInfo = {
  address: "Embassy Lodge, FUTA South Gate, Akure, Ondo State, Nigeria",
  phone: "08134460609",
  email: "info@shapeupfitness.com",
  hours: [
    { days: "Monday - Friday", hours: "7:00 AM - 9:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 6:00 PM" },
    { days: "Sunday", hours: "Closed" }
  ]
};

const faqs = [
  {
    question: "How do I get started with a membership?",
    answer: "You can sign up for a membership by visiting our gym during operating hours, or by filling out the contact form on this page. Our staff will guide you through the registration process and help you select the best membership option for your needs."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a complimentary day pass for new visitors. This allows you to experience our facilities and classes before making a commitment. Please contact us to schedule your free visit."
  },
  {
    question: "What should I bring for my first workout?",
    answer: "We recommend bringing comfortable workout clothes, athletic shoes, a water bottle, and a small towel. Our facility provides lockers for your belongings, but please bring your own lock."
  },
  {
    question: "Do you have shower facilities?",
    answer: "Yes, we have clean, modern shower facilities available for members to use before or after their workouts."
  }
];

const Contact = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Reach out to us with questions, feedback, or to schedule a visit to our gym
            </p>
          </div>
        </div>
      </section>

      {/* Contact & FAQ Tabs */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full inline-flex">
              <button 
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === 'contact' 
                    ? 'bg-brand-blue text-white' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Contact
              </button>
              <button 
                onClick={() => setActiveTab('faq')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === 'faq' 
                    ? 'bg-brand-blue text-white' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                FAQ
              </button>
            </div>
          </div>
          
          {/* Contact Tab Content */}
          {activeTab === 'contact' && (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Info */}
              <div className="lg:w-1/3 animate-on-scroll opacity-0 blur-[5px]">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                          <MapPin className="text-brand-blue" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-gray-600 dark:text-gray-300">{contactInfo.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                          <Phone className="text-brand-blue" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a href={`tel:${contactInfo.phone}`} className="text-brand-blue hover:underline">
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                          <Mail className="text-brand-blue" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href={`mailto:${contactInfo.email}`} className="text-brand-blue hover:underline">
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                          <Clock className="text-brand-blue" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Working Hours</h3>
                        <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                          {contactInfo.hours.map((item, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{item.days}:</span>
                              <span>{item.hours}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:w-2/3 animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  {submitSuccess ? (
                    <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg mb-6">
                      <p className="font-medium">Message sent successfully!</p>
                      <p>Thank you for contacting us. We'll get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent dark:bg-gray-700"
                            required 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent dark:bg-gray-700"
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="phone" className="block mb-2 font-medium">Phone (Optional)</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent dark:bg-gray-700"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                          <select 
                            id="subject" 
                            name="subject" 
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent dark:bg-gray-700"
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="Membership Inquiry">Membership Inquiry</option>
                            <option value="Personal Training">Personal Training</option>
                            <option value="Class Information">Class Information</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          value={formData.message}
                          onChange={handleChange}
                          rows={5} 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent dark:bg-gray-700"
                          required
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="btn-primary flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* FAQ Tab Content */}
          {activeTab === 'faq' && (
            <div className="max-w-3xl mx-auto animate-on-scroll opacity-0 blur-[5px]">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="mb-4">Don't see your question here?</p>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="btn-primary"
                >
                  Contact Us
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Find <span className="text-brand-gold">Us</span></h2>
            <p className="section-subtitle">
              Located at Embassy Lodge, FUTA South Gate, Akure, Ondo State, Nigeria
            </p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-xl animate-on-scroll opacity-0 blur-[5px]">
            <div className="aspect-video">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.534866495809!2d5.151262976181846!3d7.293640292713871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478ec5897919af%3A0xac22bf85d219fa3a!2sEmbassy%20Lodge!5e0!3m2!1sen!2snl!4v1746723293150!5m2!1sen!2snl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Shape Up Fitness Location"
              ></iframe>
            </div>
          </div>
          
          <div className="mt-8 text-center animate-on-scroll opacity-0 blur-[5px]" style={{ animationDelay: '0.3s' }}>
            <p>We're conveniently located near FUTA South Gate. Parking is available on premises.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
