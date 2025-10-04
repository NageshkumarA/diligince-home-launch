"use client"

import { useState } from "react"
import { Card } from "../../ui/card"
import { Check, FileText, Upload, Workflow, Eye, Send, User } from "lucide-react"
import { cn } from "../../../lib/utils"
import { BasicInfoForm } from "./forms/basic-info-form"
import { DetailsForm } from "./forms/details-form"
import { DocumentsForm } from "./forms/documents-form"
import { WorkflowForm } from "./forms/workflow-form"
import { PreviewForm } from "./forms/preview-form"
import { PublishForm } from "./forms/publish-form"
import type { StepData, FormStep } from "./types"

const steps: FormStep[] = [
  {
    id: "basic-info",
    title: "Basic Info",
    description: "Project details and requirements",
    icon: <User className="w-5 h-5" />,
    component: BasicInfoForm,
  },
  {
    id: "details",
    title: "Details",
    description: "Specifications and technical requirements",
    icon: <FileText className="w-5 h-5" />,
    component: DetailsForm,
  },
  {
    id: "documents",
    title: "Documents",
    description: "Upload supporting files",
    icon: <Upload className="w-5 h-5" />,
    component: DocumentsForm,
  },
  {
    id: "workflow",
    title: "Workflow",
    description: "Set approval workflow",
    icon: <Workflow className="w-5 h-5" />,
    component: WorkflowForm,
  },
  {
    id: "preview",
    title: "Preview",
    description: "Review your requirement",
    icon: <Eye className="w-5 h-5" />,
    component: PreviewForm,
  },
  {
    id: "publish",
    title: "Publish",
    description: "Submit and publish requirement",
    icon: <Send className="w-5 h-5" />,
    component: PublishForm,
  },
]

interface SteppedFormProps {
  onComplete?: (data: StepData) => void
  initialData?: Partial<StepData>
  className?: string
}

export function SteppedForm({ onComplete, initialData = {}, className }: SteppedFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<StepData>(initialData)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex)
    }
  }

  const updateFormData = (data: Partial<StepData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    onComplete?.(formData)
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className={cn("w-full max-w-6xl mx-auto space-y-8", className)}>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">Create Procurement Requirement</h1>
        <p className="text-muted-foreground">Enterprise-grade requirement management system</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Draft auto-saved</span>
          <span>•</span>
          <span>Last saved: Just now</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-10">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(index)
          const isCurrent = index === currentStep
          const isClickable = index <= currentStep || completedSteps.has(index)

          return (
            <div key={step.id} className="flex flex-col items-center space-y-2">
              <button
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
                  "border-2 bg-background",
                  {
                    "border-blue-500 bg-blue-500 text-white": isCurrent,
                    "border-green-500 bg-green-500 text-white": isCompleted,
                    "border-border text-muted-foreground": !isCurrent && !isCompleted,
                    "hover:border-blue-300 cursor-pointer": isClickable,
                    "cursor-not-allowed opacity-50": !isClickable,
                  },
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
              </button>
              <div className="text-center space-y-1">
                <div
                  className={cn("text-sm font-medium", {
                    "text-blue-600": isCurrent,
                    "text-green-600": isCompleted,
                    "text-foreground": !isCurrent && !isCompleted,
                  })}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground max-w-20">{step.description}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Form Content */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground mt-1">{steps[currentStep].description}</p>
          </div>
          <div className="text-sm text-blue-600 font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <CurrentStepComponent
          data={formData}
          onUpdate={updateFormData}
          onNext={currentStep === steps.length - 1 ? handleComplete : handleNext}
          onPrev={handlePrev}
        />
      </Card>
    </div>
  )
}
