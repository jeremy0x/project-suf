import type { ReactNode } from "react";
import { MaskText, Reveal, Rule } from "@/components/motion";

interface PageHeroProps {
  index: string;
  label: string;
  title: ReactNode[];
  intro?: ReactNode;
  children?: ReactNode;
}

/** Shared opener for inner pages: ink field, oversized title, intro set to the right. */
export function PageHero({ index, label, title, intro, children }: PageHeroProps) {
  return (
    <section className="grain relative bg-ink pb-12 pt-36 text-bone md:pb-16 md:pt-44">
      <div className="shell relative">
        <Reveal immediate from="left" delay={0.35}>
          <p className="eyebrow mb-10 flex items-center gap-3 text-white/50">
            <span>({index})</span>
            <span className="h-px w-8 bg-current" />
            <span>{label}</span>
          </p>
        </Reveal>
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-10">
          <MaskText
            as="h1"
            immediate
            delay={0.4}
            lines={title}
            className="display col-span-12 text-[clamp(3.25rem,11vw,10.5rem)] lg:col-span-8"
          />
          {intro && (
            <Reveal
              immediate
              delay={0.75}
              className="col-span-12 max-w-sm text-[15px] leading-relaxed text-white/60 lg:col-span-4 lg:justify-self-end"
            >
              {intro}
            </Reveal>
          )}
        </div>
        {children}
        <Rule immediate delay={0.6} className="mt-14 md:mt-20" />
      </div>
    </section>
  );
}
