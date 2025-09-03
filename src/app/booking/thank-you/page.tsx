"use client"

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ThankYouContent() {
  const searchParams = useSearchParams()
  
  // Get appointment details from URL params
  const name = searchParams.get('name') || ''
  const service = searchParams.get('service') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''
  const duration = searchParams.get('duration') || ''
  const price = searchParams.get('price') || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Vielen Dank!
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">Ihr Termin wurde erfolgreich gebucht</p>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-400 mb-6 text-center">Terminübersicht</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
              <span className="text-gray-300 font-medium">Name:</span>
              <span className="text-white font-semibold">{name}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
              <span className="text-gray-300 font-medium">Service:</span>
              <span className="text-white font-semibold">{service}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
              <span className="text-gray-300 font-medium">Datum:</span>
              <span className="text-white font-semibold">{date}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
              <span className="text-gray-300 font-medium">Uhrzeit:</span>
              <span className="text-white font-semibold">{time}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
              <span className="text-gray-300 font-medium">Dauer:</span>
              <span className="text-white font-semibold">{duration} Minuten</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-300 font-medium">Preis:</span>
              <span className="text-amber-400 font-bold text-lg">{price}</span>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-400 mb-4 text-center">Bestätigungs-E-Mail</h3>
          <p className="text-gray-300 text-center leading-relaxed">
            Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details zu Ihrem Termin. 
            Bitte überprüfen Sie auch Ihren Spam-Ordner.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 border border-gray-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Wir sind für Sie da!</h3>
          <p className="text-gray-300 text-center leading-relaxed mb-4">
            Bei Fragen oder Terminänderungen kontaktieren Sie uns gerne. 
            Wir sind jederzeit für Sie erreichbar und helfen Ihnen gerne weiter.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
          >
            Zur Startseite
          </Link>
          
          <Link 
            href="/contact"
            className="flex-1 sm:flex-none bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
          >
            Kontakt
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Vielen Dank für Ihr Vertrauen in Ryan Barbershop
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Lade...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
