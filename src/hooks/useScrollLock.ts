import { useEffect } from "react";

// Shared across the menu, cart drawer and lightbox so one closing can't
// unlock the page while another is still open.
let locks = 0;

/**
 * Locks page scroll while `active`. Locks <html>, not <body>: <html> already
 * reserves its scrollbar gutter, so the page doesn't shift sideways when the
 * scrollbar is hidden.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    if (locks++ === 0) root.style.overflow = "hidden";
    return () => {
      if (--locks === 0) root.style.overflow = "";
    };
  }, [active]);
}
