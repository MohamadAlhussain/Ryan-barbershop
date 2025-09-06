"use client"

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: string
  name: string
  email: string
  service?: { id: number; name: string; price: string; duration: number }
  date: string
  time: string
  notes?: string
  status?: 'active' | 'cancelled'
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [showDayModal, setShowDayModal] = useState(false)
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<Appointment[]>([])
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [search, setSearch] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const router = useRouter()

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('admin_auth')
      if (auth === 'true') {
        setIsAuthenticated(true)
      } else {
        router.push('/admin/login')
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router])

  useEffect(() => {
    if (!isAuthenticated) return
    
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
  }, [isAuthenticated])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  const monthLabel = (d: Date) => d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  const cancelAppointment = async (id: string) => {
    if (!confirm('Diesen Termin wirklich stornieren?')) return
    
    try {
      const res = await fetch(`/api/appointments?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        const updatedRes = await fetch('/api/appointments', { cache: 'no-store' })
        if (updatedRes.ok) {
          const data = await updatedRes.json()
          setAppointments(Array.isArray(data.appointments) ? data.appointments : [])
        }
      } else {
        alert('Failed to cancel appointment')
      }
    } catch {
      alert('Failed to cancel appointment')
    }
  }


  const handleDayClick = (day: Date) => {
    const dayAppointments = apptsForDay(day)
    if (dayAppointments.length > 0) {
      setSelectedDay(day)
      setSelectedDayAppointments(dayAppointments)
      setShowDayModal(true)
    }
  }

  const filtered = useMemo(() => {
    return appointments.filter(a => {
      const matchesSearch = !search || 
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
      
      const isToday = selectedDate.toISOString().slice(0, 10) === a.date
      return matchesSearch && isToday
    })
  }, [appointments, search, selectedDate])

  const apptsForDay = (day: Date) => {
    const dayStr = day.toISOString().slice(0, 10)
    return appointments.filter(a => a.date === dayStr)
  }

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  
  const firstDayOfMonth = useMemo(() => {
    const first = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const day = first.getDay()
    return day === 0 ? 6 : day - 1 // Convert Sunday=0 to Monday=0
  }, [currentMonth])

  const days = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const numDays = daysInMonth(year, month)
    
    return Array.from({ length: numDays }, (_, i) => new Date(year, month, i + 1))
  }, [currentMonth])

  const leadingEmpty = useMemo(() => Array(firstDayOfMonth).fill(null), [firstDayOfMonth])



  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-20 pb-4 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mobile-friendly header without title */}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-6 rounded-2xl border border-gray-700 space-y-4">
          {/* Mobile-optimized controls */}
          <div className="space-y-3">
            {/* View Toggle - Mobile Friendly */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setView('list')}
                className={`flex-1 px-4 py-3 text-sm rounded-lg transition-all touch-target ${
                  view === 'list' 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Liste
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`flex-1 px-4 py-3 text-sm rounded-lg transition-all touch-target ${
                  view === 'calendar' 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Kalender
              </button>
            </div>

            {/* Search - Full Width */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nach Name oder Email suchen..."
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 touch-target focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            
            {/* Month Navigation - Mobile Friendly */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500 touch-target text-lg"
              >
                ‹
              </button>
              <div className="px-4 py-3 text-gray-200 font-medium text-center">{monthLabel(currentMonth)}</div>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500 touch-target text-lg"
              >
                ›
              </button>
            </div>
          </div>

          {/* Content based on view */}
          {view === 'list' ? (
            /* List View */
            <div className="overflow-x-auto">
            <div className="flex items-center gap-2 py-2 mb-4">
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500 transition-colors touch-target"
              >
                ←
              </button>
              <div className="flex-1 text-center">
                <div className="text-lg font-semibold text-amber-400">
                  {selectedDate.toLocaleDateString('de-DE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500 transition-colors touch-target"
              >
                →
              </button>
            </div>
            
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="text-gray-300">
                  <tr>
                    <th className="text-left p-2">Zeit</th>
                    <th className="text-left p-2">Service</th>
                    <th className="text-left p-2">Kunde</th>
                    <th className="text-left p-2 hidden sm:table-cell">Kontakt</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {filtered.map((a) => (
                    <tr key={a.id} className={`border-t border-gray-700 ${a.status === 'cancelled' ? 'opacity-60' : ''}`}>
                      <td className="p-2 font-medium">{a.time}</td>
                      <td className="p-2">
                        <div className="text-sm">{a.service?.name}</div>
                        <div className="text-xs text-gray-400">{a.service?.duration} Min</div>
                      </td>
                      <td className="p-2">
                        <div className="text-sm font-medium">{a.name}</div>
                        <div className="text-xs text-gray-400 sm:hidden">{a.email}</div>
                      </td>
                      <td className="p-2 hidden sm:table-cell text-xs">{a.email}</td>
                      <td className="p-2">
                        {a.status === 'cancelled' ? (
                          <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg transition-colors touch-target cursor-default">
                            Cancelled
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-amber-600 text-white text-xs rounded-lg transition-colors touch-target cursor-default">
                            Active
                          </button>
                        )}
                      </td>
                      <td className="p-2">
                        {a.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelAppointment(a.id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors touch-target"
                          >
                            Stornieren
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400">
                        Keine Termine für diesen Tag gefunden
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          ) : (
            /* Calendar View */
            <div>
              {/* Mobile-optimized calendar */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-gray-300 text-xs mb-2">
                {['Mo','Di','Mi','Do','Fr','Sa','So'].map((d) => (
                  <div key={d} className="py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {leadingEmpty.map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-24 sm:h-36 bg-gray-800/60 rounded-lg border border-gray-700"></div>
                ))}
                {days.map((day) => {
                  const appts = apptsForDay(day)
                  const dayNum = day.getDate()
                  return (
                    <div
                      key={day.toISOString()}
                      onClick={() => appts.length > 0 && handleDayClick(day)}
                      className={`h-24 sm:h-36 border border-gray-700 rounded-lg p-1 sm:p-2 cursor-pointer transition-all text-xs space-y-1 touch-target ${
                        selectedDate && day.toDateString() === selectedDate.toDateString()
                          ? 'border-amber-500 bg-amber-500/10' 
                          : appts.length > 0 
                            ? 'border-amber-400/60 bg-amber-400/10 hover:border-amber-400 hover:bg-amber-400/20' 
                            : 'bg-gray-800/30 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className={`text-center font-medium mb-1 ${dayNum === 1 ? 'text-amber-400' : 'text-gray-300'}`}>
                        {dayNum}
                      </div>
                      <div className="space-y-0.5">
                        {appts.slice(0, 3).map((apt, i) => (
                          <div 
                            key={i} 
                            className={`text-xs p-1 rounded-lg truncate ${
                              apt.status === 'cancelled' 
                                ? 'bg-red-600/30 text-red-300' 
                                : 'bg-amber-600/30 text-amber-200'
                            }`}
                          >
                            {apt.time}
                          </div>
                        ))}
                        {appts.length > 3 && (
                          <div className="text-xs text-center text-gray-400">
                            +{appts.length - 3} mehr
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Day Appointments Modal */}
      {showDayModal && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-amber-400">
                  Termine für {selectedDay.toLocaleDateString('de-DE', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </h2>
                <button
                  onClick={() => setShowDayModal(false)}
                  className="text-gray-400 hover:text-white text-2xl touch-target"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {selectedDayAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-amber-400">{appointment.name}</h3>
                        <p className="text-gray-300 text-sm">{appointment.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{appointment.time}</div>
                        <div className="text-sm text-gray-400">{appointment.service?.duration} Min</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Service:</span> {appointment.service?.name}
                      </div>
                      {appointment.notes && (
                        <div className="text-sm text-gray-300 mt-1">
                          <span className="font-medium">Hinweise:</span> {appointment.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {appointment.status === 'cancelled' ? (
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg transition-colors touch-target cursor-default">
                          Storniert
                        </button>
                      ) : (
                        <button className="px-3 py-1 bg-amber-600 text-white text-xs rounded-lg transition-colors touch-target cursor-default">
                          Aktiv
                        </button>
                      )}
                      {appointment.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            cancelAppointment(appointment.id)
                            setShowDayModal(false)
                          }}
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors touch-target"
                        >
                          Stornieren
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {selectedDayAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Keine Termine an diesem Tag</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button - Bottom Section */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors touch-target"
          >
            Abmelden
          </button>
        </div>
      </section>
    </main>
  )
}
