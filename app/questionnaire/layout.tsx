"use client"

import type React from "react"

import { QuestionnaireProvider } from "./questionnaire-context"

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  return <QuestionnaireProvider>{children}</QuestionnaireProvider>
}
