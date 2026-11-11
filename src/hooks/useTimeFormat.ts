import { useCallback, useSyncExternalStore } from "react";
import type { TimeFormat } from "@/lib/sessions";

const KEY = "suf-time-format";
const EVENT = "suf-time-format-change";

// Fallback for when storage is unavailable (private mode, blocked site data).
let memory: TimeFormat | null = null;

function read(): TimeFormat {
  if (memory) return memory;
  try {
    return localStorage.getItem(KEY) === "12h" ? "12h" : "24h";
  } catch {
    return "24h";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Shared 24h / AM-PM preference, remembered on this device and synced across the page. */
export function useTimeFormat() {
  const format = useSyncExternalStore(subscribe, read, () => "24h" as TimeFormat);
  const setFormat = useCallback((f: TimeFormat) => {
    memory = f;
    try {
      localStorage.setItem(KEY, f);
    } catch {
      /* storage blocked: preference just won't persist */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [format, setFormat] as const;
}
