import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThanksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Vielen Dank für Ihre Teilnahme!
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-center">
            Ihre Antworten wurden erfolgreich gespeichert. Wir schätzen Ihre Zeit und Ihr Feedback sehr.
          </p>
          <p className="text-gray-300 text-center">
            Sie können dieses Fenster jetzt schließen.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
