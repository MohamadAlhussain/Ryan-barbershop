import Link from 'next/link'

export default function Services() {
  const services = [
    { name: "Herren Haarschnitt", price: "€15", duration: "30 Min", description: "Professioneller Herrenschnitt mit modernen Techniken" },
    { name: "Herren Haar Schnitt mit Waschen", price: "€20", duration: "30 Min", description: "Haarschnitt inklusive professioneller Haarwäsche" },
    { name: "Kinder Haarschnitt", price: "€15", duration: "30 Min", description: "Spaßiger und professioneller Schnitt für Kinder" },
    { name: "Kinder Harrschnitt mit Waschen", price: "€18", duration: "30 Min", description: "Kinderhaarschnitt inklusive Haarwäsche" },
    { name: "Bart Styling", price: "€12", duration: "30 Min", description: "Professionelle Bartformung und -styling" },
    { name: "Gesichtsreinigung", price: "€15", duration: "30 Min", description: "Professionelle Gesichtsreinigung und -pflege" }
  ]

  const specialOffers = [
    {
      title: "Studentenrabatt",
      discount: "15%",
      description: "Gültig mit gültigem Studentenausweis"
    },
    {
      title: "Treuebonus",
      discount: "10%",
      description: "Nach dem 5. Besuch"
    },
    {
      title: "Frühbucher",
      discount: "€5",
      description: "Termine vor 12:00 Uhr"
    }
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-none">
            Unsere Services
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
            Professionelle Dienstleistungen mit 20 Jahren Erfahrung - von klassischen Schnitten bis zu modernen Trends
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border-2 border-gray-700 hover:border-amber-400/40 transition-all duration-300 transform hover:scale-105 group shadow-xl shadow-amber-500/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-400">{service.price}</div>
                    <div className="text-sm text-gray-400">{service.duration}</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Dauer: {service.duration}</span>
                  <button className="px-4 py-2 bg-amber-500 text-black rounded-3xl text-sm font-medium hover:bg-amber-600 transition-colors">
                    Buchen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Spezialangebote & Rabatte
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-8 rounded-2xl border-2 border-amber-400/40 text-center group hover:border-amber-400 transition-all duration-300 shadow-2xl shadow-amber-500/20"
              >
                <div className="text-4xl font-bold text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  {offer.discount}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{offer.title}</h3>
                <p className="text-gray-300">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-12 text-center text-white">
            Warum Ryan Barbershop?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "20 Jahre Erfahrung", desc: "Professionelle Expertise seit Generationen" },
              { title: "Freundliches Team", desc: "Persönliche Betreuung und Beratung" },
              { title: "Kostenlose Getränke", desc: "Genießen Sie ein Getränk Ihrer Wahl" },
              { title: "Flexible Zeiten", desc: "Mo-Fr 9:00-19:00, Sa 9:00-18:00" }
            ].map((feature, index) => (
              <div key={index} className="text-center">

                <h3 className="text-xl font-bold text-amber-400 mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 text-white">
            Bereit für Ihren neuen Look?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8">
            Buchen Sie Ihren Termin noch heute und erleben Sie den Ryan Barbershop Unterschied
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="px-8 py-4 bg-white text-amber-600 font-bold rounded-3xl text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Jetzt Termin Buchen
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-3xl text-lg hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105"
            >
              Über Uns
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
            <Link href="/services" className="text-amber-400 text-sm md:text-base">Services</Link>
            <Link href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Kontakt</Link>
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
