import { useRef, useState, type ElementType, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { cn } from "@/lib/utils";

import { EASE_CLIP, EASE_SETTLE } from "./ease";

type Edge = "bottom" | "top" | "left" | "right";

/** clip-path that hides an element by collapsing it toward the given edge. */
const HIDDEN: Record<Edge, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};
const SHOWN = "inset(0% 0% 0% 0%)";

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Edge the content grows from. */
  from?: Edge;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/** Wipes content into view with a clip-path. No fades, no drifting. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 1,
  from = "bottom",
  immediate = false,
}: RevealProps) {
  const { reduceMotion } = useAnimation();
  if (reduceMotion) return <div className={className}>{children}</div>;

  const target = { clipPath: SHOWN };
  return (
    <motion.div
      className={className}
      initial={{ clipPath: HIDDEN[from] }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: VIEWPORT })}
      transition={{ duration, delay, ease: EASE_CLIP }}
    >
      {children}
    </motion.div>
  );
}

interface MaskTextProps {
  /** Each entry renders on its own masked line. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}

/** Lines rise out of their own masks, one after another. */
export function MaskText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  immediate = false,
}: MaskTextProps) {
  const { reduceMotion } = useAnimation();
  // Observe the outer element: the lines start translated outside their own
  // masks, so observing them directly can report "not intersecting" forever.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const show = immediate || inView;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block overflow-hidden pb-[0.1em] -mb-[0.1em]", lineClassName)}
        >
          {reduceMotion ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              className="block will-change-transform"
              initial={{ y: "110%" }}
              animate={{ y: show ? "0%" : "110%" }}
              transition={{ duration: 1, delay: delay + i * stagger, ease: EASE_CLIP }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}

interface ImageRevealProps {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  from?: Edge;
  immediate?: boolean;
  loading?: "eager" | "lazy";
}

/** Image frame opens with a clip wipe while the photo settles from a slight zoom. */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  from = "bottom",
  immediate = false,
  loading = "lazy",
}: ImageRevealProps) {
  const { reduceMotion } = useAnimation();
  const [loaded, setLoaded] = useState(false);

  const img = src ? (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg";
        setLoaded(true);
      }}
      className={cn(
        "h-full w-full object-cover transition-opacity duration-700",
        loaded ? "opacity-100" : "opacity-0",
        imgClassName,
      )}
    />
  ) : null;

  const placeholder = !loaded && <div className="absolute inset-0 shimmer-bg" aria-hidden />;

  if (reduceMotion) {
    return (
      <div className={cn("frame", className)}>
        {placeholder}
        {img}
      </div>
    );
  }

  const target = { clipPath: SHOWN };
  return (
    <motion.div
      className={cn("frame", className)}
      initial={{ clipPath: HIDDEN[from] }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: VIEWPORT })}
      transition={{ duration: 1.2, delay, ease: EASE_CLIP }}
    >
      {placeholder}
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.25 }}
        {...(immediate
          ? { animate: { scale: 1 } }
          : { whileInView: { scale: 1 }, viewport: VIEWPORT })}
        transition={{ duration: 1.8, delay, ease: EASE_SETTLE }}
      >
        {img}
      </motion.div>
    </motion.div>
  );
}

/** A hairline that draws itself across. */
export function Rule({
  className,
  delay = 0,
  immediate = false,
}: {
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const { reduceMotion } = useAnimation();
  if (reduceMotion) return <div className={cn("h-px w-full bg-current opacity-15", className)} />;
  return (
    <motion.div
      className={cn("h-px w-full origin-left bg-current opacity-15", className)}
      initial={{ scaleX: 0 }}
      {...(immediate
        ? { animate: { scaleX: 1 } }
        : { whileInView: { scaleX: 1 }, viewport: VIEWPORT })}
      transition={{ duration: 1.2, delay, ease: EASE_CLIP }}
    />
  );
}
