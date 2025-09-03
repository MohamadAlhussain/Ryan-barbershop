export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Ryan Barbershop",
  "description": "Der beste Friseur in Potsdam - Professionelle Herrenfrisuren, Bartpflege und Styling seit über 20 Jahren",
  "url": "https://ryanbarber.de",
  "telephone": "+49-331-123456",
  "email": "info@ryanbarber.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Brandenburger Straße 123",
    "addressLocality": "Potsdam",
    "postalCode": "14467",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.3989",
    "longitude": "13.0667"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "€12-€20",
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
  "currenciesAccepted": "EUR",
  "image": [
    "https://ryanbarber.de/ryanbarber%20(1).png",
    "https://ryanbarber.de/ryanbarber%20(2).png",
    "https://ryanbarber.de/ryanbarber%20(3).png"
  ],
  "logo": "https://ryanbarber.de/logo.png",
  "sameAs": [
    "https://www.facebook.com/ryanbarbershop",
    "https://www.instagram.com/ryanbarbershop"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Friseur Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Herren Haarschnitt",
          "description": "Professioneller Herrenhaarschnitt mit Beratung"
        },
        "price": "15",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Herren Haar Schnitt mit Waschen",
          "description": "Herrenhaarschnitt inklusive Haarwäsche"
        },
        "price": "20",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kinder Haarschnitt",
          "description": "Spezieller Haarschnitt für Kinder"
        },
        "price": "15",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kinder Harrschnitt mit Waschen",
          "description": "Kinderhaarschnitt inklusive Haarwäsche"
        },
        "price": "18",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bart Styling",
          "description": "Professionelle Bartpflege und Styling"
        },
        "price": "12",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gesichtsreinigung",
          "description": "Tiefenreinigung und Pflege der Gesichtshaut"
        },
        "price": "15",
        "priceCurrency": "EUR"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ryan Barbershop",
  "url": "https://ryanbarber.de",
  "description": "Der beste Friseur in Potsdam - Online Terminbuchung",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ryanbarber.de/booking",
    "query-input": "required name=search_term_string"
  }
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ryan Barbershop",
  "url": "https://ryanbarber.de",
  "logo": "https://ryanbarber.de/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-331-123456",
    "contactType": "customer service",
    "availableLanguage": ["German", "English"]
  },
  "founder": {
    "@type": "Person",
    "name": "Ryan"
  },
  "foundingDate": "2004"
}
