import Link from 'next/link'
import Image from 'next/image'

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-none">
            Kontakt
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
            Besuchen Sie uns in Potsdam oder kontaktieren Sie uns für einen Termin
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3">Adresse</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      Ryan Barbershop<br />
                      Potsdam, Deutschland<br />
                    <span className="text-amber-400">Zentrale Lage in Potsdam</span>
                    </p>
                  </div>
                </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3">Telefon</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                    <a href="tel:+49331XXXXXXX" className="text-amber-400 hover:text-amber-300 transition-colors">
                      +49 (0) 331 - XXXXXXX
                    </a><br />
                    <span className="text-gray-400">Für Termine und Anfragen</span>
                    </p>
                  </div>
                </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3">E-Mail</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
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
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3">Öffnungszeiten</h3>
                                      <div className="text-sm sm:text-base md:text-lg text-gray-300 space-y-2">
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

      {/* Social Media Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 text-white">
            Folgen Sie uns
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Bleiben Sie auf dem Laufenden über unsere neuesten Angebote und Trends
          </p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300">

            </a>
            <a href="#" className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300">

            </a>
            <a href="#" className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300">

            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-12 text-center text-white">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6">
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-amber-400 mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 text-white">
            Bereit für Ihren Besuch?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8">
            Kontaktieren Sie uns noch heute und vereinbaren Sie Ihren Termin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="px-8 py-4 bg-white text-amber-600 font-bold rounded-3xl text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Termin Buchen
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-3xl text-sm sm:text-base md:text-lg hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105"
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
