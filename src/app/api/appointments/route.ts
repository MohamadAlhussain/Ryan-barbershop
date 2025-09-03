import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { 
  createAppointment, 
  isSlotTaken, 
  readAppointments, 
  cleanupOldAppointments, 
  cancelAppointment,
  rescheduleAppointment,
  getAppointmentById,
  getAppointmentsByEmail,
  type Appointment 
} from '@/lib/appointments'
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter'

export async function GET(req: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    // Clean up old appointments before returning the list
    await cleanupOldAppointments()
    
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    
    if (email) {
      // Get appointments for specific email
      const appointments = await getAppointmentsByEmail(email)
      return NextResponse.json({ appointments }, { headers })
    } else {
      // Get all appointments (for admin)
      const list = await readAppointments()
      return NextResponse.json({ appointments: list }, { headers })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500, headers })
  }
}

export async function POST(req: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    // Rate limiting check
    const clientIP = getClientIP(req)
    const rateLimit = checkRateLimit(clientIP, 3, 15 * 60 * 1000) // 3 requests per 15 minutes
    
    if (!rateLimit.allowed) {
      return NextResponse.json({ 
        error: 'Too many booking attempts. Please try again later.',
        resetTime: rateLimit.resetTime
      }, { status: 429, headers })
    }

    const body = await req.json()
    const {
      name,
      email,
      service,
      date,
      time,
      notes
    } = body || {}

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers })
    }

    if (await isSlotTaken(String(date), String(time))) {
      return NextResponse.json({ error: 'Slot already taken' }, { status: 409, headers })
    }

    const appointment: Appointment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: String(name),
      email: String(email),
      service: {
        id: Number(service.id),
        name: String(service.name),
        price: String(service.price),
        duration: Number(service.duration)
      },
      date: String(date),
      time: String(time),
      notes: notes ? String(notes) : undefined,
      createdAt: new Date().toISOString()
    }

    console.log('Creating appointment:', appointment)
    await createAppointment(appointment)
    console.log('Appointment created successfully')
    
    // Clean up old appointments after creating new one
    await cleanupOldAppointments()
    console.log('Old appointments cleaned up')

    // Send email notification (configure via env vars)
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT || 587)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const fromEmail = process.env.MAIL_FROM || smtpUser

    if (smtpHost && smtpUser && smtpPass && fromEmail) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      })

      const subject = `Terminbestätigung ${appointment.date} ${appointment.time}`
      const cancelUrl = `${process.env.VERCEL_URL || 'https://ryan-barbershop.vercel.app'}/cancel?token=${appointment.id}`
      
      const text = `Hallo ${appointment.name},\n\n` +
        `Ihr Termin wurde bestätigt.\n` +
        `Service: ${appointment.service.name}\n` +
        `Datum: ${appointment.date}\n` +
        `Uhrzeit: ${appointment.time}\n` +
        `Dauer: ${appointment.service.duration} Min\n` +
        `${appointment.notes ? `\nHinweise: ${appointment.notes}\n` : ''}` +
        `\nTermin absagen: ${cancelUrl}\n` +
        `\nBis bald im RYAN BARBERSHOP!`

      const html = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Terminbestätigung - Ryan Barbershop</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif">
        <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);min-height:100vh;padding:20px 10px">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px -12px rgba(0,0,0,0.25)">
            
            <!-- Header with Logo -->
            <div style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:30px 20px;text-align:center">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.5px;text-shadow:0 2px 4px rgba(0,0,0,0.3);line-height:1.2">RYAN<br>BARBERSHOP</h1>
              <p style="margin:8px 0 0 0;font-size:11px;color:#fef3c7;font-weight:500">Premium Barbering Experience</p>
            </div>

            <!-- Main Content -->
            <div style="padding:30px 20px">
              <!-- Greeting -->
              <div style="text-align:center;margin-bottom:25px">
                <h2 style="margin:0 0 8px 0;font-size:18px;color:#1e293b;font-weight:700">Terminbestätigung</h2>
                <p style="margin:0;font-size:14px;color:#64748b;line-height:1.5">Hallo ${appointment.name},<br>Ihr Termin wurde erfolgreich bestätigt!</p>
              </div>

              <!-- Appointment Details Card -->
              <div style="background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);border:2px solid #e2e8f0;border-radius:12px;padding:25px;margin-bottom:25px;position:relative;overflow:hidden">
                <div style="position:absolute;top:0;right:0;width:80px;height:80px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:0 12px 0 80px;opacity:0.1"></div>
                
                <div style="display:grid;gap:12px;position:relative;z-index:1">
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #e2e8f0">
                    <div style="display:flex;align-items:center">
                      <div style="width:32px;height:32px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:12px">
                        <span style="color:#ffffff;font-size:14px;font-weight:bold">✂️</span>
                      </div>
                      <div>
                        <p style="margin:0;font-size:11px;color:#64748b;font-weight:500">Service</p>
                        <p style="margin:0;font-size:14px;color:#1e293b;font-weight:700">${appointment.service.name}</p>
                      </div>
                    </div>
                    <div style="text-align:right">
                      <p style="margin:0;font-size:16px;color:#f59e0b;font-weight:800">${appointment.service.price}</p>
                    </div>
                  </div>

                  <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #e2e8f0">
                    <div style="display:flex;align-items:center">
                      <div style="width:32px;height:32px;background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:12px">
                        <span style="color:#ffffff;font-size:14px;font-weight:bold">📅</span>
                      </div>
                      <div>
                        <p style="margin:0;font-size:11px;color:#64748b;font-weight:500">Datum</p>
                        <p style="margin:0;font-size:14px;color:#1e293b;font-weight:700">${appointment.date}</p>
                      </div>
                    </div>
                  </div>

                  <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #e2e8f0">
                    <div style="display:flex;align-items:center">
                      <div style="width:32px;height:32px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:12px">
                        <span style="color:#ffffff;font-size:14px;font-weight:bold">🕐</span>
                      </div>
                      <div>
                        <p style="margin:0;font-size:11px;color:#64748b;font-weight:500">Uhrzeit</p>
                        <p style="margin:0;font-size:14px;color:#1e293b;font-weight:700">${appointment.time}</p>
                      </div>
                    </div>
                  </div>

                  <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0">
                    <div style="display:flex;align-items:center">
                      <div style="width:32px;height:32px;background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:12px">
                        <span style="color:#ffffff;font-size:14px;font-weight:bold">⏱️</span>
                      </div>
                      <div>
                        <p style="margin:0;font-size:11px;color:#64748b;font-weight:500">Dauer</p>
                        <p style="margin:0;font-size:14px;color:#1e293b;font-weight:700">${appointment.service.duration} Minuten</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              ${appointment.notes ? `
              <!-- Notes Section -->
              <div style="background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border-left:4px solid #f59e0b;border-radius:12px;padding:15px;margin-bottom:20px">
                <div style="display:flex;align-items:flex-start">
                  <div style="width:20px;height:20px;background:#f59e0b;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:10px;flex-shrink:0;margin-top:2px">
                    <span style="color:#ffffff;font-size:10px;font-weight:bold">ℹ️</span>
                  </div>
                  <div>
                    <p style="margin:0 0 4px 0;font-size:11px;color:#92400e;font-weight:600">Ihre Hinweise:</p>
                    <p style="margin:0;font-size:13px;color:#78350f;line-height:1.4">${appointment.notes}</p>
                  </div>
                </div>
              </div>
              ` : ''}



              <!-- Call to Action -->
              <div style="text-align:center;margin-bottom:25px">
                <div style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:50px;padding:12px 24px;box-shadow:0 8px 20px -5px rgba(245,158,11,0.4)">
                  <p style="margin:0;font-size:14px;color:#ffffff;font-weight:700;letter-spacing:0.3px">Wir freuen uns auf Ihren Besuch! 🎉</p>
                </div>
              </div>

              <!-- Cancel Appointment -->
              <div style="text-align:center;margin-bottom:20px">
                <p style="margin:0 0 15px 0;font-size:13px;color:#64748b;line-height:1.4">
                  Falls Sie den Termin absagen möchten, klicken Sie auf den folgenden Link:
                </p>
                <a href="${cancelUrl}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;box-shadow:0 4px 12px -2px rgba(220,38,38,0.4)">
                  Termin absagen
                </a>
              </div>

              <!-- Footer -->
              <div style="border-top:2px solid #f1f5f9;padding-top:20px;text-align:center">
                <p style="margin:0 0 8px 0;font-size:12px;color:#64748b;line-height:1.5">
                  Bei Fragen oder Terminänderungen kontaktieren Sie uns gerne.<br>
                  Wir sind für Sie da!
                </p>
                <div style="margin:15px 0;padding:10px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0">
                  <p style="margin:0;font-size:10px;color:#94a3b8">
                    Diese E-Mail wurde automatisch generiert • Ryan Barbershop • © ${new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>`

      await transporter.sendMail({
        from: fromEmail?.includes('<') ? fromEmail : `"RYAN BARBERSHOP" <${fromEmail}>`,
        to: appointment.email,
        subject,
        text,
        html,
        replyTo: fromEmail
      })
    }

  return NextResponse.json({ appointment }, { status: 201, headers })
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500, headers })
  }
}

// Send cancellation email
export async function sendCancellationEmail(appointment: Appointment) {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const fromEmail = process.env.MAIL_FROM || smtpUser

  if (smtpHost && smtpUser && smtpPass && fromEmail) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    })

    const subject = `Termin abgesagt - ${appointment.date} ${appointment.time}`
    
    const text = `Hallo ${appointment.name},\n\n` +
      `Ihr Termin wurde erfolgreich abgesagt.\n` +
      `Service: ${appointment.service.name}\n` +
      `Datum: ${appointment.date}\n` +
      `Uhrzeit: ${appointment.time}\n` +
      `\nFalls Sie einen neuen Termin wünschen, können Sie gerne einen neuen Termin buchen.\n` +
      `\nMit freundlichen Grüßen\nRyan Barbershop`

    const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Termin abgesagt - Ryan Barbershop</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif">
      <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);min-height:100vh;padding:20px 10px">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px -12px rgba(0,0,0,0.25)">
          
          <!-- Header with Logo -->
          <div style="background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);padding:30px 20px;text-align:center">
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.5px;text-shadow:0 2px 4px rgba(0,0,0,0.3);line-height:1.2">RYAN<br>BARBERSHOP</h1>
            <p style="margin:8px 0 0 0;font-size:11px;color:#fecaca;font-weight:500">Termin abgesagt</p>
          </div>

          <!-- Main Content -->
          <div style="padding:30px 20px">
            <!-- Greeting -->
            <div style="text-align:center;margin-bottom:25px">
              <h2 style="margin:0 0 8px 0;font-size:18px;color:#1e293b;font-weight:700">Termin abgesagt</h2>
              <p style="margin:0;font-size:14px;color:#64748b;line-height:1.5">Hallo ${appointment.name},<br>Ihr Termin wurde erfolgreich abgesagt.</p>
            </div>

            <!-- Cancelled Appointment Details Card -->
            <div style="background:linear-gradient(135deg,#fef2f2 0%,#fee2e2 100%);border:2px solid #fca5a5;border-radius:12px;padding:25px;margin-bottom:25px;position:relative;overflow:hidden">
              <div style="position:absolute;top:0;right:0;width:80px;height:80px;background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);border-radius:0 12px 0 80px;opacity:0.1"></div>
              
              <div style="display:grid;gap:12px;position:relative;z-index:1">
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #fca5a5">
                  <div style="display:flex;align-items:center">
                    <div style="width:32px;height:32px;background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:12px">
                      <span style="color:#ffffff;font-size:14px;font-weight:bold">✂️</span>
                    </div>
                    <div>
                      <p style="margin:0;font-size:11px;color:#991b1b;font-weight:500">Service</p>
                      <p style="margin:0;font-size:14px;color:#1e293b;font-weight:700">${appointment.service.name}</p>
                    </div>
                  </div>
                </div>

                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #fca5a5">
                  <div style="display:flex;align-items:center">
                    <div style="width:32px;height:32px;background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:12px">
                      <span style="color:#ffffff;font-size:14px;font-weight:bold">📅</span>
                    </div>
                    <div>
                      <p style="margin:0;font-size:11px;color:#991b1b;font-weight:500">Datum</p>
                      <p style="margin:0;font-size:14px;color:#1e293b;font-weight:700">${appointment.date}</p>
                    </div>
                  </div>
                </div>

                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0">
                  <div style="display:flex;align-items:center">
                    <div style="width:32px;height:32px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:12px">
                      <span style="color:#ffffff;font-size:14px;font-weight:bold">🕐</span>
                    </div>
                    <div>
                      <p style="margin:0;font-size:11px;color:#991b1b;font-weight:500">Uhrzeit</p>
                      <p style="margin:0;font-size:14px;color:#1e293b;font-weight:700">${appointment.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- New Booking CTA -->
            <div style="text-align:center;margin-bottom:25px">
              <div style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:50px;padding:12px 24px;box-shadow:0 8px 20px -5px rgba(245,158,11,0.4)">
                <p style="margin:0;font-size:14px;color:#ffffff;font-weight:700;letter-spacing:0.3px">Neuen Termin buchen? 🎉</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="border-top:2px solid #f1f5f9;padding-top:20px;text-align:center">
              <p style="margin:0 0 8px 0;font-size:12px;color:#64748b;line-height:1.5">
                Falls Sie einen neuen Termin wünschen, können Sie gerne einen neuen Termin buchen.<br>
                Wir freuen uns auf Ihren nächsten Besuch!
              </p>
              <div style="margin:15px 0;padding:10px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0">
                <p style="margin:0;font-size:10px;color:#94a3b8">
                  Diese E-Mail wurde automatisch generiert • Ryan Barbershop • © ${new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>`

    await transporter.sendMail({
      from: fromEmail?.includes('<') ? fromEmail : `"RYAN BARBERSHOP" <${fromEmail}>`,
      to: appointment.email,
      subject,
      text,
      html,
      replyTo: fromEmail
    })
  }
}

// New API endpoints for advanced features
export async function DELETE(req: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
      // Send cancellation email
      await sendCancellationEmail(appointment)
      
      return NextResponse.json({ message: 'Appointment cancelled successfully' }, { status: 200, headers })
    } else {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404, headers })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to cancel appointment' }, { status: 500, headers })
  }
}

// Handle CORS preflight requests
export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { appointmentId, newDate, newTime } = body
    
    if (!appointmentId || !newDate || !newTime) {
      return NextResponse.json({ error: 'Appointment ID, new date, and new time required' }, { status: 400 })
    }
    
    const success = await rescheduleAppointment(appointmentId, newDate, newTime)
    
    if (success) {
      return NextResponse.json({ message: 'Appointment rescheduled successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Failed to reschedule - slot may be taken or appointment not found' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reschedule appointment' }, { status: 500 })
  }
}
