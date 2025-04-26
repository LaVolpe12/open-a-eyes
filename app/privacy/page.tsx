import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <Link href="/questionnaire/consent">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zum Einverständnis
            </Button>
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Datenschutzerklärung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung personenbezogener Daten im Rahmen unserer Website.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6">1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung ist:
              <br />
              Adriano Volpe
              <br />
              Vogelsanger Straße 201
              <br />
              50825 Köln
              <br />
              Telefon: 015738830426
              <br />
              E-Mail: adriano.volpe@gmx.de
            </p>

            <h2 className="text-xl font-semibold text-white mt-6">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p>
              Wir erheben und verarbeiten Ihre personenbezogenen Daten nur, soweit dies für die Begründung, inhaltliche Ausgestaltung oder Änderung des Rechtsverhältnisses erforderlich ist. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6">3. Rechte der betroffenen Person</h2>
            <p>
              Sie haben das Recht:
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                <li>auf Auskunft über die zu Ihrer Person gespeicherten Daten</li>
                <li>auf Berichtigung oder Löschung Ihrer Daten</li>
                <li>auf Einschränkung der Verarbeitung</li>
                <li>auf Widerspruch gegen die Verarbeitung</li>
                <li>auf Datenübertragbarkeit</li>
              </ul>
            </p>

            <h2 className="text-xl font-semibold text-white mt-6">4. Hosting</h2>
            <p>
              Diese Website wird auf Servern von Vercel gehostet. Die Server befinden sich in den USA. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 