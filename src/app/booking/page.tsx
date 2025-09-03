"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Booking() {
  const services = [
    { id: 1, name: "Herren Haarschnitt" },
    { id: 2, name: "Herren Haar Schnitt mit Waschen" },
    { id: 3, name: "Kinder Haarschnitt" },
    { id: 4, name: "Kinder Harrschnitt mit Waschen" },
    { id: 5, name: "Bart Styling" },
    { id: 6, name: "Gesichtsreinigung" }
  ]

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30"
  ]

  const [appointments, setAppointments] = useState<any[]>([])

  // No need for month selection - using rolling 30-day window

  // Helper function to check if a date has available slots (defined early since weekdays depends on it)
  const hasAvailableSlotsForDate = useMemo(() => {
    return (dateStr: string) => {
      const now = new Date()
      const berlinTime = new Date(now.toLocaleString("sv-SE", {timeZone: "Europe/Berlin"}))
      const today = berlinTime.toISOString().split('T')[0]
      
      // Get taken appointments for this date
      const takenForDate = new Set<string>()
      for (const a of appointments) {
        if (a.date === dateStr) {
          takenForDate.add(a.time)
        }
      }
      
      if (dateStr === today) {
        // For today, check if there are slots after current time
        const currentHour = berlinTime.getHours()
        const currentMinute = berlinTime.getMinutes()
        const currentTime = currentHour * 60 + currentMinute
        const nextAvailableSlot = Math.ceil(currentTime / 30) * 30
        
        return timeSlots.some(time => {
          const [hour, minute] = time.split(':').map(Number)
          const slotTime = hour * 60 + minute
          return slotTime >= nextAvailableSlot && !takenForDate.has(time)
        })
      } else if (dateStr > today) {
        // For future dates, check if there are any free slots
        return timeSlots.some(time => !takenForDate.has(time))
      } else {
        // Past dates have no available slots
        return false
      }
    }
  }, [appointments])

  // Generate rolling 30-day window starting from today
  const weekdays = useMemo(() => {
    const days: { day: string; date: string; available: boolean }[] = []
    
    // Get current time in Berlin timezone
    const now = new Date()
    const berlinTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Berlin"}))
    const currentHour = berlinTime.getHours()
    const currentMinute = berlinTime.getMinutes()
    const currentTime = currentHour * 60 + currentMinute // Convert to minutes for easier comparison
    
    // Barbershop closes at 19:00 (19 * 60 = 1140 minutes)
    const closingTime = 19 * 60 // 19:00 in minutes
    
    // Get today's date string in Berlin timezone (YYYY-MM-DD format)
    const todayStr = `${berlinTime.getFullYear()}-${String(berlinTime.getMonth() + 1).padStart(2, '0')}-${String(berlinTime.getDate()).padStart(2, '0')}`
    
    // Generate next 30 days starting from today
    for (let i = 0; i < 30; i++) {
      const date = new Date(berlinTime)
      date.setDate(berlinTime.getDate() + i)
      
      const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
      const dayName = dayNames[date.getDay()]
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      
      // Check if date is today
      const isToday = dateStr === todayStr
      
      // Check if date is in the past (before today)
      const isPastDate = dateStr < todayStr
      
      // If it's today, check if we're past closing time
      const isPastClosingTime = isToday && currentTime >= closingTime
      
      // Check if this date has any available time slots
      const hasAvailableSlots = hasAvailableSlotsForDate(dateStr)
      
      // Sunday is not available, past dates are not available, today after closing time is not available, and days without available slots are not available
      const available = date.getDay() !== 0 && !isPastDate && !isPastClosingTime && hasAvailableSlots
      
      days.push({
        day: dayName,
        date: dateStr,
        available
      })
    }
    
    return days
  }, [hasAvailableSlotsForDate])

  // Local UI state for a simple frontend-only booking flow
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  const selectedService = services.find(s => s.id === selectedServiceId) || null

  const takenTimesForSelection = useMemo(() => {
    if (!selectedDate) return new Set<string>()
    const set = new Set<string>()
    
    // Add taken appointments
    for (const a of appointments) {
      if (a.date === selectedDate) {
        set.add(a.time)
      }
    }
    
    // If selected date is today, also disable past time slots
    const now = new Date()
    const berlinTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Berlin"}))
    const today = berlinTime.toISOString().slice(0, 10)
    
    if (selectedDate === today) {
      const currentHour = berlinTime.getHours()
      const currentMinute = berlinTime.getMinutes()
      const currentTime = currentHour * 60 + currentMinute
      
      // Find the next available time slot (round up to next 30-minute slot)
      const nextAvailableSlot = Math.ceil(currentTime / 30) * 30
      
      // Disable time slots that are in the past or current slot
      timeSlots.forEach(time => {
        const [hour, minute] = time.split(':').map(Number)
        const slotTime = hour * 60 + minute
        
        // If time slot is in the past or current slot, add it to disabled set
        if (slotTime < nextAvailableSlot) {
          set.add(time)
        }
      })
    }
    
    return set
  }, [appointments, selectedDate])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/appointments', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setAppointments(Array.isArray(data.appointments) ? data.appointments : [])
        }
      } catch {
        // ignore
      }
    }
    load()
  }, [])

  // Auto-select first available date and time when appointments are loaded
  useEffect(() => {
    if (appointments.length >= 0 && weekdays.length > 0 && !selectedDate) {
      // Find the first truly available date (not past, not fully booked, not Sunday, not after closing)
      const firstAvailableDay = weekdays.find(day => {
        if (!day.available) return false
        
        // Double-check that this date actually has available slots
        const now = new Date()
        const berlinTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Berlin"}))
        const today = `${berlinTime.getFullYear()}-${String(berlinTime.getMonth() + 1).padStart(2, '0')}-${String(berlinTime.getDate()).padStart(2, '0')}`
        
        // Get appointments for this specific date
        const appointmentsForDate = appointments.filter(apt => apt.date === day.date)
        const takenForDate = new Set(appointmentsForDate.map(apt => apt.time))
        
        if (day.date === today) {
          // For today, check if there are any available slots after current time
          const currentHour = berlinTime.getHours()
          const currentMinute = berlinTime.getMinutes()
          const currentTime = currentHour * 60 + currentMinute
          const nextAvailableSlot = Math.ceil(currentTime / 30) * 30
          
          return timeSlots.some(time => {
            const [hour, minute] = time.split(':').map(Number)
            const slotTime = hour * 60 + minute
            return slotTime >= nextAvailableSlot && !takenForDate.has(time)
          })
        } else if (day.date > today) {
          // For future dates, check if there are any free slots
          return timeSlots.some(time => !takenForDate.has(time))
        }
        
        return false
      })
      
      if (firstAvailableDay) {
        setSelectedDate(firstAvailableDay.date)
      }
    }
  }, [appointments, weekdays, selectedDate])

  // Auto-select first available time when date is selected
  useEffect(() => {
    if (selectedDate && !selectedTime) {
      const now = new Date()
      const berlinTime = new Date(now.toLocaleString("sv-SE", {timeZone: "Europe/Berlin"}))
      const today = berlinTime.toISOString().split('T')[0]
      
      // Get appointments for the selected date
      const appointmentsForDate = appointments.filter(apt => apt.date === selectedDate)
      const takenTimesForDate = new Set(appointmentsForDate.map(apt => apt.time))
      
      if (selectedDate === today) {
        // For today, find next available slot
        const currentHour = berlinTime.getHours()
        const currentMinute = berlinTime.getMinutes()
        const currentTime = currentHour * 60 + currentMinute
        const nextAvailableSlot = Math.ceil(currentTime / 30) * 30
        
        // Find first available time slot
        const firstAvailableTime = timeSlots.find(time => {
          const [hour, minute] = time.split(':').map(Number)
          const slotTime = hour * 60 + minute
          return slotTime >= nextAvailableSlot && !takenTimesForDate.has(time)
        })
        
        if (firstAvailableTime) {
          setSelectedTime(firstAvailableTime)
        }
      } else {
        // For future dates, find first available slot
        const firstAvailableTime = timeSlots.find(time => !takenTimesForDate.has(time))
        if (firstAvailableTime) {
          setSelectedTime(firstAvailableTime)
        }
      }
    }
  }, [selectedDate, appointments, selectedTime])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    // Basic validation
    if (!name || !email) {
      setStatus({ type: 'error', message: 'Bitte füllen Sie alle Pflichtfelder aus.' })
      setIsSubmitting(false)
      return
    }
    if (!selectedService) {
      setStatus({ type: 'error', message: 'Bitte wählen Sie einen Service aus.' })
      setIsSubmitting(false)
      return
    }
    if (!selectedDate || !selectedTime) {
      setStatus({ type: 'error', message: 'Bitte wählen Sie Datum und Uhrzeit aus.' })
      setIsSubmitting(false)
      return
    }

    const booking = {
      name,
      email,
      service: {
        id: selectedService.id,
        name: selectedService.name,
        price: "€15", // Default price since all services are 30 min
        duration: 30, // All services are 30 minutes
      },
      date: selectedDate,
      time: selectedTime,
      notes,
      createdAt: new Date().toISOString(),
    }

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      })
      if (res.status === 409) {
        setStatus({ type: 'error', message: 'Dieser Termin-Slot ist bereits belegt. Bitte wählen Sie eine andere Uhrzeit.' })
      } else if (!res.ok) {
        setStatus({ type: 'error', message: 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.' })
      } else {
        // Show loader
        setShowLoader(true)
        
        // Wait a moment for the loader to show, then redirect
        setTimeout(() => {
          const params = new URLSearchParams({
            name: name,
            service: selectedService.name,
            date: selectedDate,
            time: selectedTime,
            duration: "30",
            price: "€15"
          })
          
          window.location.href = `/booking/thank-you?${params.toString()}`
        }, 1500)
      }
    } catch {
      setStatus({ type: 'error', message: 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loader component
  if (showLoader) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size="lg" color="amber" />
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Termin wird gebucht...</h2>
              <p className="text-sm sm:text-base text-gray-400">Bitte warten Sie einen Moment</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Termin Buchen
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Einfach, schnell und bequem - Ihr Termin in wenigen Klicks
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-4 md:py-8 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-8 rounded-2xl border border-gray-700">
            
            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              {/* Personal Information - Moved to top for better UX */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Persönliche Daten</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="Ihr vollständiger Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="ihre@email.de"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Service auswählen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`bg-gray-700 p-4 md:p-6 rounded-lg border transition-all cursor-pointer group ${selectedServiceId === service.id ? 'border-amber-500 bg-amber-500/10' : 'border-gray-600 hover:border-amber-500 hover:bg-gray-600'}`}
                      onClick={() => setSelectedServiceId(service.id)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 mr-3 md:mr-4 transition-all flex-shrink-0 ${selectedServiceId === service.id ? 'border-amber-500 bg-amber-500' : 'border-gray-400'}`}>
                          {selectedServiceId === service.id && (
                            <div className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"></div>
                        </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors text-base md:text-lg">
                          {service.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Month selection removed - using rolling 30-day window */}

              {/* Date Selection */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Datum auswählen (nächste 30 Tage)</h3>
                <div className="overflow-x-auto">
                  <div className="flex gap-2 min-w-max pb-2">
                  {weekdays.map((weekday, index) => (
                    <div
                      key={index}
                        className={`p-3 text-center rounded-lg border transition-all flex-shrink-0 w-20 ${
                        weekday.available
                            ? `${selectedDate === weekday.date ? 'border-amber-500 bg-gray-600' : 'border-gray-600 hover:border-amber-500 bg-gray-700 hover:bg-gray-600'} cursor-pointer`
                          : 'border-gray-800 bg-gray-800 text-gray-600 cursor-not-allowed'
                      }`}
                        onClick={() => {
                          if (weekday.available) setSelectedDate(weekday.date)
                        }}
                    >
                      <div className="text-sm font-medium">{weekday.day.slice(0, 2)}</div>
                      <div className="text-xs text-gray-400">{weekday.date.slice(-2)}</div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Uhrzeit auswählen</h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={takenTimesForSelection.has(time)}
                      className={`p-3 text-center rounded-lg border transition-all ${
                        takenTimesForSelection.has(time)
                          ? 'border-gray-800 bg-gray-800 text-gray-500 cursor-not-allowed'
                          : selectedTime === time
                            ? 'border-amber-500 bg-gray-600'
                            : 'border-gray-600 hover:border-amber-500 bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        if (!takenTimesForSelection.has(time)) setSelectedTime(time)
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Besondere Wünsche</h3>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                  placeholder="Haben Sie besondere Wünsche oder Anmerkungen? (Optional)"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              {/* Booking Summary */}
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-4 md:p-6 rounded-xl border border-amber-400/30">
                <h3 className="text-lg md:text-xl font-semibold text-amber-400 mb-4">Buchungsübersicht</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Gewählter Service:</span>
                    <span className="text-white">{selectedService ? selectedService.name : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Datum:</span>
                    <span className="text-white">{selectedDate || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uhrzeit:</span>
                    <span className="text-white">{selectedTime || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dauer:</span>
                    <span className="text-white">30 Min</span>
                  </div>
                </div>
              </div>

              {status && (
                <div
                  className={`p-4 rounded-lg border ${
                    status.type === 'success'
                      ? 'bg-green-900/30 border-green-700 text-green-300'
                      : 'bg-red-900/30 border-red-700 text-red-300'
                  }`}
                >
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 md:px-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg text-base md:text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Wird gesendet…' : 'Termin bestätigen'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Booking Tips */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 text-center text-white">
            Wichtige Hinweise
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {

                title: "Pünktlichkeit",
                desc: "Bitte kommen Sie 5 Minuten vor Ihrem Termin"
              },
              {

                title: "Zahlung",
                desc: "Wir akzeptieren alle gängigen Zahlungsmethoden"
              },
              {

                title: "Stornierung",
                desc: "Termine können bis 24h vorher kostenlos storniert werden"
              },
              {

                title: "Getränke",
                desc: "Kostenlose Getränke während Ihres Besuchs"
              }
            ].map((tip, index) => (
              <div key={index} className="bg-black/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">{tip.title}</h3>
                <p className="text-gray-300 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Fragen zur Buchung?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Kontaktieren Sie uns gerne telefonisch oder per E-Mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-amber-600 font-bold rounded-3xl text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Kontakt aufnehmen
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-3xl text-lg hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105"
            >
              Services ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-400 mb-2 md:mb-4">RYAN BARBERSHOP</h3>
            <p className="text-gray-400 text-sm md:text-base">Potsdam, Deutschland</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-8">
            <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Über Uns</Link>
            <Link href="/services" className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Services</Link>
            <Link href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Kontakt</Link>
            <Link href="/booking" className="text-amber-400 text-sm md:text-base">Termin Buchen</Link>
          </div>
          <div className="text-gray-500 text-xs md:text-sm">
            <p>Mo – Fr : 09:00 – 19:00 | Sa : 09:00 – 18:00</p>
            <p className="mt-1 md:mt-2">Copyright © 2025 Ryan Barbershop | Impressum | Datenschutz</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

