import type React from "react"
export interface StepData {
  basicInfo?: {
    title: string
    category: string
    priority: string
  }
  details?: {
    specifications: string
    requirements: string
  }
  documents?: {
    files: File[]
  }
  workflow?: {
    approvalWorkflow: string
  }
  preview?: {
    reviewed: boolean
  }
  publish?: {
    published: boolean
  }
}

export interface FormStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ComponentType<{
    data: StepData
    onUpdate: (data: Partial<StepData>) => void
    onNext: () => void
    onPrev: () => void
  }>
}
