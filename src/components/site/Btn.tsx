import type { ReactNode, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Arrow({ className, diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("h-3.5 w-3.5 shrink-0", diagonal && "-rotate-45", className)}
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

/** Label that rolls up to a copy of itself on hover. */
export function Roll({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("roll", className)}>
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

type Variant = "solid" | "ink" | "light" | "outline-light" | "outline-dark";

// Literal class names so Tailwind's content scan keeps them.
const VARIANTS: Record<Variant, string> = {
  solid: "btn-solid",
  ink: "btn-ink",
  light: "btn-light",
  "outline-light": "btn-outline-light",
  "outline-dark": "btn-outline-dark",
};

interface BtnProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  to?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler;
  arrow?: boolean;
  "aria-label"?: string;
}

/** Sharp button: a second colour wipes across on hover while the label rolls. */
export function Btn({
  children,
  variant = "solid",
  className,
  to,
  href,
  type = "button",
  disabled,
  onClick,
  arrow = true,
  ...rest
}: BtnProps) {
  const cls = cn("btn roll-host", VARIANTS[variant], className);
  const inner = (
    <>
      <Roll>{children}</Roll>
      {arrow && <Arrow className="btn-arrow" diagonal={!!href} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={rest["aria-label"]}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={onClick}
        aria-label={rest["aria-label"]}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cls} onClick={onClick} aria-label={rest["aria-label"]}>
      {inner}
    </button>
  );
}
