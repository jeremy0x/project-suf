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
  "Personalised programmes",
  "Nutrition guidance",
  "Regular assessments",
  "Expert coaching",
  "A community that shows up",
  "A space built for work",
];

const AboutSection = () => {
  const aboutImages = useQuery(api.siteImages.listBySection, { section: "home-about" }) || [];
  const aboutImage = aboutImages[0]?.url;

  return (
    <section id="about" className="section bg-background text-ink">
      <div className="shell">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <Reveal from="left">
              <p className="eyebrow mb-10 flex items-center gap-3 text-ink/55">
                <span>(03)</span>
                <span className="h-px w-8 bg-current" />
                <span>About Shape Up</span>
              </p>
            </Reveal>
            <ImageReveal
              src={aboutImage ? responsiveUrl(aboutImage, "medium") : undefined}
              alt="Members performing barbell and goblet squats"
              className="aspect-[4/5] w-full"
            />
          </div>

          <div className="col-span-12 flex flex-col justify-between lg:col-span-6 lg:col-start-7">
            <div>
              <MaskText
                lines={["More than", "a gym. A room", <span className="text-ink/35">full of people</span>, <span className="text-ink/35">getting better.</span>]}
                className="title text-[clamp(2.25rem,4.6vw,4.25rem)]"
              />
              <Reveal delay={0.2} className="mt-10 max-w-lg text-[15px] leading-relaxed text-ink/65">
                Shape Up Fitness started in 2020 in a small space near FUTA South Gate. The approach
                hasn&rsquo;t changed: structured training, coaches who know your name, and a floor
                where everyone pushes everyone else.
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
                Our story
              </Btn>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
