"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function InstructionStepsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [checkedComponents, setCheckedComponents] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      title: "Elektronik und Bauteile bestellen",
      components: [
        "Raspberry PI Zero 2 WH (15-20€)",
        "SeeedStudio reSpeaker 2-Mics PI HAT (25-30€)",
        "ZeroCam (15-20€)",
        "Lautsprecher mit JST-PH2.0 mm (16.99€)",
        "SD-Karte (min. 64 GB) (12.90€)",
        "M2 x 20 mm Gewindeschraube (4 Stück) (2-3€)",
        "M2 x 16 mm Gewindeschraube (6 Stück) (2-3€)",
        "M2 x 6 mm Gewindeschraube (1 Stück) (1-2€)",
        "M2 Mutter (11 Stück) (2-3€)"
      ],
      instructions: [
        "Bestelle alle elektronischen Komponenten und mechanischen Bauteile aus der Liste.",
        "Achte darauf, dass die SD-Karte mindestens 64 GB Speicherplatz hat.",
        "Überprüfe die Lieferzeiten der Komponenten und bestelle rechtzeitig.",
        "Lager die Komponenten sicher und trocken, bis du mit dem Zusammenbau beginnst.",
        "Überprüfe alle Komponenten auf Beschädigungen nach Erhalt."
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      title: "Zusammenbau",
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

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setCheckedComponents({}) // Reset checked components when changing steps
      window.scrollTo(0, 0)
    } else {
      // Navigate to success page when all steps are completed
      router.push("/instructions/success")
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setCheckedComponents({}) // Reset checked components when changing steps
      window.scrollTo(0, 0)
    }
  }

  const toggleComponent = (component: string) => {
    setCheckedComponents((prev) => ({
      ...prev,
      [component]: !prev[component],
    }))
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
              Zurück zur Übersicht
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
          <Progress value={progress} className="h-2 bg-gray-600 [&>div]:bg-blue-600" />
        </div>

        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">
              Schritt {currentStep}: {currentStepData.title}
            </h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-center items-center bg-gray-800 rounded-lg p-4">
              {currentStep === 2 ? (
                <div className="aspect-video w-full max-w-3xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/AB-y0bRjPt8"
                    title="Open-A-Eyes Zusammenbau Anleitung"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              ) : (
                <Image
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={`Schritt ${currentStep}`}
                  width={400}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-white">Das brauchst du</h2>
                  <div className="space-y-3">
                    {currentStepData.components.map((component, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Checkbox
                          id={`component-${index}`}
                          checked={checkedComponents[component] || false}
                          onCheckedChange={() => toggleComponent(component)}
                          className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                        />
                        <Label
                          htmlFor={`component-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-300"
                        >
                          {component}
                        </Label>
                      </div>
                    ))}
                  </div>
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
            </div>

            <div className="flex justify-between pt-4">
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
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Weiter zu Schritt {currentStep + 1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={goToNextStep}
                  className="bg-green-600 hover:bg-green-700 rounded-xl"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Anleitung abschließen
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
