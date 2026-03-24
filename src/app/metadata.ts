import type { Metadata } from "next";
import { siteContent } from "@/lib/content";
import { CONTACT } from "@/lib/constants";

const siteUrl = siteContent.site.url;
const siteName = siteContent.site.name;
const siteDescription = siteContent.site.description;
const authorName = siteContent.doctor.name;
const logoUrl = `${siteUrl}/images/logo_v1.png`;
const socialLinks = [
  siteContent.socialMedia.instagram,
  siteContent.socialMedia.facebook,
  siteContent.socialMedia.linkedin,
].filter(Boolean);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${authorName} | Cirujano Maxilofacial en Ovalle - Implantes Dentales`,
    template: `%s | ${authorName}`,
  },
  description: siteDescription,
  keywords: [
    "cirujano maxilofacial Ovalle",
    "implantes dentales Ovalle",
    "cirugía oral Ovalle",
    "cirugía maxilofacial Región de Coquimbo",
    "extracción terceros molares",
    "cirugía ortognática",
    "diseño de sonrisa",
    "rehabilitación oral",
    "prótesis dentales",
    "injertos óseos",
    "elevación de seno maxilar",
    "dentista Ovalle",
    "clínica dental Ovalle",
    "odontólogo Ovalle",
    "cirugía dental Coquimbo",
    "cirugía guiada por computadora",
    "implantes de carga inmediata",
    "rehabilitación total",
    "tratamiento ATM",
    "cirugía reconstructiva facial",
  ],
  authors: [{ name: authorName }],
  creator: authorName,
  publisher: `${authorName} - Cirugía Maxilofacial`,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName,
    title: `${authorName} - Cirujano Maxilofacial en Ovalle | Implantes Dentales`,
    description: siteDescription,
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: `${authorName} - Cirujano Maxilofacial en Ovalle`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${authorName} - Cirujano Maxilofacial en Ovalle`,
    description:
      "Especialista en implantes dentales, cirugía ortognática y rehabilitación oral en Ovalle, Región de Coquimbo.",
    images: [logoUrl],
    creator: "@drharald",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      "es-CL": siteUrl,
    },
  },

  verification: {
    google: "tu-codigo-de-verificacion-google",
  },

  category: "health",
};

// Schema JSON-LD para SEO estructurado
export const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      "@id": `${siteUrl}/#physician`,
      name: authorName,
      jobTitle: siteContent.doctor.title,
      description:
        "Especialista en Cirugía Maxilofacial, Implantología y Rehabilitación Oral",
      image: logoUrl,
      url: siteUrl,
      sameAs: socialLinks,
      medicalSpecialty: [
        "Oral and Maxillofacial Surgery",
        "Dental Implantology",
        "Orthognathic Surgery",
      ],
      knowsAbout: [
        "Cirugía Maxilofacial",
        "Implantes Dentales",
        "Cirugía Ortognática",
        "Diseño de Sonrisa",
        "Rehabilitación Oral",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Universidad de Valparaíso",
      },
    },
    {
      "@type": "Dentist",
      "@id": `${siteUrl}/#dentist`,
      name: `${authorName} - Cirugía Maxilofacial`,
      image: logoUrl,
      description: siteDescription,
      url: siteUrl,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.city,
        addressRegion: CONTACT.address.region,
        postalCode: CONTACT.address.postalCode,
        addressCountry: CONTACT.address.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -30.5975,
        longitude: -71.1992,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "19:00",
        },
      ],
      areaServed: [
        {
          "@type": "City",
          name: CONTACT.address.city,
        },
        {
          "@type": "State",
          name: CONTACT.address.region,
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Cirugía Maxilofacial",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              name: "Implantes Dentales",
              description:
                "Colocación de implantes dentales con tecnología de vanguardia",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              name: "Cirugía Ortognática",
              description: "Corrección de deformidades faciales y maxilares",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              name: "Extracción de Terceros Molares",
              description: "Extracción quirúrgica de muelas del juicio",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              name: "Diseño de Sonrisa",
              description: "Rehabilitación estética y funcional completa",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              name: "Rehabilitación Oral",
              description: "Prótesis dentales fijas y removibles",
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#physician`,
      },
      inLanguage: "es-CL",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/buscar?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "MedicalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: `${authorName} - Cirugía Maxilofacial`,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: 512,
        height: 512,
      },
      image: logoUrl,
      description: siteDescription,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.city,
        addressRegion: CONTACT.address.region,
        postalCode: CONTACT.address.postalCode,
        addressCountry: CONTACT.address.countryCode,
      },
      sameAs: socialLinks,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: siteUrl,
        },
      ],
    },
  ],
};
