"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, CheckSquare, CheckCheck } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function InstructionsPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [allChecked, setAllChecked] = useState(false)
  const [progress, setProgress] = useState(0)

  const electronics = [
    { id: "raspberry", label: "Raspberry PI Zero 2 WH" },
    { id: "respeaker", label: "SeeedStudio reSpeaker 2-Mics PI HAT" },
    { id: "zerocam", label: "ZeroCam" },
    { id: "speaker", label: "Lautsprecher mit JST-PH2.0 mm" },
    { id: "sdcard", label: "SD-Karte (min. 64 GB)" },
  ]

  const printedParts = [
    { id: "frame", label: "Fassung" },
    { id: "cableGuide", label: "Kabelführung" },
    { id: "rightArm", label: "Rechter Bügel" },
    { id: "rightArmConnector", label: "Verbindungsteil vom rechten Bügel" },
    { id: "electronicsCase", label: "Elektronik-Gehäuse" },
    { id: "cameraCase", label: "Kamera-Gehäuse" },
    { id: "button", label: "Knopf" },
    { id: "spacer", label: "Abstandshalter" },
    { id: "leftArm", label: "Linker Bügel" },
    { id: "speakerCase", label: "Lautsprecher-Gehäuse" },
    { id: "tool1", label: "Hilfswerkzeug 1" },
    { id: "tool2", label: "Hilfswerkzeug 2" },
  ]

  const screws = [
    { id: "screw20", label: "4x M2 x 20 mm Gewindeschraube" },
    { id: "screw16", label: "6x M2 x 16 mm Gewindeschraube" },
    { id: "screw6", label: "1x M2 x 6 mm Gewindeschraube" },
    { id: "nuts", label: "11x M2 Mutter" },
  ]

  const allItems = [...electronics, ...printedParts, ...screws]

  useEffect(() => {
    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    const totalCount = allItems.length
    setProgress(Math.round((checkedCount / totalCount) * 100))
    setAllChecked(checkedCount === totalCount)
  }, [checkedItems, allItems.length])

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleAllItems = () => {
    const newValue = !allChecked
    const newCheckedItems: Record<string, boolean> = {}
    allItems.forEach((item) => {
      newCheckedItems[item.id] = newValue
    })
    setCheckedItems(newCheckedItems)
  }

  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto w-full">
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

        <div className="bg-gray-700 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-2 text-white">Anleitung für alle Level</h1>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-300">Fortschritt der Checkliste</p>
              <span className="text-sm font-medium text-gray-300">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-600" indicatorClassName="bg-blue-600" />
          </div>

          <p className="text-gray-300 mb-4">
            Bevor wir mit der Anleitung beginnen, überprüfe bitte, ob du alle notwendigen Komponenten und Werkzeuge
            bereit hast. Hake alle Elemente ab, die du bereits besitzt:
          </p>

          <div className="flex items-center space-x-2 mb-6 p-3 bg-gray-800 rounded-lg border border-gray-600">
            <Checkbox
              id="check-all"
              checked={allChecked}
              onCheckedChange={toggleAllItems}
              className="h-5 w-5 border-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
            />
            <Label
              htmlFor="check-all"
              className="text-sm font-medium leading-none cursor-pointer flex items-center text-white"
            >
              <CheckCheck className="h-4 w-4 mr-2 text-blue-500" />
              Ich habe bereits alle Komponenten
            </Label>
          </div>

          <div className="grid gap-8 mb-8">
            <Card className="bg-gray-800 border-gray-600">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                  <CheckSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Elektronik
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {electronics.map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-300"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-600">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                  <CheckSquare className="h-5 w-5 mr-2 text-blue-500" />
                  3D-gedruckte Bauteile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {printedParts.map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-300"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-600">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                  <CheckSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Schrauben und Muttern
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {screws.map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-300"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Link href="/instructions/steps">
              <Button
                disabled={!allChecked}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 rounded-xl"
                size="lg"
              >
                Anleitung starten
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {!allChecked && (
            <p className="text-amber-400 text-center mt-4 text-sm">
              Bitte hake alle Elemente ab, bevor du mit der Anleitung beginnst.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
