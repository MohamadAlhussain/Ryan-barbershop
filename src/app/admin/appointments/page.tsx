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
  const [showAddModal, setShowAddModal] = useState(false)

  const [search, setSearch] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Add appointment form state
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  })
  const [isAdding, setIsAdding] = useState(false)

  // Available services
  const services = [
    { id: 1, name: 'Haircut', price: '25€', duration: 30 },
    { id: 2, name: 'Beard Trim', price: '15€', duration: 20 },
    { id: 3, name: 'Haircut + Beard', price: '35€', duration: 45 },
    { id: 4, name: 'Hair Wash', price: '10€', duration: 15 },
    { id: 5, name: 'Styling', price: '20€', duration: 25 }
  ]

  // Available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

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

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isAdding) return

    setIsAdding(true)
    try {
      const selectedService = services.find(s => s.id.toString() === newAppointment.service)
      if (!selectedService) {
        alert('Please select a service')
        return
      }

      const appointmentData = {
        name: newAppointment.name,
        email: newAppointment.email,
        service: selectedService,
        date: newAppointment.date,
        time: newAppointment.time,
        notes: newAppointment.notes
      }

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      })

      if (res.ok) {
        const result = await res.json()
        setAppointments(prev => [result.appointment, ...prev])
        setShowAddModal(false)
        setNewAppointment({
          name: '',
          email: '',
          service: '',
          date: '',
          time: '',
          notes: ''
        })
        alert('Appointment added successfully!')
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to add appointment')
      }
    } catch (error) {
      console.error('Error adding appointment:', error)
      alert('Failed to add appointment')
    } finally {
      setIsAdding(false)
    }
  }

  const resetForm = () => {
    setNewAppointment({
      name: '',
      email: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    })
    setShowAddModal(false)
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
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-lg bg-green-600 border border-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-colors"
              >
                + Neuer Termin
              </button>
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
                    <div key={day.toLocaleDateString('sv-SE')} className="h-40 bg-gray-800 rounded-lg border border-gray-700 p-2 group relative">
                      <div className="text-xs text-gray-400 mb-1">{dayNum}</div>
                      <div className="space-y-1 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {appts.slice(0, 4).map((a) => (
                          <div 
                            key={a.id} 
                            className="text-[10px] bg-gray-700 border border-gray-600 rounded px-1 py-0.5 flex justify-between items-center cursor-pointer hover:bg-gray-600 transition-colors"
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
                      
                      {/* Popup positioned outside the cell - shows on hover over the entire cell */}
                      {appts.length > 0 && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-max max-w-xs">
                          <div className="text-xs text-white space-y-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {appts.map((a, index) => (
                              <div key={a.id} className={index > 0 ? "border-t border-gray-600 pt-1 mt-1" : ""}>
                                <div className="font-semibold text-amber-400">{a.name}</div>
                                <div className="text-gray-300">{a.time} - {a.service?.name || 'N/A'}</div>
                                <div className="text-gray-400 text-[10px]">{a.email}</div>
                                <div className={`text-xs font-medium ${a.status === 'cancelled' ? 'text-red-400' : 'text-green-400'}`}>
                                  Status: {a.status === 'cancelled' ? 'Cancelled' : 'Active'}
                                </div>
                                {a.notes && (
                                  <div className="text-gray-400 italic text-[10px]">&ldquo;{a.notes}&rdquo;</div>
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

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400">Neuer Termin</h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAppointment.name}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
                    placeholder="Kundenname"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
                    placeholder="kunde@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service *
                  </label>
                  <select
                    required
                    value={newAppointment.service}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Service wählen</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id.toString()}>
                        {service.name} - {service.price} ({service.duration} Min)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Datum *
                    </label>
                    <input
                      type="date"
                      required
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Zeit *
                    </label>
                    <select
                      required
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">Zeit wählen</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notizen
                  </label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
                    placeholder="Zusätzliche Informationen..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-600 border border-gray-600 text-white hover:bg-gray-700 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={isAdding}
                    className="flex-1 px-4 py-2 rounded-lg bg-amber-500 border border-amber-500 text-black hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isAdding ? 'Wird hinzugefügt...' : 'Termin hinzufügen'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

