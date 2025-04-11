
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
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

  // Determine logo size
  const sizeClass = {
    small: "h-6 md:h-8",
    medium: "h-8 md:h-10",
    large: "h-12 md:h-16"
  }[size];

  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img 
        src={isDarkMode ? logoDark : logoLight} 
        alt="Diligince.ai Logo"
        className={`${sizeClass} w-auto transition-opacity duration-300 hover:opacity-90`}
      />
    </Link>
  );
};

export default Logo;
