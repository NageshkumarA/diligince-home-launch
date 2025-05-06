
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`w-full py-4 px-4 md:px-8 fixed top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md" : "bg-white border-b border-gray-100"
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            diligince.ai
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-gray-600 hover:text-blue-600 transition-colors ${location.pathname === '/' ? 'text-blue-600 font-medium' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`text-gray-600 hover:text-blue-600 transition-colors ${location.pathname === '/about' ? 'text-blue-600 font-medium' : ''}`}>
            About
          </Link>
          <Link to="/pricing" className={`text-gray-600 hover:text-blue-600 transition-colors ${location.pathname === '/pricing' ? 'text-blue-600 font-medium' : ''}`}>
            Pricing
          </Link>
          <Link to="/contact" className={`text-gray-600 hover:text-blue-600 transition-colors ${location.pathname === '/contact' ? 'text-blue-600 font-medium' : ''}`}>
            Contact
          </Link>
          <Button variant="outline" className="mr-2 hover:scale-105 transition-transform duration-200" asChild>
            <Link to="/signin">Log In</Link>
          </Button>
          <Button className="hover:scale-105 transition-transform duration-200" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          {/* Dashboard link for logged-in users */}
          <Button variant="secondary" className="hover:scale-105 transition-transform duration-200" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="flex flex-col py-4 px-4">
            <Link to="/" className="py-2 text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="py-2 text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link to="/pricing" className="py-2 text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/contact" className="py-2 text-gray-600 hover:text-blue-600">
              Contact
            </Link>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" asChild>
                <Link to="/signin">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
