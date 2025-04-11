import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'submissions.json')
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const submissions = JSON.parse(fileContent)
      return NextResponse.json(submissions)
    } catch (error) {
      // Wenn die Datei nicht existiert, geben wir ein leeres Array zurück
      return NextResponse.json([])
    }
  } catch (error) {
    console.error('Error reading submissions:', error)
    return NextResponse.json(
      { error: 'Failed to read submissions' },
      { status: 500 }
    )
  }
} 