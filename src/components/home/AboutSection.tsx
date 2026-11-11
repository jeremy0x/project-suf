import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { responsiveUrl } from "@/lib/images";
import { ImageReveal, MaskText, Reveal } from "../motion";
import { Btn } from "../site/Btn";

const stats = [
  { value: "100+", label: "Active members" },
  { value: "05", label: "Coaches" },
  { value: "10+", label: "Programmes" },
  { value: "2020", label: "Since" },
];

const benefits = [
  "Personalised training plans",
  "Nutrition guidance",
  "Regular assessments",
  "Expert coaching",
  "Supportive community",
  "Clean, welcoming space",
];

const AboutSection = () => {
  const aboutImages = useQuery(api.siteImages.listBySection, { section: "home-about" }) || [];
  const aboutImage = aboutImages[0]?.url;

  return (
    <section id="about" className="section bg-background text-ink">
      <div className="shell">
        <Reveal from="left">
          <p className="eyebrow mb-10 flex items-center gap-3 text-ink/55 md:mb-14">
            <span>(03)</span>
            <span className="h-px w-8 bg-current" />
            <span>About Shape Up</span>
          </p>
        </Reveal>
        {/* Grid rows stretch, so on desktop the photo is exactly as tall as the text column */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <ImageReveal
              src={aboutImage ? responsiveUrl(aboutImage, "medium") : undefined}
              alt="Members performing barbell and goblet squats"
              className="aspect-[4/5] w-full lg:aspect-auto lg:h-full lg:[&>div]:absolute lg:[&>div]:inset-0"
            />
          </div>

          <div className="col-span-12 flex flex-col justify-between lg:col-span-6 lg:col-start-7">
            <div>
              <MaskText
                lines={["More than", "just a gym.", <span className="text-ink/35">A community.</span>]}
                className="title text-[clamp(2.25rem,4.6vw,4.25rem)]"
              />
              <Reveal delay={0.2} className="mt-10 max-w-lg text-[15px] leading-relaxed text-ink/65">
                Shape Up Fitness opened in 2020 near FUTA South Gate. We combine structured training
                programmes, experienced coaches and a friendly, supportive environment to help you
                reach your goals and feel your best.
              </Reveal>
            </div>

            <dl className="mt-14 grid grid-cols-2 border-t border-ink/15 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.06} className="border-b border-ink/15 py-6 pr-4 sm:border-b-0">
                  <div className="flex flex-col-reverse">
                    <dt className="eyebrow mt-3 text-ink/50">{s.label}</dt>
                    <dd className="title text-4xl tabular-nums md:text-5xl">{s.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <ul className="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <li key={b} className="border-b border-ink/10">
                  <Reveal delay={0.15 + i * 0.04} from="left" className="flex items-baseline gap-4 py-3 text-sm">
                    <span className="eyebrow text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                    {b}
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.3} className="mt-12">
              <Btn to="/about" variant="ink">
                Learn more about us
              </Btn>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
