"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Visualizations } from "./components/visualizations"

export type Submission = {
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

// SUS-Spezifische Berechnungen
const calculateSUSScore = (submission: Submission) => {
  const oddItems = [submission.sus1, submission.sus3, submission.sus5, submission.sus7, submission.sus9]
  const evenItems = [submission.sus2, submission.sus4, submission.sus6, submission.sus8, submission.sus10]
  
  const oddSum = oddItems.reduce((sum, item) => sum + (parseInt(item) - 1), 0)
  const evenSum = evenItems.reduce((sum, item) => sum + (5 - parseInt(item)), 0)
  
  return ((oddSum + evenSum) * 2.5).toFixed(2)
}

const getSUSGrade = (score: number) => {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVisualization, setSelectedVisualization] = useState("sus-scores")
  const [selectedGroupBy, setSelectedGroupBy] = useState("none")

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

  const handleExportCSV = () => {
    const headers = [
      "Datum",
      "Alter",
      "Geschlecht",
      "Bildung",
      "Beruf",
      "Tech-Affinität",
      "Tech-Job",
      "DIY-Erfahrung",
      "SUS-Score",
      "SUS-Grade",
      "Montage-Schwierigkeit",
      "Anleitungs-Qualität",
      "Vorschläge"
    ]

    const rows = submissions.map(sub => {
      const susScore = calculateSUSScore(sub)
      return [
        new Date(sub.timestamp).toLocaleString(),
        sub.age,
        sub.gender,
        sub.education,
        sub.occupation,
        sub.techAffinity,
        sub.techJob,
        sub.diyExperience,
        susScore,
        getSUSGrade(parseFloat(susScore)),
        sub.assemblyDifficulty,
        sub.instructionQuality,
        sub.suggestions
      ]
    })

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `sus-data-${new Date().toISOString()}.csv`
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
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
      <div className="min-h-screen bg-gray-900 p-8">
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

  // Berechne Statistiken
  const susScores = submissions.map(sub => parseFloat(calculateSUSScore(sub)))
  const averageSUS = susScores.reduce((a, b) => a + b, 0) / susScores.length
  const susGrades = susScores.map(score => getSUSGrade(score))
  const gradeDistribution = susGrades.reduce((acc, grade) => {
    acc[grade] = (acc[grade] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">SUS Auswertung</h1>
          <Button onClick={handleExportCSV} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            CSV Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Durchschnittlicher SUS-Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">{averageSUS.toFixed(2)}</p>
              <p className="text-gray-400">von {submissions.length} Teilnehmern</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Notenverteilung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="flex justify-between items-center">
                    <span className="text-gray-300">Note {grade}</span>
                    <span className="text-blue-500 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Interpretation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                {averageSUS >= 90 ? "Ausgezeichnet" :
                 averageSUS >= 80 ? "Gut" :
                 averageSUS >= 70 ? "Befriedigend" :
                 averageSUS >= 60 ? "Mangelhaft" : "Ungenügend"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="table">Tabelle</TabsTrigger>
            <TabsTrigger value="visualizations">Visualisierungen</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Datum</TableHead>
                        <TableHead className="text-gray-300">SUS-Score</TableHead>
                        <TableHead className="text-gray-300">Note</TableHead>
                        <TableHead className="text-gray-300">Alter</TableHead>
                        <TableHead className="text-gray-300">Geschlecht</TableHead>
                        <TableHead className="text-gray-300">Bildung</TableHead>
                        <TableHead className="text-gray-300">Tech-Affinität</TableHead>
                        <TableHead className="text-gray-300">Montage-Schwierigkeit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission, index) => {
                        const susScore = calculateSUSScore(submission)
                        return (
                          <TableRow key={index}>
                            <TableCell className="text-gray-300">
                              {new Date(submission.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-gray-300">{susScore}</TableCell>
                            <TableCell className="text-gray-300">
                              {getSUSGrade(parseFloat(susScore))}
                            </TableCell>
                            <TableCell className="text-gray-300">{submission.age}</TableCell>
                            <TableCell className="text-gray-300">{submission.gender}</TableCell>
                            <TableCell className="text-gray-300">{submission.education}</TableCell>
                            <TableCell className="text-gray-300">{submission.techAffinity}</TableCell>
                            <TableCell className="text-gray-300">{submission.assemblyDifficulty}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visualizations">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
                    <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Visualisierung wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sus-scores">SUS-Scores Verteilung</SelectItem>
                      <SelectItem value="demographics">Demographische Daten</SelectItem>
                      <SelectItem value="correlations">Korrelationen</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedGroupBy} onValueChange={setSelectedGroupBy}>
                    <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Gruppierung wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Keine Gruppierung</SelectItem>
                      <SelectItem value="age">Nach Alter</SelectItem>
                      <SelectItem value="gender">Nach Geschlecht</SelectItem>
                      <SelectItem value="education">Nach Bildung</SelectItem>
                      <SelectItem value="techAffinity">Nach Tech-Affinität</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Visualizations
                  submissions={submissions}
                  selectedVisualization={selectedVisualization}
                  selectedGroupBy={selectedGroupBy}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 