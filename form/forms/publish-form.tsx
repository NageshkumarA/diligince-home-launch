"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { Send, CheckCircle, Clock } from "lucide-react"
import type { StepData } from "../types"

interface PublishFormProps {
  data: StepData
  onUpdate: (data: Partial<StepData>) => void
  onNext: () => void
  onPrev: () => void
}

export function PublishForm({ data, onUpdate, onNext, onPrev }: PublishFormProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [published, setPublished] = useState(data.publish?.published || false)

  const handlePublish = async () => {
    setIsPublishing(true)

    // Simulate publishing process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setPublished(true)
    setIsPublishing(false)

    onUpdate({
      publish: { published: true },
    })

    // Call onNext to complete the form
    onNext()
  }

  if (published) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-green-600">Successfully Published!</h2>
            <p className="text-muted-foreground mt-2">
              Your procurement requirement has been submitted and is now in the approval workflow.
            </p>
          </div>
        </div>

        <Card className="p-6 bg-green-50 border-green-200">
          <div className="space-y-3">
            <h3 className="font-medium text-green-800">What happens next?</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Your requirement will be reviewed by the approval team</li>
              <li>• You'll receive email notifications on status updates</li>
              <li>• The procurement process will begin once approved</li>
            </ul>
          </div>
        </Card>

        <div className="flex justify-center pt-6 border-t">
          <Button onClick={() => window.location.reload()}>Create Another Requirement</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-lg font-medium">
        <Send className="w-5 h-5" />
        Publish Requirement
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-medium">Ready to publish your requirement?</h3>
            <p className="text-muted-foreground">
              Once published, your requirement will enter the approval workflow and cannot be edited. Make sure all
              information is correct before proceeding.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Timeline</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• Immediate: Requirement submitted to approval queue</div>
                <div>• 1-2 days: Initial review and validation</div>
                <div>• 3-5 days: Approval workflow completion</div>
                <div>• 5-7 days: Procurement process begins</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={handlePublish} disabled={isPublishing} className="bg-blue-600 hover:bg-blue-700">
          {isPublishing ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Publish Requirement
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
