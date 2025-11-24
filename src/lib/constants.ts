/**
 * Site Configuration Constants
 */

import type {
  ContactInfo,
  SocialMediaLinks,
  DoctorInfo,
  SiteInfo,
  NavItem,
  FooterLink,
  Stat,
  Service,
  AnalyticsConfig,
} from '@/types';

// Contact Information
export const CONTACT: ContactInfo = {
  phone: '+56927416008',
  whatsappUrl: 'https://wa.me/56927416008',
  email: 'dr.haraldziller@gmail.com',
  address: {
    street: 'Av. Manuel Peñafiel Olivares 1480, Oficina 416A',
    city: 'Ovalle',
    region: 'Región de Coquimbo',
    postalCode: '1840000',
    country: 'Chile',
    countryCode: 'CL',
    full: 'Av. Manuel Peñafiel Olivares 1480, Oficina 416A, 1840000 Ovalle',
    googleMapsUrl: 'https://www.google.com/maps?q=Av.+Manuel+Pe%C3%B1afiel+Olivares+1480,+Oficina+416A,+1840000+Ovalle',
  },
  schedule: {
    weekdays: 'Lunes a Viernes',
    hours: '8:00 a 19:00 hrs',
    full: 'Lunes a Viernes · 8:00 a 19:00 hrs.',
  },
} as const;

// Social Media Links
export const SOCIAL_MEDIA: SocialMediaLinks = {
  instagram: 'https://www.instagram.com/dr.haraldziller/',
  facebook: 'https://www.facebook.com/harald.ortiz',
  linkedin: 'https://cl.linkedin.com/in/harald-ziller-ortiz-58435460',
} as const;

// Doctor Information
export const DOCTOR: DoctorInfo = {
  name: 'Dr. Harald Ziller Ortíz',
  title: 'Cirujano Maxilofacial',
  subtitle: 'Cirugia MaxiloFacial e Implantología Facial Avanzada',
  fullTitle: 'Cirujano Bucal y MaxiloFacial',
  location: 'Ovalle',
} as const;

// Site Information
export const SITE: SiteInfo = {
  url: 'https://drharaldziller.cl', // Cambiar por tu dominio real
  name: 'Dr. Harald Ziller Ortíz - Cirujano Maxilofacial',
  description: 'Cirujano Maxilofacial en Ovalle, Región de Coquimbo. Especialista en implantes dentales, cirugía ortognática, extracción de terceros molares, diseño de sonrisa y rehabilitación oral. Atención profesional con tecnología de vanguardia.',
} as const;

// Navigation Items
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', target: 'hero' },
  { label: 'Sobre mí', target: 'about' },
  { label: 'Servicios', target: 'services' },
  { label: 'Pacientes', target: 'patients' },
  { label: 'FAQ', target: 'faq' },
  { label: 'Convenios', target: 'partners' },
  { label: 'Contacto', target: 'contact' },
] as const;

// Footer Links
export const FOOTER_LINKS: readonly FooterLink[] = [
  { label: 'Aviso de privacidad', href: '#' },
  { label: 'Política de cookies', href: '#' },
  { label: 'Términos del servicio', href: '#' },
] as const;

// Hero Stats
export const HERO_STATS: readonly Stat[] = [
  {
    label: 'Cirugías exitosas',
    value: 1230,
    suffix: '+',
  },
  {
    label: 'Pacientes Dentales',
    value: 1437,
    suffix: '+',
  },
  {
    label: 'Años de experiencia',
    value: 19,
  },
  {
    label: 'Pacientes satisfechos',
    value: 98,
    suffix: '%',
  },
] as const;

// Services
export const SERVICES: readonly Service[] = [
  {
    title: 'Cirugía Oral',
    description: 'Tratamiento quirúrgico de afecciones dentoalveolares, lesiones quísticas y anomalías óseas, garantizando una recuperación funcional y estética óptima.',
    videoSrc: '/videos/services/co.mp4',
    poster: '',
  },
  {
    title: 'Exodoncia de Terceros Molares',
    description: 'Procedimientos seguros para la extracción de muelas del juicio retenidas o incluidas, reduciendo el trauma quirúrgico y las molestias postoperatorias.',
    videoSrc: '/videos/services/etm.mp4',
    poster: '',
  },
  {
    title: 'Implantes Dentales y Faciales',
    description: 'Intervenciones para corregir alteraciones esqueleticas del maxilar y la mandibula, mejorando la mordida, la respiracion y la simetria facial.',
    videoSrc: '/videos/services/id.mp4',
    poster: '',
  },
  {
    title: 'Manejo del Dolor Facial y ATM',
    description: 'Alivio efectivo para molestias articulares y musculares.Diagnóstico y tratamiento de disfunciones de la articulación temporomandibular y dolor facial mediante terapias conservadoras o quirúrgicas.',
    videoSrc: '/videos/services/mdfa.mp4',
    poster: '',
  },
  {
    title: 'Tratamiento de Fracturas Faciales',
    description: 'Atención quirúrgica de traumatismos del macizo facial con técnicas que restauran la anatomía, la función y la apariencia natural.',
    videoSrc: '/videos/services/tff.mp4',
    poster: '',
  },
  {
    title: 'Tratamiento de Quistes y Tumores',
    description: 'Tratamiento de lesiones benignas o patológicas en los maxilares, priorizando la preservación funcional y la reconstrucción estructural.',
    videoSrc: '/videos/services/tqt.mp4',
    poster: '',
  },
] as const;

// Analytics IDs (cambiar por IDs reales)
export const ANALYTICS: AnalyticsConfig = {
  googleAnalyticsId: 'G-XXXXXXXXXX',
  facebookPixelId: 'TU_PIXEL_ID',
} as const;

