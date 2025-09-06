import { Redis } from '@upstash/redis'

export type Appointment = {
  id: string
  name: string
  email: string
  service: { id: number; name: string; price?: string; duration?: number }
  date: string // YYYY-MM-DD
  time: string // HH:mm
  notes?: string
  createdAt: string
  status?: 'active' | 'cancelled'
}

const APPOINTMENTS_KEY = 'appointments'

// Create Redis client using fromEnv() method
const redis = Redis.fromEnv()

// Debug: Log the configuration
console.log('Redis config loaded from environment variables')

export async function readAppointments(): Promise<Appointment[]> {
  try {
    // Use cache if available and not expired
    const now = Date.now()
    if (appointmentsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return appointmentsCache
    }
    
    const data = await redis.get(APPOINTMENTS_KEY)
    
    // Handle different data types from Redis
    let appointments: Appointment[] = []
    
    if (data) {
      if (typeof data === 'string') {
        // Data is already a string, parse it
        appointments = JSON.parse(data)
      } else if (Array.isArray(data)) {
        // Data is already an array (parsed by Redis)
        appointments = data
      } else if (typeof data === 'object') {
        // Data is an object, try to parse it as JSON string
        try {
          appointments = JSON.parse(JSON.stringify(data))
        } catch {
          // If that fails, treat it as a single appointment
          appointments = [data as Appointment]
        }
      }
    }
    
    // Update cache
    appointmentsCache = appointments
    cacheTimestamp = now
    
    return appointments
  } catch (error) {
    console.error('Error reading appointments:', error)
    return []
  }
}

export async function writeAppointments(list: Appointment[]): Promise<void> {
  try {
    // Skip encryption for performance - store data directly
    await redis.set(APPOINTMENTS_KEY, JSON.stringify(list))
  } catch (error) {
    console.error('Error writing appointments:', error)
    throw error
  }
}

// Cache for better performance
let appointmentsCache: Appointment[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 30000 // 30 seconds

export async function isSlotTaken(date: string, time: string): Promise<boolean> {
  const now = Date.now()
  
  // Use cache if available and not expired
  if (appointmentsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return appointmentsCache.some(a => a.date === date && a.time === time && a.status !== 'cancelled')
  }
  
  // Load fresh data and cache it
  appointmentsCache = await readAppointments()
  cacheTimestamp = now
  
  return appointmentsCache.some(a => a.date === date && a.time === time && a.status !== 'cancelled')
}

export async function createAppointment(a: Appointment): Promise<void> {
  // Set default status if not provided
  if (!a.status) {
    a.status = 'active'
  }
  
  // Use cache if available, otherwise load fresh data
  const now = Date.now()
  let list: Appointment[]
  
  if (appointmentsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    list = [...appointmentsCache]
  } else {
    list = await readAppointments()
  }
  
  list.push(a)
  
  // Update cache
  appointmentsCache = list
  cacheTimestamp = now
  
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

// New functions for advanced appointment management
export async function cancelAppointment(appointmentId: string): Promise<boolean> {
  try {
    const appointments = await readAppointments()
    const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId)
    
    if (appointmentIndex === -1) {
      return false
    }
    
    // Mark as cancelled instead of deleting
    appointments[appointmentIndex].status = 'cancelled'
    await writeAppointments(appointments)
    return true
  } catch (error) {
    console.error('Error canceling appointment:', error)
    throw error
  }
}

export async function rescheduleAppointment(
  appointmentId: string, 
  newDate: string, 
  newTime: string
): Promise<boolean> {
  try {
    const appointments = await readAppointments()
    const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId)
    
    if (appointmentIndex === -1) {
      return false
    }
    
    // Check if new slot is available
    const slotTaken = await isSlotTaken(newDate, newTime)
    if (slotTaken) {
      return false
    }
    
    // Update the appointment
    appointments[appointmentIndex].date = newDate
    appointments[appointmentIndex].time = newTime
    
    await writeAppointments(appointments)
    return true
  } catch (error) {
    console.error('Error rescheduling appointment:', error)
    throw error
  }
}

export async function getAppointmentById(appointmentId: string): Promise<Appointment | null> {
  try {
    const appointments = await readAppointments()
    return appointments.find(apt => apt.id === appointmentId) || null
  } catch (error) {
    console.error('Error getting appointment:', error)
    return null
  }
}

export async function getAppointmentsByEmail(email: string): Promise<Appointment[]> {
  try {
    const appointments = await readAppointments()
    return appointments.filter(apt => apt.email === email)
  } catch (error) {
    console.error('Error getting appointments by email:', error)
    return []
  }
}


