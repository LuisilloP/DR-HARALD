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
