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
    color: "text-orange-600",
    description: "High priority, urgent",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-yellow-600",
    description: "Standard priority",
  },
  {
    value: "low",
    label: "Low",
    color: "text-green-600",
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
              selectedPriority.color
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
