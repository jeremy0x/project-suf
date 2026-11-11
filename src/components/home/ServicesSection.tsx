import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { responsiveUrl } from "@/lib/images";
import { services } from "@/lib/services";
import { Reveal } from "../motion";
import { SectionHeader } from "../site/SectionHeader";
import { Arrow, Btn } from "../site/Btn";

const ServicesSection = () => {
  const rawIcons = useQuery(api.siteImages.listBySection, { section: "service-icons" }) || [];
  const iconByCategory = Object.fromEntries(
    (rawIcons as { category?: string; url: string }[]).map((i) => [i.category, i.url]),
  );

  return (
    <section id="offer" className="section bg-background text-ink">
      <div className="shell">
        <SectionHeader
          index="01"
          label="Services"
          title={["What we offer"]}
          description="All our programmes are coached in person and adjusted as you progress. Choose one, or let a coach put together the right mix for your goals."
          aside={
            <Btn to="/services" variant="outline-dark">
              All services
            </Btn>
          }
        />

        <ul className="mt-16 border-t border-ink/15 md:mt-24">
          {services.map((s, i) => {
            const icon = iconByCategory[`${s.category}-icon`];
            return (
              <li key={s.category} className="border-b border-ink/15">
                <Reveal delay={i * 0.04} duration={0.9}>
                  <Link
                    to="/services"
                    aria-label={`${s.title}: ${s.description}`}
                    className="group relative grid grid-cols-12 items-center gap-x-6 px-1 py-6 md:px-4 md:py-8"
                  >
                    {/* Ink fill wipes up from the bottom of the row on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-ink transition-[clip-path] duration-700 ease-in-out-quart [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                    />
                    <span className="eyebrow relative col-span-2 text-ink/40 transition-colors duration-500 group-hover:text-white/40 md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="title relative col-span-10 text-[clamp(1.75rem,4vw,3.25rem)] transition-[color,transform] duration-700 ease-in-out-quart group-hover:translate-x-2 group-hover:text-bone md:col-span-5">
                      {s.title}
                    </span>
                    <span className="relative col-span-10 col-start-3 mt-2 text-sm text-ink/55 transition-colors duration-500 group-hover:text-white/60 md:col-span-4 md:col-start-auto md:mt-0">
                      {s.description}
                    </span>
                    <span className="relative hidden items-center justify-end gap-4 md:col-span-2 md:flex">
                      {icon && (
                        <img
                          src={responsiveUrl(icon, "thumb")}
                          alt=""
                          className="h-10 w-10 object-contain opacity-0 transition-opacity duration-500 [filter:brightness(0)_invert(1)] group-hover:opacity-100"
                        />
                      )}
                      <Arrow className="h-5 w-5 -rotate-45 text-ink transition-[transform,color] duration-700 ease-in-out-quart group-hover:rotate-0 group-hover:text-brand-blue" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;
