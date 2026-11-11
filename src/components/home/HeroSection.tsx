import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { responsiveUrl } from "@/lib/images";
import { ImageReveal, MaskText, Reveal, Rule } from "../motion";
import { Btn } from "../site/Btn";
import { useSessionStatus } from "@/hooks/useSessionStatus";
import { useTimeFormat } from "@/hooks/useTimeFormat";
import { formatDuration, formatMinutes } from "@/lib/sessions";

const HeroSection = () => {
  const heroImages = useQuery(api.siteImages.listBySection, { section: "hero" });
  const heroImage = heroImages?.[0]?.url;
  const { live, next, endsIn } = useSessionStatus();
  const [format] = useTimeFormat();

  return (
    <section className="grain relative overflow-hidden bg-ink text-bone">
      <div className="shell relative flex min-h-[100svh] flex-col pb-8 pt-28 md:pt-32">
        <div className="grid flex-1 grid-cols-12 items-end gap-x-6 gap-y-10">
          {/* Headline */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal immediate from="left" delay={0.45}>
              <p className="eyebrow mb-8 flex items-center gap-3 text-white/50">
                <span>Akure, NG</span>
                <span className="h-px w-8 bg-current" />
                <span>Est. 2020</span>
              </p>
            </Reveal>
            <MaskText
              as="h1"
              immediate
              delay={0.5}
              stagger={0.1}
              lines={[
                "Get in",
                <>
                  shape<span className="text-brand-blue">.</span>
                </>,
                <span className="text-white/25">Stay healthy.</span>,
              ]}
              className="display text-[clamp(3.75rem,13vw,12.5rem)]"
            />
          </div>

          {/* Image + copy */}
          <div className="col-span-12 flex flex-col gap-8 lg:col-span-5">
            <ImageReveal
              immediate
              delay={0.7}
              loading="eager"
              src={heroImage ? responsiveUrl(heroImage, "medium") : undefined}
              alt="Members training at Shape Up Fitness"
              className="aspect-[4/3] w-full max-w-md bg-white/5 sm:aspect-[5/4] lg:ml-auto lg:aspect-[4/5]"
            />
            <Reveal immediate delay={1} className="max-w-md lg:ml-auto">
              <p className="text-[15px] leading-relaxed text-white/65">
                Personal training, group sessions and expert coaches at FUTA South Gate, Akure.
                Whether you&rsquo;re just starting out or getting back into it, we&rsquo;ll build a
                plan that works for you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn to="/contact?source=hero" aria-label="Join Shape Up Fitness">
                  Join now
                </Btn>
                <Btn to="/pricing" variant="outline-light">
                  See plans
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Meta strip */}
        <Rule immediate delay={0.9} className="mt-14" />
        <Reveal immediate delay={1.1} from="top">
          {/* One line at every width: status left, detail right; extras only where there's room */}
          <div className="eyebrow flex items-center justify-between gap-6 whitespace-nowrap pt-5 tracking-[0.1em] text-white/50 sm:tracking-[0.18em]">
            <span className="text-white">
              {live ? `${live.name} session on now` : `Next: ${next.session.name}`}
            </span>
            <span className="hidden lg:block">Mon – Sat, 3 sessions a day</span>
            <span className="hidden lg:block">100+ members</span>
            <span className="text-white/70">
              {live
                ? `Ends in ${formatDuration(endsIn)}`
                : `${next.when === "today" ? "Today" : next.when === "tomorrow" ? "Tomorrow" : "Monday"}, ${formatMinutes(next.session.start, format)} WAT`}
            </span>
            <button
              type="button"
              onClick={() => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden text-white/80 hover:text-white md:block"
            >
              Scroll ↓
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
