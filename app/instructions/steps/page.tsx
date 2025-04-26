"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingCart, ExternalLink, Download, Cpu, Printer, Wrench, CircuitBoard, Box, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"
import { motion, AnimatePresence } from "framer-motion"

interface Component {
  name: string
  description: string
  price: string
  link: string
  image: string
}

interface ChecklistItem {
  name: string
  checked: boolean
}

interface ChecklistCategory {
  category: string
  items: ChecklistItem[]
}

type StepComponent = Component | ChecklistCategory

interface Step {
  title: string
  components: StepComponent[]
  instructions?: string[]
  image?: string
  video?: {
    url: string
    timestamps: { time: string; title: string; link?: string }[]
  }
}

export default function InstructionStepsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})
  const [allChecked, setAllChecked] = useState(false)
  const router = useRouter()

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const steps: Step[] = [
    {
      title: "Elektronik und Bauteile bestellen",
      components: [
        {
          name: "Raspberry PI Zero 2 WH",
          description: "Hauptprozessor",
          price: "15-20€",
          link: "",
          image: "/placeholder.svg"
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
      image: "/placeholder.svg"
    },
    {
      title: "Download der benötigten Dateien",
      components: [],
      instructions: [
        "Lade folgende Dateien herunter:",
        "1. STL-Datei mit allen benötigten 3D-Druckteilen",
        "2. Image-Datei mit dem speziellen Open-A-Eyes Betriebssystem"
      ],
      image: "/placeholder.svg"
    },
    {
      title: "3D-Druckteile bestellen",
      components: [
        {
          name: "3D-Druckteile",
          description: "Alle benötigten 3D-Druckteile",
          price: "",
          link: "https://www.3ddesign24.de/produkt/3d-druck-service/",
          image: "/placeholder.svg"
        }
      ],
      image: "/placeholder.svg"
    },
    {
      title: "Überprüfe, ob alle Komponenten vorhanden sind",
      components: [
        {
          category: "Elektronik und Montageteile",
          items: [
            { name: "Raspberry PI Zero 2 WH", checked: false },
            { name: "SeeedStudio reSpeaker 2-Mics PI HAT", checked: false },
            { name: "ZeroCam", checked: false },
            { name: "Lautsprecher mit JST-PH2.0 mm", checked: false },
            { name: "SD-Karte (min. 64 GB)", checked: false },
            { name: "M2 x 20 mm Gewindeschraube (4 Stück)", checked: false },
            { name: "M2 x 16 mm Gewindeschraube (6 Stück)", checked: false },
            { name: "M2 x 6 mm Gewindeschraube (1 Stück)", checked: false },
            { name: "M2 Mutter (11 Stück)", checked: false }
          ]
        },
        {
          category: "3D-Druckteile",
          items: [
            { name: "Fassung", checked: false },
            { name: "Kabelführung", checked: false },
            { name: "Rechter Bügel", checked: false },
            { name: "Verbindungsteil vom rechten Bügel", checked: false },
            { name: "Elektronik-Gehäuse", checked: false },
            { name: "Kamera-Gehäuse", checked: false },
            { name: "Knopf", checked: false },
            { name: "Abstandshalter", checked: false },
            { name: "Linker Bügel", checked: false },
            { name: "Lautsprecher-Gehäuse", checked: false },
            { name: "Hilfswerkzeug 1", checked: false },
            { name: "Hilfswerkzeug 2", checked: false }
          ]
        },
        {
          category: "Sonstiges",
          items: [
            { name: "Computer oder Laptop", checked: false },
            { name: "Kreditkarte (für deine API)", checked: false }
          ]
        }
      ],
      instructions: [],
      image: "/placeholder.svg"
    },
    {
      title: "SD-Karte vorbereiten",
      components: [],
      instructions: [],
      video: {
        url: "https://www.youtube.com/embed/i4tvI5U2_mM",
        timestamps: [
          { time: "00:25", title: "Raspberry PI Imager installieren", link: "https://www.raspberrypi.com/software/" },
          { time: "01:31", title: "Image konfigurieren und auf SD-Karte schreiben" },
          { time: "06:39", title: "API Key einfügen" },
          { time: "08:44", title: "Informationen zur ersten Einrichtung" },
          { time: "09:22", title: "Informationen, wie weitere API-Keys eingefügt werden können" }
        ]
      }
    }
  ]

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setCheckedItems({})
      setAllChecked(false)
      window.scrollTo(0, 0)
    } else {
      // Navigate to success page when all steps are completed
      router.push("/instructions/success")
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setCheckedItems({})
      setAllChecked(false)
      window.scrollTo(0, 0)
    }
  }

  const handleCheckAll = (checked: boolean) => {
    const newCheckedItems: { [key: string]: boolean } = {}
    if (checked) {
      steps[currentStep - 1].components.forEach((component) => {
        if ('items' in component) {
          component.items.forEach((item) => {
            newCheckedItems[item.name] = true
          })
        }
      })
    }
    setCheckedItems(newCheckedItems)
    setAllChecked(checked)
  }

  const handleItemCheck = (itemName: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [itemName]: checked }))
    
    // Check if all items are checked
    const allItems = steps[currentStep - 1].components.flatMap((component) => {
      if ('items' in component) {
        return component.items
      }
      return []
    })
    
    const areAllChecked = allItems.every((item) => checkedItems[item.name])
    setAllChecked(areAllChecked)
  }

  const currentStepData = steps[currentStep - 1]

  const getComponentNames = (components: StepComponent[]): string[] => {
    return components.flatMap(component => {
      if ('items' in component) {
        return component.items.map(item => item.name);
      }
      return [component.name];
    });
  };

  const componentNames = getComponentNames(currentStepData.components);

  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <Link href="/instructions">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Übersicht
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-300">Fortschritt der Anleitung</p>
            <span className="text-sm font-medium text-gray-300">
              Schritt {currentStep} von {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-600 [&>div]:bg-blue-600" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-4 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">
              Schritt {currentStep}: {currentStepData.title}
            </h1>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
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
                ) : currentStep === 2 ? (
                  <div className="space-y-6">
                    <div className="space-y-6">
                      <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-white">Lade folgende Dateien herunter</h2>
                        <div className="flex flex-col gap-4">
                          <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Link href="https://drive.google.com/file/d/1z3g_nLzVUI8tefPy9BgpnXQ7TdAwLYP4/view?usp=sharing">
                              <Download className="mr-2 h-4 w-4" />
                              STL-Dateien herunterladen
                            </Link>
                          </Button>
                          <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Link href="https://drive.google.com/file/d/1KpDreYGmDURJrR_RDKt6IjK-QTh45qdg/view?usp=sharing">
                              <Download className="mr-2 h-4 w-4" />
                              Betriebssystem-Image herunterladen
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentStep === 3 ? (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center bg-gray-800 rounded-lg p-4"
                    >
                      <div className="aspect-video w-full max-w-3xl">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/lmDetSYANEU"
                          title="3D-Druck Anleitung"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg shadow-lg"
                        ></iframe>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gray-800 rounded-lg p-6 text-center"
                    >
                      <Button
                        asChild
                        className="bg-blue-600 hover:bg-blue-700 text-white mb-4 text-lg py-6 transition-all duration-300 hover:scale-105"
                      >
                        <Link href="https://www.3ddesign24.de/produkt/3d-druck-service/">
                          Hier gehts zum 3D-Druck-Shop
                        </Link>
                      </Button>
                      <p className="text-gray-300">
                        Falls du einen eigenen 3D-Drucker besitzt oder dir die Teile bei einem anderen Anbieter ausdrucken lassen möchtest, kannst du diesen Schritt überspringen.
                      </p>
                    </motion.div>
                  </div>
                ) : currentStep === 4 ? (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <div className="flex items-center space-x-2 mb-6">
                        <Checkbox
                          checked={allChecked}
                          onCheckedChange={handleCheckAll}
                          className="h-6 w-6 border-2 border-blue-500 data-[state=checked]:bg-blue-500 transition-all duration-300"
                        />
                        <Label
                          className="text-lg font-medium text-white"
                        >
                          Alle Komponenten überprüfen
                        </Label>
                      </div>

                      <div className="space-y-8">
                        {steps[3].components.map((component, index) => {
                          if ('category' in component) {
                            return (
                              <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="space-y-2"
                              >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                  {component.category === "Elektronik und Montageteile" && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                      <CircuitBoard className="h-5 w-5 text-blue-400" />
                                    </motion.div>
                                  )}
                                  {component.category === "3D-Druckteile" && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                      <Box className="h-5 w-5 text-blue-400" />
                                    </motion.div>
                                  )}
                                  {component.category === "Sonstiges" && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                      <Settings className="h-5 w-5 text-blue-400" />
                                    </motion.div>
                                  )}
                                  {component.category}
                                </h3>
                                <div className="space-y-2 pl-4">
                                  {component.items.map((item, itemIndex) => (
                                    <motion.div 
                                      key={itemIndex}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                                      className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-[1.02]"
                                    >
                                      <Checkbox
                                        checked={checkedItems[item.name] || false}
                                        onCheckedChange={(checked) => handleItemCheck(item.name, checked as boolean)}
                                        className="h-5 w-5 border-2 border-blue-500 data-[state=checked]:bg-blue-500 transition-all duration-300"
                                      />
                                      <label className="text-white flex-1">{item.name}</label>
                                      {checkedItems[item.name] && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        </motion.div>
                                      )}
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )
                          }
                          return null
                        })}
                      </div>
                    </motion.div>
                  </div>
                ) : currentStep === 5 ? (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center bg-gray-800 rounded-lg p-4"
                    >
                      <div className="aspect-video w-full max-w-3xl">
                        <iframe
                          width="100%"
                          height="100%"
                          src={steps[4].video?.url}
                          title="SD-Karte vorbereiten"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg shadow-lg"
                          id="youtube-player"
                        ></iframe>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">Abschnitte</h2>
                      <div className="space-y-3">
                        {steps[4].video?.timestamps.map((timestamp, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                            onClick={() => {
                              const player = document.getElementById('youtube-player') as HTMLIFrameElement;
                              const [minutes, seconds] = timestamp.time.split(':').map(Number);
                              const timeInSeconds = minutes * 60 + seconds;
                              player.src = `${steps[4].video?.url}?start=${timeInSeconds}`;
                            }}
                          >
                            <span className="text-blue-400 font-medium">{timestamp.time}</span>
                            <span className="text-white flex-1">{timestamp.title}</span>
                            {timestamp.link && (
                              <a
                                href={timestamp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-between pt-4"
            >
              <Button
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                variant="outline"
                className="border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={goToNextStep}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Weiter zu Schritt {currentStep + 1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={goToNextStep}
                  className="bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Anleitung abschließen
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
