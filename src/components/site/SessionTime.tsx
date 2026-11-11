import { formatMinutes, type TimeFormat } from "@/lib/sessions";
import { cn } from "@/lib/utils";

/** Renders a time with the AM/PM suffix set small, so both formats keep the same rhythm. */
export function SessionTime({ minutes, format, className }: { minutes: number; format: TimeFormat; className?: string }) {
  const [time, suffix] = formatMinutes(minutes, format).split(" ");
  return (
    <span className={cn("tabular-nums", className)}>
      {time}
      {suffix && <span className="ml-[0.15em] align-top text-[0.32em] font-medium tracking-normal">{suffix}</span>}
    </span>
  );
}
