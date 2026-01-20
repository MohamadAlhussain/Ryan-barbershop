"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import Footer from './components/Footer'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6
      // Ensure smooth looping
      videoRef.current.addEventListener('ended', () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play()
        }
      })
    }

  }, [])
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover gpu-accelerated"
            style={{ filter: 'brightness(0.3)' }}
          >
            <source src="/ryanbarber (1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>


        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 container-max">
          <div className="mb-8">
            {/* Main Title with enhanced styling */}
            <div className="mb-6">
              <h1 className="heading-primary mb-4 fade-in">
                ROYAL
              </h1>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full fade-in-delay-1"></div>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-wide fade-in-delay-2">
              BARBERSHOP
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-amber-400 mb-8 tracking-wider fade-in-delay-3">
              POTSDAM
            </h3>
          </div>

          {/* Enhanced subtitle */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-gray-200 mb-4 font-bold">
              Der beste Friseur in Potsdam
            </p>
            <p className="text-body text-gray-400 max-w-3xl mx-auto">
              20 Jahre Erfahrung • Professionelle Herrenfrisuren • Moderne Bartpflege • Kostenlose Getränke • Freundliches Team
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-row gap-3 justify-center items-center mb-12">
            <Link href="/booking" className="btn-primary">
              Termin Buchen
            </Link>
            <Link href="/about" className="btn-secondary">
              Über Uns
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-3xl font-bold text-amber-400 mb-1">20+</div>
              <div className="text-xs sm:text-sm text-gray-400">Jahre Erfahrung</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-3xl font-bold text-amber-400 mb-1">1000+</div>
              <div className="text-xs sm:text-sm text-gray-400">Zufriedene Kunden</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-3xl font-bold text-amber-400 mb-1">5★</div>
              <div className="text-xs sm:text-sm text-gray-400">Bewertung</div>
            </div>
          </div>

        </div>


      </section>

      {/* About Section */}
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
        <div className="container-max fade-in">
          <div className="text-center mb-12 fade-in">
            <h2 className="heading-secondary mb-6 text-amber-400">
              Der beste Friseur in Potsdam
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Seit über 20 Jahren bieten wir professionelle Herrenfrisuren und Bartpflege in Potsdam.
              Unser erfahrenes Team sorgt für Ihren perfekten Look.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center fade-in-delay-1">
            <div>
              <h2 className="heading-tertiary mb-8">
                Warum Royal Barbershop?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-white/5 link-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">20+ Jahre Erfahrung</h3>
                    <p className="text-body">
                      Unser Team verfügt über jahrzehntelange Erfahrung in der Herrenfrisur und Bartpflege.
                      Wir kennen die neuesten Trends und Techniken.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-white/5 link-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Kostenlose Getränke</h3>
                    <p className="text-body">
                      Genießen Sie während Ihres Besuchs ein kostenloses Getränk Ihrer Wahl.
                      Kaffee, Tee, Softdrinks - alles auf unserem Haus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-white/5 link-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Freundliches Team</h3>
                    <p className="text-body">
                      Unser Team ist nicht nur professionell, sondern auch herzlich und freundlich.
                      Bei uns fühlen Sie sich wie zu Hause.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20">
                <Image
                  src="/ryanbarber (1).webp"
                  alt="Ryan Barbershop Interior"
                  fill
                  className="object-cover rounded-3xl gpu-accelerated"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto fade-in">
          <div className="text-center mb-8 fade-in">
            <h2 className="heading-secondary mb-4">
              Unsere Services in Potsdam
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Professionelle Herrenfrisuren, Bartpflege und Styling - alles aus einer Hand.
              Entdecken Sie unser umfassendes Angebot für den perfekten Look.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 fade-in-delay-1">
            {[
              {
                image: "/ryanbarber (2).webp",
                title: "Herrenfrisur",
                desc: "Professionelle Herrenfrisuren nach modernsten Trends. Von klassisch bis modern - wir schneiden Ihren perfekten Look.",
                features: ["Klassische Haarschnitte", "Moderne Styles", "Individuelle Beratung"]
              },
              {
                image: "/ryanbarber (3).webp",
                title: "Bartpflege",
                desc: "Perfekte Bartformung und -pflege für den perfekten Look. Professionelle Bartpflege mit modernsten Techniken.",
                features: ["Bart schneiden", "Bart formen", "Bart pflegen"]
              },
              {
                image: "/ryanbarber (4).webp",
                title: "Styling & Beratung",
                desc: "Individuelles Styling und Beratung für Ihren persönlichen Stil. Wir helfen Ihnen, den perfekten Look zu finden.",
                features: ["Styling-Beratung", "Produktempfehlungen", "Pflegetipps"]
              }
            ].map((service, index) => (
              <div key={index} className={`group bg-black/50 p-8 rounded-3xl border border-gray-700 card-hover ${index === 0 ? 'fade-in-delay-1' : index === 1 ? 'fade-in-delay-2' : 'fade-in-delay-3'}`}>
                <div className="relative w-full h-48 mb-6 rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-3xl interactive-hover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <h3 className="text-lg font-bold mb-4 text-amber-400">{service.title}</h3>
                <p className="text-body mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm sm:text-base md:text-lg text-gray-400">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/services" className="btn-primary">
              Alle Services ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="section-padding bg-black">
        <div className="container-max text-center fade-in">
          <h2 className="heading-secondary mb-12">
            Öffnungszeiten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-bold mb-4 text-amber-400">Wochentags</h3>
              <p className="text-xl font-bold text-white">09:00 - 19:00</p>
              <p className="text-small mt-2">Montag - Freitag</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-bold mb-4 text-orange-400">Samstag</h3>
              <p className="text-xl font-bold text-white">09:00 - 18:00</p>
              <p className="text-small mt-2">Wochenende</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="heading-secondary mb-6 text-white">
            Bereit für einen neuen Look?
          </h2>
          <p className="text-body text-white/90 mb-8">
            Buchen Sie Ihren Termin noch heute und erleben Sie den Royal Barbershop Unterschied
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Link href="/booking" className="btn-primary">
              Jetzt Termin Buchen
            </Link>
            <Link href="/services" className="btn-secondary">
              Services Ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
