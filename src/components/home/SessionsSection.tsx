import { sessions } from "@/lib/sessions";
import { useSessionStatus } from "@/hooks/useSessionStatus";
import { Reveal } from "../motion";
import { SectionHeader } from "../site/SectionHeader";
import { Btn } from "../site/Btn";
import { cn } from "@/lib/utils";

const SessionsSection = ({ index = "02" }: { index?: string }) => {
  const { live } = useSessionStatus();

  return (
    <section className="section grain relative bg-ink text-bone">
      <div className="shell relative">
        <SectionHeader
          tone="dark"
          index={index}
          label="Session times"
          title={["Three doors.", <span className="text-white/30">Pick one.</span>]}
          description="Monday to Saturday. Coaches on the floor for every session. Sundays we rest — you should too."
          aside={
            <Btn to="/contact?source=sessions_cta" variant="outline-light">
              Book a session
            </Btn>
          }
        />

        <div className="mt-16 grid grid-cols-1 border-t border-white/10 md:mt-24 md:grid-cols-3">
          {sessions.map((s, i) => {
            const isLive = live === s.name;
            return (
              <Reveal
                key={s.name}
                delay={i * 0.1}
                className={cn(
                  "relative border-b border-white/10 md:border-b-0",
                  i > 0 && "md:border-l",
                )}
              >
                <div
                  className={cn(
                    "flex h-full flex-col justify-between gap-16 px-1 py-10 transition-colors duration-700 md:px-8 md:py-14",
                    isLive && "bg-brand-blue text-white",
                  )}
                >
                  <div className="eyebrow flex items-center justify-between text-current opacity-70">
                    <span>{String(i + 1).padStart(2, "0")} — {s.name}</span>
                    {isLive && (
                      <span className="flex items-center gap-2 opacity-100">
                        <span className="live-dot !bg-white" /> Live
                      </span>
                    )}
                  </div>
                  <p className="title text-[clamp(2.75rem,5vw,4.5rem)] tabular-nums">
                    {s.label.split(" – ")[0]}
                    <span className={cn("block", isLive ? "text-white/60" : "text-white/30")}>
                      {s.label.split(" – ")[1]}
                    </span>
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SessionsSection;
