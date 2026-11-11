import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Layout from "../components/Layout";
import { responsiveUrl } from "@/lib/images";
import { services } from "@/lib/services";
import { ImageReveal, MaskText, Reveal } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import SessionsSection from "@/components/home/SessionsSection";
import CTASection from "@/components/home/CTASection";

const approach = [
  {
    title: "Personal programmes",
    body: "Built around your level and goal, then adjusted by a coach as you progress.",
  },
  {
    title: "Tracked progress",
    body: "Regular check-ins on body composition, strength and performance so you know it's working.",
  },
  {
    title: "Flexible hours",
    body: "Three sessions a day, six days a week. Fit training around life, not the other way round.",
  },
];

const Services = () => {
  const rawImages = useQuery(api.siteImages.listBySection, { section: "services" });
  const rawIcons = useQuery(api.siteImages.listBySection, { section: "service-icons" });
  const rawPhilosophy = useQuery(api.siteImages.listBySection, { section: "philosophy" });
  const imageBy = Object.fromEntries(
    ((rawImages || []) as { category?: string; url: string }[]).map((i) => [i.category, i.url]),
  );
  const iconBy = Object.fromEntries(
    ((rawIcons || []) as { category?: string; url: string }[]).map((i) => [i.category, i.url]),
  );
  const philosophyImage = ((rawPhilosophy || []) as { url: string }[])[0]?.url;

  return (
    <Layout>
      <PageHero
        index="S"
        label="Services"
        title={["Our", <span className="text-white/30">services</span>]}
        intro="A full range of coached programmes to help you get fitter, stronger and healthier."
      />

      <section className="section bg-background text-ink">
        <div className="shell">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const img = imageBy[s.category];
              const icon = iconBy[`${s.category}-icon`];
              return (
                <li key={s.category} className="group">
                  <div className="relative">
                    <ImageReveal
                      delay={(i % 3) * 0.1}
                      src={img ? responsiveUrl(img, "medium") : undefined}
                      alt={s.title}
                      className="aspect-[4/5] w-full"
                      imgClassName="object-top"
                    />
                    {icon && (
                      <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center bg-bone">
                        <img src={responsiveUrl(icon, "thumb")} alt="" className="h-8 w-8 object-contain" />
                      </span>
                    )}
                  </div>
                  <Reveal delay={0.1 + (i % 3) * 0.1}>
                    <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
                      <h2 className="title text-2xl md:text-3xl">{s.title}</h2>
                      <span className="eyebrow text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.description}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <SessionsSection index="02" />

      {/* Approach */}
      <section className="section bg-background text-ink">
        <div className="shell">
          <SectionHeader
            index="03"
            label="Approach"
            title={["Our approach"]}
            description="Expert guidance, a plan that adapts as you progress, and a supportive community around you."
          />
          <ol className="mt-16 border-t border-ink/15 md:mt-24">
            {approach.map((a, i) => (
              <li key={a.title} className="border-b border-ink/15">
                <Reveal delay={i * 0.08} className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-8 md:py-10">
                  <span className="eyebrow col-span-2 text-brand-blue md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="title col-span-10 text-3xl md:col-span-5 md:text-4xl">{a.title}</h3>
                  <p className="col-span-10 col-start-3 text-[15px] leading-relaxed text-ink/60 md:col-span-5 md:col-start-auto">
                    {a.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section grain relative bg-ink text-bone">
        <div className="shell relative grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <ImageReveal
              src={philosophyImage ? responsiveUrl(philosophyImage, "medium") : undefined}
              alt="Coach working with a member"
              className="aspect-[4/5] w-full bg-white/5"
            />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal from="left">
              <p className="eyebrow mb-8 flex items-center gap-3 text-white/50">
                <span>(04)</span>
                <span className="h-px w-8 bg-current" />
                <span>Philosophy</span>
              </p>
            </Reveal>
            <MaskText
              lines={["Our training", <span className="text-white/30">philosophy</span>]}
              className="title text-[clamp(2.5rem,5vw,4.5rem)]"
            />
            <Reveal delay={0.15} className="mt-10 space-y-5 text-[15px] leading-relaxed text-white/65">
              <p>
                We take a whole-person approach to fitness. Strength matters, but so do recovery,
                nutrition, rest and habits you can stick with, so our programmes cover all of it.
              </p>
              <p>
                Every plan is shaped around your body, your goal and your week. We focus on form,
                progressive overload and enough variety to keep you improving without plateaus or
                injuries.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
              {[
                ["Result-oriented", "Measured progress, with the programme adjusted as you go."],
                ["Personal", "Tailored to your body, goals and current fitness."],
              ].map(([t, b], i) => (
                <Reveal key={t} delay={0.2 + i * 0.08} className={`py-6 ${i ? "sm:border-l sm:border-white/10 sm:pl-6" : "sm:pr-6"}`}>
                  <h4 className="title text-xl">{t}</h4>
                  <p className="mt-2 text-sm text-white/55">{b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;
