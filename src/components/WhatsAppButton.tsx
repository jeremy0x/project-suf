import { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/2348134460609"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-40 transition-all duration-300 transform hover:scale-110 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <BsWhatsapp size={24} />
      <span className="sr-only">Contact us on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
