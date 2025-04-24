"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function InstructionsPage() {
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
            <p className="text-gray-300 mb-4">
              Willkommen bei der Open-A-Eyes Anleitung! Hier findest du eine detaillierte Schritt-für-Schritt-Anleitung zum Zusammenbau deiner KI-Brille.
            </p>

            <div className="aspect-video mb-6">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/AB-y0bRjPt8"
                title="Open-A-Eyes Zusammenbau Anleitung"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            <div className="flex justify-center">
              <Link href="/instructions/steps">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                  size="lg"
                >
                  Anleitung starten
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
