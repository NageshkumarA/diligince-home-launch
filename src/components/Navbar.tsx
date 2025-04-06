
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-4 md:px-8 bg-white border-b border-gray-100 fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            diligince.ai
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Button variant="outline" className="mr-2" asChild>
            <Link to="/signin">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <Button variant="ghost" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
