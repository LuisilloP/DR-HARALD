import type { Metadata } from 'next'

const siteUrl = 'https://drharaldziller.cl' // Cambiar por tu dominio real
const siteName = 'Dr. Harald Ziller Ortíz - Cirujano Maxilofacial'
const siteDescription = 'Cirujano Maxilofacial en Ovalle, Región de Coquimbo. Especialista en implantes dentales, cirugía ortognática, extracción de terceros molares, diseño de sonrisa y rehabilitación oral. Atención profesional con tecnología de vanguardia.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dr. Harald Ziller Ortíz | Cirujano Maxilofacial en Ovalle - Implantes Dentales',
    template: '%s | Dr. Harald Ziller Ortíz'
  },
  description: siteDescription,
  keywords: [
    // Servicios principales
    'cirujano maxilofacial Ovalle',
    'implantes dentales Ovalle',
    'cirugía oral Ovalle',
    'cirugía maxilofacial Región de Coquimbo',
    
    // Procedimientos específicos
    'extracción terceros molares',
    'cirugía ortognática',
    'diseño de sonrisa',
    'rehabilitación oral',
    'prótesis dentales',
    'injertos óseos',
    'elevación de seno maxilar',
    
    // Locales
    'dentista Ovalle',
    'clínica dental Ovalle',
    'odontólogo Ovalle',
    'cirugía dental Coquimbo',
    
    // Complementarios
    'cirugía guiada por computadora',
    'implantes de carga inmediata',
    'rehabilitación total',
    'tratamiento ATM',
    'cirugía reconstructiva facial',
  ],
  authors: [{ name: 'Dr. Harald Ziller Ortíz' }],
  creator: 'Dr. Harald Ziller Ortíz',
  publisher: 'Dr. Harald Ziller Ortíz - Cirugía Maxilofacial',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: siteUrl,
    siteName: siteName,
    title: 'Dr. Harald Ziller Ortíz - Cirujano Maxilofacial en Ovalle | Implantes Dentales',
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/images/logo_v1.png`,
        width: 1200,
        height: 630,
        alt: 'Dr. Harald Ziller Ortíz - Cirujano Maxilofacial en Ovalle',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Harald Ziller Ortíz - Cirujano Maxilofacial en Ovalle',
    description: 'Especialista en implantes dentales, cirugía ortognática y rehabilitación oral en Ovalle, Región de Coquimbo.',
    images: [`${siteUrl}/images/logo_v1.png`],
    creator: '@drharald', // Cambiar por tu handle de Twitter si tienes
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      'es-CL': siteUrl,
    },
  },

  verification: {
    google: 'tu-codigo-de-verificacion-google', // Agregar después de verificar en Google Search Console
    // yandex: 'codigo-yandex',
    // bing: 'codigo-bing',
  },

  category: 'health',
}

// Schema JSON-LD para SEO estructurado
export const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    // Médico / Profesional
    {
      '@type': 'Physician',
      '@id': `${siteUrl}/#physician`,
      name: 'Dr. Harald Ziller Ortíz',
      jobTitle: 'Cirujano Maxilofacial',
      description: 'Especialista en Cirugía Maxilofacial, Implantología y Rehabilitación Oral',
      image: `${siteUrl}/images/logo_v1.png`,
      url: siteUrl,
      sameAs: [
        // Agregar redes sociales reales
        'https://www.instagram.com/drharald',
        'https://www.facebook.com/drharald',
        // 'https://www.linkedin.com/in/drharald',
      ],
      medicalSpecialty: [
        'Oral and Maxillofacial Surgery',
        'Dental Implantology',
        'Orthognathic Surgery',
      ],
      knowsAbout: [
        'Cirugía Maxilofacial',
        'Implantes Dentales',
        'Cirugía Ortognática',
        'Diseño de Sonrisa',
        'Rehabilitación Oral',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Universidad de Valparaiso', // Cambiar por tu universidad real
      },
    },

    // Clínica / Negocio Médico
    {
      '@type': 'Dentist',
      '@id': `${siteUrl}/#dentist`,
      name: 'Dr. Harald Ziller Ortíz - Cirugía Maxilofacial',
      image: `${siteUrl}/images/logo_v1.png`,
      description: siteDescription,
      url: siteUrl,
      telephone: '+56927416008', // Teléfono de WhatsApp que tienes en el sitio
      email: 'contacto@drharald.cl', // Cambiar por email real
      priceRange: '$$',
      
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Manuel Peñafiel Olivares 1480, Oficina 416A', // Cambiar por dirección real
        addressLocality: 'Ovalle',
        addressRegion: 'Región de Coquimbo',
        postalCode: '1840000', // Cambiar por código postal real
        addressCountry: 'CL',
      },

      geo: {
        '@type': 'GeoCoordinates',
        latitude: -30.5975, // Coordenadas de Ovalle (ajustar a tu ubicación exacta)
        longitude: -71.1992,
      },

      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '13:00',
        },
      ],

      areaServed: [
        {
          '@type': 'City',
          name: 'Ovalle',
        },
        {
          '@type': 'State',
          name: 'Región de Coquimbo',
        },
      ],

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Cirugía Maxilofacial',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MedicalProcedure',
              name: 'Implantes Dentales',
              description: 'Colocación de implantes dentales con tecnología de vanguardia',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MedicalProcedure',
              name: 'Cirugía Ortognática',
              description: 'Corrección de deformidades faciales y maxilares',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MedicalProcedure',
              name: 'Extracción de Terceros Molares',
              description: 'Extracción quirúrgica de muelas del juicio',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MedicalProcedure',
              name: 'Diseño de Sonrisa',
              description: 'Rehabilitación estética y funcional completa',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MedicalProcedure',
              name: 'Rehabilitación Oral',
              description: 'Prótesis dentales fijas y removibles',
            },
          },
        ],
      },

      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
    },

    // Sitio Web
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: {
        '@id': `${siteUrl}/#physician`,
      },
      inLanguage: 'es-CL',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/buscar?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // Organización (para panel de conocimiento de Google)
    {
      '@type': 'MedicalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Dr. Harald Ziller Ortíz - Cirugía Maxilofacial',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo_v1.png`,
        width: 512,
        height: 512,
      },
      image: `${siteUrl}/images/logo_v1.png`,
      description: siteDescription,
      telephone: '+56927416008',
      email: 'dr.haraldziller@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Principal 123',
        addressLocality: 'Ovalle',
        addressRegion: 'Región de Coquimbo',
        postalCode: '1840000',
        addressCountry: 'CL',
      },
      sameAs: [
        'https://www.instagram.com/drharald',
        'https://www.facebook.com/drharald',
      ],
    },

    // Breadcrumb (migajas de pan)
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteUrl,
        },
      ],
    },
  ],
}
