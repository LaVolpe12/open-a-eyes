import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Glasses, PlayCircle, BookOpen, ClipboardList } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-3xl w-full text-center space-y-12">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Glasses className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Open-A-Eyes</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Willkommen beim Open-A-Eyes Projekt! Baue deine eigene KI-Brille mit handelsüblichen Teilen und wenig
            technischem Know-how.
          </p>
        </div>

        {/* YouTube Shorts Video */}
        <div className="aspect-[9/16] w-full max-w-[300px] mx-auto bg-gray-800 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/TImiFf-Whj4"
            title="Open-A-Eyes Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="space-y-6 max-w-md mx-auto w-full">
          <Link href="/instructions" className="block w-full">
            <Button
              variant="default"
              size="lg"
              className="w-full py-8 text-lg bg-blue-600 hover:bg-blue-700 group transition-all rounded-xl"
            >
              <BookOpen className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Anleitung für alle Level
            </Button>
          </Link>

          <Link href="/questionnaire/consent" className="block w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full py-8 text-lg border-2 border-blue-600 bg-gray-800 text-blue-400 hover:bg-gray-700 group transition-all rounded-xl"
            >
              <ClipboardList className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Fragebogen zum Zusammenbau
            </Button>
          </Link>

          <Link href="/components" className="block w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full py-8 text-lg border-2 border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 group transition-all rounded-xl"
            >
              <PlayCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Komponenten und Downloads
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
