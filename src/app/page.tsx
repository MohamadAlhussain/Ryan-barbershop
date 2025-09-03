"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'

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
            preload="auto"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3)' }}
          >
            <source src="/ryanbarber (1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Animated Background Overlay */}
        <div className="absolute inset-0">
          {/* Animated geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-8">
            {/* Main Title with enhanced styling */}
            <div className="mb-2 md:mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-1 md:mb-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-none">
              RYAN
            </h1>
              <div className="w-12 sm:w-16 md:w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            </div>
            
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light text-white mb-1 md:mb-3 tracking-wide">
              BARBERSHOP
            </h2>
            <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-medium text-amber-400 mb-3 md:mb-6 tracking-wider">
              POTSDAM
            </h3>
          </div>
          
          {/* Enhanced subtitle */}
          <div className="mb-4 md:mb-8">
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200 mb-1 md:mb-3 font-light leading-relaxed">
              Der beste Friseur in Potsdam
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
              20 Jahre Erfahrung • Professionelle Herrenfrisuren • Moderne Bartpflege • Kostenlose Getränke • Freundliches Team
            </p>
          </div>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-row gap-2 md:gap-4 justify-center items-center mb-6 md:mb-12">
            <Link 
              href="/booking" 
              className="group relative px-4 sm:px-6 md:px-10 py-2 md:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full text-sm md:text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden flex-1 sm:flex-none"
            >
              <span className="relative z-10">Termin Buchen</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/about" 
              className="px-4 sm:px-6 md:px-10 py-2 md:py-4 border-2 border-white/30 text-white font-semibold rounded-full text-sm md:text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex-1 sm:flex-none"
            >
              Über Uns
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-3xl mx-auto">
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
      <section className="py-24 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 text-amber-400">
              Der beste Friseur in Potsdam
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Seit über 20 Jahren bieten wir professionelle Herrenfrisuren und Bartpflege in Potsdam. 
              Unser erfahrenes Team sorgt für Ihren perfekten Look.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-white">
                Warum Ryan Barbershop?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">20+ Jahre Erfahrung</h4>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      Unser Team verfügt über jahrzehntelange Erfahrung in der Herrenfrisur und Bartpflege. 
                      Wir kennen die neuesten Trends und Techniken.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">Kostenlose Getränke</h4>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      Genießen Sie während Ihres Besuchs ein kostenloses Getränk Ihrer Wahl. 
                      Kaffee, Tee, Softdrinks - alles auf unserem Haus.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">

                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">Freundliches Team</h4>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      Unser Team ist nicht nur professionell, sondern auch herzlich und freundlich. 
                      Bei uns fühlen Sie sich wie zu Hause.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20">
                <Image
                  src="/ryanbarber (1).png"
                  alt="Ryan Barbershop Interior"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 text-white">
              Unsere Services in Potsdam
          </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professionelle Herrenfrisuren, Bartpflege und Styling - alles aus einer Hand. 
              Entdecken Sie unser umfassendes Angebot für den perfekten Look.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                image: "/ryanbarber (2).png",
                title: "Herrenfrisur", 
                desc: "Professionelle Herrenfrisuren nach modernsten Trends. Von klassisch bis modern - wir schneiden Ihren perfekten Look.",
                features: ["Klassische Schnitte", "Moderne Styles", "Individuelle Beratung"]
              },
              { 
                image: "/ryanbarber (3).png",
                title: "Bartpflege", 
                desc: "Perfekte Bartformung und -pflege für den perfekten Look. Professionelle Bartpflege mit modernsten Techniken.",
                features: ["Bart schneiden", "Bart formen", "Bart pflegen"]
              },
              { 
                image: "/ryanbarber (4).png",
                title: "Styling & Beratung", 
                desc: "Individuelles Styling und Beratung für Ihren persönlichen Stil. Wir helfen Ihnen, den perfekten Look zu finden.",
                features: ["Styling-Beratung", "Produktempfehlungen", "Pflegetipps"]
              }
            ].map((service, index) => (
              <div key={index} className="group bg-black/50 p-8 rounded-3xl border border-gray-700 hover:border-amber-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
                <div className="relative w-full h-48 mb-6 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-amber-400">{service.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6">{service.desc}</p>
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
            <Link 
              href="/services" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full text-sm sm:text-base md:text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Alle Services ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-16 text-white">
            Öffnungszeiten
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-8 rounded-2xl border border-amber-400/30">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-amber-400">Wochentags</h3>
              <p className="text-lg sm:text-xl md:text-2xl font-light text-white">09:00 - 19:00</p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2">Montag - Freitag</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-8 rounded-2xl border border-orange-400/30">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-orange-400">Samstag</h3>
              <p className="text-lg sm:text-xl md:text-2xl font-light text-white">09:00 - 18:00</p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2">Wochenende</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 text-white">
            Bereit für einen neuen Look?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8">
            Buchen Sie Ihren Termin noch heute und erleben Sie den Ryan Barbershop Unterschied
          </p>
          <Link 
            href="/booking" 
            className="inline-block px-12 py-5 bg-white text-amber-600 font-bold rounded-full text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Jetzt Termin Buchen
          </Link>
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
