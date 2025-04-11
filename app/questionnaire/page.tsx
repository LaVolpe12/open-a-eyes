"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useQuestionnaire } from "./questionnaire-context"

export default function QuestionnairePage() {
  const router = useRouter()
  const { formData, updateFormData, currentQuestionIndex, setCurrentQuestionIndex, totalQuestions } = useQuestionnaire()

  // Define all questions
  const questions = [
    {
      id: "age",
      category: "Demographische Daten",
      title: "Wie alt sind Sie?",
      type: "number",
      component: (
        <div className="space-y-2">
          <Label htmlFor="age" className="text-gray-200">
            Alter (Jahre)
          </Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            className="bg-gray-800 border-gray-600 text-white"
            value={formData.age}
            onChange={(e) => updateFormData("age", e.target.value)}
          />
        </div>
      ),
      isAnswered: () => formData.age !== "",
    },
    {
      id: "gender",
      category: "Demographische Daten",
      title: "Welches Geschlecht haben Sie?",
      type: "radio",
      component: (
        <div className="space-y-4">
          <Label className="text-gray-200">Geschlecht</Label>
          <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="gender-male" className="border-blue-500 text-blue-600" />
                <Label htmlFor="gender-male" className="text-gray-300">
                  männlich
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="gender-female" className="border-blue-500 text-blue-600" />
                <Label htmlFor="gender-female" className="text-gray-300">
                  weiblich
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="diverse" id="gender-diverse" className="border-blue-500 text-blue-600" />
                <Label htmlFor="gender-diverse" className="text-gray-300">
                  divers
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      isAnswered: () => formData.gender !== "",
    },
    {
      id: "education",
      category: "Demographische Daten",
      title: "Was ist Ihr höchster Bildungsabschluss?",
      type: "radio",
      component: (
        <div className="space-y-4">
          <Label className="text-gray-200">Höchster Bildungsabschluss</Label>
          <RadioGroup value={formData.education} onValueChange={(value) => updateFormData("education", value)}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="edu-none" className="border-blue-500 text-blue-600" />
                <Label htmlFor="edu-none" className="text-gray-300">
                  kein Abschluss
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hauptschule" id="edu-hauptschule" className="border-blue-500 text-blue-600" />
                <Label htmlFor="edu-hauptschule" className="text-gray-300">
                  Hauptschulabschluss
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="realschule" id="edu-realschule" className="border-blue-500 text-blue-600" />
                <Label htmlFor="edu-realschule" className="text-gray-300">
                  Mittlere Reife
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="abitur" id="edu-abitur" className="border-blue-500 text-blue-600" />
                <Label htmlFor="edu-abitur" className="text-gray-300">
                  Fachhochschulreife/Abitur
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hochschule" id="edu-hochschule" className="border-blue-500 text-blue-600" />
                <Label htmlFor="edu-hochschule" className="text-gray-300">
                  Hochschulabschluss (Bachelor, Master, Diplom)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="promotion" id="edu-promotion" className="border-blue-500 text-blue-600" />
                <Label htmlFor="edu-promotion" className="text-gray-300">
                  Promotion
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      isAnswered: () => formData.education !== "",
    },
    {
      id: "occupation",
      category: "Demographische Daten",
      title: "Was ist Ihr aktueller Beruf?",
      type: "text",
      component: (
        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-gray-200">
            Aktueller Beruf
          </Label>
          <Input
            id="occupation"
            className="bg-gray-800 border-gray-600 text-white"
            value={formData.occupation}
            onChange={(e) => updateFormData("occupation", e.target.value)}
          />
        </div>
      ),
      isAnswered: () => formData.occupation !== "",
    },
    {
      id: "techAffinity",
      category: "Technische Vorerfahrung",
      title: "Würden Sie sich generell als technikaffin bezeichnen?",
      type: "radio",
      component: (
        <div className="space-y-4">
          <RadioGroup value={formData.techAffinity} onValueChange={(value) => updateFormData("techAffinity", value)}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="very" id="tech-very" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="tech-very" className="text-gray-300 text-base">
                  ja, sehr
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="rather-yes"
                  id="tech-rather-yes"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="tech-rather-yes" className="text-gray-300 text-base">
                  eher ja
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="neutral" id="tech-neutral" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="tech-neutral" className="text-gray-300 text-base">
                  neutral
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="rather-no"
                  id="tech-rather-no"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="tech-rather-no" className="text-gray-300 text-base">
                  eher nein
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="not-at-all"
                  id="tech-not-at-all"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="tech-not-at-all" className="text-gray-300 text-base">
                  nein, gar nicht
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      isAnswered: () => formData.techAffinity !== "",
    },
    {
      id: "techJob",
      category: "Technische Vorerfahrung",
      title: "Haben Sie jemals einen technischen Beruf ausgeübt oder eine technische Ausbildung absolviert?",
      type: "radio",
      component: (
        <div className="space-y-4">
          <RadioGroup value={formData.techJob} onValueChange={(value) => updateFormData("techJob", value)}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="job" id="tech-job" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="tech-job" className="text-gray-300 text-base">
                  ja, Beruf
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="education"
                  id="tech-education"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="tech-education" className="text-gray-300 text-base">
                  ja, Ausbildung
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no" id="tech-no" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="tech-no" className="text-gray-300 text-base">
                  nein
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      isAnswered: () => formData.techJob !== "",
    },
    {
      id: "diyExperience",
      category: "Technische Vorerfahrung",
      title: "Haben Sie schon Erfahrungen mit DIY-Projekten oder Elektronik-Baukästen?",
      type: "radio",
      component: (
        <div className="space-y-4">
          <RadioGroup value={formData.diyExperience} onValueChange={(value) => updateFormData("diyExperience", value)}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="often" id="diy-often" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="diy-often" className="text-gray-300 text-base">
                  ja, häufig
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="occasionally"
                  id="diy-occasionally"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="diy-occasionally" className="text-gray-300 text-base">
                  gelegentlich
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="rarely" id="diy-rarely" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="diy-rarely" className="text-gray-300 text-base">
                  selten
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="never" id="diy-never" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="diy-never" className="text-gray-300 text-base">
                  nie
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      isAnswered: () => formData.diyExperience !== "",
    },
    {
      id: "sus1",
      category: "System Usability Scale (SUS)",
      title: "Ich denke, dass ich die DIY-KI-Brille regelmäßig nutzen würde.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus1}
              onValueChange={(value) => updateFormData("sus1", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus1-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus1-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus1 !== "",
    },
    {
      id: "sus2",
      category: "System Usability Scale (SUS)",
      title: "Ich finde die DIY-KI-Brille unnötig kompliziert.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus2}
              onValueChange={(value) => updateFormData("sus2", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus2-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus2-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus2 !== "",
    },
    {
      id: "sus3",
      category: "System Usability Scale (SUS)",
      title: "Ich denke, die DIY-KI-Brille ist einfach zu benutzen.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus3}
              onValueChange={(value) => updateFormData("sus3", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus3-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus3-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus3 !== "",
    },
    {
      id: "sus4",
      category: "System Usability Scale (SUS)",
      title: "Ich denke, ich würde technische Unterstützung benötigen, um die DIY-KI-Brille effektiv zu nutzen.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus4}
              onValueChange={(value) => updateFormData("sus4", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus4-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus4-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus4 !== "",
    },
    {
      id: "sus5",
      category: "System Usability Scale (SUS)",
      title: "Ich finde, die verschiedenen Funktionen der DIY-KI-Brille sind gut integriert.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus5}
              onValueChange={(value) => updateFormData("sus5", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus5-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus5-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus5 !== "",
    },
    {
      id: "sus6",
      category: "System Usability Scale (SUS)",
      title: "Ich finde, dass die DIY-KI-Brille zu viele Inkonsistenzen enthält.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus6}
              onValueChange={(value) => updateFormData("sus6", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus6-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus6-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus6 !== "",
    },
    {
      id: "sus7",
      category: "System Usability Scale (SUS)",
      title: "Ich denke, dass die meisten Leute sehr schnell lernen würden, mit der DIY-KI-Brille umzugehen.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus7}
              onValueChange={(value) => updateFormData("sus7", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus7-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus7-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus7 !== "",
    },
    {
      id: "sus8",
      category: "System Usability Scale (SUS)",
      title: "Ich finde die DIY-KI-Brille sehr mühsam zu benutzen.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus8}
              onValueChange={(value) => updateFormData("sus8", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus8-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus8-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus8 !== "",
    },
    {
      id: "sus9",
      category: "System Usability Scale (SUS)",
      title: "Ich fühlte mich beim Gebrauch der DIY-KI-Brille sehr sicher.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus9}
              onValueChange={(value) => updateFormData("sus9", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus9-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus9-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus9 !== "",
    },
    {
      id: "sus10",
      category: "System Usability Scale (SUS)",
      title: "Ich musste eine Menge lernen, bevor ich die DIY-KI-Brille richtig nutzen konnte.",
      type: "scale",
      component: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm text-gray-400">stimme überhaupt nicht zu</span>
              <span className="text-sm text-gray-400">stimme vollkommen zu</span>
            </div>
            <RadioGroup
              value={formData.sus10}
              onValueChange={(value) => updateFormData("sus10", value)}
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`sus10-${value}`}
                    className="h-6 w-6 border-blue-500 text-blue-600"
                  />
                  <Label htmlFor={`sus10-${value}`} className="text-gray-300 mt-2 text-lg">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
      isAnswered: () => formData.sus10 !== "",
    },
    {
      id: "assemblyDifficulty",
      category: "Gesamteindruck und Verbesserungsvorschläge",
      title: "Wie bewerten Sie insgesamt den Zusammenbau der DIY-KI-Brille?",
      type: "radio",
      component: (
        <div className="space-y-4">
          <RadioGroup
            value={formData.assemblyDifficulty}
            onValueChange={(value) => updateFormData("assemblyDifficulty", value)}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="very-easy"
                  id="assembly-very-easy"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="assembly-very-easy" className="text-gray-300 text-base">
                  sehr einfach
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="easy" id="assembly-easy" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="assembly-easy" className="text-gray-300 text-base">
                  einfach
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="neutral"
                  id="assembly-neutral"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="assembly-neutral" className="text-gray-300 text-base">
                  neutral
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="difficult"
                  id="assembly-difficult"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="assembly-difficult" className="text-gray-300 text-base">
                  schwierig
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="very-difficult"
                  id="assembly-very-difficult"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="assembly-very-difficult" className="text-gray-300 text-base">
                  sehr schwierig
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      isAnswered: () => formData.assemblyDifficulty !== "",
    },
    {
      id: "instructionQuality",
      category: "Gesamteindruck und Verbesserungsvorschläge",
      title: "Wie bewerten Sie insgesamt die Qualität der Anleitung?",
      type: "radio",
      component: (
        <div className="space-y-4">
          <RadioGroup
            value={formData.instructionQuality}
            onValueChange={(value) => updateFormData("instructionQuality", value)}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="very-good"
                  id="instruction-very-good"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="instruction-very-good" className="text-gray-300 text-base">
                  sehr gut
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="good" id="instruction-good" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="instruction-good" className="text-gray-300 text-base">
                  gut
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="neutral"
                  id="instruction-neutral"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="instruction-neutral" className="text-gray-300 text-base">
                  neutral
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="bad" id="instruction-bad" className="h-5 w-5 border-blue-500 text-blue-600" />
                <Label htmlFor="instruction-bad" className="text-gray-300 text-base">
                  schlecht
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="very-bad"
                  id="instruction-very-bad"
                  className="h-5 w-5 border-blue-500 text-blue-600"
                />
                <Label htmlFor="instruction-very-bad" className="text-gray-300 text-base">
                  sehr schlecht
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      isAnswered: () => formData.instructionQuality !== "",
    },
    {
      id: "suggestions",
      category: "Gesamteindruck und Verbesserungsvorschläge",
      title: "Haben Sie Verbesserungsvorschläge zum Produkt oder zur Bauanleitung?",
      type: "textarea",
      component: (
        <div className="space-y-2">
          <Label htmlFor="suggestions" className="text-gray-200">
            Haben Sie Verbesserungsvorschläge zum Produkt oder zur Bauanleitung?
          </Label>
          <Textarea
            id="suggestions"
            rows={5}
            className="bg-gray-800 border-gray-600 text-white"
            value={formData.suggestions}
            onChange={(e) => updateFormData("suggestions", e.target.value)}
          />
        </div>
      ),
      isAnswered: () => true, // Optional field
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      window.scrollTo(0, 0)
    } else {
      // Submit the form when reaching the last question
      handleSubmit()
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit questionnaire')
      }

      // Nach erfolgreicher Übermittlung zur Danke-Seite navigieren
      router.push('/questionnaire/thanks')
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
      // Hier könnte man eine Fehlermeldung anzeigen
    }
  }

  // Redirect to consent page if user hasn't agreed to terms
  useEffect(() => {
    // In a real app, you would check if the user has agreed to the terms
    // For now, we'll just redirect to the consent page if this is the first load
    // This is just a placeholder - in a real app, you would use cookies or localStorage
    // to check if the user has already agreed to the terms
  }, [])

  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-300">Fortschritt</p>
            <span className="text-sm font-medium text-gray-300">
              Frage {currentQuestionIndex + 1} von {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-600" />
        </div>

        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl">
            <CardTitle className="text-xl">{currentQuestion.category}</CardTitle>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">{currentQuestion.title}</h2>
            {currentQuestion.component}
          </CardContent>

          <CardFooter className="flex justify-between border-t border-gray-600 pt-6">
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>

            <Button
              onClick={goToNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!currentQuestion.isAnswered()}
            >
              {currentQuestionIndex === questions.length - 1 ? "Absenden" : "Weiter"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
