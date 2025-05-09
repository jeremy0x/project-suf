import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  blurAmount?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blurAmount = 8,
}) => {
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 20, opacity: 0, filter: `blur(${blurAmount}px)` };
      case "down":
        return { y: -20, opacity: 0, filter: `blur(${blurAmount}px)` };
      case "left":
        return { x: 20, opacity: 0, filter: `blur(${blurAmount}px)` };
      case "right":
        return { x: -20, opacity: 0, filter: `blur(${blurAmount}px)` };
      default:
        return { y: 20, opacity: 0, filter: `blur(${blurAmount}px)` };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1, filter: "blur(0px)" };
      case "left":
      case "right":
        return { x: 0, opacity: 1, filter: "blur(0px)" };
      default:
        return { y: 0, opacity: 1, filter: "blur(0px)" };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
