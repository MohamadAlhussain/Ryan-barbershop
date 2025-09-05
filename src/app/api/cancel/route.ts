import { NextResponse } from 'next/server'
import { cancelAppointment, getAppointmentById } from '@/lib/appointments'

export async function GET(req: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    const { searchParams } = new URL(req.url)
    const appointmentId = searchParams.get('id')
    
    if (!appointmentId) {
      return NextResponse.json({ error: 'Appointment ID required' }, { status: 400, headers })
    }
    
    console.log('GET cancel attempt for ID:', appointmentId)
    
    // Get appointment details before cancelling
    const appointment = await getAppointmentById(appointmentId)
    if (!appointment) {
      console.log('Appointment not found:', appointmentId)
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404, headers })
    }
    
    console.log('Found appointment:', appointment)
    
    const success = await cancelAppointment(appointmentId)
    console.log('Cancel result:', success)
    
    if (success) {
      return NextResponse.json({ message: 'Appointment cancelled successfully' }, { status: 200, headers })
    } else {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404, headers })
    }
  } catch (error) {
    console.error('Cancel error:', error)
    return NextResponse.json({ error: 'Failed to cancel appointment' }, { status: 500, headers })
  }
}

export async function DELETE(req: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    const { searchParams } = new URL(req.url)
    const appointmentId = searchParams.get('id')
    
    if (!appointmentId) {
      return NextResponse.json({ error: 'Appointment ID required' }, { status: 400, headers })
    }
    
    // Get appointment details before cancelling
    const appointment = await getAppointmentById(appointmentId)
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404, headers })
    }
    
    const success = await cancelAppointment(appointmentId)
    
    if (success) {
      return NextResponse.json({ message: 'Appointment cancelled successfully' }, { status: 200, headers })
    } else {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404, headers })
    }
  } catch (error) {
    console.error('Cancel error:', error)
    return NextResponse.json({ error: 'Failed to cancel appointment' }, { status: 500, headers })
  }
}

// Handle CORS preflight requests
export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
