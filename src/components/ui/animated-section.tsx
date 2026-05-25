import { motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const INITIAL_POSITIONS = {
  up: { y: 20, opacity: 0 },
  down: { y: -20, opacity: 0 },
  left: { x: 20, opacity: 0 },
  right: { x: -20, opacity: 0 },
} as const;

const ANIMATE_POSITIONS = {
  up: { y: 0, opacity: 1 },
  down: { y: 0, opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
} as const;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const { reduceMotion } = useAnimation();

  return (
    <motion.div
      className={className}
      initial={INITIAL_POSITIONS[direction]}
      whileInView={ANIMATE_POSITIONS[direction]}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: reduceMotion ? 0 : 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
