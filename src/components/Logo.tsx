interface LogoProps {
  variant?: "header" | "footer" | "white";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = "header", className }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <img
          src={
            variant === "white"
              ? "https://i.ibb.co/2389gCCR/suf-logo-white.png"
              : "https://i.ibb.co/27MsdB5r/suf-logo.png"
          }
          alt="Shape Up Fitness Logo"
          className={className || "h-10 md:h-12"}
        />
      </div>
      {variant === "footer" && (
        <div className="text-xs ml-2 text-muted-foreground">BN: 6982554</div>
      )}
    </div>
  );
};

export default Logo;
