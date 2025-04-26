"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function SuccessPage() {
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
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Glückwunsch! Deine KI-Brille ist einsatzbereit!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h1 className="text-3xl font-bold text-white text-center">
                Glückwunsch! Du hast es geschafft!
              </h1>
              <p className="text-gray-300 text-center max-w-2xl">
                Du hast erfolgreich deine eigene KI-Brille gebaut. Jetzt kannst du sie nutzen, um die Welt durch die Augen der KI zu sehen.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative w-[420px] h-[280px]">
                <Image
                  src="/Einzelteile/Foto_1.jpg"
                  alt="Fertige KI-Brille"
                  fill
                  className="rounded-lg border border-gray-600 object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                asChild
                variant="outline"
                className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 h-12 text-lg"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Zur Startseite
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 h-12 text-lg"
              >
                <Link href="/questionnaire/consent">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Fragebogen ausfüllen
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
