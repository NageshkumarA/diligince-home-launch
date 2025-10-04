"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Textarea } from "../../ui/textarea"
import { Label } from "../../ui/label"
import { FileText } from "lucide-react"
import type { StepData } from "../types"

interface DetailsFormProps {
  data: StepData
  onUpdate: (data: Partial<StepData>) => void
  onNext: () => void
  onPrev: () => void
}

export function DetailsForm({ data, onUpdate, onNext, onPrev }: DetailsFormProps) {
  const [specifications, setSpecifications] = useState(data.details?.specifications || "")
  const [requirements, setRequirements] = useState(data.details?.requirements || "")

  const handleNext = () => {
    onUpdate({
      details: {
        specifications,
        requirements,
      },
    })
    onNext()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-lg font-medium">
        <FileText className="w-5 h-5" />
        Technical Specifications
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="specifications">Detailed Specifications</Label>
          <Textarea
            id="specifications"
            placeholder="Provide detailed technical specifications, requirements, and any specific criteria..."
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value)}
            className="min-h-32"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Additional Requirements</Label>
          <Textarea
            id="requirements"
            placeholder="Any additional requirements, constraints, or special considerations..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="min-h-32"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  )
}
