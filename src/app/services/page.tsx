import Link from 'next/link'
import Footer from '../components/Footer'

export default function Services() {
  const services = [
    { name: "Herrenhaarschnitt", price: "€15", duration: "30 Min", description: "Professioneller Herrenhaarschnitt mit modernen Techniken" },
    { name: "Herrenhaarschnitt mit Waschen", price: "€20", duration: "30 Min", description: "Herrenhaarschnitt inklusive professioneller Haarwäsche" },
    { name: "Kinderhaarschnitt", price: "€15", duration: "30 Min", description: "Spaßiger und professioneller Haarschnitt für Kinder" },
    { name: "Kinderhaarschnitt mit Waschen", price: "€18", duration: "30 Min", description: "Kinderhaarschnitt inklusive Haarwäsche" },
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
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container-max text-center">
          <h1 className="heading-primary mb-4 fade-in">
            Unsere Services
          </h1>
          <p className="text-body text-gray-400 max-w-3xl mx-auto fade-in-delay-1">
            Professionelle Dienstleistungen mit 20 Jahren Erfahrung - von klassischen Haarschnitten bis zu modernen Trends
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-black">
        <div className="container-max fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-delay-1">
            {services.map((service, index) => (
              <div
                key={index}
                className="card card-hover group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white link-hover">
                    {service.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-xl font-bold text-amber-400">{service.price}</div>
                    <div className="text-small">{service.duration}</div>
                  </div>
                </div>
                <p className="text-body mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-small">Dauer: {service.duration}</span>
                  <Link
                    href="/booking"
                    className="btn-small inline-flex items-center justify-center"
                  >
                    Buchen
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section-padding bg-gray-900">
        <div className="container-max fade-in">
          <h2 className="heading-secondary mb-12 text-center fade-in">
            Spezialangebote & Rabatte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-delay-1">
            {specialOffers.map((offer, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-8 rounded-2xl border-2 border-amber-400/40 text-center group card-hover shadow-2xl shadow-amber-500/20"
              >
                <div className="text-4xl font-bold text-amber-400 mb-4 interactive-hover">
                  {offer.discount}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{offer.title}</h3>
                <p className="text-body">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-black">
        <div className="container-max fade-in">
          <h2 className="heading-secondary mb-12 text-center fade-in">
            Warum Ryan Barbershop?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in-delay-1">
            {[
              { title: "20 Jahre Erfahrung", desc: "Professionelle Expertise seit Generationen" },
              { title: "Freundliches Team", desc: "Persönliche Betreuung und Beratung" },
              { title: "Kostenlose Getränke", desc: "Genießen Sie ein Getränk Ihrer Wahl" },
              { title: "Flexible Zeiten", desc: "Mo-Fr 9:00-19:00, Sa 9:00-18:00" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-bold text-amber-400 mb-3">{feature.title}</h3>
                <p className="text-small">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="heading-secondary mb-6 text-white">
            Bereit für Ihren neuen Look?
          </h2>
          <p className="text-body text-white/90 mb-8">
            Buchen Sie Ihren Termin noch heute und erleben Sie den Ryan Barbershop Unterschied
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/booking" className="btn-primary">
              Jetzt Termin Buchen
            </Link>
            <Link href="/about" className="btn-secondary">
              Über Uns
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
