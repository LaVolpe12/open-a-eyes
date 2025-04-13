import { NextResponse } from 'next/server'
import { FormData } from '@/app/questionnaire/questionnaire-context'
import clientPromise from '@/lib/mongodb'

// API Route for handling questionnaire submissions and retrieving them
export async function POST(request: Request) {
  try {
    const data: FormData = await request.json()
    
    // Add timestamp
    const submission = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('open-a-eyes')
    const collection = db.collection('submissions')

    // Save to MongoDB
    await collection.insertOne(submission)
    
    // Log the submission for debugging
    console.log('Received submission:', submission)

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
  try {
    console.log('Attempting to connect to MongoDB...')
    const client = await clientPromise
    console.log('Connected to MongoDB')
    
    const db = client.db('open-a-eyes')
    const collection = db.collection('submissions')

    // Retrieve all submissions
    console.log('Fetching submissions...')
    const submissions = await collection.find({}).toArray()
    console.log(`Found ${submissions.length} submissions`)
    
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error retrieving submissions:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve submissions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 