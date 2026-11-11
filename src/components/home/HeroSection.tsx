import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { responsiveUrl } from "@/lib/images";
import { ImageReveal, MaskText, Reveal, Rule } from "../motion";
import { Btn } from "../site/Btn";
import { useSessionStatus } from "@/hooks/useSessionStatus";

const HeroSection = () => {
  const heroImages = useQuery(api.siteImages.listBySection, { section: "hero" });
  const heroImage = heroImages?.[0]?.url;
  const { live, next } = useSessionStatus();

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
                <span className="text-white/25">Stay there.</span>,
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
                Coached strength, conditioning and boxing at FUTA South Gate. Real programmes, real
                coaches, no guesswork. Show up, we&rsquo;ll handle the plan.
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
          <div className="eyebrow grid grid-cols-2 gap-4 pt-5 text-white/50 md:grid-cols-4">
            <span className="flex items-center gap-2 text-white/80">
              {live ? (
                <>
                  <span className="live-dot" /> {live} session — open now
                </>
              ) : (
                <>
                  Next: {next.name} {next.day !== "today" && `(${next.day})`}
                </>
              )}
            </span>
            <span className="hidden md:block">Mon – Sat · 3 sessions daily</span>
            <span className="hidden md:block">100+ members</span>
            <button
              type="button"
              onClick={() => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" })}
              className="roll-host justify-self-end text-white/80 hover:text-white"
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
