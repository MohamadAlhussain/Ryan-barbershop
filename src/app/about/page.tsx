import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container-max text-center">
          <h1 className="heading-primary mb-4 fade-in">
            Über Uns
          </h1>
          <p className="text-body text-gray-400 max-w-3xl mx-auto fade-in-delay-1">
            Seit über 20 Jahren sind wir Ihr vertrauensvoller Partner für professionelle Herrenfrisuren in Potsdam
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto fade-in">
          <div className="grid md:grid-cols-2 gap-16 items-center fade-in-delay-1">
            <div>
              <h2 className="heading-tertiary mb-4 text-amber-400">
                Unsere Geschichte
              </h2>
              <div className="space-y-6 text-body">
                <p>
                  Was als kleiner Traum begann, ist heute zu einem der beliebtesten Barbershops in Potsdam geworden.
                  Seit über 20 Jahren bieten wir professionelle Herrenfrisuren und Bartpflege mit Leidenschaft und Hingabe.
                </p>
                <p>
                  Unser Team besteht aus erfahrenen Friseuren, die nicht nur ihr Handwerk beherrschen, sondern auch
                  die neuesten Trends und Techniken kennen. Wir sind stolz darauf, unseren Kunden den perfekten Look
                  zu verleihen.
                </p>
                <p>
                  Bei Royal Barbershop geht es nicht nur um Haare schneiden - es geht um eine Erfahrung.
                  Wir schaffen eine entspannte Atmosphäre, in der sich unsere Kunden wohlfühlen und verwöhnt werden.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20">
                <Image
                  src="/ryanbarber (1).webp"
                  alt="Ryan Barbershop - 20 Jahre Erfahrung"
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

      {/* Values Section */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto fade-in">
          <div className="text-center mb-8 fade-in">
            <h2 className="heading-secondary mb-4">
              Unsere Werte
            </h2>
            <p className="text-body text-gray-400 max-w-3xl mx-auto">
              Was uns antreibt und was Sie bei uns erwarten können
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 fade-in-delay-1">
            {[
              {
                title: "Qualität",
                description: "Wir setzen auf höchste Qualität in allem, was wir tun. Von der Beratung bis zum finalen Haarschnitt - Perfektion ist unser Standard."
              },
              {
                title: "Vertrauen",
                description: "Vertrauen ist die Basis unserer Kundenbeziehungen. Wir schaffen eine entspannte Atmosphäre, in der Sie sich wohlfühlen."
              },
              {
                title: "Innovation",
                description: "Wir bleiben immer auf dem neuesten Stand der Trends und Techniken, um Ihnen den besten Service zu bieten."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-8 bg-black/50 rounded-3xl border border-gray-700 hover:border-amber-500 transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-amber-400">{value.title}</h3>
                <p className="text-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto fade-in">
          <div className="text-center mb-8 fade-in">
            <h2 className="heading-secondary mb-4">
              Unser Team
            </h2>
            <p className="text-body text-gray-400 max-w-3xl mx-auto">
              Erfahrene Profis, die Ihr Vertrauen verdienen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center fade-in-delay-1">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Erfahrene Friseure</h3>
                  <p className="text-body">
                    Unser Team besteht aus erfahrenen Friseuren mit jahrzehntelanger Erfahrung.
                    Wir kennen die neuesten Trends und Techniken.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Regelmäßige Weiterbildung</h3>
                  <p className="text-body">
                    Wir investieren kontinuierlich in unsere Weiterbildung, um Ihnen den besten Service
                    und die neuesten Techniken zu bieten.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">

                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Leidenschaft für das Handwerk</h3>
                  <p className="text-body">
                    Wir lieben, was wir tun. Diese Leidenschaft spüren Sie in jedem Haarschnitt und
                    in jeder Beratung.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20">
                <Image
                  src="/ryanbarber (2).webp"
                  alt="Ryan Barbershop Team"
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="heading-secondary mb-6 text-white">
            Lernen Sie uns kennen
          </h2>
          <p className="text-body text-white/90 mb-8">
            Besuchen Sie uns in Potsdam und erleben Sie den Royal Barbershop Unterschied
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/booking" className="btn-primary">
              Termin Buchen
            </Link>
            <Link href="/contact" className="btn-secondary">
              Kontakt
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer showAdminLink />
    </main>
  )
}
