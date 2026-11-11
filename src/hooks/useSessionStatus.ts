import { useEffect, useState } from "react";
import { sessionStatus } from "@/lib/sessions";

/** Live session state in gym time (WAT), refreshed every 30 seconds. */
export function useSessionStatus() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return sessionStatus(now);
}
