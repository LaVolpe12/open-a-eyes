import { NextResponse } from 'next/server'
import { FormData } from '@/app/questionnaire/questionnaire-context'

// In einer Produktionsumgebung würden wir eine echte Datenbank verwenden
// Für dieses Beispiel speichern wir die Daten in einer JSON-Datei
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json()
    
    // Füge Timestamp hinzu
    const submission = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Speichere die Antworten in einer JSON-Datei
    const filePath = path.join(process.cwd(), 'data', 'submissions.json')
    
    // Stelle sicher, dass das data-Verzeichnis existiert
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
    
    // Lese existierende Submissions oder erstelle ein leeres Array
    let submissions = []
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      submissions = JSON.parse(fileContent)
    } catch (error) {
      // Datei existiert noch nicht oder ist leer
    }
    
    // Füge neue Submission hinzu
    submissions.push(submission)
    
    // Speichere aktualisierte Submissions
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving questionnaire submission:', error)
    return NextResponse.json(
      { error: 'Failed to save questionnaire submission' },
      { status: 500 }
    )
  }
} 