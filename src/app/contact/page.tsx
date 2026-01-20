import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'

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
                    Royal Barbershop<br />
                    Musterstraße 123<br />
                    14467 Potsdam, Deutschland<br />
                    <a href="https://www.google.com/maps/search/Barbershop+Potsdam" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">
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
                    <a href="tel:+493311234567" className="text-amber-400 hover:text-amber-300 transition-colors">
                      +49 331 1234567
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
                    <a href="mailto:info@royal-barbershop.de" className="text-amber-400 hover:text-amber-300 transition-colors">
                      info@royal-barbershop.de
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
                  alt="Royal Barbershop Potsdam"
                  fill
                  className="object-cover rounded-3xl"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
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

      <Footer />
    </main>
  )
}
