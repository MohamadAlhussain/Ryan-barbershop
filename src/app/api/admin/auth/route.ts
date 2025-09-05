import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
