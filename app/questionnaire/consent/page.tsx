"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ConsentPage() {
  const router = useRouter()
  const [consent, setConsent] = useState(false)

  const handleContinue = () => {
    if (consent) {
      router.push("/questionnaire")
    }
  }

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

        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl">
            <CardTitle className="text-2xl">Einverständniserklärung zur Datenerhebung (DSGVO-konform)</CardTitle>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <p className="text-gray-200">
              Ich bin damit einverstanden, dass meine Angaben aus dem Fragebogen anonymisiert für wissenschaftliche
              Zwecke gespeichert und ausgewertet werden. Ich wurde darüber informiert, dass:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Meine Teilnahme freiwillig ist und ich jederzeit ohne Angabe von Gründen abbrechen kann.</li>
              <li>Meine Daten ausschließlich anonymisiert und zu Forschungszwecken genutzt werden.</li>
              <li>
                Personenbezogene Daten (wie z.B. E-Mail-Adresse) nur dann erhoben werden, wenn ich diese freiwillig
                angebe, und dass diese getrennt von meinen Antworten gespeichert werden.
              </li>
              <li>
                Sämtliche personenbezogene Daten spätestens nach Abschluss des Forschungsprojekts gelöscht werden.
              </li>
              <li>
                Ich jederzeit das Recht habe, Auskunft über gespeicherte Daten zu erhalten sowie die Berichtigung,
                Löschung oder Einschränkung der Verarbeitung meiner personenbezogenen Daten zu verlangen.
              </li>
              <li>
                Mit der Speicherung und anonymisierten Verarbeitung meiner Daten bin ich einverstanden. Mir ist bekannt,
                dass ich diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen kann. Hierzu reicht eine
                formlose Mitteilung per E-Mail.
              </li>
            </ul>

            <p className="text-gray-200">
              Weitere Informationen zum Datenschutz sowie meine Rechte finde ich in der{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>

            <div className="flex items-start space-x-3 pt-4">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className="border-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white mt-1"
              />
              <Label htmlFor="consent" className="text-white font-medium">
                Ich habe die Erklärung gelesen, verstanden und stimme zu.
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t border-gray-600 pt-6">
            <Button
              onClick={handleContinue}
              disabled={!consent}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 rounded-xl"
            >
              Mit Fragebogen beginnen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
