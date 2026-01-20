export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Royal Barbershop",
  "description": "Der beste Friseur in Potsdam - Professionelle Herrenfrisuren, Bartpflege und Styling seit over 20 Jahren",
  "url": "https://royal-barbershop.de",
  "telephone": "+49-331-1234567",
  "email": "info@royal-barbershop.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Musterstraße 123",
    "addressLocality": "Potsdam",
    "postalCode": "14467",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.3997",
    "longitude": "13.0531701"
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
    "https://royal-barbershop.de/ryanbarber%20(1).webp",
    "https://royal-barbershop.de/ryanbarber%20(2).webp",
    "https://royal-barbershop.de/ryanbarber%20(3).webp"
  ],
  "logo": "https://royal-barbershop.de/logo.png",
  "sameAs": [
    "https://www.facebook.com/royalbarbershop",
    "https://www.instagram.com/royalbarbershop"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Friseur Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Herrenhaarschnitt",
          "description": "Professioneller Herrenhaarschnitt mit Beratung"
        },
        "price": "15",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Herrenhaarschnitt mit Waschen",
          "description": "Herrenhaarschnitt inklusive Haarwäsche"
        },
        "price": "20",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kinderhaarschnitt",
          "description": "Spezieller Haarschnitt für Kinder"
        },
        "price": "15",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kinderhaarschnitt mit Waschen",
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
  "name": "Royal Barbershop",
  "url": "https://royal-barbershop.de",
  "description": "Der beste Friseur in Potsdam - Online Terminbuchung",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://royal-barbershop.de/booking",
    "query-input": "required name=search_term_string"
  }
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Royal Barbershop",
  "url": "https://royal-barbershop.de",
  "logo": "https://royal-barbershop.de/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-331-1234567",
    "contactType": "customer service",
    "availableLanguage": ["German", "English"]
  },
  "founder": {
    "@type": "Person",
    "name": "Royal"
  },
  "foundingDate": "2024"
}
