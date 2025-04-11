import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Glasses, Home, PartyPopper, ClipboardList } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <Card className="max-w-md w-full p-8 text-center space-y-8 bg-gray-700 border-gray-600 rounded-xl">
        <div className="flex justify-center">
          <div className="relative">
            <Glasses className="h-20 w-20 text-blue-500" />
            <div className="absolute -top-2 -right-2">
              <PartyPopper className="h-8 w-8 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">Hooray, du hast es geschafft!</h1>
          <p className="text-gray-300">
            Herzlichen Glückwunsch zum erfolgreichen Zusammenbau deiner Open-A-Eyes KI-Brille! Du kannst jetzt die
            Funktionen deiner selbstgebauten KI-Brille erkunden.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl w-full" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>

          <Link href="/questionnaire/consent">
            <Button
              variant="outline"
              className="border-2 border-blue-600 bg-gray-800 text-blue-400 hover:bg-gray-700 rounded-xl w-full"
              size="lg"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Fragebogen ausfüllen
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}
