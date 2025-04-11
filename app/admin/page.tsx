"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Submission = {
  timestamp: string
  age: string
  gender: string
  education: string
  occupation: string
  techAffinity: string
  techJob: string
  diyExperience: string
  sus1: string
  sus2: string
  sus3: string
  sus4: string
  sus5: string
  sus6: string
  sus7: string
  sus8: string
  sus9: string
  sus10: string
  assemblyDifficulty: string
  instructionQuality: string
  suggestions: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/get-submissions')
        if (!response.ok) {
          throw new Error('Failed to fetch submissions')
        }
        const data = await response.json()
        setSubmissions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Lade Daten...
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-500">
              Fehler beim Laden der Daten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-center">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Fragebogen-Antworten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Datum</TableHead>
                  <TableHead className="text-gray-300">Alter</TableHead>
                  <TableHead className="text-gray-300">Geschlecht</TableHead>
                  <TableHead className="text-gray-300">Bildung</TableHead>
                  <TableHead className="text-gray-300">Beruf</TableHead>
                  <TableHead className="text-gray-300">Tech-Affinität</TableHead>
                  <TableHead className="text-gray-300">Tech-Job</TableHead>
                  <TableHead className="text-gray-300">DIY-Erfahrung</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-300">
                      {new Date(submission.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-300">{submission.age}</TableCell>
                    <TableCell className="text-gray-300">{submission.gender}</TableCell>
                    <TableCell className="text-gray-300">{submission.education}</TableCell>
                    <TableCell className="text-gray-300">{submission.occupation}</TableCell>
                    <TableCell className="text-gray-300">{submission.techAffinity}</TableCell>
                    <TableCell className="text-gray-300">{submission.techJob}</TableCell>
                    <TableCell className="text-gray-300">{submission.diyExperience}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 