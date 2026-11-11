export const sessions = [
  { name: "Morning", start: 7, end: 10, label: "07:00 – 10:00" },
  { name: "Afternoon", start: 14, end: 16, label: "14:00 – 16:00" },
  { name: "Evening", start: 18, end: 21, label: "18:00 – 21:00" },
] as const;

export type SessionName = (typeof sessions)[number]["name"];

/** Which session is running right now (local time). Sundays are closed. */
export function currentSession(now = new Date()): SessionName | null {
  if (now.getDay() === 0) return null;
  const h = now.getHours();
  return sessions.find((s) => h >= s.start && h < s.end)?.name ?? null;
}

/** The next session that hasn't started yet, today or the next open day. */
export function nextSession(now = new Date()): { name: SessionName; label: string; day: "today" | "tomorrow" | "monday" } {
  const h = now.getHours();
  const isSunday = now.getDay() === 0;
  if (!isSunday) {
    const later = sessions.find((s) => s.start > h);
    if (later) return { name: later.name, label: later.label, day: "today" };
  }
  const isSaturday = now.getDay() === 6;
  return {
    name: sessions[0].name,
    label: sessions[0].label,
    day: isSaturday ? "monday" : "tomorrow",
  };
}
