import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createAppointment, isSlotTaken, readAppointments, cleanupOldAppointments, type Appointment } from '@/lib/appointments'
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter'

export async function GET() {
  // Clean up old appointments before returning the list
  await cleanupOldAppointments()
  const list = await readAppointments()
  return NextResponse.json({ appointments: list })
}

export async function POST(req: Request) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(req)
    const rateLimit = checkRateLimit(clientIP, 3, 15 * 60 * 1000) // 3 requests per 15 minutes
    
    if (!rateLimit.allowed) {
      return NextResponse.json({ 
        error: 'Too many booking attempts. Please try again later.',
        resetTime: rateLimit.resetTime
      }, { status: 429 })
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
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (await isSlotTaken(String(date), String(time))) {
      return NextResponse.json({ error: 'Slot already taken' }, { status: 409 })
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

    await createAppointment(appointment)
    
    // Clean up old appointments after creating new one
    await cleanupOldAppointments()

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
      const text = `Hallo ${appointment.name},\n\n` +
        `Ihr Termin wurde bestätigt.\n` +
        `Service: ${appointment.service.name}\n` +
        `Datum: ${appointment.date}\n` +
        `Uhrzeit: ${appointment.time}\n` +
        `Dauer: ${appointment.service.duration} Min\n` +
        `${appointment.notes ? `\nHinweise: ${appointment.notes}\n` : ''}` +
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
        <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);min-height:100vh;padding:40px 20px">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25)">
            
            <!-- Header with Logo -->
            <div style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:40px 30px;text-align:center">
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:1px;text-shadow:0 2px 4px rgba(0,0,0,0.3);white-space:nowrap">RYAN BARBERSHOP</h1>
              <p style="margin:6px 0 0 0;font-size:12px;color:#fef3c7;font-weight:500">Premium Barbering Experience</p>
            </div>

            <!-- Main Content -->
            <div style="padding:40px 30px">
              <!-- Greeting -->
              <div style="text-align:center;margin-bottom:20px">
                <h2 style="margin:0 0 8px 0;font-size:18px;color:#1e293b;font-weight:700">Terminbestätigung</h2>
                <p style="margin:0;font-size:14px;color:#64748b;line-height:1.5">Hallo ${appointment.name},<br>Ihr Termin wurde erfolgreich bestätigt!</p>
              </div>

              <!-- Appointment Details Card -->
              <div style="background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);border:2px solid #e2e8f0;border-radius:16px;padding:30px;margin-bottom:30px;position:relative;overflow:hidden">
                <div style="position:absolute;top:0;right:0;width:100px;height:100px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:0 16px 0 100px;opacity:0.1"></div>
                
                <div style="display:grid;gap:15px;position:relative;z-index:1">
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
              <div style="text-align:center;margin-bottom:20px">
                <div style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:50px;padding:12px 24px;box-shadow:0 8px 20px -5px rgba(245,158,11,0.4)">
                  <p style="margin:0;font-size:14px;color:#ffffff;font-weight:700;letter-spacing:0.3px">Wir freuen uns auf Ihren Besuch! 🎉</p>
                </div>
              </div>

              <!-- Footer -->
              <div style="border-top:2px solid #f1f5f9;padding-top:20px;text-align:center">
                <p style="margin:0 0 8px 0;font-size:12px;color:#64748b;line-height:1.5">
                  Bei Fragen oder Terminänderungen kontaktieren Sie uns gerne.<br>
                  Wir sind für Sie da!
                </p>
                <div style="margin:15px 0;padding:12px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0">
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

    return NextResponse.json({ appointment }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


