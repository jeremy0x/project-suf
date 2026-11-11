import { Link } from "react-router-dom";
import { MaskText, Reveal } from "../motion";
import { Arrow } from "../site/Btn";

const CTASection = () => (
  <section className="relative overflow-hidden bg-brand-blue text-ink">
    <Link
      to="/contact?source=home"
      className="group shell relative block py-20 md:py-32"
      aria-label="Get started at Shape Up Fitness"
    >
      {/* Ink sweeps across the whole band on hover */}
      <span
        aria-hidden
        className="absolute inset-0 bg-ink transition-[clip-path] duration-1000 ease-in-out-quart [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
      />
      <div className="relative grid grid-cols-12 items-end gap-6">
        <div className="col-span-12 lg:col-span-9">
          <Reveal from="left">
            <p className="eyebrow mb-8 text-ink/60 transition-colors duration-700 group-hover:text-white/50">
              Join Shape Up
            </p>
          </Reveal>
          <MaskText
            lines={["Ready to", "get started?"]}
            className="display text-[clamp(3.5rem,12vw,11rem)] transition-colors duration-700 group-hover:text-bone"
          />
        </div>
        <div className="col-span-12 flex items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-end">
          <p className="max-w-xs text-sm leading-relaxed text-ink/70 transition-colors duration-700 group-hover:text-white/60 lg:text-right">
            Visit us for a tour, meet the coaches and find the plan that&rsquo;s right for you.
          </p>
          <span className="flex h-20 w-20 shrink-0 items-center justify-center border border-ink/30 transition-colors duration-700 group-hover:border-white/20 group-hover:text-brand-blue md:h-28 md:w-28">
            <Arrow diagonal className="h-8 w-8 transition-transform duration-700 ease-in-out-quart group-hover:rotate-0" />
          </span>
        </div>
      </div>
    </Link>
  </section>
);

export default CTASection;
