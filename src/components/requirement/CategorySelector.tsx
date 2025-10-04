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
  return (
    <div className="space-y-2">
      <div className="flex overflow-x-auto pb-2 -mx-1 px-1 gap-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 h-12 rounded-lg border-2 transition-all whitespace-nowrap touch-manipulation min-w-[140px]",
              value === category.id
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-accent"
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
