import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { cn } from "@/lib/utils";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/2348134460609"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{ clipPath: visible ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center bg-[#25D366] text-ink transition-[clip-path] duration-700 ease-in-out-quart md:bottom-8 md:right-8",
        !visible && "pointer-events-none",
      )}
    >
      <BsWhatsapp size={20} />
    </a>
  );
};

export default WhatsAppButton;
