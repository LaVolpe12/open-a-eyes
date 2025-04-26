"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ShoppingCart, Download, Box, CheckCircle2, HardDrive, Wrench, PlayCircle, Cpu } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  {
    title: "Elektronik und Bauteile bestellen",
    description: "Bestelle alle benötigten elektronischen und mechanischen Komponenten für deine KI-Brille.",
    icon: ShoppingCart,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Download der benötigten Dateien",
    description: "Lade die STL-Dateien für den 3D-Druck und das Betriebssystem-Image herunter.",
    icon: Download,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "3D-Druckteile bestellen",
    description: "Bestelle die 3D-gedruckten Teile oder drucke sie selbst aus.",
    icon: Box,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "OpenAI API-Key erstellen",
    description: "Erstelle einen API-Key für die KI-Funktionalität deiner Brille.",
    icon: Cpu,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Überprüfe, ob alle Komponenten vorhanden sind",
    description: "Stelle sicher, dass du alle benötigten Teile für den Zusammenbau hast.",
    icon: CheckCircle2,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "SD-Karte vorbereiten",
    description: "Richte die SD-Karte mit dem Betriebssystem und der Software ein.",
    icon: HardDrive,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Zusammenbau",
    description: "Baue deine KI-Brille Schritt für Schritt zusammen.",
    icon: Wrench,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Deine Brille ist einsatzbereit!",
    description: "Lerne, wie du deine KI-Brille benutzt und starte durch!",
    icon: PlayCircle,
    color: "from-blue-500 to-blue-600"
  }
]

export default function InstructionsPage() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-700 rounded-lg shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold mb-2 text-white">Anleitung für alle Level</h1>

          <div className="mb-8">
            <p className="text-gray-300 mb-4">
              Willkommen bei der Open-A-Eyes Anleitung! Hier findest du eine detaillierte Schritt-für-Schritt-Anleitung zum Zusammenbau deiner KI-Brille.
            </p>

            <div className="flex justify-center mb-8">
              <Link href="/instructions/steps">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-6 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Anleitung starten
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            
            {/* Timeline */}
            <div className="relative space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Link href={`/instructions/steps?step=${index + 1}`}>
                    <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                            whileHover={{ rotate: 10 }}
                          >
                            <step.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-400">Schritt {index + 1}</span>
                              <div className="h-px flex-1 bg-gray-700" />
                            </div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
        </motion.div>
      </div>
    </main>
  )
}
