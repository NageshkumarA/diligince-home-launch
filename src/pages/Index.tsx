import React, { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Building2,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Clock,
  Star,
  Target,
  Workflow,
  MessageSquare,
  FileText,
  Award,
  BarChart3,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useStaggeredAnimation } from "../hooks/useScrollAnimation";
import { useUser } from "@/contexts/UserContext";
import { getDashboardRoute } from "@/types/shared";
import HeroSection from "@/components/HeroSection";

const Index: React.FC = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  
  // Call hooks before any conditional returns
  const { elementRef: servicesRef, visibleItems } = useStaggeredAnimation(3, 200);
  
  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (!isLoading && user) {
      const dashboardUrl = getDashboardRoute(user);
      navigate(dashboardUrl, { replace: true });
    }
  }, [user, isLoading, navigate]);
  
  // Show nothing while checking auth or redirecting
  if (isLoading || user) {
    return null;
  }
  const services = [
    {
      title: "Enterprise Industries",
      description:
        "Streamline procurement processes with AI-powered vendor matching and requirement management for enterprise-level efficiency",
      icon: Building2,
      gradient: "from-[#153b60] to-[#1e4976]",
      features: [
        "AI-Powered Vendor Matching",
        "Automated RFQ Processing",
        "Real-time Project Analytics",
        "Compliance Management",
        "ROI Optimization Tools",
      ],
      metrics: {
        improvement: "65% Faster",
        description: "Procurement Cycles",
      },
    },
    {
      title: "Certified Professionals",
      description:
        "Connect with vetted industry experts and showcase your expertise through our premium professional network platform",
      icon: Users,
      gradient: "from-[#1e4976] to-[#2a5f8f]",
      features: [
        "Verified Expert Network",
        "Skills Assessment Tools",
        "Portfolio Management",
        "Direct Client Communication",
        "Performance Analytics",
      ],
      metrics: {
        improvement: "85% Success",
        description: "Project Completion Rate",
      },
    },
    {
      title: "Premium Vendors",
      description:
        "Access high-value opportunities and deliver exceptional solutions through our enterprise vendor marketplace",
      icon: Truck,
      gradient: "from-[#2a5f8f] to-[#3a7baf]",
      features: [
        "Enterprise Opportunity Access",
        "Automated Quote Generation",
        "Supply Chain Integration",
        "Quality Assurance Tools",
        "Payment Protection",
      ],
      metrics: {
        improvement: "40% Higher",
        description: "Contract Values",
      },
    },
  ];
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Connect with the right professionals in minutes, not days",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Enterprise-grade security with verified professionals",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access talent and opportunities from around the world",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Data-driven insights to optimize your business decisions",
    },
  ];
  const howItWorks = [
    {
      step: "01",
      title: "Post Your Requirements",
      description: "Industries post detailed project requirements with budget and timeline",
      icon: FileText,
      color: "text-[#153b60] bg-[#153b60]/10",
    },
    {
      step: "02",
      title: "Get Proposals",
      description: "Professionals show interest and vendors submit competitive quotations",
      icon: Target,
      color: "text-[#1e4976] bg-[#1e4976]/10",
    },
    {
      step: "03",
      title: "Collaborate & Deliver",
      description: "Direct communication, project tracking, and successful delivery with trust",
      icon: Workflow,
      color: "text-[#2a5f8f] bg-[#2a5f8f]/10",
    },
  ];
  const benefits = [
    {
      icon: Clock,
      title: "75% Faster",
      subtitle: "Project Completion",
      description: "Streamlined workflows reduce project timelines significantly",
    },
    {
      icon: Star,
      title: "98% Success",
      subtitle: "Rate",
      description: "High-quality matches lead to successful project outcomes",
    },
    {
      icon: Award,
      title: "24/7 Support",
      subtitle: "Available",
      description: "Round-the-clock assistance for all your business needs",
    },
  ];
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Helmet>
        <title>Diligence.ai - AI-Powered Procurement Platform</title>
        <meta
          name="description"
          content="Streamline your procurement process with AI-powered vendor matching, requirement management, and workflow automation."
        />
      </Helmet>

      {/* Header */}
      <header className="fixed top-4 left-4 right-4 z-50 flex justify-center">
        <div className="bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl w-[80%]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#fff] rounded-md flex items-center justify-center font-bold text-white">
                  <img src="/logo-main-no-bg.svg" alt="Diligence.ai" />
                </div>
                <span className="text-xl font-bold text-[#153b60]">Diligence.ai</span>
              </Link>
              <div className="flex items-center space-x-6">
                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-8">
                  <Link to="/about" className="text-[#333333] hover:text-[#153b60] transition-colors font-medium">
                    About
                  </Link>
                  <Link to="/pricing" className="text-[#333333] hover:text-[#153b60] transition-colors font-medium">
                    Pricing
                  </Link>
                  <Link to="/contact" className="text-[#333333] hover:text-[#153b60] transition-colors font-medium">
                    Contact
                  </Link>
                </nav>

                <Link
                  to="/signin"
                  className="bg-gradient-to-r from-[#153b60] to-[#1e4976] text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white relative" id="features">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
        <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #153b60 2px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#153b60]/5 border border-[#153b60]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#153b60] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#153b60]">AI-Powered Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
              Why Choose <span className="text-[#153b60]">Diligence.ai</span>?
            </h2>
            <p className="text-[#828282] text-lg max-w-2xl mx-auto">
              Experience the power of artificial intelligence in business connections with our comprehensive platform
              features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-3 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#153b60]/10 to-[#1e4976]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#153b60]/20 to-[#1e4976]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <feature.icon className="w-8 h-8 text-[#153b60]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3 group-hover:text-[#153b60] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#828282] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div
            className=" rounded-3xl p-8 md:p-12 relative overflow-hidden"
            id="benefits"
            style={{
                    boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff'
                  }}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-60 h-60 bg-[#1e4976] rounded-full blur-3xl animate-pulse"
                style={{
                  animationDelay: "1s",
                }}
              ></div>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-black mb-4">AI-Driven Results</h3>
              <p className="text-black text-xl">See why thousands of businesses trust our intelligent platform</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300 bg-white rounded-3xl p-8"
                  
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#153b60]/10 to-[#1e4976]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-[#153b60]" />
                  </div>
                  <h4 className="text-3xl font-bold text-[#333333] mb-2">{benefit.title}</h4>
                  <p className="text-[#153b60] font-semibold mb-3 text-lg">{benefit.subtitle}</p>
                  <p className="text-[#828282] leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-[#FAFAFA] to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#153b60] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#1e4976] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-[#153b60]/5 border border-[#153b60]/20 rounded-full px-4 py-2 mb-6 relative">
              <div className="absolute inset-0 bg-[#153b60]/10 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-[#153b60] rounded-full animate-pulse relative z-10"></div>
              <span className="text-sm font-medium text-[#153b60] relative z-10">AI-Powered Workflow</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
              How It <span className="text-[#153b60]">Works</span>
            </h2>
            
            {/* Visual Separator */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#153b60]"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#153b60]/50 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-[#1e4976]"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#1e4976]/50 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-[#2a5f8f]"></div>
            </div>
            
            <p className="text-[#828282] text-lg max-w-2xl mx-auto">
              Simple, intelligent, and effective. Our AI streamlines your business processes in three easy steps.
            </p>
          </div>

          <div className="relative">
            {/* Enhanced Desktop Connection Line with Animated Flow */}
            <div className="hidden lg:block absolute top-[120px] left-[10%] right-[10%] h-1">
              {/* Base Line */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#153b60] via-[#1e4976] to-[#2a5f8f] rounded-full opacity-20"></div>
              
              {/* Animated Flowing Dots */}
              <div className="absolute inset-0 flex items-center justify-between px-8">
                <div className="w-3 h-3 bg-[#153b60] rounded-full animate-flow-1 shadow-lg"></div>
                <div className="w-3 h-3 bg-[#1e4976] rounded-full animate-flow-2 shadow-lg"></div>
                <div className="w-3 h-3 bg-[#2a5f8f] rounded-full animate-flow-3 shadow-lg"></div>
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-gradient-to-b from-[#153b60] via-[#1e4976] to-[#2a5f8f] opacity-20"></div>
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#153b60] rounded-full animate-pulse-flow-down shadow-lg"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 relative">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  {/* Enhanced Step Card */}
                  <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[#E0E0E0] hover:border-[#153b60]/30 group hover:-translate-y-2 relative overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#153b60]/5 via-transparent to-[#1e4976]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Step Number Badge */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#153b60]/5 border-2 border-[#153b60]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                      <span className="text-lg font-bold text-[#153b60]">{step.step}</span>
                    </div>
                    
                    <div className="text-center relative z-10">
                      {/* Enhanced Icon Container */}
                      <div className="relative inline-block mb-8">
                        <div
                          className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden shadow-lg`}
                        >
                          {/* Outer Glow Ring */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-[#153b60]/20 to-[#1e4976]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                          
                          {/* Inner Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <step.icon className="w-12 h-12 relative z-10 text-[#153b60] group-hover:text-[#153b60] transition-all duration-300" />
                        </div>
                      </div>
                      <br></br>
                      {/* Title with Animated Underline */}
                      <h3 className="text-2xl font-bold text-[#333333] mb-4 group-hover:text-[#153b60] transition-colors duration-300 relative inline-block">
                        {step.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#153b60] group-hover:w-full transition-all duration-500"></span>
                      </h3>
                      
                      <p className="text-[#828282] leading-relaxed text-lg mb-6">{step.description}</p>
                      
                      {/* Activity Indicator Dots */}
                      <div className="flex justify-center gap-2 opacity-100 transition-opacity duration-500">
                        <div className="w-1.5 h-1.5 bg-[#153b60] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-[#1e4976] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-[#2a5f8f] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Step Connector */}
                  {index < howItWorks.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-8">
                      <div className="w-px h-12 bg-gradient-to-b from-[#153b60] via-[#1e4976] to-[#2a5f8f] opacity-30"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enterprise Solutions */}
      <section className="py-24 lg:py-32 bg-background relative" id="modules">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Enterprise Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Enterprise Solutions
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Empowering businesses with AI-driven procurement intelligence and seamless stakeholder collaboration
            </p>
          </div>

          {/* Service Cards Grid */}
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              // Only show first 3 features for minimalistic design
              const keyFeatures = service.features.slice(0, 3);
              
              return (
                <article
                  key={index}
                  className={`enterprise-card bg-card border border-border rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 ${visibleItems[index] ? "animate-fade-in" : ""}`}
                  style={{
                    animationDelay: visibleItems[index] ? `${index * 0.15}s` : "0s",
                    animationFillMode: "forwards",
                  }}
                >
                  {/* Icon - Top Left */}
                  <div className="mb-6">
                    <div className="enterprise-icon w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Title & Accent Line */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                    <div className="w-12 h-1 bg-primary/20 rounded-full mb-4"></div>
                    <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Features - Only 3 */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics Box */}
                  <div className="bg-muted rounded-xl p-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {service.metrics.improvement}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {service.metrics.description}
                      </div>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <button className="w-full group flex items-center justify-center text-primary hover:text-primary-hover font-medium text-base transition-colors duration-300">
                    <span className="border-b-2 border-transparent group-hover:border-primary transition-all duration-300">
                      Learn More
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1A2A4F] via-[#2F80ED] to-purple-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-80 h-80 bg-[#27AE60]/10 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "2s",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-[#27AE60] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">Join 10,000+ Businesses</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <span className="block text-[#F2994A]">Business with AI?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful businesses already using Diligence.ai's intelligent platform to streamline
            operations, connect with qualified professionals, and accelerate growth through AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/signup"
              className="bg-white text-[#1A2A4F] px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-bold text-lg backdrop-blur-sm hover:border-white/50 flex items-center justify-center space-x-2">
              <span>Schedule Demo</span>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, #2F80ED 25%, transparent 25%), linear-gradient(-45deg, #2F80ED 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2F80ED 75%), linear-gradient(-45deg, transparent 75%, #2F80ED 75%)`,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-[#F2994A]/5 border border-[#F2994A]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#F2994A] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#F2994A]">Trusted Worldwide</span>
            </div>
            <h2 className="text-4xl font-bold text-[#333333] mb-4">Trusted by Industry Leaders</h2>
            <p className="text-[#828282] text-xl">Join our growing community of AI-powered businesses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#2F80ED] to-[#1A2A4F] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl hover:scale-110 transition-transform duration-300">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-[#333333] mb-3">2,500+</h3>
              <p className="text-[#828282] font-semibold text-lg">Active Industries</p>
            </div>
            <div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#27AE60] to-[#2F80ED] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-[#333333] mb-3">12,000+</h3>
              <p className="text-[#828282] font-semibold text-lg">AI-Matched Professionals</p>
            </div>
            <div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#F2994A] to-[#27AE60] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-[#333333] mb-3">8,000+</h3>
              <p className="text-[#828282] font-semibold text-lg">Verified Smart Vendors</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-12" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[#fff] rounded-lg flex items-center justify-center font-bold text-white">
                  <img src="/logo-main-no-bg.svg" alt="Diligence.ai" />
                </div>
                <span className="text-2xl font-bold">Diligence.ai</span>
              </div>
              <p className="text-gray-300 mb-4">
                Connecting industries, professionals, and vendors through intelligent business solutions for accelerated
                growth and success.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-[#2F80ED] transition-colors cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-[#2F80ED] transition-colors cursor-pointer">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 Diligence.ai. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Index;
