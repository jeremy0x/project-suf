import { useTimeFormat } from "@/hooks/useTimeFormat";
import type { TimeFormat } from "@/lib/sessions";
import { cn } from "@/lib/utils";

const OPTIONS: { value: TimeFormat; label: string; aria: string }[] = [
  { value: "24h", label: "24H", aria: "Show times in 24-hour format" },
  { value: "12h", label: "AM/PM", aria: "Show times with AM and PM" },
];

/** Two-way switch between 24-hour and AM/PM times. The active side is filled with a clip wipe. */
export function TimeToggle({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const [format, setFormat] = useTimeFormat();
  const dark = tone === "dark";

  return (
    <div
      role="radiogroup"
      aria-label="Time format"
      className={cn("inline-flex border", dark ? "border-white/20" : "border-ink/20", className)}
    >
      {OPTIONS.map((o) => {
        const active = format === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.aria}
            onClick={() => setFormat(o.value)}
            className={cn(
              "eyebrow relative isolate px-3 py-2 transition-colors duration-500",
              active ? (dark ? "text-ink" : "text-bone") : dark ? "text-white/60 hover:text-white" : "text-ink/60 hover:text-ink",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 -z-10 transition-[clip-path] duration-500 ease-in-out-quart",
                dark ? "bg-bone" : "bg-ink",
                active ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(100%_0_0_0)]",
              )}
            />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
