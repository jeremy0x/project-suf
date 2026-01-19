import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden rounded-full border bg-background px-6 py-3 text-center font-semibold transition-opacity",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        className,
      )}
      {...props}
    >
      <span className={cn(
        "relative z-20 inline-block transition-all duration-300",
        !disabled && "group-hover:translate-x-12 group-hover:opacity-0"
      )}>
        {text}
      </span>
      <div className={cn(
        "absolute inset-0 z-20 flex items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300",
        !disabled && "group-hover:opacity-100"
      )}>
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className={cn(
        "absolute bottom-0 left-0 z-10 h-0 w-full bg-primary transition-all duration-300",
        !disabled && "group-hover:h-full"
      )}></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
