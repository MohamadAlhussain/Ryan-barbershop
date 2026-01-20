import type { Metadata, Viewport } from 'next'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://ryan-barbershop.vercel.app'),
  title: 'LEXERNO – Webdesign & Webentwicklung für Royal Barbershop',
  description:
    'LEXERNO ist die Agentur hinter der Royal-Barbershop-Website. Handcodierte Next.js-Webentwicklung, flexible Website-Miete ohne Vorauszahlung und Komplett-Betreuung.',
  openGraph: {
    title: 'LEXERNO – Webdesign & Webentwicklung',
    description:
      'Agentur aus Potsdam/Berlin für handcodierte Next.js-Websites inkl. Terminbuchung, SEO und Hosting. Projektbeispiel: Royal Barbershop.',
    url: 'https://royal-barbershop.vercel.app/lexerno',
    siteName: 'Royal Barbershop',
    locale: 'de_DE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ryan-barbershop.vercel.app/lexerno',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

const coreServices = [
  {
    title: 'Website mieten ohne Vorauszahlung',
    description: 'Flexible Monatsmodelle ohne hohe Einstiegskosten. Ideal für kleine Unternehmen, Start-ups und lokale Dienstleister.',
  },
  {
    title: 'Handcodierte Next.js-Websites',
    description: 'Blitzschnelle Performance, maßgeschneiderte Designs ohne Templates, optimiert für SEO und Conversion.',
  },
  {
    title: 'Komplett-Betreuung',
    description: 'Domain, Hosting, SSL, Wartung, Backups, Monitoring und laufende Optimierung inklusive.',
  },
]

const highlights = [
  {
    title: 'Warum LEXERNO?',
    body: `LEXERNO ist eine Webdesign- und Webentwicklungsagentur aus Potsdam/Berlin. Wir verzichten bewusst auf
    vorgefertigte Templates oder schwerfällige CMS-Lösungen. Jede Website wird individuell mit Next.js, Tailwind CSS
    und modernsten Entwicklungs-Workflows erstellt.`,
  },
  {
    title: 'Fokus auf Performance & UX',
    body: `Unsere Websites sind für Geschwindigkeit, Barrierefreiheit und mobile Nutzung optimiert. Lighthouse-Scores
    über 95 sind Standard. Wir entwickeln responsive, DSGVO-konforme Webauftritte mit besonderem Augenmerk auf Nutzerführung.`,
  },
  {
    title: 'SEO & Online-Marketing',
    body: `Technisches SEO ist von Anfang an integriert: strukturierte Daten, semantische HTML-Strukturen, PageSpeed-Optimierung
    und saubere Informationsarchitekturen. Auf Wunsch entwickeln wir Content-Pläne, Backlink-Strategien und Conversion Funnels.`,
  },
]

export default function LexernoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container-max text-center">
          <h1 className="heading-primary mb-4 fade-in">LEXERNO – Webdesign & Webentwicklung</h1>
          <p className="text-body text-gray-300 max-w-3xl mx-auto fade-in-delay-1">
            Wir sind die Agentur hinter der Royal-Barbershop-Website. Handcodierte Next.js-Projekte, entwickelt in Potsdam
            und Berlin – ohne Templates, ohne Kompromisse.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 bg-black">
        <div className="container-max fade-in">
          <div className="grid md:grid-cols-2 gap-16 items-start fade-in-delay-1">
            <div className="space-y-6">
              <h2 className="heading-secondary mb-4 text-amber-400">Unser Ansatz</h2>
              <p className="text-body">
                LEXERNO entwickelt individuelle Webauftritte mit modernster Frontend-Technologie. Unser Fokus liegt auf
                schlanken Architekturen, hoher Performance und einer klaren „Conversion-first“-Strategie. Von der ersten
                Idee bis zum Go-Live bleiben Design, Entwicklung und SEO in einer Hand.
              </p>
              <p className="text-body">
                Für Royal Barbershop haben wir eine komplett neue Online-Präsenz geschaffen: Video-Hero, interaktive Buchungsstrecke,
                Admin-Dashboard für Termine, E-Mail-Automatisierung, DSGVO-konforme Datenhaltung und optimierte Inhalte auf Deutsch.
              </p>
            </div>
            <div className="card card-hover border border-amber-400/30 bg-black/50">
              <h3 className="text-lg font-bold text-white mb-4">Leistungen</h3>
              <ul className="space-y-4 text-body">
                {coreServices.map((service) => (
                  <li key={service.title}>
                    <h4 className="text-amber-400 font-semibold mb-1">{service.title}</h4>
                    <p>{service.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-900">
        <div className="container-max fade-in">
          <h2 className="heading-secondary mb-12 text-center text-white fade-in">Was LEXERNO besonders macht</h2>
          <div className="grid md:grid-cols-3 gap-8 fade-in-delay-1">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-black/60 rounded-3xl border border-gray-700 p-8 hover:border-amber-400/60 transition-all card-hover"
              >
                <h3 className="text-lg font-bold text-amber-400 mb-3">{item.title}</h3>
                <p className="text-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-black">
        <div className="container-max fade-in">
          <div className="grid md:grid-cols-2 gap-16 items-start fade-in-delay-1">
            <div className="card bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30">
              <h2 className="text-xl font-bold text-white mb-4">Projekt: Royal Barbershop</h2>
              <ul className="space-y-3 text-body">
                <li>✅ Next.js 16, App Router, TypeScript</li>
                <li>✅ Interaktive Terminbuchung mit Upstash Redis & Nodemailer</li>
                <li>✅ Mehrsprachige Inhalte vorbereitbar</li>
                <li>✅ Strukturierte Daten & technisches SEO integriert</li>
                <li>✅ Barrierearme Gestaltung & mobiles Design</li>
                <li>✅ Admin-Bereich zum Verwalten von Terminen</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">LEXERNO für Ihre Branche</h3>
              <p className="text-body">
                Wir unterstützen Barbershops, Praxen, Handwerksbetriebe und Dienstleister beim Aufbau einer hochwertigen
                Webpräsenz. Mit „Website mieten“ bieten wir einen risikoarmen Einstieg inkl. Wartung, Security und monatlichen Updates.
              </p>
              <div className="space-y-3">
                <a
                  href="https://lexerno.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Mehr über LEXERNO
                </a>
                <a
                  href="https://lexerno.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block"
                >
                  Projekt anfragen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="heading-secondary mb-6 text-white">Bereit für Ihr Next.js-Projekt?</h2>
          <p className="text-body text-white/90 mb-8">
            LEXERNO entwickelt handcodierte Next.js-Websites, die performen, konvertieren und wachsen. Sprechen wir über Ihr Vorhaben.
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <a
              href="https://lexerno.com/services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Leistungen entdecken
            </a>
            <a
              href="https://lexerno.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Projekt starten
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

