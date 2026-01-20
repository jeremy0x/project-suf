import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BeamsBackground } from "@/components/ui/beams-background";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const source = searchParams.get("source");
    const plan = searchParams.get("plan");

    if (source) {
      let subject = "";
      let message = "";

      switch (source) {
        case "pricing":
          subject = plan ? `Inquiry about ${plan} plan` : "Membership Inquiry";
          message = plan
            ? `I'm interested in learning more about the ${plan} plan.`
            : "I'm interested in learning more about your membership options.";
          break;
        case "home":
          subject = "General Inquiry";
          message = "I'm interested in learning more about Shape Up Fitness.";
          break;
        case "services":
          subject = "Service Inquiry";
          message = "I'm interested in learning more about your services.";
          break;
        case "gallery":
          subject = "Facility Tour Request";
          message = "I'd like to schedule a tour of your facility.";
          break;
        case "navbar":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "about":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "pricing_join":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "pricing_tour":
          subject = "Facility Tour Request";
          message = "I'd like to schedule a tour of your facility.";
          break;
        case "about_cta":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "services_cta":
          subject = "Service Inquiry";
          message = "I'm interested in learning more about your services.";
          break;
        case "sessions_cta":
          subject = "Session Inquiry";
          message = "I'm interested in learning more about your sessions.";
          break;
        default:
          subject = "General Inquiry";
          message = "I'm interested in learning more about Shape Up Fitness.";
          break;
      }

      setFormData((prev) => ({
        ...prev,
        subject,
        message,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/dad85d4bbe7c6a7258fa71605ba1c640",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success === "true") {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <BeamsBackground className="pt-32 pb-16 text-white" intensity="strong">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Contact Us
            </h1>
            <p className="text-lg text-white/80">
              Get in touch with us for any inquiries or to start your fitness
              journey
            </p>
          </motion.div>
        </div>
      </BeamsBackground>

      {/* Contact Form Section */}
      <section className="section-padding bg-background relative overflow-hidden !px-0 sm:!px-4">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>
        <div className="sm:container mx-auto px-0 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="glass-card p-6 sm:p-8 rounded-none sm:rounded-xl shadow-none sm:shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 font-heading">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition text-sm"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition text-sm"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition text-sm"
                    placeholder="Message subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition min-h-[175px] text-sm"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <InteractiveHoverButton
                  type="submit"
                  disabled={isSubmitting}
                  text={isSubmitting ? "Sending..." : "Send Message"}
                  className="w-full bg-brand-blue border-brand-blue text-white font-heading disabled:opacity-70 disabled:cursor-not-allowed"
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
                />
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="glass-card p-6 sm:p-8 rounded-none sm:rounded-xl shadow-none sm:shadow-lg space-y-6">
                <h2 className="text-2xl font-bold mb-4 font-heading">
                  Contact Information
                </h2>
                <div className="space-y-4 *:text-sm">
                  <div className="flex items-center">
                    <MapPin
                      className="text-brand-blue mr-3 flex-shrink-0"
                      size={18}
                    />
                    <p>
                      Embassy Lodge, FUTA South Gate, Akure, Ondo State, Nigeria
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone
                      className="text-brand-blue mr-3 flex-shrink-0"
                      size={18}
                    />
                    <a
                      href="tel:08134460609"
                      className="hover:text-brand-blue transition-colors"
                    >
                      08134460609
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail
                      className="text-brand-blue mr-3 flex-shrink-0"
                      size={18}
                    />
                    <a
                      href="mailto:shapeupfitnessclub326@gmail.com"
                      className="hover:text-brand-blue transition-colors"
                    >
                      shapeupfitnessclub326@gmail.com
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Operating Hours</h3>
                  <ul className="space-y-2 *:text-sm">
                    <li className="flex justify-between">
                      <span>Monday - Saturday:</span>
                      <span>7:00 AM - 10:00 AM</span>
                    </li>
                    <li className="flex justify-between">
                      <span></span>
                      <span>2:00 PM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span></span>
                      <span>6:00 PM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Google Maps */}
              <div className="overflow-hidden rounded-xl shadow-lg relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5347444318777!2d5.153839200000001!3d7.293654100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478fa799372cab%3A0xedbb4164cbf23193!2sShape%20Up%20Fitness%20Gym!5e0!3m2!1sen!2sng!4v1768784956454!5m2!1sen!2sng"
                  width="100%"
                  height="300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shape Up Fitness Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
