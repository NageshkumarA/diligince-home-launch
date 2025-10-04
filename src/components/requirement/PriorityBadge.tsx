import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Priority {
  value: string;
  label: string;
  color: string;
  description: string;
}

const priorities: Priority[] = [
  {
    value: "critical",
    label: "Critical",
    color: "text-red-600",
    description: "Immediate action required",
  },
  {
    value: "high",
    label: "High",
    color: "text-amber-600",
    description: "High priority, urgent",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-blue-600",
    description: "Standard priority",
  },
  {
    value: "low",
    label: "Low",
    color: "text-gray-600",
    description: "Low priority, flexible timing",
  },
];

interface PriorityBadgeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PriorityBadge({ value, onChange, error }: PriorityBadgeProps) {
  const selectedPriority = priorities.find((p) => p.value === value);

  const getPriorityBadgeColor = (priorityValue: string) => {
    switch (priorityValue) {
      case "critical":
        return "bg-red-100 text-red-800 border border-red-200";
      case "high":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "low":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Label htmlFor="priority" className="text-sm font-medium text-foreground">
          Priority Level <span className="text-destructive">*</span>
        </Label>
        {selectedPriority && (
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              getPriorityBadgeColor(selectedPriority.value)
            )}
          >
            {selectedPriority.label}
          </span>
        )}
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="priority" className="h-12">
          <SelectValue placeholder="Select priority level" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((priority) => (
            <SelectItem key={priority.value} value={priority.value}>
              <div className="flex items-center gap-2">
                <span className={cn("font-medium", priority.color)}>{priority.label}</span>
                <span className="text-xs text-muted-foreground">- {priority.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
