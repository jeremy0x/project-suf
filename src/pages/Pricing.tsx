import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { useLocation } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import Layout from "../components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/radix-accordion";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Btn } from "@/components/site/Btn";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What's included in the registration fee?",
    a: "An initial fitness assessment, an orientation on the equipment, locker setup and your member profile in our system.",
  },
  {
    q: "Can I pause or cancel my membership?",
    a: "Yes. There are no long-term lock-in contracts. Speak to the front desk to pause or change your plan.",
  },
  {
    q: "Are personal trainers included?",
    a: "Some premium and personal training tiers include a dedicated trainer. For other plans, a trainer add-on is available for a small monthly fee.",
  },
  {
    q: "What are the opening hours?",
    a: "Monday to Saturday across three sessions: 7–10am, 2–4pm and 6–9pm (WAT). We're closed on Sundays.",
  },
];

function PlanCard({ plan, index }: { plan: Doc<"pricingPlans">; index: number }) {
  const featured = plan.popular || plan.recommended;
  return (
    <Reveal delay={(index % 4) * 0.08} className="h-full">
      <article
        className={cn(
          "flex h-full flex-col border p-6 md:p-7",
          featured ? "border-ink bg-ink text-bone" : "border-ink/15",
        )}
      >
        {(plan.popular || plan.recommended) && (
          <p className={cn("eyebrow mb-6", plan.popular ? "text-brand-blue" : "text-brand-gold")}>
            {plan.popular ? "Most popular" : "Recommended"}
          </p>
        )}

        <h3 className="title text-xl">{plan.name}</h3>
        <p className="title mt-2 text-4xl tabular-nums">{plan.price}</p>
        {plan.savings && (
          <p className={cn("eyebrow mt-3", featured ? "text-brand-gold" : "text-green-700")}>
            {plan.savings}
          </p>
        )}
        {plan.tagline && (
          <p className={cn("mt-4 text-sm", featured ? "text-white/70" : "text-ink/70")}>{plan.tagline}</p>
        )}
        {plan.description && (
          <p className={cn("mt-2 text-xs leading-relaxed", featured ? "text-white/50" : "text-ink/50")}>
            {plan.description}
          </p>
        )}

        {plan.features && plan.features.length > 0 && (
          <ul className="mt-6 flex-1 text-sm">
            {plan.features.map((f) => (
              <li
                key={f}
                className={cn("flex gap-3 border-t py-2.5", featured ? "border-white/10" : "border-ink/10")}
              >
                <span className="text-brand-blue">+</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {plan.trainerAddOn && (
          <p className={cn("mt-4 text-xs", featured ? "text-white/50" : "text-ink/50")}>{plan.trainerAddOn}</p>
        )}

        <Btn
          to={`/contact?source=pricing&plan=${encodeURIComponent(plan.name)}`}
          variant={featured ? "solid" : "outline-dark"}
          className="mt-8 w-full justify-between"
        >
          Get started
        </Btn>
      </article>
    </Reveal>
  );
}

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("all");
  const location = useLocation();

  const fetchedPlans = useQuery(api.pricing.listPlans);
  const fetchedCategories = useQuery(api.pricing.listCategories);
  const registration = useQuery(api.pricing.getConfig, { key: "registration" });

  useEffect(() => {
    if (!location.hash) return;
    const id = setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }), 400);
    return () => clearTimeout(id);
  }, [location]);

  const categories = fetchedCategories || [];
  const plans = (fetchedPlans || []) as Doc<"pricingPlans">[];
  const tabs = [{ key: "all", label: "All plans" }, ...categories.map((c) => ({ key: c.name, label: c.label }))];
  const visibleCategories = categories.filter((c) => activeTab === "all" || activeTab === c.name);
  const isLoading = fetchedPlans === undefined || fetchedCategories === undefined;

  return (
    <Layout>
      <PageHero
        index="P"
        label="Pricing"
        title={["Pricing"]}
        intro="Clear prices with no long-term contracts. Pay a one-time registration fee, then pick the plan that suits you."
      >
        {registration && (
          <Reveal immediate delay={0.9} className="mt-14">
            <div className="flex flex-col gap-4 border border-white/15 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="eyebrow text-white/50">{registration.title}</p>
                {registration.description && (
                  <p className="mt-2 max-w-lg text-sm text-white/60">{registration.description}</p>
                )}
              </div>
              <p className="title text-5xl tabular-nums text-brand-blue">{registration.price}</p>
            </div>
          </Reveal>
        )}
      </PageHero>

      <section className="section bg-background text-ink">
        <div className="shell">
          {isLoading ? (
            <>
              <div className="mb-14 flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="shimmer-bg h-9 w-28" />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="shimmer-bg h-[380px]" />
                ))}
              </div>
            </>
          ) : (
            <>
              <Reveal from="left" className="mb-16 flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    data-active={activeTab === t.key}
                    onClick={() => setActiveTab(t.key)}
                    className="chip"
                  >
                    {t.label}
                  </button>
                ))}
              </Reveal>

              <div className="space-y-24">
                {visibleCategories.map((cat, ci) => {
                  const catPlans = plans.filter((p) => p.category === cat.name);
                  if (catPlans.length === 0 && activeTab !== cat.name) return null;
                  return (
                    <div key={cat.name}>
                      <Reveal className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
                        <h2 className="title text-3xl md:text-5xl">
                          <span className="eyebrow mr-4 align-middle text-ink/40">
                            {String(ci + 1).padStart(2, "0")}
                          </span>
                          {cat.label}
                        </h2>
                        {cat.name === "personal" && (
                          <span className="eyebrow text-brand-blue">Recommended for beginners</span>
                        )}
                      </Reveal>
                      {catPlans.length === 0 ? (
                        <p className="text-sm text-ink/50">No plans in this category right now.</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                          {catPlans.map((plan, i) => (
                            <PlanCard key={plan._id} plan={plan} index={i} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section id="faq" className="section grain relative scroll-mt-20 bg-ink text-bone">
        <div className="shell relative">
          <SectionHeader
            tone="dark"
            label="FAQ"
            title={["Frequently asked", <span className="text-white/30">questions</span>]}
          />
          <Reveal className="mt-16 md:mt-24 md:pl-[25%]">
            <Accordion type="single" collapsible className="border-t border-white/10">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="gap-6 py-6 text-left text-lg font-medium hover:no-underline md:text-2xl">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-8 text-[15px] leading-relaxed text-white/60">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="section bg-background text-ink">
        <div className="shell">
          <SectionHeader
            label="Groups & business"
            title={["Need a custom plan?"]}
            description="We offer corporate packages, team discounts and home coaching. Get in touch and we'll put something together for you."
            aside={
              <Btn to="/contact?source=pricing_custom_cta" variant="ink">
                Talk to us
              </Btn>
            }
          />
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
