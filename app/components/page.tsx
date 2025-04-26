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
      price: "20,90€",
      link: "https://www.berrybase.de/raspberry-pi-zero-2-wh",
      image: "/Einzelteile/Raspberry_PI_Zero_2_WH.jpg"
    },
    {
      name: "SeeedStudio reSpeaker 2-Mics PI HAT",
      description: "Mikrofonmodul für Sprachbefehle",
      price: "14,20€",
      link: "https://www.berrybase.de/respeaker-2-mics-hat-fuer-raspberry-pi?utm_source=google&utm_medium=cpc&gad_source=1&gbraid=0AAAAADSQJK7VY1e4u0AY_IKtkZebC8n5m&gclid=Cj0KCQjwiLLABhCEARIsAJYS6ukzah_D9xPWQ9KNnVa5u86xkfVltUOS8oETJ28-qP5-vHg75XoiXMkaApLvEALw_wcB",
      image: "/Einzelteile/reSpeaker_2-Mics_PI_HAT.jpg"
    },
    {
      name: "ZeroCam",
      description: "Kamera für Bilderfassung",
      price: "15,50€",
      link: "https://www.berrybase.de/kamera-fuer-raspberry-pi-zero?utm_source=google&utm_medium=cpc&gad_source=1&gbraid=0AAAAADSQJK7v4d7RXQoQXJ6iR2Y2C2tJ_&gclid=Cj0KCQjwiLLABhCEARIsAJYS6ulK2AQw0I7Qk6CsMtdoX51sWkj3Eh7KOKtyBUYnwXvVP4yl7meeQhUaAgB5EALw_wcB",
      image: "/Einzelteile/ZeroCam.jpg"
    },
    {
      name: "Lautsprecher mit JST-PH2.0 mm",
      description: "Für Audioausgabe",
      price: "16.99€",
      link: "https://www.az-delivery.de/products/2-stuck-dfplayer-mini-3-watt-8-ohm-mini-lautsprecher-mit-jst-ph2-0-mm-pin-schnittstelle-fur-arduino-raspberry-pi-und-elektronische-diy-projekte-inklusive-e-book?variant=39441379131488&utm_source=google&utm_medium=cpc&utm_campaign=16964979024&utm_content=166733588295&utm_term=&gad_source=1&gbraid=0AAAAADBFYGVMZJhv_GN2v-vk_surpkJa7&gclid=Cj0KCQjwzYLABhD4ARIsALySuCT6KaJ5HwzvznJb8pPu1muPQGUYymX0ZBdIUJDXAXupGyT7-EdxsukaAr28EALw_wcB",
      image: "/Einzelteile/Lautsprecher.jpg"
    },
    {
      name: "SD-Karte (min. 64 GB)",
      description: "Für Betriebssystem und Software",
      price: "9,60€",
      link: "https://www.berrybase.de/sandisk-extreme-pro-microsdhc-a1-uhs-i-u3-speicherkarte-adapter-32gb?gclid=Cj0KCQjwiLLABhCEARIsAJYS6ulK2AQw0I7Qk6CsMtdoX51sWkj3Eh7KOKtyBUYnwXvVP4yl7meeQhUaAgB5EALw_wcB&sl_tcb&utm_source=google&utm_medium=cpc",
      image: "/Einzelteile/SD-Karte.jpg"
    },
  ]

  const printedParts = [
    { 
      name: "Fassung",
      description: "3D-gedrucktes Brillengestell",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Fassung.stl",
      image: "/Einzelteile/Fassung.jpg"
    },
    { 
      name: "Kabelführung",
      description: "Für ordentliche Kabelverlegung",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Kabelfuehrung.stl",
      image: "/Einzelteile/Kabelfuehrung.jpg"
    },
    { 
      name: "Rechter Bügel",
      description: "Brillenbügel rechts",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Rechter_Buegel.stl",
      image: "/Einzelteile/Rechter_Buegel.jpg"
    },
    { 
      name: "Verbindungsteil vom rechten Bügel",
      description: "Verbindungselement",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Verbindungsteil_rechter_Buegel.stl",
      image: "/Einzelteile/Verbindungsteil_rechter_Buegel.jpg"
    },
    { 
      name: "Elektronik-Gehäuse",
      description: "Schutz für die Elektronik",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Elektronik-Gehaeuse.stl",
      image: "/Einzelteile/Elektronik-Gehaeuse.jpg"
    },
    { 
      name: "Kamera-Gehäuse",
      description: "Schutz für die Kamera",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Kamera-Gehaeuse.stl",
      image: "/Einzelteile/Kamera-Gehaeuse.jpg"
    },
    { 
      name: "Knopf",
      description: "Bedienknopf",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Knopf.stl",
      image: "/Einzelteile/Knopf.jpg"
    },
    { 
      name: "Abstandshalter",
      description: "Für korrekte Positionierung",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Abstandshalter.stl",
      image: "/Einzelteile/Abstandshalter.jpg"
    },
    { 
      name: "Linker Bügel",
      description: "Brillenbügel links",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Linker_Buegel.stl",
      image: "/Einzelteile/Linker_Buegel.jpg"
    },
    { 
      name: "Lautsprecher-Gehäuse",
      description: "Schutz für den Lautsprecher",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Lautsprecher-Gehaeuse.stl",
      image: "/Einzelteile/Lautsprecher-Gehaeuse.jpg"
    },
    { 
      name: "Hilfswerkzeug 1",
      description: "Montagehilfe",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Hilfswerkzeug_1.stl",
      image: "/Einzelteile/Hilfswerkzeug_1.jpg"
    },
    { 
      name: "Hilfswerkzeug 2",
      description: "Montagehilfe",
      price: "-",
      link: "https://github.com/LaVolpe12/open-a-eyes/releases/download/v1.0.0/Hilfswerkzeug_2.stl",
      image: "/Einzelteile/Hilfswerkzeug_2.jpg"
    },
  ]

  const screws = [
    {
      name: "M2 x 20 mm Gewindeschraube",
      description: "4 Stück",
      price: "2-3€",
      link: "#",
      image: "/Einzelteile/Schrauben_und_Muttern.jpg"
    },
    {
      name: "M2 x 16 mm Gewindeschraube",
      description: "6 Stück",
      price: "2-3€",
      link: "#",
      image: "/Einzelteile/Schrauben_und_Muttern.jpg"
    },
    {
      name: "M2 x 6 mm Gewindeschraube",
      description: "1 Stück",
      price: "1-2€",
      link: "#",
      image: "/Einzelteile/Schrauben_und_Muttern.jpg"
    },
    {
      name: "M2 Mutter",
      description: "11 Stück",
      price: "2-3€",
      link: "#",
      image: "/Einzelteile/Schrauben_und_Muttern.jpg"
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
          width={80}
          height={80}
          className="object-cover"
          priority={false}
          loading="lazy"
          sizes="80px"
          quality={75}
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
                width={800}
                height={800}
                className="object-contain"
                priority={true}
                loading="eager"
                sizes="(max-width: 768px) 100vw, 800px"
                quality={90}
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
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Downloads</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="https://drive.google.com/file/d/1KpDreYGmDURJrR_RDKt6IjK-QTh45qdg/view?usp=sharing">
                    <Download className="mr-2 h-4 w-4" />
                    3D-Modelle
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="https://drive.google.com/file/d/1z3g_nLzVUI8tefPy9BgpnXQ7TdAwLYP4/view?usp=sharing">
                    <Download className="mr-2 h-4 w-4" />
                    Software
                  </Link>
                </Button>
              </div>
            </div>

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
        </div>
      </div>
    </main>
  )
}
