import { kv } from '@vercel/kv'

export type Appointment = {
  id: string
  name: string
  email: string
  service: { id: number; name: string; price: string; duration: number }
  date: string // YYYY-MM-DD
  time: string // HH:mm
  notes?: string
  createdAt: string
}

const APPOINTMENTS_KEY = 'appointments'

export async function readAppointments(): Promise<Appointment[]> {
  try {
    const data = await kv.get<Appointment[]>(APPOINTMENTS_KEY)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error reading appointments:', error)
    return []
  }
}

export async function writeAppointments(list: Appointment[]): Promise<void> {
  try {
    await kv.set(APPOINTMENTS_KEY, list)
  } catch (error) {
    console.error('Error writing appointments:', error)
    throw error
  }
}

export async function isSlotTaken(date: string, time: string): Promise<boolean> {
  const all = await readAppointments()
  // Lock by date+time regardless of service to prevent double booking
  return all.some(a => a.date === date && a.time === time)
}

export async function createAppointment(a: Appointment): Promise<void> {
  const list = await readAppointments()
  list.push(a)
  await writeAppointments(list)
}

export async function cleanupOldAppointments(): Promise<number> {
  const appointments = await readAppointments()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 14) // 14 days ago
  
  const filtered = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date)
    return appointmentDate > cutoffDate
  })
  
  if (filtered.length !== appointments.length) {
    await writeAppointments(filtered)
  }
  
  return filtered.length
}


