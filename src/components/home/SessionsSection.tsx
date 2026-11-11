import { useEffect, useState } from "react";
import {
  sessions,
  formatDuration,
  formatMinutes,
  viewerOffsetFromGym,
  GYM_TZ_LABEL,
} from "@/lib/sessions";
import { useSessionStatus } from "@/hooks/useSessionStatus";
import { useTimeFormat } from "@/hooks/useTimeFormat";
import { Reveal } from "../motion";
import { SectionHeader } from "../site/SectionHeader";
import { Btn } from "../site/Btn";
import { TimeToggle } from "../site/TimeToggle";
import { SessionTime } from "../site/SessionTime";
import { cn } from "@/lib/utils";

const SessionsSection = ({ index = "02" }: { index?: string }) => {
  const status = useSessionStatus();
  const [format] = useTimeFormat();
  // Read the viewer's offset after mount so server and client markup agree.
  const [offset, setOffset] = useState(0);
  useEffect(() => setOffset(viewerOffsetFromGym()), []);

  const closedToday = status.day === 0;

  return (
    <section className="section grain relative bg-ink text-bone">
      <div className="shell relative">
        <SectionHeader
          tone="dark"
          index={index}
          label="Opening hours"
          title={["Session times"]}
          description="We're open Monday to Saturday with three sessions a day, and closed on Sundays. Come to whichever session fits your day."
          aside={
            <div className="flex flex-wrap items-center gap-3">
              <TimeToggle tone="dark" />
              <Btn to="/contact?source=sessions_cta" variant="outline-light">
                Book a session
              </Btn>
            </div>
          }
        />

        {/* Clock strip: gym time, and a note when the viewer is somewhere else */}
        <Reveal className="mt-16 md:mt-24">
          <div className="eyebrow flex flex-col gap-2 border-t border-white/10 py-4 text-white/50 md:flex-row md:items-center md:justify-between">
            <span className="flex items-center gap-3 text-white/80">
              {status.live ? <span className="live-dot" /> : <span className="h-1.5 w-1.5 bg-white/30" />}
              Akure now · {formatMinutes(status.minutes, format)} {closedToday && "· Closed today"}
            </span>
            <span>
              All times in {GYM_TZ_LABEL}
              {offset !== 0 && " · your local time shown below each session"}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 border-t border-white/10 md:grid-cols-3">
          {sessions.map((s, i) => {
            const isLive = status.live?.name === s.name;
            const isNext = !status.live && status.next.session.name === s.name;
            const isDone = !closedToday && !isLive && status.minutes >= s.end;

            return (
              <Reveal
                key={s.name}
                delay={i * 0.1}
                className={cn("border-b border-white/10 md:border-b-0", i > 0 && "md:border-l")}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col justify-between gap-14 px-1 py-10 transition-colors duration-700 md:px-8 md:py-12",
                    isLive && "bg-brand-blue px-5 pb-20 text-white md:px-8 md:pb-20",
                    isDone && "text-white/40",
                  )}
                  aria-current={isLive ? "time" : undefined}
                >
                  <div className="eyebrow flex items-center justify-between gap-4">
                    <span className={cn(!isLive && "opacity-70")}>
                      {String(i + 1).padStart(2, "0")} — {s.name}
                    </span>
                    {isLive && (
                      <span className="flex items-center gap-2 bg-ink px-2 py-1 text-white">
                        <span className="live-dot" /> Live now
                      </span>
                    )}
                    {isNext && (
                      <span className="border border-white/20 px-2 py-1 text-white/80">
                        Next ·{" "}
                        {status.next.startsIn != null
                          ? `in ${formatDuration(status.next.startsIn)}`
                          : status.next.when}
                      </span>
                    )}
                    {isDone && <span>Finished</span>}
                  </div>

                  <div>
                    <p className="title text-[clamp(2.5rem,4.6vw,4.25rem)]">
                      <SessionTime minutes={s.start} format={format} />
                      <span className={cn("block", isLive ? "text-white/60" : "text-white/30")}>
                        <SessionTime minutes={s.end} format={format} />
                      </span>
                    </p>
                    {offset !== 0 && (
                      <p className={cn("eyebrow mt-5", isLive ? "text-white/80" : "text-white/45")}>
                        Your time: {formatMinutes(s.start + offset, format)} – {formatMinutes(s.end + offset, format)}
                      </p>
                    )}
                  </div>

                  {isLive && (
                    <div className="absolute inset-x-0 bottom-0">
                      <div className="eyebrow flex justify-between px-5 pb-2 text-white/80 md:px-8">
                        <span>In progress</span>
                        <span>Ends in {formatDuration(status.endsIn)}</span>
                      </div>
                      <div className="h-1 bg-ink/25">
                        <div
                          className="h-full origin-left bg-ink transition-transform duration-1000 ease-out-expo"
                          style={{ transform: `scaleX(${status.progress})` }}
                        />
                      </div>
                    </div>
                  )}
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
