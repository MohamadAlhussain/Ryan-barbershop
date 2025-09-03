import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import { businessStructuredData, websiteStructuredData, organizationStructuredData } from '@/lib/structuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ryan Barbershop Potsdam - Der beste Friseur in Potsdam | Herrenfrisuren & Bartpflege',
  description: 'Der beste Friseur in Potsdam! 20+ Jahre Erfahrung in professionellen Herrenfrisuren, Bartpflege und Styling. Kostenlose Getränke, freundliches Team. Jetzt Termin buchen!',
  keywords: 'Friseur Potsdam, Barbershop Potsdam, Herrenfrisur Potsdam, Bartpflege Potsdam, Friseur Brandenburg, Barbershop Brandenburg, Herrenfrisur Brandenburg, Termin buchen Potsdam, Ryan Barbershop, bester Friseur Potsdam',
  authors: [{ name: 'Ryan Barbershop' }],
  openGraph: {
    title: 'Ryan Barbershop Potsdam - Der beste Friseur in Potsdam',
    description: '20+ Jahre Erfahrung in professionellen Herrenfrisuren und Bartpflege. Kostenlose Getränke, freundliches Team. Jetzt Termin buchen!',
    url: 'https://ryanbarber.de',
    siteName: 'Ryan Barbershop',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
