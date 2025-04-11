
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
}

const Logo = ({ className = "", size = "medium" }: LogoProps) => {
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

  // Determine logo size - increased all sizes for better visibility
  const sizeClass = {
    small: "h-10 md:h-12",
    medium: "h-12 md:h-16",
    large: "h-16 md:h-20",
    xlarge: "h-24 md:h-32"
  }[size];

  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img 
        src={isDarkMode ? logoDark : logoLight} 
        alt="Diligince.ai Logo"
        className={`${sizeClass} w-auto transition-all duration-300 hover:opacity-90 hover:scale-105`}
      />
    </Link>
  );
};

export default Logo;
