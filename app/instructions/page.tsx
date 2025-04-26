"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const steps = [
  {
    title: "Elektronik und Bauteile bestellen",
    description: "Bestelle alle benötigten elektronischen und mechanischen Komponenten für deine KI-Brille."
  },
  {
    title: "Download der benötigten Dateien",
    description: "Lade die STL-Dateien für den 3D-Druck und das Betriebssystem-Image herunter."
  },
  {
    title: "3D-Druckteile bestellen",
    description: "Bestelle die 3D-gedruckten Teile oder drucke sie selbst aus."
  },
  {
    title: "Überprüfe, ob alle Komponenten vorhanden sind",
    description: "Stelle sicher, dass du alle benötigten Teile für den Zusammenbau hast."
  },
  {
    title: "SD-Karte vorbereiten",
    description: "Richte die SD-Karte mit dem Betriebssystem ein und konfiguriere die API-Keys."
  },
  {
    title: "Zusammenbau",
    description: "Baue deine KI-Brille Schritt für Schritt zusammen."
  }
]

export default function InstructionsPage() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto w-full">
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

            <div className="flex justify-center">
              <Link href="/instructions/steps">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Anleitung starten
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Schritte der Anleitung</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/instructions/steps?step=${index + 1}`}>
                    <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                            <p className="text-sm text-gray-400">{step.description}</p>
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
