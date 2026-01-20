import Link from 'next/link'
import Footer from '../components/Footer'

export default function Impressum() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container-max text-center">
          <h1 className="heading-primary mb-4 fade-in">
            Impressum
          </h1>
          <p className="text-body text-gray-400 max-w-3xl mx-auto fade-in-delay-1">
            Angaben gemäß § 5 TMG
          </p>
          <div className="max-w-3xl mx-auto mt-6">
            <div className="bg-amber-500/10 border border-amber-400/40 text-amber-100 px-6 py-4 rounded-2xl text-sm leading-relaxed">
              <strong className="block text-amber-300 mb-1">Hinweis:</strong>
              Diese Website befindet sich im Aufbau und dient aktuell nur zu Marketing- und Demonstrationszwecken.<br className="hidden md:block" />
              Die endgültige Inbetriebnahme erfolgt erst nach Abstimmung mit dem Betreiber.
            </div>
          </div>
        </div>
      </section>

      {/* Impressum Content */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto fade-in">
          <div className="space-y-12">

            {/* Company Information */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-4 text-body">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Unternehmen:</h3>
                  <p>Royal Barbershop<br />Inhaber: Royal Barbershop Team</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Adresse:</h3>
                  <p>Musterstraße 123<br />14467 Potsdam</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Kontakt
              </h2>
              <div className="space-y-4 text-body">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Telefon:</h3>
                  <p>0049-331-1234567</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">E-Mail:</h3>
                  <p>info@royal-barbershop.de</p>
                </div>
              </div>
            </div>

            {/* Responsible for Content */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
              </h2>
              <div className="text-body">
                <p>Royal Barbershop Team<br />Musterstraße 123<br />14467 Potsdam</p>
              </div>
            </div>

            {/* Berufsrechtliche Angaben */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Berufsrechtliche Angaben
              </h2>
              <div className="space-y-4 text-body">
                <p>Royal Barbershop ist ein Handwerksbetrieb nach der Handwerksordnung (HwO). Zuständige Kammer:</p>
                <p>
                  Handwerkskammer Potsdam<br />
                  Charlottenstraße 34-36<br />
                  14467 Potsdam<br />
                  <a href="https://www.hwk-potsdam.de" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">
                    https://www.hwk-potsdam.de
                  </a>
                </p>
                <p>Es gelten die Bestimmungen der Handwerksordnung (HwO) sowie einschlägige Preis- und Wettbewerbsregeln.</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Haftungsausschluss
              </h2>
              <div className="space-y-6 text-body">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Haftung für Inhalte</h3>
                  <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.</p>
                  <p>Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen entfernen wir diese Inhalte umgehend.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Haftung für Links</h3>
                  <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Urheberrecht</h3>
                  <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
                  <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.</p>
                </div>
              </div>
            </div>

            {/* Online-Streitbeilegung */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Online-Streitbeilegung / Verbraucherschlichtung
              </h2>
              <div className="space-y-4 text-body">
                <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.</p>
                <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
              </div>
            </div>

            {/* Datenschutzhinweis */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Hinweise zum Datenschutz
              </h2>
              <div className="space-y-6 text-body">
                <p>Details zur Verarbeitung personenbezogener Daten (z.&nbsp;B. bei Terminbuchungen, E-Mail-Verkehr oder Nutzung unseres Kontaktformulars) entnehmen Sie bitte unserer <Link href="/datenschutz" className="text-amber-400 hover:text-amber-300">Datenschutzerklärung</Link>.</p>
              </div>
            </div>

            {/* Last Update */}
            <div className="card bg-gray-900/50 border-gray-700">
              <div className="text-center">
                <p className="text-small text-gray-400">Stand: November 2025</p>
                <p className="text-xs text-gray-500 mt-2">Alle Angaben ohne Gewähr. Änderungen vorbehalten.</p>
                <p className="text-xs text-gray-500 mt-1">Hinweis: Diese Website befindet sich im Aufbau und dient derzeit ausschließlich Marketing- und Demonstrationszwecken.</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                Öffnungszeiten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Wochentags</h3>
                  <p className="text-xl font-bold text-amber-400">09:00 - 19:00</p>
                  <p className="text-small mt-2">Montag - Freitag</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Samstag</h3>
                  <p className="text-xl font-bold text-orange-400">09:00 - 18:00</p>
                  <p className="text-small mt-2">Wochenende</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="heading-secondary mb-6 text-white">
            Haben Sie Fragen?
          </h2>
          <p className="text-body text-white/90 mb-8">
            Kontaktieren Sie uns gerne für weitere Informationen oder Terminbuchungen
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary">
              Kontakt
            </Link>
            <Link href="/booking" className="btn-secondary">
              Termin Buchen
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

