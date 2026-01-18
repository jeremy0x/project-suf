import { useEffect, useState } from "react";

interface LogoProps {
  variant?: "header" | "footer" | "white";
}

const Logo: React.FC<LogoProps> = ({ variant = "header" }) => {
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const header = document.querySelector("header");
      if (header) {
        const computedStyle = window.getComputedStyle(header);
        const backgroundColor = computedStyle.backgroundColor;
        // Check if the background is dark
        const rgb = backgroundColor.match(/\d+/g);
        if (rgb) {
          const brightness =
            (parseInt(rgb[0]) * 299 +
              parseInt(rgb[1]) * 587 +
              parseInt(rgb[2]) * 114) /
            1000;
          setIsDarkBackground(brightness < 128);
        }
      }
    };

    checkBackground();
    window.addEventListener("scroll", checkBackground);
    return () => window.removeEventListener("scroll", checkBackground);
  }, []);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <img
          src={
            variant === "white"
              ? "https://i.ibb.co/2389gCCR/suf-logo-white.png"
              : variant === "header"
              ? "https://i.ibb.co/27MsdB5r/suf-logo.png"
              : isDarkBackground
              ? "https://i.ibb.co/2389gCCR/suf-logo-white.png"
              : "https://i.ibb.co/27MsdB5r/suf-logo.png"
          }
          alt="Shape Up Fitness Logo"
          className="h-10 md:h-12"
        />
      </div>
      {variant === "footer" && (
        <div className="text-xs ml-2 text-muted-foreground">BN: 6982554</div>
      )}
    </div>
  );
};

export default Logo;
