import type { ReactNode } from "react";
import { MaskText, Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index?: string;
  label: string;
  title: ReactNode[];
  description?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Editorial section opener: a numbered label on the left rail,
 * a large masked headline, and an optional note pinned right.
 */
export function SectionHeader({
  index,
  label,
  title,
  description,
  aside,
  tone = "light",
  className,
}: SectionHeaderProps) {
  const muted = tone === "dark" ? "text-white/55" : "text-ink/55";
  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-8", className)}>
      <Reveal from="left" className="col-span-12 md:col-span-3">
        <p className={cn("eyebrow flex items-center gap-3", muted)}>
          {index && (
            <>
              <span>({index})</span>
              <span className="h-px w-8 bg-current" />
            </>
          )}
          <span>{label}</span>
        </p>
      </Reveal>
      <div className="col-span-12 md:col-span-9">
        <MaskText lines={title} className="title text-[clamp(2.5rem,6.5vw,6rem)]" />
        {(description || aside) && (
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {description && (
              <Reveal delay={0.2} className={cn("max-w-md text-[15px] leading-relaxed", muted)}>
                {description}
              </Reveal>
            )}
            {aside && <Reveal delay={0.3}>{aside}</Reveal>}
          </div>
        )}
      </div>
    </div>
  );
}
