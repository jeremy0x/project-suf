import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { Btn, Roll } from "./site/Btn";
import { EASE_CLIP } from "./motion/ease";
import { useAnimation } from "../context/AnimationContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

const mobileItems = [{ to: "/", label: "Home" }, ...navItems, { to: "/favorites", label: "Wishlist" }];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { reduceMotion } = useAnimation();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const d = reduceMotion ? 0 : 1;

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-bone">
      <div
        className={cn(
          "border-b transition-[background-color,border-color] duration-500",
          scrolled || open ? "border-white/10 bg-ink" : "border-transparent bg-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="relative z-10 shrink-0" aria-label="Shape Up Fitness home">
            <Logo variant="white" className="h-9 md:h-10" />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "roll-host eyebrow flex items-center gap-2 transition-colors",
                      isActive ? "text-white" : "text-white/60 hover:text-white",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          "h-1 w-1 bg-brand-blue transition-transform duration-500",
                          isActive ? "scale-100" : "scale-0",
                        )}
                      />
                      <Roll>{item.label}</Roll>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Btn to="/contact?source=navbar" variant="solid" className="px-5 py-3" aria-label="Join Shape Up Fitness">
              Join now
            </Btn>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="eyebrow relative z-10 flex items-center gap-3 py-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="relative block h-2.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-in-out-quart",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-in-out-quart",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-16 flex flex-col bg-ink md:top-20 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8 * d, ease: EASE_CLIP }}
          >
            <ul className="shell flex-1 overflow-y-auto pt-6">
              {mobileItems.map((item, i) => (
                <li key={item.to} className="overflow-hidden border-b border-white/10">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8 * d, delay: (0.2 + i * 0.05) * d, ease: EASE_CLIP }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-baseline justify-between py-4",
                          isActive ? "text-brand-blue" : "text-bone",
                        )
                      }
                    >
                      <span className="title text-4xl">{item.label}</span>
                      <span className="eyebrow text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="shell pb-8 pt-6">
              <Btn to="/contact?source=navbar" className="w-full" aria-label="Join Shape Up Fitness">
                Join now
              </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
