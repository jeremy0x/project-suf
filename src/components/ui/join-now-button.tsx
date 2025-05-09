import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface JoinNowButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
  source?: string;
  plan?: string;
}

export function JoinNowButton({
  className = "",
  href = "/contact",
  onClick,
  source,
  plan,
}: JoinNowButtonProps) {
  const contactUrl = source
    ? `${href}?source=${source}${
        plan ? `&plan=${encodeURIComponent(plan)}` : ""
      }`
    : href;

  const buttonContent = (
    <motion.div
      className={`bg-brand-blue text-white text-sm font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(14,178,241,0.4)] focus:ring-2 focus:ring-brand-blue/50 flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>JOIN NOW</span>
      <ArrowRight size={16} className="ml-2" />
    </motion.div>
  );

  if (onClick) {
    return <button onClick={onClick}>{buttonContent}</button>;
  }

  return <Link to={contactUrl}>{buttonContent}</Link>;
}
