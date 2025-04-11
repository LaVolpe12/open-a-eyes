"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type FormData = {
  age: string
  gender: string
  education: string
  occupation: string
  techAffinity: string
  techJob: string
  diyExperience: string
  sus1: string
  sus2: string
  sus3: string
  sus4: string
  sus5: string
  sus6: string
  sus7: string
  sus8: string
  sus9: string
  sus10: string
  assemblyDifficulty: string
  instructionQuality: string
  suggestions: string
}

type QuestionnaireContextType = {
  formData: FormData
  updateFormData: (field: keyof FormData, value: string) => void
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  totalQuestions: number
}

const initialFormData: FormData = {
  age: "",
  gender: "",
  education: "",
  occupation: "",
  techAffinity: "",
  techJob: "",
  diyExperience: "",
  sus1: "",
  sus2: "",
  sus3: "",
  sus4: "",
  sus5: "",
  sus6: "",
  sus7: "",
  sus8: "",
  sus9: "",
  sus10: "",
  assemblyDifficulty: "",
  instructionQuality: "",
  suggestions: "",
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined)

export const QuestionnaireProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const totalQuestions = 19 // Total number of questions in the questionnaire

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        formData,
        updateFormData,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        totalQuestions,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  )
}

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext)
  if (context === undefined) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider")
  }
  return context
}
