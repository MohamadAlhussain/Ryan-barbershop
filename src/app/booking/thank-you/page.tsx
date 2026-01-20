"use client"

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Footer from '../../components/Footer'

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 pt-32">
        <div className="max-w-2xl w-full">
          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="heading-primary mb-4">
              Vielen Dank!
            </h1>
            <p className="text-body-large">Ihr Termin wurde erfolgreich gebucht</p>
          </div>

          {/* Appointment Details Card */}
          <div className="card mb-8">
            <h2 className="heading-secondary mb-6 text-center text-amber-400">Terminübersicht</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
                <span className="text-small">Name:</span>
                <span className="text-body font-semibold">{name}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
                <span className="text-small">Service:</span>
                <span className="text-body font-semibold">{service}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
                <span className="text-small">Datum:</span>
                <span className="text-body font-semibold">{date}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
                <span className="text-small">Uhrzeit:</span>
                <span className="text-body font-semibold">{time}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-amber-400/20">
                <span className="text-small">Dauer:</span>
                <span className="text-body font-semibold">{duration} Minuten</span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-small">Preis:</span>
                <span className="text-amber-400 font-bold text-lg">{price}</span>
              </div>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="card mb-8">
            <h3 className="text-lg font-bold text-blue-400 mb-4 text-center">Bestätigungs-E-Mail</h3>
            <p className="text-body text-center">
              Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details zu Ihrem Termin.
              Bitte überprüfen Sie auch Ihren Spam-Ordner.
            </p>
          </div>

          {/* Contact Information */}
          <div className="card mb-8">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Wir sind für Sie da!</h3>
            <p className="text-body text-center mb-4">
              Bei Fragen oder Terminänderungen kontaktieren Sie uns gerne.
              Wir sind jederzeit für Sie erreichbar und helfen Ihnen gerne weiter.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">
              Zur Startseite
            </Link>
            <Link href="/contact" className="btn-secondary">
              Kontakt
            </Link>
          </div>

          {/* Thank you note */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Vielen Dank für Ihr Vertrauen in Royal Barbershop
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
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
