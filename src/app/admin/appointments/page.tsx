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
    const selectedDateStr = selectedDate.toISOString().slice(0, 10)
    
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
    const dStr = day.toISOString().slice(0, 10)
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
                  ← Previous Day
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
                  Next Day →
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
                    <div key={day.toISOString()} className="h-36 bg-gray-800 rounded-lg border border-gray-700 p-2 group relative">
                      <div className="text-xs text-gray-400 mb-1">{dayNum}</div>
                      <div className="space-y-1 max-h-32 overflow-hidden">
                        {appts.map((a) => (
                          <div 
                            key={a.id} 
                            className="text-[11px] bg-gray-700 border border-gray-600 rounded px-1 py-0.5 flex justify-between items-center cursor-pointer hover:bg-gray-600 transition-colors"
                            title={`${a.time} - ${a.name} - ${a.service?.name || 'N/A'} - ${a.email}`}
                          >
                            <span className="text-amber-300 mr-2">{a.time}</span>
                            <span className="truncate">{a.name}</span>
                          </div>
                        ))}
                        {appts.length === 0 && (
                          <div className="text-[11px] text-gray-500">–</div>
                        )}
                      </div>
                      
                      {/* Popup positioned outside the cell - shows on hover over the entire cell */}
                      {appts.length > 0 && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-max">
                          <div className="text-xs text-white space-y-1">
                            {appts.map((a, index) => (
                              <div key={a.id} className={index > 0 ? "border-t border-gray-600 pt-1 mt-1" : ""}>
                                <div className="font-semibold text-amber-400">{a.name}</div>
                                <div className="text-gray-300">{a.time} - {a.service?.name || 'N/A'}</div>
                                <div className="text-gray-400">{a.email}</div>
                                {a.notes && (
                                  <div className="text-gray-400 italic">&ldquo;{a.notes}&rdquo;</div>
                                )}
                              </div>
                            ))}
                          </div>
                          {/* Arrow pointing down */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"></div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

