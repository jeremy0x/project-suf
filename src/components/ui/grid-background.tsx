import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridBackground({ className, children }: GridBackgroundProps) {
  const orbs = useMemo(() => {
    const colors = [
      "bg-orange-500/30",
      "bg-brand-blue/25",
      "bg-blue-500/30",
      "bg-brand-gold/25",
      "bg-purple-500/25",
    ];
    return Array.from({ length: 3 }, (_, i) => ({
      left: `${(i * 30 + 10) % 80}%`,
      top: `${(i * 25 + 5) % 70}%`,
      width: `${25 + i * 5}%`,
      height: `${25 + i * 5}%`,
      bg: colors[i % colors.length],
      blur: `${80 + i * 20}px`,
    }));
  }, []);

  return (
    <div className={cn("relative w-full overflow-hidden bg-brand-dark", className)}>
      {/* Static ambient grid dots */}
      <div
        className="absolute inset-0 z-0 opacity-[0.09]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: `32px 32px`,
        }}
      />

      {/* Static glow orbs */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {orbs.map((orb, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${orb.bg}`}
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.width,
              height: orb.height,
              filter: `blur(${orb.blur})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
