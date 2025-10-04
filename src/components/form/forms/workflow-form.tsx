"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { Workflow, Users, CheckCircle } from "lucide-react"
import { cn } from "../../../lib/utils"
import type { StepData } from "../types"

interface WorkflowFormProps {
  data: StepData
  onUpdate: (data: Partial<StepData>) => void
  onNext: () => void
  onPrev: () => void
}

const workflows = [
  {
    id: "standard",
    title: "Standard Approval",
    description: "Department head → Finance → Procurement",
    duration: "3-5 business days",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    id: "expedited",
    title: "Expedited Review",
    description: "Direct to procurement team",
    duration: "1-2 business days",
    icon: <Workflow className="w-5 h-5" />,
  },
  {
    id: "executive",
    title: "Executive Approval",
    description: "C-level approval required",
    duration: "5-7 business days",
    icon: <Users className="w-5 h-5" />,
  },
]

export function WorkflowForm({ data, onUpdate, onNext, onPrev }: WorkflowFormProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState(data.workflow?.approvalWorkflow || "")

  const handleNext = () => {
    onUpdate({
      workflow: { approvalWorkflow: selectedWorkflow },
    })
    onNext()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-lg font-medium">
        <Workflow className="w-5 h-5" />
        Approval Workflow
      </div>

      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card
            key={workflow.id}
            className={cn(
              "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedWorkflow === workflow.id
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-border hover:border-blue-200",
            )}
            onClick={() => setSelectedWorkflow(workflow.id)}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  selectedWorkflow === workflow.id ? "bg-blue-100 text-blue-600" : "bg-muted text-muted-foreground",
                )}
              >
                {workflow.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{workflow.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Expected duration: {workflow.duration}</p>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  selectedWorkflow === workflow.id ? "border-blue-500 bg-blue-500" : "border-muted-foreground",
                )}
              >
                {selectedWorkflow === workflow.id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!selectedWorkflow}>
          Next Step
        </Button>
      </div>
    </div>
  )
}
