/**
 * Site Configuration Constants
 */

import type {
  AnalyticsConfig,
  ContactInfo,
  DoctorInfo,
  FooterLink,
  NavItem,
  Service,
  SiteInfo,
  SocialMediaLinks,
  Stat,
} from "@/types";
import { siteContent } from "./content";

// Contact Information
export const CONTACT: ContactInfo = siteContent.contact;

// Social Media Links
export const SOCIAL_MEDIA: SocialMediaLinks = siteContent.socialMedia;

// Doctor Information
export const DOCTOR: DoctorInfo = siteContent.doctor;

// Site Information
export const SITE: SiteInfo = siteContent.site;

// Navigation Items
export const NAV_ITEMS: readonly NavItem[] = siteContent.navigation.items;
export const NAVIGATION_CTA_LABEL: string = siteContent.navigation.ctaLabel;

// Footer Links
export const FOOTER_LINKS: readonly FooterLink[] = siteContent.footerLinks;

// Hero Stats
export const HERO_STATS: readonly Stat[] = siteContent.hero.stats;

// Services
export const SERVICES: readonly Service[] = siteContent.services;

// Analytics IDs (cambiar por IDs reales)
export const ANALYTICS: AnalyticsConfig = siteContent.analytics;
