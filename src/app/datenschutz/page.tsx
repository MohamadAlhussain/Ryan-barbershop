import Link from 'next/link'
import Footer from '../components/Footer'

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container-max text-center">
          <h1 className="heading-primary mb-4 fade-in">
            Datenschutzerklärung
          </h1>
          <p className="text-body text-gray-400 max-w-3xl mx-auto fade-in-delay-1">
            Informationen zum Umgang mit Ihren personenbezogenen Daten
          </p>
          <div className="max-w-3xl mx-auto mt-6">
            <div className="bg-amber-500/10 border border-amber-400/40 text-amber-100 px-6 py-4 rounded-2xl text-sm leading-relaxed">
              <strong className="block text-amber-300 mb-1">Hinweis:</strong>
              Diese Website befindet sich im Aufbau und dient derzeit ausschließlich Marketing- und Demonstrationszwecken.<br className="hidden md:block" />
              Eine finale Freischaltung erfolgt erst nach Zustimmung des Betreibers.
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto fade-in">
          <div className="space-y-12">
            
            {/* 1. Datenschutz auf einen Blick */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                1. Datenschutz auf einen Blick
              </h2>
              <div className="space-y-6 text-body">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Allgemeine Hinweise</h3>
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                    passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                    persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen 
                    Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Datenerfassung auf dieser Website</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-md font-semibold text-amber-300 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
                      <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.</p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-amber-300 mb-2">Wie erfassen wir Ihre Daten?</h4>
                      <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-amber-300 mb-2">Wofür nutzen wir Ihre Daten?</h4>
                      <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-amber-300 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
                      <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Hosting */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                2. Hosting & Content Delivery
              </h2>
              <div className="space-y-4 text-body">
                <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-2">Vercel</h3>
                  <p>Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
                  <p>Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adresse zur Auslieferung der Seite. Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a></p>
                  <p>Wir haben mit Vercel einen Auftragsverarbeitungsvertrag (Data Processing Addendum, DPA) geschlossen. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; wir haben ein berechtigtes Interesse an einer zuverlässigen und performanten Bereitstellung unseres Online-Angebots.</p>
                </div>
              </div>
            </div>

            {/* 3. Allgemeine Hinweise */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <div className="space-y-6 text-body">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Datenschutz</h3>
                  <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                  <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.</p>
                  <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Hinweis zur verantwortlichen Stelle</h3>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="font-semibold text-amber-300 mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                    <p>Jasem Atalla<br />Dortustraße 22<br />14467 Potsdam<br />Telefon: 0179&nbsp;742&nbsp;1768<br />E-Mail: <a href="mailto:info@ryanbarber.de" className="text-amber-400 hover:text-amber-300">info@ryanbarber.de</a></p>
                    <p className="text-sm text-gray-400 mt-2">Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Ihre Rechte</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-md font-semibold text-amber-300 mb-2">Auskunft, Berichtigung und Löschung</h4>
                      <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.</p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-amber-300 mb-2">Recht auf Datenübertragbarkeit</h4>
                      <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.</p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-amber-300 mb-2">Widerspruchsrecht</h4>
                      <p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Datenerfassung auf dieser Website */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                4. Datenerfassung auf dieser Website
              </h2>
              <div className="space-y-6 text-body">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Server-Log-Dateien</h3>
                  <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                  <p className="mt-3">Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung unserer Website.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Kontaktformular und Terminbuchung</h3>
                  <p>Wenn Sie uns per Kontaktformular oder Terminbuchung Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
                  <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Anfrage per E-Mail, Telefon oder Telefax</h3>
                  <p>Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Technisch notwendige Cookies</h3>
                  <p>Unsere Website verwendet derzeit ausschließlich technisch notwendige Cookies bzw. vergleichbare Technologien, die für den Betrieb der Seite erforderlich sind. Analyse- oder Marketing-Cookies werden nicht eingesetzt.</p>
                </div>
              </div>
            </div>

            {/* 5. Terminbuchungssystem */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                5. Terminbuchungssystem
              </h2>
              <div className="space-y-4 text-body">
                <p>Unsere Website nutzt ein eigenes Terminbuchungssystem, um eine Terminbuchung ohne Registrierung zu ermöglichen. Dabei erheben wir folgende Daten:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name (zur Identifikation des Termins)</li>
                  <li>E-Mail-Adresse (zur Bestätigung und Kommunikation)</li>
                  <li>Gewählter Service</li>
                  <li>Gewünschtes Datum und Uhrzeit</li>
                  <li>Besondere Wünsche oder Anmerkungen (optional)</li>
                </ul>
                <p>Diese Daten verwenden wir ausschließlich für die Organisation und Kommunikation bezüglich Ihrer Buchung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen).</p>
                <p>Die Termin- und Kommunikationsdaten werden in einer gehosteten Datenbank von Upstash, Inc. (USA/EU) gespeichert. Der Speicherort befindet sich in der von uns gewählten EU-Region. Mit Upstash besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Die Daten werden spätestens 60 Tage nach dem geplanten Termin automatisch gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
                <p>Zur Bestätigung und ggf. Änderung/Absage des Termins versenden wir E-Mails über den von uns konfigurierten SMTP-Dienst (z.&nbsp;B. Gmail oder ein vergleichbarer Provider). Es können hierbei Namen, E-Mail-Adresse, Termin- und Servicedaten verarbeitet werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>
              </div>
            </div>

            {/* 6. Sicherheitsmaßnahmen & Rate Limiting */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                6. Sicherheitsmaßnahmen & Rate-Limiting
              </h2>
              <div className="space-y-4 text-body">
                <p>Zur Absicherung unserer Formulare setzen wir ein serverseitiges Rate-Limiting ein. Dabei wird neben der Uhrzeit der Anfrage auch die IP-Adresse verarbeitet, um missbräuchliche oder automatisierte Zugriffe zu verhindern. Diese Daten werden nur zu Sicherheitszwecken verwendet und regelmäßig gelöscht (spätestens nach 24 Stunden, sofern kein Sicherheitsvorfall vorliegt). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherung unseres Online-Angebots).</p>
                <p>Alle Verbindungen zur Website sowie zwischen Server und Datenbank erfolgen verschlüsselt (TLS/SSL).</p>
              </div>
            </div>

            {/* 7. Medien & KI-generierte Inhalte */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                7. Medien & KI-generierte Inhalte
              </h2>
              <div className="space-y-4 text-body">
                <p>Einige auf der Website verwendete Bilder und Videos wurden mithilfe von KI-Tools (z.&nbsp;B. Google Gemini) generiert. Es werden dabei keine personenbezogenen Daten Dritter verarbeitet. Die Medien dienen ausschließlich der Illustration unseres Leistungsangebots.</p>
              </div>
            </div>

            {/* 8. SSL-Verschlüsselung */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                8. SSL- bzw. TLS-Verschlüsselung
              </h2>
              <div className="space-y-4 text-body">
                <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
              </div>
            </div>

            {/* 9. Kontakt */}
            <div className="card">
              <h2 className="heading-tertiary mb-6 text-amber-400">
                9. Kontakt
              </h2>
              <div className="space-y-4 text-body">
                <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an:</p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p><strong>Jasem Atalla</strong><br />
                  Dortustraße 22<br />
                  14467 Potsdam<br />
                  Telefon: 0179&nbsp;742&nbsp;1768<br />
                  E-Mail: <a href="mailto:info@ryanbarber.de" className="text-amber-400 hover:text-amber-300">info@ryanbarber.de</a></p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="card bg-gray-900/50 border-gray-700">
              <div className="text-center">
                <p className="text-small text-gray-400">
                  Diese Datenschutzerklärung wurde zuletzt aktualisiert am: 10. November 2025
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Bei wesentlichen Änderungen an unseren Verarbeitungsprozessen aktualisieren wir diese Hinweise.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Hinweis: Diese Website befindet sich im Aufbau und dient aktuell zu Marketing- und Demonstrationszwecken. Eine endgültige Inbetriebnahme erfolgt erst nach Abstimmung mit dem Betreiber.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="heading-secondary mb-6 text-white">
            Haben Sie Fragen zum Datenschutz?
          </h2>
          <p className="text-body text-white/90 mb-8">
            Kontaktieren Sie uns gerne für weitere Informationen
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary">
              Kontakt
            </Link>
            <Link href="/impressum" className="btn-secondary">
              Impressum
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
