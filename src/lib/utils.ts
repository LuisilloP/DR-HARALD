/**
 * Utility Functions
 */

/**
 * Smooth scroll to a section by ID
 */
export const scrollToSection = (id: string): void => {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\+\d{2})(\d{1})(\d{4})(\d{4})/, '$1 $2 $3 $4');
};

/**
 * Get current year for copyright
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate WhatsApp message URL
 */
export const generateWhatsAppUrl = (phone: string, message?: string): string => {
  const baseUrl = `https://wa.me/${phone.replace(/\D/g, '')}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};

/**
 * Convert a Google Maps URL into an embeddable map URL.
 * Supports "place" URLs with coordinates and query-based map URLs.
 */
export const getGoogleMapsEmbedUrl = (googleMapsUrl: string): string => {
  try {
    const parsed = new URL(googleMapsUrl);

    // Already an embed URL
    if (parsed.pathname.includes("/maps/embed")) {
      return googleMapsUrl;
    }

    // Extract coordinates from path segments like: /@-30.57,-71.18,17z
    const coordsMatch = parsed.pathname.match(
      /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+)z/i,
    );
    if (coordsMatch) {
      const [, lat, lng, zoom] = coordsMatch;
      return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
    }

    // Query-based link: https://www.google.com/maps?q=...
    const qParam = parsed.searchParams.get("q");
    if (qParam) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(qParam)}&output=embed`;
    }

    // Place-based fallback: /maps/place/Dr.+Harald+Ziller/...
    const placeMatch = parsed.pathname.match(/\/place\/([^/]+)/i);
    if (placeMatch?.[1]) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
      return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&output=embed`;
    }
  } catch {
    // Fallback to legacy behavior below
  }

  return `${googleMapsUrl}${googleMapsUrl.includes("?") ? "&" : "?"}output=embed`;
};
