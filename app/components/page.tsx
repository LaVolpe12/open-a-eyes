"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Download, ArrowLeft, ShoppingCart, ExternalLink, X } from "lucide-react"

export default function ComponentsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const electronics = [
    {
      name: "Raspberry PI Zero 2 WH",
      description: "Minicomputer für die Verarbeitung",
      price: "15-20€",
      link: "https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/",
      image: "/Einzelteile/raspberry-pi-zero.jpg"
    },
    {
      name: "SeeedStudio reSpeaker 2-Mics PI HAT",
      description: "Mikrofonmodul für Sprachbefehle",
      price: "25-30€",
      link: "https://www.seeedstudio.com/ReSpeaker-2-Mics-Pi-HAT.html",
      image: "/Einzelteile/respeaker.jpg"
    },
    {
      name: "ZeroCam",
      description: "Kamera für Bilderfassung",
      price: "15-20€",
      link: "#",
      image: "/Einzelteile/zerocam.jpg"
    },
    {
      name: "Lautsprecher mit JST-PH2.0 mm",
      description: "Für Audioausgabe",
      price: "5-10€",
      link: "#",
      image: "/Einzelteile/lautsprecher.jpg"
    },
    {
      name: "SD-Karte (min. 64 GB)",
      description: "Für Betriebssystem und Software",
      price: "15-20€",
      link: "#",
      image: "/Einzelteile/sd-karte.jpg"
    },
  ]

  const printedParts = [
    { 
      name: "Fassung",
      description: "3D-gedrucktes Brillengestell",
      price: "-",
      link: "#",
      image: "/Einzelteile/fassung.jpg"
    },
    { 
      name: "Kabelführung",
      description: "Für ordentliche Kabelverlegung",
      price: "-",
      link: "#",
      image: "/Einzelteile/kabelfuehrung.jpg"
    },
    { 
      name: "Rechter Bügel",
      description: "Brillenbügel rechts",
      price: "-",
      link: "#",
      image: "/Einzelteile/rechter-buegel.jpg"
    },
    { 
      name: "Verbindungsteil vom rechten Bügel",
      description: "Verbindungselement",
      price: "-",
      link: "#",
      image: "/Einzelteile/verbindungsteil.jpg"
    },
    { 
      name: "Elektronik-Gehäuse",
      description: "Schutz für die Elektronik",
      price: "-",
      link: "#",
      image: "/Einzelteile/elektronik-gehaeuse.jpg"
    },
    { 
      name: "Kamera-Gehäuse",
      description: "Schutz für die Kamera",
      price: "-",
      link: "#",
      image: "/Einzelteile/kamera-gehaeuse.jpg"
    },
    { 
      name: "Knopf",
      description: "Bedienknopf",
      price: "-",
      link: "#",
      image: "/Einzelteile/knopf.jpg"
    },
    { 
      name: "Abstandshalter",
      description: "Für korrekte Positionierung",
      price: "-",
      link: "#",
      image: "/Einzelteile/abstandshalter.jpg"
    },
    { 
      name: "Linker Bügel",
      description: "Brillenbügel links",
      price: "-",
      link: "#",
      image: "/Einzelteile/linker-buegel.jpg"
    },
    { 
      name: "Lautsprecher-Gehäuse",
      description: "Schutz für den Lautsprecher",
      price: "-",
      link: "#",
      image: "/Einzelteile/lautsprecher-gehaeuse.jpg"
    },
    { 
      name: "Hilfswerkzeug 1",
      description: "Montagehilfe",
      price: "-",
      link: "#",
      image: "/Einzelteile/hilfswerkzeug-1.jpg"
    },
    { 
      name: "Hilfswerkzeug 2",
      description: "Montagehilfe",
      price: "-",
      link: "#",
      image: "/Einzelteile/hilfswerkzeug-2.jpg"
    },
  ]

  const screws = [
    {
      name: "M2 x 20 mm Gewindeschraube",
      description: "4 Stück",
      price: "2-3€",
      link: "#",
      image: "/Einzelteile/schraube-m2-20mm.jpg"
    },
    {
      name: "M2 x 16 mm Gewindeschraube",
      description: "6 Stück",
      price: "2-3€",
      link: "#",
      image: "/Einzelteile/schraube-m2-16mm.jpg"
    },
    {
      name: "M2 x 6 mm Gewindeschraube",
      description: "1 Stück",
      price: "1-2€",
      link: "#",
      image: "/Einzelteile/schraube-m2-6mm.jpg"
    },
    {
      name: "M2 Mutter",
      description: "11 Stück",
      price: "2-3€",
      link: "#",
      image: "/Einzelteile/mutter-m2.jpg"
    },
  ]

  const ImageCell = ({ src, alt }: { src: string; alt: string }) => (
    <TableCell className="w-[100px]">
      <div 
        className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
        onClick={() => setSelectedImage(src)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </TableCell>
  )

  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-gray-800 border-gray-700">
          <div className="relative aspect-square w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 rounded-full bg-gray-900/50 text-gray-200 hover:bg-gray-900/75"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Vergrößerte Ansicht"
                fill
                className="object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-6xl mx-auto w-full">
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
          <h1 className="text-3xl font-bold mb-6 text-white">Komponenten und Downloads</h1>

          <p className="text-gray-300 mb-8">
            Hier findest du alle Komponenten, die du für den Bau deiner KI-Brille benötigst. Die Preise sind Richtwerte
            und können je nach Händler variieren.
          </p>

          <div className="space-y-8">
            <div className="overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-white">Elektronik</h2>
              <Table className="border-collapse w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-600">
                    <TableHead className="w-[100px] text-gray-200">Bild</TableHead>
                    <TableHead className="w-[200px] text-gray-200">Komponente</TableHead>
                    <TableHead className="w-[300px] text-gray-200">Beschreibung</TableHead>
                    <TableHead className="text-gray-200">Preis (ca.)</TableHead>
                    <TableHead className="text-right text-gray-200">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {electronics.map((component, index) => (
                    <TableRow key={index} className="border-b border-gray-600">
                      <ImageCell src={component.image} alt={component.name} />
                      <TableCell className="font-medium text-white">{component.name}</TableCell>
                      <TableCell className="text-gray-300">{component.description}</TableCell>
                      <TableCell className="text-gray-300">{component.price}</TableCell>
                      <TableCell className="text-right">
                        <a
                          href={component.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Kaufen</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-white">3D-gedruckte Bauteile</h2>
              <Table className="border-collapse w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-600">
                    <TableHead className="w-[100px] text-gray-200">Bild</TableHead>
                    <TableHead className="w-[200px] text-gray-200">Komponente</TableHead>
                    <TableHead className="w-[300px] text-gray-200">Beschreibung</TableHead>
                    <TableHead className="text-gray-200">Preis</TableHead>
                    <TableHead className="text-right text-gray-200">Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {printedParts.map((component, index) => (
                    <TableRow key={index} className="border-b border-gray-600">
                      <ImageCell src={component.image} alt={component.name} />
                      <TableCell className="font-medium text-white">{component.name}</TableCell>
                      <TableCell className="text-gray-300">{component.description}</TableCell>
                      <TableCell className="text-gray-300">{component.price}</TableCell>
                      <TableCell className="text-right">
                        <a
                          href={component.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">STL</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-white">Schrauben und Muttern</h2>
              <Table className="border-collapse w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-600">
                    <TableHead className="w-[100px] text-gray-200">Bild</TableHead>
                    <TableHead className="w-[200px] text-gray-200">Komponente</TableHead>
                    <TableHead className="w-[300px] text-gray-200">Beschreibung</TableHead>
                    <TableHead className="text-gray-200">Preis (ca.)</TableHead>
                    <TableHead className="text-right text-gray-200">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {screws.map((component, index) => (
                    <TableRow key={index} className="border-b border-gray-600">
                      <ImageCell src={component.image} alt={component.name} />
                      <TableCell className="font-medium text-white">{component.name}</TableCell>
                      <TableCell className="text-gray-300">{component.description}</TableCell>
                      <TableCell className="text-gray-300">{component.price}</TableCell>
                      <TableCell className="text-right">
                        <a
                          href={component.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Kaufen</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h2 className="text-lg font-semibold mb-2 flex items-center text-white">
              <Download className="h-5 w-5 mr-2 text-blue-500" />
              Downloads
            </h2>
            <p className="text-gray-300 mb-4">Lade dir hier alle notwendigen Dateien für dein Projekt herunter:</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                <Download className="mr-2 h-4 w-4" />
                Code und 3D-Modelle (.zip)
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-xl"
              >
                <Download className="mr-2 h-4 w-4" />
                Nur 3D-Modelle (.stl)
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-xl"
              >
                <Download className="mr-2 h-4 w-4" />
                Nur Quellcode (.zip)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
