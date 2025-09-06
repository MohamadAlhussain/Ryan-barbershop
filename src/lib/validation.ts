// Validation utilities for Ryan Barbershop
// تحسينات التحقق من صحة البيانات

export interface ValidationResult {
  isValid: boolean
  error?: string
  sanitizedValue?: string
}

// Email validation with German email patterns
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'E-Mail ist erforderlich' }
  }

  // Trim and sanitize
  const sanitized = email.trim().toLowerCase()
  
  // Basic email regex for German emails
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' }
  }

  
  if (sanitized.length > 254) {
    return { isValid: false, error: 'E-Mail-Adresse ist zu lang' }
  }

  return { isValid: true, sanitizedValue: sanitized }
}

// German phone number validation
export function validatePhoneNumber(phone: string): ValidationResult {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Telefonnummer ist erforderlich' }
  }

  // Remove all non-digit characters except +
  const sanitized = phone.replace(/[^\d+]/g, '')
  
  // German phone number patterns
  const patterns = [
    /^\+49\d{10,11}$/, // +49XXXXXXXXXX
    /^0\d{9,10}$/,     // 0XXXXXXXXX
    /^0049\d{10,11}$/  // 0049XXXXXXXXXX
  ]
  
  const isValid = patterns.some(pattern => pattern.test(sanitized))
  
  if (!isValid) {
    return { 
      isValid: false, 
      error: 'Bitte geben Sie eine gültige deutsche Telefonnummer ein (z.B. +49 179 742 1768 oder 0179 742 1768)' 
    }
  }

  // Normalize to +49 format
  let normalized = sanitized
  if (normalized.startsWith('0')) {
    normalized = '+49' + normalized.substring(1)
  } else if (normalized.startsWith('0049')) {
    normalized = '+' + normalized.substring(2)
  }

  return { isValid: true, sanitizedValue: normalized }
}

// Name validation
export function validateName(name: string): ValidationResult {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name ist erforderlich' }
  }

  const sanitized = name.trim()
  
  if (sanitized.length < 2) {
    return { isValid: false, error: 'Name muss mindestens 2 Zeichen lang sein' }
  }
  
  if (sanitized.length > 50) {
    return { isValid: false, error: 'Name ist zu lang (max. 50 Zeichen)' }
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-ZäöüÄÖÜß\s\-']+$/
  
  if (!nameRegex.test(sanitized)) {
    return { isValid: false, error: 'Name enthält ungültige Zeichen' }
  }

  return { isValid: true, sanitizedValue: sanitized }
}

// Notes validation (optional field)
export function validateNotes(notes: string): ValidationResult {
  if (!notes || typeof notes !== 'string') {
    return { isValid: true, sanitizedValue: '' }
  }

  const sanitized = notes.trim()
  
  if (sanitized.length > 500) {
    return { isValid: false, error: 'Hinweise sind zu lang (max. 500 Zeichen)' }
  }

  // Basic XSS protection - remove script tags and dangerous characters
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi
  ]
  
  let cleaned = sanitized
  dangerousPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '')
  })

  return { isValid: true, sanitizedValue: cleaned }
}

// Date validation
export function validateDate(date: string): ValidationResult {
  if (!date || typeof date !== 'string') {
    return { isValid: false, error: 'Datum ist erforderlich' }
  }

  // Check if date is in YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) {
    return { isValid: false, error: 'Ungültiges Datumsformat' }
  }

  const appointmentDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (isNaN(appointmentDate.getTime())) {
    return { isValid: false, error: 'Ungültiges Datum' }
  }

  if (appointmentDate < today) {
    return { isValid: false, error: 'Datum darf nicht in der Vergangenheit liegen' }
  }

  // Check if date is not more than 30 days in the future
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 30)
  
  if (appointmentDate > maxDate) {
    return { isValid: false, error: 'Datum darf nicht mehr als 30 Tage in der Zukunft liegen' }
  }

  return { isValid: true, sanitizedValue: date }
}

// Time validation
export function validateTime(time: string): ValidationResult {
  if (!time || typeof time !== 'string') {
    return { isValid: false, error: 'Uhrzeit ist erforderlich' }
  }

  // Check if time is in HH:MM format
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  if (!timeRegex.test(time)) {
    return { isValid: false, error: 'Ungültiges Zeitformat' }
  }

  const [hours, minutes] = time.split(':').map(Number)
  
  // Check if time is within business hours (9:00 - 19:00)
  if (hours < 9 || hours >= 19) {
    return { isValid: false, error: 'Uhrzeit muss zwischen 09:00 und 19:00 liegen' }
  }

  // Check if time is in 30-minute intervals
  if (minutes !== 0 && minutes !== 30) {
    return { isValid: false, error: 'Uhrzeit muss in 30-Minuten-Intervallen sein' }
  }

  return { isValid: true, sanitizedValue: time }
}

// Service validation
export function validateService(service: {id?: number, name?: string}): {isValid: boolean, error?: string, sanitizedValue?: {id?: number, name?: string}} {
  if (!service || typeof service !== 'object') {
    return { isValid: false, error: 'Service ist erforderlich' }
  }

  if (!service.id || !service.name) {
    return { isValid: false, error: 'Ungültiger Service' }
  }

  const validServices = [
    'Herrenhaarschnitt',
    'Herrenhaarschnitt mit Waschen',
    'Kinderhaarschnitt',
    'Kinderhaarschnitt mit Waschen',
    'Bart Styling',
    'Gesichtsreinigung'
  ]

  if (!validServices.includes(service.name)) {
    return { isValid: false, error: 'Ungültiger Service ausgewählt' }
  }

  return { isValid: true, sanitizedValue: service }
}

// Comprehensive booking validation
export function validateBooking(booking: {
  name?: string;
  email?: string;
  service?: {id?: number, name?: string};
  date?: string;
  time?: string;
  notes?: string;
}): { isValid: boolean; errors: string[]; sanitizedData?: {
  name: string;
  email: string;
  service: {id?: number, name?: string};
  date: string;
  time: string;
  notes: string;
} } {
  const errors: string[] = []
  const sanitizedData: {
    name?: string;
    email?: string;
    service?: {id?: number, name?: string};
    date?: string;
    time?: string;
    notes?: string;
  } = {}

  // Validate name
  if (!booking.name) {
    errors.push('Name ist erforderlich')
  } else {
    const nameResult = validateName(booking.name)
    if (!nameResult.isValid) {
      errors.push(nameResult.error!)
    } else {
      sanitizedData.name = nameResult.sanitizedValue
    }
  }

  // Validate email
  if (!booking.email) {
    errors.push('E-Mail ist erforderlich')
  } else {
    const emailResult = validateEmail(booking.email)
    if (!emailResult.isValid) {
      errors.push(emailResult.error!)
    } else {
      sanitizedData.email = emailResult.sanitizedValue
    }
  }

  // Validate service
  if (!booking.service) {
    errors.push('Service ist erforderlich')
  } else {
    const serviceResult = validateService(booking.service)
    if (!serviceResult.isValid) {
      errors.push(serviceResult.error!)
    } else {
      sanitizedData.service = serviceResult.sanitizedValue
    }
  }

  // Validate date
  if (!booking.date) {
    errors.push('Datum ist erforderlich')
  } else {
    const dateResult = validateDate(booking.date)
    if (!dateResult.isValid) {
      errors.push(dateResult.error!)
    } else {
      sanitizedData.date = dateResult.sanitizedValue
    }
  }

  // Validate time
  if (!booking.time) {
    errors.push('Zeit ist erforderlich')
  } else {
    const timeResult = validateTime(booking.time)
    if (!timeResult.isValid) {
      errors.push(timeResult.error!)
    } else {
      sanitizedData.time = timeResult.sanitizedValue
    }
  }

  // Validate notes (optional)
  const notesResult = validateNotes(booking.notes || '')
  if (!notesResult.isValid) {
    errors.push(notesResult.error!)
  } else {
    sanitizedData.notes = notesResult.sanitizedValue
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: errors.length === 0 ? sanitizedData as {
      name: string;
      email: string;
      service: {id?: number, name?: string};
      date: string;
      time: string;
      notes: string;
    } : undefined
  }
}

// Rate limiting validation
export function validateRateLimit(ip: string, attempts: number, maxAttempts: number): ValidationResult {
  if (attempts >= maxAttempts) {
    return { 
      isValid: false, 
      error: `Zu viele Versuche. Bitte versuchen Sie es später erneut. (${maxAttempts} Versuche pro 15 Minuten)` 
    }
  }
  
  return { isValid: true }
}
