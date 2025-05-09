"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingCart, ExternalLink, Download, Cpu, Printer, Wrench, CircuitBoard, Box, Settings, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
    link?: {
      title: string
      url: string
    }
  }
}

export default function InstructionStepsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InstructionStepsContent />
    </Suspense>
  )
}

function InstructionStepsContent() {
  const [currentStep, setCurrentStep] = useState(1)
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})
  const [allChecked, setAllChecked] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const videoRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const stepParam = searchParams.get('step')
    if (stepParam) {
      const stepNumber = parseInt(stepParam)
      if (!isNaN(stepNumber) && stepNumber >= 1 && stepNumber <= totalSteps) {
        setCurrentStep(stepNumber)
      }
    }
  }, [searchParams])

  const totalSteps = 8
  const progress = (currentStep / totalSteps) * 100

  const steps: Step[] = [
    {
      title: "Elektronik und Bauteile bestellen",
      components: [
        {
          name: "Raspberry PI Zero 2 WH",
          description: "Minicomputer für die Verarbeitung",
          price: "20,90€",
          link: "https://www.berrybase.de/raspberry-pi-zero-2-wh",
          image: "/Einzelteile/Raspberry_PI_Zero_2_WH.jpg"
        },
        {
          name: "SeeedStudio reSpeaker 2-Mics PI HAT",
          description: "Mikrofonmodul für Sprachbefehle",
          price: "14,20€",
          link: "https://www.berrybase.de/respeaker-2-mics-hat-fuer-raspberry-pi?utm_source=google&utm_medium=cpc&gad_source=1&gbraid=0AAAAADSQJK7VY1e4u0AY_IKtkZebC8n5m&gclid=Cj0KCQjwiLLABhCEARIsAJYS6ukzah_D9xPWQ9KNnVa5u86xkfVltUOS8oETJ28-qP5-vHg75XoiXMkaApLvEALw_wcB",
          image: "/Einzelteile/reSpeaker_2-Mics_PI_HAT.jpg"
        },
        {
          name: "ZeroCam",
          description: "Kamera für Bilderfassung",
          price: "15,50€",
          link: "https://www.berrybase.de/kamera-fuer-raspberry-pi-zero?utm_source=google&utm_medium=cpc&gad_source=1&gbraid=0AAAAADSQJK7v4d7RXQoQXJ6iR2Y2C2tJ_&gclid=Cj0KCQjwiLLABhCEARIsAJYS6ulK2AQw0I7Qk6CsMtdoX51sWkj3Eh7KOKtyBUYnwXvVP4yl7meeQhUaAgB5EALw_wcB",
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
          price: "9,60€",
          link: "https://www.berrybase.de/sandisk-extreme-pro-microsdhc-a1-uhs-i-u3-speicherkarte-adapter-32gb?gclid=Cj0KCQjwiLLABhCEARIsAJYS6ulK2AQw0I7Qk6CsMtdoX51sWkj3Eh7KOKtyBUYnwXvVP4yl7meeQhUaAgB5EALw_wcB&sl_tcb&utm_source=google&utm_medium=cpc",
          image: "/Einzelteile/SD-Karte.jpg"
        },
        {
          name: "M2 x 20 mm Gewindeschraube",
          description: "4 Stück",
          price: "2-3€",
          link: "https://www.amazon.de/dp/B0D49DZS8Q?ref=ppx_yo2ov_dt_b_fed_asin_title",
          image: "/Einzelteile/Schrauben_und_Muttern.jpg"
        },
        {
          name: "M2 x 16 mm Gewindeschraube",
          description: "6 Stück",
          price: "2-3€",
          link: "https://www.amazon.de/dp/B0D49DZS8Q?ref=ppx_yo2ov_dt_b_fed_asin_title",
          image: "/Einzelteile/Schrauben_und_Muttern.jpg"
        },
        {
          name: "M2 x 6 mm Gewindeschraube",
          description: "1 Stück",
          price: "1-2€",
          link: "https://www.amazon.de/dp/B0D49DZS8Q?ref=ppx_yo2ov_dt_b_fed_asin_title",
          image: "/Einzelteile/Schrauben_und_Muttern.jpg"
        },
        {
          name: "M2 Mutter",
          description: "11 Stück",
          price: "2-3€",
          link: "https://www.amazon.de/dp/B0D49DZS8Q?ref=ppx_yo2ov_dt_b_fed_asin_title",
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
      title: "OpenAI API-Key erstellen",
      components: [],
      instructions: [],
      video: {
        url: "https://www.youtube.com/embed/We2D3KKj648",
        timestamps: [
          { time: "00:00", title: "Einleitung" },
          { time: "00:14", title: "Registrierung" },
          { time: "02:34", title: "API-Key generieren" },
          { time: "04:20", title: "Zahlungsmethode hinterlegen" }
        ],
        link: {
          title: "OpenAI API-Webseite",
          url: "https://auth.openai.com/log-in"
        }
      }
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
            { name: "Computer", checked: false },
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
          { time: "00:25", title: "Raspberry PI Imager installieren" },
          { time: "01:31", title: "Image konfigurieren und auf SD-Karte schreiben" },
          { time: "06:39", title: "API Key einfügen" },
          { time: "08:44", title: "Informationen zur ersten Einrichtung" },
          { time: "09:22", title: "Informationen, wie weitere API-Keys eingefügt werden können" }
        ],
        link: {
          title: "Raspberry PI Imager Download",
          url: "https://www.raspberrypi.com/software/"
        }
      }
    },
    {
      title: "Zusammenbau",
      components: [],
      instructions: [],
      video: {
        url: "https://www.youtube.com/embed/AB-y0bRjPt8",
        timestamps: [
          { time: "00:00", title: "Einleitung" },
          { time: "00:30", title: "Raspberry PI & reSpeaker" },
          { time: "01:00", title: "SD-Karte" },
          { time: "01:22", title: "Kamera" },
          { time: "03:06", title: "Rechter Bügel & Verbindungsteil" },
          { time: "06:25", title: "Lautsprecher anschließen" },
          { time: "07:58", title: "Kamera-Gehäuse" },
          { time: "10:08", title: "Abstandshalter" },
          { time: "10:50", title: "Elektronik-Gehäuse & Knopf" },
          { time: "13:47", title: "Verschrauben mit Hilfswerkzeug" },
          { time: "15:58", title: "Fassung & Kabelführung" },
          { time: "19:29", title: "Lautsprecher-Gehäuse" },
          { time: "21:11", title: "Linker Bügel" }
        ]
      }
    },
    {
      title: "Wie du deine Open-A-Eyes-Brille benutzt",
      components: [],
      instructions: [
        "1. Aktiviere den Hotspot auf deinem Smartphone",
        "2. Schließe eine Powerbank an deiner Brille an",
        "3. Warte, bis die Brille mit dem Hotspot verbunden ist",
        "4. Drücke den Knopf auf der rechten Seite einmal, um ein Bild aufzunehmen und deine Anweisung zu sprechen. Probiere: Was liegt vor mir auf dem Tisch?",
        "5. Drücke den Knopf zweimal, um die Brille auszuschalten"
      ],
      video: {
        url: "https://www.youtube.com/embed/juspDw7lDec",
        timestamps: [
          { time: "00:00", title: "Einleitung" },
          { time: "00:30", title: "Hotspot aktivieren" },
          { time: "01:00", title: "Powerbank anschließen" },
          { time: "01:30", title: "Verbindung warten" },
          { time: "02:00", title: "Bild aufnehmen und Anweisung geben" },
          { time: "02:30", title: "Brille ausschalten" }
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

  const handleTimestampClick = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number)
    const totalSeconds = minutes * 60 + seconds
    
    if (videoRef.current) {
      videoRef.current.src = `${currentStepData.video?.url}?start=${totalSeconds}`
    }
  }

  const formatTimestamp = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':')
    return `${minutes}:${seconds}`
  }

  const ImageCell = ({ src, alt }: { src: string; alt: string }) => (
    <TableCell className="w-[100px]">
      <div 
        className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
        onClick={() => setSelectedImage(src)}
      >
        <Image
          src={src}
          alt={alt}
          width={80}
          height={80}
          className="object-cover"
          priority={false}
          loading="lazy"
          sizes="80px"
          quality={75}
        />
      </div>
    </TableCell>
  )

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
                              <ImageCell src={component.image} alt={component.name} />
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
                      className="flex justify-center items-center bg-gray-800 rounded-lg p-4"
                    >
                      <div className="aspect-video w-full max-w-3xl">
                        <iframe
                          ref={videoRef}
                          width="100%"
                          height="100%"
                          src={currentStepData.video?.url}
                          title="OpenAI API-Key erstellen"
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
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">Abschnitte und Links</h2>
                      <div className="space-y-4">
                        {currentStepData.video?.timestamps.map((timestamp, index) => (
                          <button
                            key={index}
                            onClick={() => handleTimestampClick(timestamp.time)}
                            className="flex items-center space-x-4 w-full p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          >
                            <span className="text-blue-400 font-medium">{formatTimestamp(timestamp.time)}</span>
                            <span className="text-gray-300 text-left">{timestamp.title}</span>
                          </button>
                        ))}
                        {currentStepData.video?.link && (
                          <div className="mt-6">
                            <Button
                              asChild
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Link href={currentStepData.video.link.url} target="_blank" rel="noopener noreferrer">
                                {currentStepData.video.link.title}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ) : currentStep === 5 ? (
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
                        {steps[4].components.map((component, index) => {
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
                ) : currentStep === 6 ? (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center bg-gray-800 rounded-lg p-4"
                    >
                      <div className="aspect-video w-full max-w-3xl">
                        <iframe
                          ref={videoRef}
                          width="100%"
                          height="100%"
                          src={currentStepData.video?.url}
                          title="SD-Karte vorbereiten"
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
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">Abschnitte und Links</h2>
                      <div className="space-y-4">
                        {currentStepData.video?.timestamps.map((timestamp, index) => (
                          <button
                            key={index}
                            onClick={() => handleTimestampClick(timestamp.time)}
                            className="flex items-center space-x-4 w-full p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          >
                            <span className="text-blue-400 font-medium">{formatTimestamp(timestamp.time)}</span>
                            <span className="text-gray-300 text-left">{timestamp.title}</span>
                          </button>
                        ))}
                        {currentStepData.video?.link && (
                          <div className="mt-6">
                            <Button
                              asChild
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Link href={currentStepData.video.link.url} target="_blank" rel="noopener noreferrer">
                                {currentStepData.video.link.title}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ) : currentStep === 7 ? (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center bg-gray-800 rounded-lg p-4"
                    >
                      <div className="aspect-video w-full max-w-3xl">
                        <iframe
                          ref={videoRef}
                          width="100%"
                          height="100%"
                          src={currentStepData.video?.url}
                          title="Zusammenbau"
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
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">Abschnitte</h2>
                      <div className="space-y-4">
                        {currentStepData.video?.timestamps.map((timestamp, index) => (
                          <button
                            key={index}
                            onClick={() => handleTimestampClick(timestamp.time)}
                            className="flex items-center space-x-4 w-full p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          >
                            <span className="text-blue-400 font-medium">{formatTimestamp(timestamp.time)}</span>
                            <span className="text-gray-300 text-left">{timestamp.title}</span>
                          </button>
                        ))}
                        {currentStepData.video?.link && (
                          <div className="mt-6">
                            <Button
                              asChild
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Link href={currentStepData.video.link.url} target="_blank" rel="noopener noreferrer">
                                {currentStepData.video.link.title}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ) : currentStep === 8 ? (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center bg-gray-800 rounded-lg p-4"
                    >
                      <div className="aspect-video w-full max-w-3xl">
                        <iframe
                          ref={videoRef}
                          width="100%"
                          height="100%"
                          src={currentStepData.video?.url}
                          title="Deine Brille ist einsatzbereit!"
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
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">Anweisungen</h2>
                      <div className="space-y-4">
                        {currentStepData.instructions?.map((instruction, index) => (
                          <p key={index} className="text-gray-300">{instruction}</p>
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-gray-800 border-gray-700">
          <div className="relative aspect-square w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 rounded-full bg-gray-900/50 text-gray-200 hover:bg-gray-900/75"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Vergrößerte Ansicht"
                width={800}
                height={800}
                className="object-contain"
                priority={true}
                loading="eager"
                sizes="(max-width: 768px) 100vw, 800px"
                quality={90}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
