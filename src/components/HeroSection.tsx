
import { Button } from "@/components/ui/button";
import heroImage from "../assets/hero-image.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center mt-16">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Revolutionize Industrial Services with AI
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with experts, vendors, and logistics seamlessly through our intelligent platform
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="font-medium text-base" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button size="lg" variant="outline" className="font-medium text-base text-white border-white hover:bg-white/20 hover:text-white">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
