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
    color: "text-corporate-danger-600",
    description: "Immediate action required",
  },
  {
    value: "high",
    label: "High",
    color: "text-corporate-warning-600",
    description: "High priority, urgent",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-corporate-info-600",
    description: "Standard priority",
  },
  {
    value: "low",
    label: "Low",
    color: "text-corporate-gray-600",
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
        return "bg-corporate-danger-100 text-corporate-danger-700 border border-corporate-danger-100";
      case "high":
        return "bg-corporate-warning-100 text-corporate-warning-700 border border-corporate-warning-100";
      case "medium":
        return "bg-corporate-info-100 text-corporate-info-700 border border-corporate-info-100";
      case "low":
        return "bg-corporate-gray-100 text-corporate-gray-700 border border-corporate-gray-200";
      default:
        return "bg-corporate-gray-100 text-corporate-gray-700 border border-corporate-gray-200";
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
