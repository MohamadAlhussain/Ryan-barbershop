"use client"


import { useEffect, useMemo, useState } from 'react'

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

  const [search, setSearch] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

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



  const filtered = useMemo(() => {
    const selectedDateStr = selectedDate.toLocaleDateString('sv-SE')
    
    return appointments
      .filter(a => {
        // Filter by search term
        const matchesSearch = !search ||
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase()) ||
          (a.service?.name || '').toLowerCase().includes(search.toLowerCase())
        
        // Filter by selected date (only for list view)
        const matchesDate = view === 'calendar' || a.date === selectedDateStr
        
        return matchesSearch && matchesDate
      })
      .sort((x, y) => (x.date + ' ' + x.time).localeCompare(y.date + ' ' + y.time))
  }, [appointments, search, selectedDate, view])



  function monthLabel(d: Date) {
    return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
  }

  function endOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0)
  }
  function daysInMonth(d: Date) {
    const end = endOfMonth(d).getDate()
    const days: Date[] = []
    for (let i = 1; i <= end; i++) {
      days.push(new Date(d.getFullYear(), d.getMonth(), i))
    }
    return days
  }
  function weekdayIndex(date: Date) {
    // Convert Sun(0) => 6, Mon(1) => 0 ... to render Monday-first
    const js = date.getDay()
    return js === 0 ? 6 : js - 1
  }

  const days = daysInMonth(currentMonth)
  const leadingEmpty = Array.from({ length: weekdayIndex(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)) })

  function apptsForDay(day: Date) {
    const dStr = day.toLocaleDateString('sv-SE')
    return filtered.filter(a => a.date === dStr)
  }

  async function handleCancel(appointmentId: string) {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    
    try {
      const response = await fetch(`/api/appointments?id=${appointmentId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Refresh the appointments list
        const res = await fetch('/api/appointments', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setAppointments(Array.isArray(data.appointments) ? data.appointments : [])
        }
      } else {
        alert('Failed to cancel appointment')
      }
    } catch (error) {
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

  const closeDayModal = () => {
    setShowDayModal(false)
    setSelectedDay(null)
    setSelectedDayAppointments([])
  }


  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-20 pb-4 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-amber-400">Appointments Dashboard</h1>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suche"
              className="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                className="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500"
              >
                ‹
              </button>
              <div className="px-3 py-2 text-gray-200">{monthLabel(currentMonth)}</div>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                className="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500"
              >
                ›
              </button>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-2 rounded-lg border ${view === 'list' ? 'bg-amber-600 border-amber-500 text-black' : 'bg-gray-700 border-gray-600 text-white hover:border-amber-500'}`}
              >
                Liste
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-2 rounded-lg border ${view === 'calendar' ? 'bg-amber-600 border-amber-500 text-black' : 'bg-gray-700 border-gray-600 text-white hover:border-amber-500'}`}
              >
                Kalender
              </button>
            </div>
          </div>

          {view === 'list' ? (
            <div>
              {/* Day Navigation for List View */}
              <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                  className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500 transition-colors"
                >
                  ←
                </button>
                <div className="text-center">
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
                  className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white hover:border-amber-500 transition-colors"
                >
                  →
                </button>
              </div>
              
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                <thead className="text-gray-300">
                  <tr>
                    <th className="text-left p-2">Datum</th>
                    <th className="text-left p-2">Zeit</th>
                    <th className="text-left p-2">Service</th>
                    <th className="text-left p-2">Kunde</th>
                    <th className="text-left p-2">Kontakt</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {filtered.map((a) => (
                    <tr key={a.id} className={`border-t border-gray-700 ${a.status === 'cancelled' ? 'opacity-60' : ''}`}>
                      <td className="p-2">{a.date}</td>
                      <td className="p-2">{a.time}</td>
                      <td className="p-2">{a.service?.name} ({a.service?.duration} Min)</td>
                      <td className="p-2">{a.name}</td>
                      <td className="p-2">{a.email}</td>
                      <td className="p-2">
                        {a.status === 'cancelled' ? (
                          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">Cancelled</span>
                        ) : (
                          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Active</span>
                        )}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          {a.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancel(a.id)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td className="p-4 text-gray-400" colSpan={7}>Keine Termine vorhanden.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-7 gap-2 text-center text-gray-300 text-xs mb-2">
                {['Mo','Di','Mi','Do','Fr','Sa','So'].map((d) => (
                  <div key={d} className="py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {leadingEmpty.map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-36 bg-gray-800/60 rounded-lg border border-gray-700"></div>
                ))}
                {days.map((day) => {
                  const appts = apptsForDay(day)
                  const dayNum = day.getDate()
                  return (
                    <div 
                      key={day.toLocaleDateString('sv-SE')} 
                      className={`h-40 bg-gray-800 rounded-lg border border-gray-700 p-2 cursor-pointer transition-all duration-200 ${
                        appts.length > 0 
                          ? 'hover:bg-gray-750 hover:border-amber-500 hover:shadow-lg' 
                          : 'hover:bg-gray-750'
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      <div className="text-xs text-gray-400 mb-1">{dayNum}</div>
                      <div className="space-y-1 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {appts.slice(0, 4).map((a) => (
                          <div 
                            key={a.id} 
                            className="text-[10px] bg-gray-700 border border-gray-600 rounded px-1 py-0.5 flex justify-between items-center"
                            title={`${a.time} - ${a.name} - ${a.service?.name || 'N/A'} - ${a.email}`}
                          >
                            <span className="text-amber-300 mr-1">{a.time}</span>
                            <span className="truncate text-[9px]">{a.name}</span>
                          </div>
                        ))}
                        {appts.length > 4 && (
                          <div className="text-[9px] text-amber-400 font-semibold text-center py-1">
                            +{appts.length - 4} weitere
                          </div>
                        )}
                        {appts.length === 0 && (
                          <div className="text-[11px] text-gray-500">–</div>
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
                <h2 className="text-2xl font-bold text-amber-400">
                  Termine am {selectedDay.toLocaleDateString('de-DE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <button
                  onClick={closeDayModal}
                  className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {selectedDayAppointments.map((appointment, index) => (
                  <div key={appointment.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-amber-400">{appointment.name}</h3>
                        <p className="text-gray-300 text-sm">{appointment.email}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'cancelled' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-green-600 text-white'
                        }`}>
                          {appointment.status === 'cancelled' ? 'Cancelled' : 'Active'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Zeit</p>
                        <p className="text-white font-medium">{appointment.time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Service</p>
                        <p className="text-white font-medium">{appointment.service?.name || 'N/A'}</p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-400 mb-1">Notizen</p>
                        <p className="text-gray-300 text-sm italic">&ldquo;{appointment.notes}&rdquo;</p>
                      </div>
                    )}

                    {appointment.status !== 'cancelled' && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            handleCancel(appointment.id)
                            closeDayModal()
                          }}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Termin absagen
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedDayAppointments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Keine Termine an diesem Tag</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

