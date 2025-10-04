import { cn } from "@/lib/utils";
import { User, Package, Wrench, Truck } from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "expert",
    title: "Expert Services",
    description: "Professional consulting & technical expertise",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "product",
    title: "Products & Materials",
    description: "Equipment, spare parts & raw materials",
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: "service",
    title: "Contract Services",
    description: "Maintenance, construction & support services",
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: "logistics",
    title: "Logistics & Transport",
    description: "Transportation, warehousing & distribution",
    icon: <Truck className="w-4 h-4" />,
  },
];

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CategorySelector({ value, onChange, error }: CategorySelectorProps) {
  const getCategoryColor = (categoryId: string, isSelected: boolean) => {
    if (!isSelected) return "border-2 border-gray-300 bg-white hover:border-gray-400 text-gray-700";
    
    switch (categoryId) {
      case "product":
        return "border-2 border-purple-500 bg-purple-500 text-white";
      case "service":
        return "border-2 border-blue-500 bg-blue-500 text-white";
      case "expert":
        return "border-2 border-green-500 bg-green-500 text-white";
      case "logistics":
        return "border-2 border-amber-500 bg-amber-500 text-white";
      default:
        return "border-2 border-primary bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex overflow-x-auto pb-2 -mx-1 px-1 gap-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 h-12 rounded-lg transition-all whitespace-nowrap touch-manipulation min-w-[140px]",
              getCategoryColor(category.id, value === category.id)
            )}
          >
            {category.icon}
            <span className="text-sm font-medium">{category.title}</span>
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
