import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Layout from "../components/Layout";
import { responsiveUrl } from "@/lib/images";
import { ImageReveal, MaskText, Reveal } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import CTASection from "@/components/home/CTASection";

const teamMembers = [
  {
    category: "adebayo-williams",
    name: "Adebayo Williams",
    role: "Founder & Head Coach",
    image: "",
    specialties: ["Body Building", "Strength Training", "Weight Loss", "Diet Training", "Boxing Training", "Cardio Training"],
  },
  {
    category: "eteng-elvis",
    name: "Eteng Elvis",
    role: "Assistant Coach",
    image: "",
    specialties: ["Body Building", "Strength Training", "Weight Loss", "Cardio Training"],
  },
  {
    category: "lawal-oluwatobi",
    name: "Lawal Oluwatobi",
    role: "Substitute Coach",
    image: "",
    specialties: ["Calisthenics", "Strength training"],
  },
  {
    category: "uthman-raheem",
    name: "Uthman Raheem",
    role: "Boxing Coach",
    image: "",
    specialties: ["Boxing"],
  },
  {
    category: "yusuf-mimololuwami",
    name: "Yusuf Mimololuwami",
    role: "Yoga instructor",
    image: "",
    specialties: ["Yoga", "Flexibility"],
  },
  {
    category: "akande-moses",
    name: "Akande Moses Oluwafemi",
    role: "Data Manager",
    image: "",
    specialties: ["Records Management", "Subscription Management"],
  },
];

const pillars = [
  {
    title: "Certified coaches",
    body: "Experienced, certified trainers who plan your sessions and correct your form, so progress is safe and steady.",
  },
  {
    title: "A real community",
    body: "Members who know each other, push each other and celebrate the small wins along with the big ones.",
  },
  {
    title: "Kept-up equipment",
    body: "Clean, well-maintained kit and a floor laid out for strength, conditioning and boxing.",
  },
];

const About = () => {
  const aboutImages = useQuery(api.siteImages.listBySection, { section: "about-story" }) || [];
  const aboutImage = aboutImages[0]?.url;
  const rawTeamImages = useQuery(api.siteImages.listBySection, { section: "team" }) || [];
  const teamImageByCategory = Object.fromEntries(
    (rawTeamImages as { category?: string; url: string }[]).map((i) => [i.category, i.url]),
  );

  const team = useMemo(
    () =>
      teamMembers.map((m) => ({
        ...m,
        image: (m.category && teamImageByCategory[m.category]) || m.image,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rawTeamImages],
  );

  return (
    <Layout>
      <PageHero
        index="A"
        label="About"
        title={["About", <span className="text-white/30">us</span>]}
        intro="Learn more about Shape Up Fitness: our story, what we stand for and the team behind it."
      />

      {/* Story */}
      <section className="section bg-background text-ink">
        <div className="shell grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-6">
            <ImageReveal
              src={aboutImage ? responsiveUrl(aboutImage, "medium") : undefined}
              alt="Shape Up Fitness community group photo"
              className="aspect-[4/3] w-full"
            />
            <Reveal delay={0.2}>
              <p className="eyebrow mt-4 text-ink/45">#ShapeUpFitness — FUTA South Gate</p>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal from="left">
              <p className="eyebrow mb-8 flex items-center gap-3 text-ink/55">
                <span>(01)</span>
                <span className="h-px w-8 bg-current" />
                <span>Our story</span>
              </p>
            </Reveal>
            <MaskText
              lines={["Our story"]}
              className="title text-[clamp(2.25rem,4.5vw,4rem)]"
            />
            <Reveal delay={0.15} className="mt-10 space-y-5 text-[15px] leading-relaxed text-ink/70">
              <p>
                Shape Up Fitness opened in 2020 with one idea: a gym where anyone, from any starting
                point, could get properly coached and feel part of something.
              </p>
              <p>
                From a modest space and a lot of determination, it has grown into one of Akure&rsquo;s
                best-loved training floors, known for guidance that&rsquo;s actually personal.
              </p>
              <p>
                Today, at Embassy Lodge by FUTA South Gate, we run a full range of programmes with a
                team of coaches committed to getting you results.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section grain relative bg-ink text-bone">
        <div className="shell relative">
          <SectionHeader
            tone="dark"
            index="02"
            label="What sets us apart"
            title={["Why choose us"]}
          />
          <div className="mt-16 grid grid-cols-1 border-t border-white/10 md:mt-24 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.1}
                className={`border-b border-white/10 py-10 md:border-b-0 md:px-8 md:py-12 ${i > 0 ? "md:border-l" : "md:pl-0"}`}
              >
                <p className="eyebrow text-brand-blue">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="title mt-12 text-3xl">{p.title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-background text-ink">
        <div className="shell">
          <SectionHeader
            index="03"
            label="Our coaches"
            title={["Meet the team"]}
          />
          <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
            {team.map((m, i) => (
              <li key={m.category} className="group">
                <ImageReveal
                  delay={(i % 3) * 0.1}
                  src={m.image ? responsiveUrl(m.image, "medium") : undefined}
                  alt={m.name}
                  className="aspect-[3/4] w-full"
                  imgClassName="object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
                <Reveal delay={0.1 + (i % 3) * 0.1}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
                    <h3 className="title text-2xl">{m.name}</h3>
                    <span className="eyebrow shrink-0 text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="eyebrow mt-4 text-brand-blue">{m.role}</p>
                  <p className="mt-2 text-sm text-ink/55">{m.specialties.join(" · ")}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
