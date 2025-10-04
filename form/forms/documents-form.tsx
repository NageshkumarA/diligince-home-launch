"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { Upload, File, X } from "lucide-react"
import type { StepData } from "../types"

interface DocumentsFormProps {
  data: StepData
  onUpdate: (data: Partial<StepData>) => void
  onNext: () => void
  onPrev: () => void
}

export function DocumentsForm({ data, onUpdate, onNext, onPrev }: DocumentsFormProps) {
  const [files, setFiles] = useState<File[]>(data.documents?.files || [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    onUpdate({
      documents: { files },
    })
    onNext()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-lg font-medium">
        <Upload className="w-5 h-5" />
        Supporting Documents
      </div>

      <div className="space-y-6">
        <Card className="border-2 border-dashed border-muted-foreground/25 p-8">
          <div className="text-center space-y-4">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-medium">Upload supporting files</h3>
              <p className="text-sm text-muted-foreground mt-1">Drag and drop files here, or click to browse</p>
            </div>
            <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
            <Button variant="outline" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </Card>

        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Uploaded Files</h4>
            {files.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
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
