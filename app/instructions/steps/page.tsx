"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingCart, ExternalLink, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"

type Component = {
  name: string
  description: string
  price: string
  link: string
  image: string
}

type Step = {
  title: string
  components: Component[] | string[]
  instructions: string[]
  image: string | null
}

export default function InstructionStepsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [checkedComponents, setCheckedComponents] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps: Step[] = [
    {
      title: "Elektronik und Bauteile bestellen",
      components: [
        {
          name: "Raspberry PI Zero 2 WH",
          description: "Minicomputer für die Verarbeitung",
          price: "15-20€",
          link: "https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/",
          image: "/Einzelteile/Raspberry_PI_Zero_2_WH.jpg"
        },
        {
          name: "SeeedStudio reSpeaker 2-Mics PI HAT",
          description: "Mikrofonmodul für Sprachbefehle",
          price: "25-30€",
          link: "https://www.seeedstudio.com/ReSpeaker-2-Mics-Pi-HAT.html",
          image: "/Einzelteile/reSpeaker_2-Mics_PI_HAT.jpg"
        },
        {
          name: "ZeroCam",
          description: "Kamera für Bilderfassung",
          price: "15-20€",
          link: "https://www.reichelt.de/de/de/shop/produkt/raspberry_pi_zero_-_kamera_5mp_160_-242757",
          image: "/Einzelteile/ZeroCam.jpg"
        },
        {
          name: "Lautsprecher mit JST-PH2.0 mm",
          description: "Für Audioausgabe",
          price: "16.99€",
          link: "https://www.az-delivery.de/products/2-stuck-dfplayer-mini-3-watt-8-ohm-mini-lautsprecher-mit-jst-ph2-0-mm-pin-schnittstelle-fur-arduino-raspberry-pi-und-elektronische-diy-projekte-inklusive-e-book",
          image: "/Einzelteile/Lautsprecher.jpg"
        },
        {
          name: "SD-Karte (min. 64 GB)",
          description: "Für Betriebssystem und Software",
          price: "12.90€",
          link: "https://www.cyberport.de/?DEEP=4H20-04W",
          image: "/Einzelteile/SD-Karte.jpg"
        },
        {
          name: "M2 x 20 mm Gewindeschraube",
          description: "4 Stück",
          price: "2-3€",
          link: "#",
          image: "/Einzelteile/Schrauben_und_Muttern.jpg"
        },
        {
          name: "M2 x 16 mm Gewindeschraube",
          description: "6 Stück",
          price: "2-3€",
          link: "#",
          image: "/Einzelteile/Schrauben_und_Muttern.jpg"
        },
        {
          name: "M2 x 6 mm Gewindeschraube",
          description: "1 Stück",
          price: "1-2€",
          link: "#",
          image: "/Einzelteile/Schrauben_und_Muttern.jpg"
        },
        {
          name: "M2 Mutter",
          description: "11 Stück",
          price: "2-3€",
          link: "#",
          image: "/Einzelteile/Schrauben_und_Muttern.jpg"
        }
      ],
      instructions: [],
      image: null
    },
    {
      title: "Download der benötigten Dateien",
      components: [],
      instructions: [
        "Lade folgende Dateien herunter:",
        "1. STL-Datei mit allen benötigten 3D-Druckteilen",
        "2. Image-Datei mit dem speziellen Open-A-Eyes Betriebssystem"
      ],
      image: null
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

          <div className="p-6">
            {currentStep === 1 ? (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <p className="text-gray-300 mb-4">
                    Zuerst musst du dir die nötigen elektronischen sowie mechanischen Komponenten bestellen. 
                    In der nachfolgenden Einkaufsliste findest du alle benötigten Teile mit Links zu den jeweiligen Händlern.
                  </p>
                  <p className="text-gray-300">
                    Falls du die Bauteile bereits besorgt hast, kannst du diesen Schritt überspringen. 
                    Eine alternative Übersicht findest du auch auf der Startseite unter "Komponenten und Downloads".
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <h2 className="text-xl font-semibold mb-4 text-white">Einkaufsliste</h2>
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="border-b border-gray-600">
                        <TableHead className="w-[100px] text-gray-200">Bild</TableHead>
                        <TableHead className="w-[200px] text-gray-200">Komponente</TableHead>
                        <TableHead className="w-[300px] text-gray-200">Beschreibung</TableHead>
                        <TableHead className="text-gray-200">Preis (ca.)</TableHead>
                        <TableHead className="text-right text-gray-200">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(currentStepData.components as Component[]).map((component, index) => (
                        <TableRow key={index} className="border-b border-gray-600">
                          <TableCell className="w-[100px]">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                              <Image
                                src={component.image}
                                alt={component.name}
                                width={80}
                                height={80}
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-white">{component.name}</TableCell>
                          <TableCell className="text-gray-300">{component.description}</TableCell>
                          <TableCell className="text-gray-300">{component.price}</TableCell>
                          <TableCell className="text-right">
                            <a
                              href={component.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-400 hover:text-blue-300"
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Kaufen</span>
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {currentStep === 2 ? (
                  <div className="space-y-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-4 text-white">Downloads</h2>
                      <div className="flex flex-col gap-4">
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Link href="https://drive.google.com/file/d/1KpDreYGmDURJrR_RDKt6IjK-QTh45qdg/view?usp=sharing">
                            <Download className="mr-2 h-4 w-4" />
                            STL-Dateien herunterladen
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Link href="https://drive.google.com/file/d/1z3g_nLzVUI8tefPy9BgpnXQ7TdAwLYP4/view?usp=sharing">
                            <Download className="mr-2 h-4 w-4" />
                            Betriebssystem-Image herunterladen
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-gray-800 rounded-lg p-4">
                    {currentStep === 3 ? (
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
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-600">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4 text-white">Das brauchst du</h2>
                      <div className="space-y-3">
                        {(currentStepData.components as string[]).map((component, index) => (
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
              </div>
            )}

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
