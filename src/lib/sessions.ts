/** Gym times are fixed to West Africa Time (Africa/Lagos, UTC+1, no DST). */
export const GYM_UTC_OFFSET_MIN = 60;
export const GYM_TZ_LABEL = "WAT (UTC+1)";

export const sessions = [
  { name: "Morning", start: 7 * 60, end: 10 * 60 },
  { name: "Afternoon", start: 14 * 60, end: 16 * 60 },
  { name: "Evening", start: 18 * 60, end: 21 * 60 },
] as const;

export type Session = (typeof sessions)[number];
export type SessionName = Session["name"];
export type TimeFormat = "24h" | "12h";

/** Day of week (0 = Sunday) and minutes since midnight, in gym time. */
export function gymClock(now = new Date()) {
  const shifted = new Date(now.getTime() + GYM_UTC_OFFSET_MIN * 60_000);
  return { day: shifted.getUTCDay(), minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes() };
}

/** Minutes the viewer's clock is ahead of gym time (0 for anyone already on WAT). */
export function viewerOffsetFromGym(now = new Date()) {
  return -now.getTimezoneOffset() - GYM_UTC_OFFSET_MIN;
}

export function formatMinutes(total: number, fmt: TimeFormat) {
  const m = ((total % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  if (fmt === "24h") return `${String(h).padStart(2, "0")}:${mm}`;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mm} ${h < 12 ? "AM" : "PM"}`;
}

export function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

export interface SessionStatus {
  day: number;
  minutes: number;
  live: Session | null;
  /** 0–1 progress through the live session. */
  progress: number;
  /** Minutes until the live session ends. */
  endsIn: number;
  next: { session: Session; when: "today" | "tomorrow" | "Monday"; startsIn: number | null };
}

export function sessionStatus(now = new Date()): SessionStatus {
  const { day, minutes } = gymClock(now);
  const open = day !== 0;
  const live = open ? sessions.find((s) => minutes >= s.start && minutes < s.end) ?? null : null;

  let next: SessionStatus["next"];
  const later = open ? sessions.find((s) => s.start > minutes) : undefined;
  if (later) next = { session: later, when: "today", startsIn: later.start - minutes };
  // Saturday evening rolls over to Monday; Sunday's "tomorrow" is already Monday.
  else next = { session: sessions[0], when: day === 6 ? "Monday" : "tomorrow", startsIn: null };

  return {
    day,
    minutes,
    live,
    progress: live ? (minutes - live.start) / (live.end - live.start) : 0,
    endsIn: live ? live.end - minutes : 0,
    next,
  };
}
