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

  const components = [
    { id: "raspberry", label: "Raspberry Pi Zero W" },
    { id: "camera", label: "Raspberry Pi Kamera V2" },
    { id: "speaker", label: "Kleiner Lautsprecher" },
    { id: "microphone", label: "Mikrofon" },
    { id: "battery", label: "Akku (3.7V LiPo)" },
    { id: "sdcard", label: "Micro SD Karte (min. 16GB)" },
    { id: "screws", label: "Kleine Schrauben (M2)" },
    { id: "cables", label: "Kabel und Stecker" },
    { id: "display", label: "Kleines Display (optional)" },
  ]

  const tools = [
    { id: "screwdriver", label: "Kreuzschlitz-Schraubenzieher" },
    { id: "hex", label: "Imbusschlüssel-Set" },
    { id: "pliers", label: "Kleine Zange" },
    { id: "soldering", label: "Lötkolben und Lötzinn" },
    { id: "tape", label: "Isolierband" },
    { id: "glue", label: "Heißklebepistole" },
  ]

  const printedParts = [
    { id: "frame", label: "Brillengestell" },
    { id: "leftArm", label: "Bügel Links" },
    { id: "rightArm", label: "Bügel Rechts" },
    { id: "case1", label: "Gehäuse 1" },
    { id: "case2", label: "Gehäuse 2" },
    { id: "mount", label: "Kamerahalterung" },
    { id: "cover", label: "Abdeckung" },
  ]

  const allItems = [...components, ...tools, ...printedParts]

  useEffect(() => {
    const allItemsChecked = allItems.every((item) => checkedItems[item.id])
    setAllChecked(allItemsChecked)

    // Calculate progress
    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    const totalItems = allItems.length
    setProgress(Math.round((checkedCount / totalItems) * 100))
  }, [checkedItems])

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleAllItems = () => {
    if (allChecked) {
      // If all are checked, uncheck all
      setCheckedItems({})
    } else {
      // Check all items
      const newCheckedItems: Record<string, boolean> = {}
      allItems.forEach((item) => {
        newCheckedItems[item.id] = true
      })
      setCheckedItems(newCheckedItems)
    }
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
                  Komponenten
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {components.map((item) => (
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
                  Werkzeuge
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tools.map((item) => (
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
                  3D-Druck Teile
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
