import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Reveal } from "../motion";
import { SectionHeader } from "../site/SectionHeader";
import { Btn } from "../site/Btn";
import { cn } from "@/lib/utils";

const MembershipPlansSection = () => {
  const dbPlans = useQuery(api.pricing.listPlans);
  const plans = dbPlans
    ? [...dbPlans].sort((a, b) => (a.sortOrder ?? 1) - (b.sortOrder ?? 1)).slice(0, 3)
    : [];

  return (
    <section className="section grain relative bg-ink text-bone">
      <div className="shell relative">
        <SectionHeader
          tone="dark"
          index="04"
          label="Pricing"
          title={["Membership plans"]}
          description="Pay a one-time registration fee, then choose the plan that suits you. No long-term contracts."
          aside={
            <Btn to="/pricing" variant="outline-light">
              See all plans
            </Btn>
          }
        />

        <div className="mt-16 grid grid-cols-1 border-t border-white/10 md:mt-24 md:grid-cols-3">
          {dbPlans === undefined
            ? [0, 1, 2].map((i) => (
                <div key={i} className={cn("h-[420px] border-b border-white/10 p-8 md:border-b-0", i > 0 && "md:border-l")}>
                  <div className="shimmer-dark mb-8 h-4 w-24" />
                  <div className="shimmer-dark mb-12 h-14 w-40" />
                  <div className="space-y-3">
                    {[0, 1, 2].map((f) => (
                      <div key={f} className="shimmer-dark h-3 w-3/4" />
                    ))}
                  </div>
                </div>
              ))
            : plans.map((plan, i) => (
                <Reveal
                  key={plan._id}
                  delay={i * 0.1}
                  className={cn("border-b border-white/10 md:border-b-0", i > 0 && "md:border-l")}
                >
                  <div
                    className={cn(
                      "flex h-full flex-col px-1 py-10 md:px-8 md:py-12",
                      plan.popular && "bg-bone text-ink",
                    )}
                  >
                    <p className={cn("eyebrow h-4", plan.popular ? "text-brand-blue" : "invisible")}>
                      Most popular
                    </p>
                    <h3 className="title mt-8 text-2xl">{plan.name}</h3>
                    <p className="title mt-3 text-[clamp(2.5rem,4vw,3.5rem)] tabular-nums">{plan.price}</p>
                    {plan.features && plan.features.length > 0 && (
                      <ul className="mt-10 flex-1 text-sm">
                        {plan.features.map((f) => (
                          <li
                            key={f}
                            className={cn(
                              "flex gap-3 border-t py-3",
                              plan.popular ? "border-ink/10" : "border-white/10 text-white/70",
                            )}
                          >
                            <span className="text-brand-blue">+</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Btn
                      to={`/contact?source=pricing&plan=${encodeURIComponent(plan.name)}`}
                      variant={plan.popular ? "ink" : "outline-light"}
                      className="mt-10 w-full justify-between"
                    >
                      Choose plan
                    </Btn>
                  </div>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlansSection;
