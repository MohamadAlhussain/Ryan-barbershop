"use client"

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function CancelContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('not-found')
      setMessage('Invalid cancellation link')
      return
    }

    const cancelAppointment = async () => {
      try {
        // Try to cancel using a simple GET request first
        let success = false
        
        try {
          // Use a simple GET request to avoid CORS issues
          const response = await fetch(`/api/cancel?id=${token}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Accept': 'application/json',
            }
          })
          
          console.log('Response status:', response.status)
          console.log('Response ok:', response.ok)
          
          if (response.ok) {
            const result = await response.json()
            console.log('Cancel result:', result)
            success = true
          } else {
            console.log('Response not ok:', response.status, response.statusText)
          }
        } catch (e) {
          console.error('Cancel request failed:', e)
        }

        if (success) {
          setStatus('success')
          setMessage('Your appointment has been cancelled successfully.')
        } else {
          setStatus('error')
          setMessage('Failed to cancel appointment. Please contact us directly at the phone number provided.')
        }
      } catch (error) {
        console.error('Cancel error:', error)
        setStatus('error')
        setMessage('An error occurred while cancelling your appointment. Please contact us directly.')
      }
    }

    cancelAppointment()
  }, [token])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Termin absagen
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-16 px-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 text-center">
            
            {status === 'loading' && (
              <div>
                <div className="w-16 h-16 mx-auto mb-6 border-4 border-amber-500 border-t-transparent rounded-3xl animate-spin"></div>
                <h2 className="text-xl font-semibold text-white mb-4">Termin wird abgesagt...</h2>
                <p className="text-gray-300">Bitte warten Sie einen Moment.</p>
              </div>
            )}

            {status === 'success' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                  Termin abgesagt!
                </h2>
                <p className="text-gray-300 mb-6">Ihr Termin wurde erfolgreich abgesagt. Sie erhalten eine Bestätigungs-E-Mail.</p>
                
                {/* Email Confirmation Notice */}
                <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Bestätigungs-E-Mail</h3>
                  <p className="text-gray-300 text-sm">
                    Sie erhalten in Kürze eine Bestätigungs-E-Mail über die Absage.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/booking" 
                    className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    Neuen Termin buchen
                  </Link>
                  <Link 
                    href="/" 
                    className="flex-1 sm:flex-none bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    Zur Startseite
                  </Link>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  Absage fehlgeschlagen
                </h2>
                <p className="text-gray-300 mb-6">Der Termin konnte nicht abgesagt werden. Möglicherweise wurde er bereits abgesagt oder existiert nicht mehr.</p>
                
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 border border-gray-500/30 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Kontaktieren Sie uns</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Falls Sie Ihren Termin absagen möchten, kontaktieren Sie uns bitte direkt.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-amber-400 font-semibold">📞 Telefon: +49 123 456 789</p>
                    <p className="text-amber-400 font-semibold">📧 E-Mail: info@ryanbarber.de</p>
                    <p className="text-gray-300">Mo-Fr: 9:00-18:00, Sa: 9:00-16:00</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact" 
                    className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    Kontakt
                  </Link>
                  <Link 
                    href="/" 
                    className="flex-1 sm:flex-none bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    Zur Startseite
                  </Link>
                </div>
              </div>
            )}

            {status === 'not-found' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
                  Ungültiger Link
                </h2>
                <p className="text-gray-300 mb-6">Dieser Absage-Link ist ungültig oder abgelaufen.</p>
                
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 border border-gray-500/30 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Was können Sie tun?</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Sie können einen neuen Termin buchen oder uns direkt kontaktieren.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-amber-400 font-semibold">📞 Telefon: +49 123 456 789</p>
                    <p className="text-amber-400 font-semibold">📧 E-Mail: info@ryanbarber.de</p>
                    <p className="text-gray-300">Mo-Fr: 9:00-18:00, Sa: 9:00-16:00</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/booking" 
                    className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    Neuen Termin buchen
                  </Link>
                  <Link 
                    href="/" 
                    className="flex-1 sm:flex-none bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    Zur Startseite
                  </Link>
                </div>
              </div>
            )}
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
        </div>
      </footer>
    </main>
  )
}

export default function CancelAppointment() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 border-4 border-amber-500 border-t-transparent rounded-3xl animate-spin"></div>
          <p className="text-white">Loading...</p>
        </div>
      </main>
    }>
      <CancelContent />
    </Suspense>
  )
}
