import { useEffect, useState } from "react";
import { currentSession, nextSession } from "@/lib/sessions";

export function useSessionStatus() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return { live: currentSession(now), next: nextSession(now) };
}
