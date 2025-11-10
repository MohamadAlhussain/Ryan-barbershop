import Link from 'next/link'

interface FooterProps {
  showAdminLink?: boolean
}

export default function Footer({ showAdminLink = false }: FooterProps) {
  return (
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
          <p className="mt-1 md:mt-2">
            Copyright © 2025 Ryan Barbershop |
            <Link href="/impressum" className="text-amber-400 hover:text-amber-300"> Impressum</Link> |
            <Link href="/datenschutz" className="text-amber-400 hover:text-amber-300"> Datenschutz</Link>
          </p>
          <p className="mt-1">
            <Link href="/lexerno" className="text-amber-400 hover:text-amber-300">
              Entwickelt von LEXERNO
            </Link>
          </p>
          {showAdminLink && (
            <p className="mt-2">
              <Link href="/admin/appointments" className="text-gray-600 hover:text-amber-400 transition-colors text-xs">
                Admin Dashboard
              </Link>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}

