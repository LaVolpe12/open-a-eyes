import { NextResponse } from 'next/server'
import { FormData } from '@/app/questionnaire/questionnaire-context'

// In-memory storage for submissions (this will be reset when the serverless function restarts)
let submissions: (FormData & { timestamp: string })[] = []

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json()
    
    // Add timestamp
    const submission = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Add to in-memory storage
    submissions.push(submission)
    
    // Log the submission for debugging
    console.log('Received submission:', submission)
    console.log('Total submissions:', submissions.length)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving questionnaire submission:', error)
    return NextResponse.json(
      { error: 'Failed to save questionnaire submission' },
      { status: 500 }
    )
  }
}

// Add a GET endpoint to retrieve submissions (for admin purposes)
export async function GET() {
  return NextResponse.json(submissions)
} 