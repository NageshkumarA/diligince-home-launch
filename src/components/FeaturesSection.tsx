
import { BrainCircuit, Workflow, ShieldCheck, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-blue-600" />,
      title: "AI Matching",
      description: "Our intelligent system connects you with the perfect industrial service providers based on your specific needs.",
    },
    {
      icon: <Workflow className="h-8 w-8 text-blue-600" />,
      title: "Project Management",
      description: "Streamline your industrial projects with our comprehensive management tools and dashboards.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "Quality Control",
      description: "Maintain high standards with our built-in verification and quality assurance processes.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-blue-600" />,
      title: "Real-Time Tools",
      description: "Access analytics and insights to make data-driven decisions for your industrial operations.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose diligince.ai?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our platform offers cutting-edge solutions for the industrial sector</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
