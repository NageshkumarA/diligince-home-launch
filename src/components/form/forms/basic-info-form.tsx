"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card } from "../../ui/card"
import { User, Package, Wrench, Truck, AlertTriangle } from "lucide-react"
import { cn } from "../../../lib/utils"
import type { StepData } from "../types"

interface BasicInfoFormProps {
  data: StepData
  onUpdate: (data: Partial<StepData>) => void
  onNext: () => void
  onPrev: () => void
}

const categories = [
  {
    id: "expert-services",
    title: "Expert Services",
    description: "Professional consulting & technical expertise",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: "products-materials",
    title: "Products & Materials",
    description: "Equipment, spare parts & raw materials",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: "contract-services",
    title: "Contract Services",
    description: "Maintenance, construction & support services",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    id: "logistics-transport",
    title: "Logistics & Transport",
    description: "Transportation, warehousing & distribution",
    icon: <Truck className="w-5 h-5" />,
  },
]

const priorities = [
  {
    id: "critical",
    label: "Critical",
    description: "Immediate action required",
    color: "text-red-600 bg-red-50 border-red-200",
  },
  {
    id: "high",
    label: "High",
    description: "High priority, urgent",
    color: "text-orange-600 bg-orange-50 border-orange-200",
  },
  {
    id: "medium",
    label: "Medium",
    description: "Standard priority",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
  },
  {
    id: "low",
    label: "Low",
    description: "Low priority, flexible timing",
    color: "text-green-600 bg-green-50 border-green-200",
  },
]

export function BasicInfoForm({ data, onUpdate, onNext, onPrev }: BasicInfoFormProps) {
  const [title, setTitle] = useState(data.basicInfo?.title || "")
  const [selectedCategory, setSelectedCategory] = useState(data.basicInfo?.category || "")
  const [selectedPriority, setSelectedPriority] = useState(data.basicInfo?.priority || "")

  const handleNext = () => {
    onUpdate({
      basicInfo: {
        title,
        category: selectedCategory,
        priority: selectedPriority,
      },
    })
    onNext()
  }

  const isValid = title.trim() && selectedCategory && selectedPriority

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Requirement Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 text-lg font-medium">
            <User className="w-5 h-5" />
            Requirement Details
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Requirement Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter a clear and descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-3">
              <Label>
                Category <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className={cn(
                      "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedCategory === category.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-border hover:border-blue-200",
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          selectedCategory === category.id
                            ? "bg-blue-100 text-blue-600"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{category.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Priority & Risk */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-medium">
            <AlertTriangle className="w-5 h-5" />
            Priority & Risk
          </div>

          <div className="space-y-3">
            <Label>Priority Level</Label>
            <div className="space-y-2">
              {priorities.map((priority) => (
                <Card
                  key={priority.id}
                  className={cn(
                    "p-3 cursor-pointer transition-all duration-200",
                    selectedPriority === priority.id
                      ? `border-2 ${priority.color}`
                      : "border-border hover:border-gray-300",
                  )}
                  onClick={() => setSelectedPriority(priority.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{priority.label}</div>
                      <div className="text-xs text-muted-foreground">{priority.description}</div>
                    </div>
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full border-2",
                        selectedPriority === priority.id ? "bg-current border-current" : "border-muted-foreground",
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev} disabled>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isValid}>
          Next Step
        </Button>
      </div>
    </div>
  )
}
