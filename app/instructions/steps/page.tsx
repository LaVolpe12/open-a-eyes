"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function InstructionStepsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({})
  const router = useRouter()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      title: "Vorbereitung der Komponenten",
      components: ["Raspberry Pi Zero W", "Micro SD Karte", "Kreuzschlitz-Schraubenzieher"],
      instructions: [
        "Packe den Raspberry Pi Zero W aus und überprüfe auf Beschädigungen.",
        "Formatiere die Micro SD Karte mit dem SD Card Formatter Tool.",
        "Lade das Raspberry Pi OS Lite von der offiziellen Website herunter.",
        "Verwende das Raspberry Pi Imager, um das Betriebssystem auf die SD-Karte zu flashen.",
        "Aktiviere SSH, indem du eine leere Datei namens 'ssh' (ohne Dateiendung) im Boot-Verzeichnis der SD-Karte erstellst.",
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      title: "Zusammenbau des Brillengestells",
      components: ["Brillengestell", "Bügel Links", "Bügel Rechts", "Kleine Schrauben (M2)", "Imbusschlüssel"],
      instructions: [
        "Nimm das 3D-gedruckte Brillengestell und überprüfe, ob alle Kanten glatt sind.",
        "Falls nötig, schleife raue Kanten mit feinem Sandpapier ab.",
        "Positioniere den linken Bügel an der entsprechenden Stelle am Gestell.",
        "Befestige den Bügel mit zwei M2-Schrauben und ziehe sie mit dem Imbusschlüssel fest.",
        "Wiederhole den Vorgang für den rechten Bügel.",
        "Überprüfe, ob beide Bügel fest sitzen und sich gleichmäßig bewegen lassen.",
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      title: "Installation der Elektronik",
      components: ["Raspberry Pi Zero W", "Kamera", "Gehäuse 1", "Gehäuse 2", "Kamerahalterung", "Lötkolben", "Kabel"],
      instructions: [
        "Öffne das Gehäuse 1 und platziere den Raspberry Pi Zero W darin.",
        "Verbinde das Kamerakabel mit dem Raspberry Pi (CSI-Anschluss).",
        "Führe das Kabel durch die vorgesehene Öffnung im Gehäuse.",
        "Befestige die Kamera in der Kamerahalterung.",
        "Montiere die Kamerahalterung am Brillengestell.",
        "Verbinde die Stromversorgung mit dem Raspberry Pi.",
        "Schließe das Gehäuse mit dem Gehäuseteil 2.",
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      title: "Software-Installation und Test",
      components: ["Micro SD Karte", "Computer mit WLAN", "Akku"],
      instructions: [
        "Setze die vorbereitete Micro SD Karte in den Raspberry Pi ein.",
        "Verbinde den Akku mit dem Raspberry Pi.",
        "Warte, bis der Raspberry Pi hochgefahren ist (ca. 1-2 Minuten).",
        "Verbinde dich über SSH mit dem Raspberry Pi (Standardbenutzer: pi, Passwort: raspberry).",
        "Führe den Befehl 'sudo apt update && sudo apt upgrade -y' aus.",
        "Lade die Open-A-Eyes Software herunter: 'git clone https://github.com/open-a-eyes/software.git'",
        "Wechsle in das Verzeichnis: 'cd software'",
        "Führe das Installationsskript aus: 'sudo bash install.sh'",
        "Starte die Software mit 'python3 main.py' und teste die Funktionalität.",
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const handleStepComplete = (step: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }))
  }

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Navigate to success page when all steps are completed
      router.push("/instructions/success")
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <Link href="/instructions">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Checkliste
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-300">Fortschritt der Anleitung</p>
            <span className="text-sm font-medium text-gray-300">
              Schritt {currentStep} von {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-600" indicatorClassName="bg-blue-600" />
        </div>

        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">
              Schritt {currentStep}: {currentStepData.title}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="flex justify-center items-center bg-gray-800 rounded-lg p-4">
              <Image
                src={currentStepData.image || "/placeholder.svg"}
                alt={`Schritt ${currentStep}`}
                width={400}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-white">Benötigte Komponenten</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {currentStepData.components.map((component, index) => (
                      <li key={index} className="text-gray-300">
                        {component}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-white">Anleitung</h2>
                  <ol className="list-decimal pl-5 space-y-3">
                    {currentStepData.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-300">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <div className="flex flex-col space-y-4 pt-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id={`complete-step-${currentStep}`}
                    checked={completedSteps[currentStep] || false}
                    onCheckedChange={() => handleStepComplete(currentStep)}
                    className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor={`complete-step-${currentStep}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-300"
                  >
                    Ich habe alle Schritte problemlos durchgeführt
                  </Label>
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-xl"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      onClick={goToNextStep}
                      disabled={!completedSteps[currentStep]}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 rounded-xl"
                    >
                      Weiter zu Schritt {currentStep + 1}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={goToNextStep}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400 rounded-xl"
                      disabled={!completedSteps[currentStep]}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Anleitung abschließen
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
