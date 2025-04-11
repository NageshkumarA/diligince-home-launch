
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

interface LogoProps {
  className?: string;
  size?: "tiny" | "small" | "medium" | "large" | "xlarge";
  showTextLogo?: boolean;
}

const Logo = ({ className = "", size = "medium", showTextLogo = true }: LogoProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeMediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Determine logo size - optimized for different contexts
  const sizeClass = {
    tiny: "h-8 md:h-10",
    small: "h-10 md:h-14",
    medium: "h-14 md:h-18",
    large: "h-20 md:h-24",
    xlarge: "h-32 md:h-40"
  }[size];

  // Display content based on viewport width
  const aspectRatio = showTextLogo ? "aspect-[3/3.5]" : "aspect-[3/2.5]";

  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img 
        src={isDarkMode ? logoDark : logoLight} 
        alt="Diligince.ai Logo"
        className={`${sizeClass} ${aspectRatio} w-auto object-contain transition-all duration-300 hover:opacity-90 hover:scale-105`}
      />
    </Link>
  );
};

export default Logo;
