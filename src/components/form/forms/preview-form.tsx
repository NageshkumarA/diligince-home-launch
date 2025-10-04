"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Eye, FileText, Upload, Workflow } from "lucide-react"
import type { StepData } from "../types"

interface PreviewFormProps {
  data: StepData
  onUpdate: (data: Partial<StepData>) => void
  onNext: () => void
  onPrev: () => void
}

export function PreviewForm({ data, onUpdate, onNext, onPrev }: PreviewFormProps) {
  const [reviewed, setReviewed] = useState(data.preview?.reviewed || false)

  const handleNext = () => {
    onUpdate({
      preview: { reviewed },
    })
    onNext()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-lg font-medium">
        <Eye className="w-5 h-5" />
        Review Your Requirement
      </div>

      <div className="space-y-6">
        {/* Basic Info Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" />
            <h3 className="font-medium">Basic Information</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Title:</span> {data.basicInfo?.title || "Not specified"}
            </div>
            <div>
              <span className="font-medium">Category:</span> {data.basicInfo?.category || "Not specified"}
            </div>
            <div>
              <span className="font-medium">Priority:</span> {data.basicInfo?.priority || "Not specified"}
            </div>
          </div>
        </Card>

        {/* Details Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" />
            <h3 className="font-medium">Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Specifications:</span>
              <p className="mt-1 text-muted-foreground">{data.details?.specifications || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium">Requirements:</span>
              <p className="mt-1 text-muted-foreground">{data.details?.requirements || "Not provided"}</p>
            </div>
          </div>
        </Card>

        {/* Documents Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5" />
            <h3 className="font-medium">Documents</h3>
          </div>
          <div className="text-sm">
            <span className="font-medium">Files uploaded:</span> {data.documents?.files?.length || 0}
          </div>
        </Card>

        {/* Workflow Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Workflow className="w-5 h-5" />
            <h3 className="font-medium">Workflow</h3>
          </div>
          <div className="text-sm">
            <span className="font-medium">Approval workflow:</span> {data.workflow?.approvalWorkflow || "Not selected"}
          </div>
        </Card>

        {/* Review Confirmation */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Checkbox id="reviewed" checked={reviewed} onCheckedChange={(checked) => setReviewed(checked as boolean)} />
            <div className="space-y-1">
              <label htmlFor="reviewed" className="text-sm font-medium cursor-pointer">
                I have reviewed all information and confirm it is accurate
              </label>
              <p className="text-xs text-muted-foreground">Please review all sections before proceeding to publish</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!reviewed}>
          Next Step
        </Button>
      </div>
    </div>
  )
}
