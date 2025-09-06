import Link from 'next/link'
import Image from 'next/image'

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container-max text-center">
          <h1 className="heading-primary mb-4 fade-in">
            Kontakt
          </h1>
          <p className="text-body text-gray-400 max-w-3xl mx-auto fade-in-delay-1">
            Besuchen Sie uns in Potsdam oder kontaktieren Sie uns für einen Termin
          </p>
        </div>
      </section>


      {/* Contact Information */}
      <section className="section-padding bg-black">
        <div className="container-max fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center fade-in-delay-1">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                  <h3 className="text-lg font-bold text-white mb-3">Adresse</h3>
                  <p className="text-body">
                      Ryan Barbershop<br />
                      Dortustraße 22<br />
                      14467 Potsdam, Deutschland<br />
                    <a href="https://www.google.com/maps/place/RYAN+BARBER+SHOP/@52.3997,13.0531701,17z/data=!4m6!3m5!1s0x47a8f5f004e0127f:0xc66d6100a3723d16!8m2!3d52.3997!4d13.0531701!16s%2Fg%2F11py9sg6vv?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">
                      📍 Auf Google Maps anzeigen
                    </a>
                    </p>
                  </div>
                </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                  <h3 className="text-lg font-bold text-white mb-3">Telefon</h3>
                  <p className="text-body">
                    <a href="tel:+491797421768" className="text-amber-400 hover:text-amber-300 transition-colors">
                      +49 179 742 1768
                    </a><br />
                    <span className="text-gray-400">Für Termine und Anfragen</span>
                    </p>
                  </div>
                </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                  <h3 className="text-lg font-bold text-white mb-3">E-Mail</h3>
                  <p className="text-body">
                    <a href="mailto:info@ryanbarber.de" className="text-amber-400 hover:text-amber-300 transition-colors">
                      info@ryanbarber.de
                    </a><br />
                    <span className="text-gray-400">Allgemeine Anfragen</span>
                    </p>
                  </div>
                </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                  <h3 className="text-lg font-bold text-white mb-3">Öffnungszeiten</h3>
                                      <div className="text-body space-y-2">
                    <p><span className="text-amber-400 font-semibold">Montag - Freitag:</span> 09:00 - 19:00</p>
                    <p><span className="text-amber-400 font-semibold">Samstag:</span> 09:00 - 18:00</p>
                    <p><span className="text-amber-400 font-semibold">Sonntag:</span> Geschlossen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo/Visual */}
            <div className="relative">
              <div className="w-full h-96 rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20">
                <Image
                  src="/ryanbarber (3).webp"
                  alt="Ryan Barbershop Potsdam"
                  fill
                  className="object-cover rounded-3xl"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
                </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="heading-secondary mb-6 text-center fade-in">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6 fade-in-delay-1">
            {[
              {
                question: "Wie kann ich einen Termin buchen?",
                answer: "Sie können uns telefonisch, per E-Mail oder über unser Online-Buchungssystem kontaktieren."
              },
              {
                question: "Gibt es Parkmöglichkeiten?",
                answer: "Ja, es stehen ausreichend Parkplätze in der Nähe zur Verfügung."
              },
              {
                question: "Kann ich auch kurzfristig einen Termin bekommen?",
                answer: "Wir versuchen immer, kurzfristige Termine zu ermöglichen. Rufen Sie uns einfach an!"
              },
              {
                question: "Akzeptieren Sie Kartenzahlung?",
                answer: "Ja, wir akzeptieren alle gängigen Kredit- und EC-Karten sowie Bargeld."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-lg font-bold text-amber-400 mb-3">
                  {faq.question}
                </h3>
                <p className="text-body">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="heading-secondary mb-6 text-white">
            Bereit für Ihren Besuch?
          </h2>
          <p className="text-body text-white/90 mb-8">
            Kontaktieren Sie uns noch heute und vereinbaren Sie Ihren Termin
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/booking" className="btn-primary">
              Termin Buchen
            </Link>
            <Link href="/services" className="btn-secondary">
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
            <Link href="/contact" className="text-amber-400 text-sm md:text-base">Kontakt</Link>
            <Link href="/booking" className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Termin Buchen</Link>
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
