import { MaskText, Reveal } from "../motion";

const testimonials = [
  {
    name: "Trinity",
    quote:
      "Coach you actually a God send! Literally everyone has complimented me and said I've done really well since starting your gym and I am truly happy. Now just to keep it up and keep it pushing.",
  },
  {
    name: "Oscar",
    quote:
      "Physically: I see nothing as being too heavy. Mentally: the gym has helped me with self discipline. What pain could be more painful than this?",
  },
  {
    name: "Timoty",
    quote:
      "Working out at SUF gym has boosted my consistency in doing other activities apart from working out, and it also improved my stamina.",
  },
  { name: "Ifetundun", quote: "I used to have weak legs, but Shape Up Fitness gym has made my legs stronger." },
  { name: "Tclassic", quote: "Joining SUF gym has given me more confidence and focus." },
  { name: "Olushola", quote: "Ever since I started using Shape Up Fitness gym my reaction time got faster." },
];

const TestimonialsSection = () => {
  const [lead, ...rest] = testimonials;

  return (
    <section className="section bg-background text-ink">
      <div className="shell">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-3">
            <Reveal from="left" className="lg:sticky lg:top-28">
              <p className="eyebrow flex items-center gap-3 text-ink/55">
                <span>(—)</span>
                <span className="h-px w-8 bg-current" />
                <span>From the floor</span>
              </p>
              <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-ink/55">
                What members say after a few months on the floor.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <figure>
              <MaskText
                as="blockquote"
                lines={[`“${lead.quote}”`]}
                className="title text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.08]"
              />
              <Reveal delay={0.2}>
                <figcaption className="eyebrow mt-8 text-ink/55">
                  — {lead.name}, member
                </figcaption>
              </Reveal>
            </figure>

            <ul className="mt-20 grid grid-cols-1 border-t border-ink/15 md:grid-cols-2">
              {rest.map((t, i) => (
                <li
                  key={t.name}
                  className={`border-b border-ink/15 ${i % 2 === 1 ? "md:border-l md:pl-8" : "md:pr-8"}`}
                >
                  <Reveal delay={(i % 2) * 0.08} className="flex h-full flex-col justify-between gap-10 py-8">
                    <p className="text-lg leading-snug">&ldquo;{t.quote}&rdquo;</p>
                    <p className="eyebrow text-ink/50">— {t.name}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
