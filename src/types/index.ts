/**
 * Type Definitions
 */

// Navigation Item Type
export interface NavItem {
  readonly label: string;
  readonly target: string;
}

// Service Type
export interface Service {
  readonly title: string;
  readonly description: string;
  readonly videoSrc: string;
  readonly poster: string;
}

// Stat Type (for Hero Section)
export interface Stat {
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
}

// Link Type
export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

// Contact Information Type
export interface ContactInfo {
  readonly phone: string;
  readonly whatsappUrl: string;
  readonly email: string;
  readonly address: {
    readonly street: string;
    readonly city: string;
    readonly region: string;
    readonly postalCode: string;
    readonly country: string;
    readonly countryCode: string;
    readonly full: string;
    readonly googleMapsUrl: string;
  };
  readonly schedule: {
    readonly weekdays: string;
    readonly hours: string;
    readonly full: string;
  };
}

// Social Media Links Type
export interface SocialMediaLinks {
  readonly instagram: string;
  readonly facebook: string;
  readonly linkedin: string;
}

// Doctor Information Type
export interface DoctorInfo {
  readonly name: string;
  readonly title: string;
  readonly subtitle: string;
  readonly fullTitle: string;
  readonly location: string;
}

// Site Information Type
export interface SiteInfo {
  readonly url: string;
  readonly name: string;
  readonly description: string;
}

// Analytics IDs Type
export interface AnalyticsConfig {
  readonly googleAnalyticsId: string;
  readonly facebookPixelId: string;
}
