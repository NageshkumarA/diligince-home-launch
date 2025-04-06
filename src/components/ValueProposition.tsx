
import { Users, Tool, Truck } from "lucide-react";

const ValueProposition = () => {
  const values = [
    {
      icon: <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
      title: "Professionals",
      description: "Find verified experts fast",
    },
    {
      icon: <Tool className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
      title: "Vendors",
      description: "Access quality services",
    },
    {
      icon: <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
      title: "Logistics",
      description: "Optimize supply chains",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:bg-gray-50">
              {value.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
