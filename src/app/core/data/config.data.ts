/**
 * Global configuration for CIA Vial del Llano.
 * All static company data lives here — no backend required.
 */
export const CONFIG = {
  company: {
    name: 'CIA Vial del Llano',
    fullName: 'Centro Integral de Atención Vial del Llano',
    slogan: 'Cursos para descuento en comparendos y fotomultas',
    nit: '', // Fill in when available
  },

  contact: {
    /** WhatsApp number in international format without + */
    whatsappNumber: '573001234567',
    phone: '+57 300 123 4567',
    email: 'info@ciavialdelllano.com',
  },

  address: {
    street: 'Calle 15 # 30-45',
    neighborhood: 'Centro',
    city: 'Villavicencio',
    department: 'Meta',
    country: 'Colombia',
    full: 'Calle 15 # 30-45, Centro, Villavicencio, Meta',
  },

  hours: {
    weekdays: 'Lunes a Viernes: 8:00 AM – 6:00 PM',
    saturday: 'Sábados: 8:00 AM – 2:00 PM',
    sunday: 'Domingos: Cerrado',
  },

  /** Google Maps embed src URL */
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15952.123456789!2d-73.6366!3d4.1533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2e0e0e0e0e0e%3A0x0!2sVillavicencio%2C+Meta!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco',

  /** Google Maps directions URL */
  googleMapsUrl: 'https://maps.google.com/?q=Villavicencio,+Meta,+Colombia',

  /** Waze navigation URL */
  wazeUrl: 'https://waze.com/ul?ll=4.1533,-73.6366&navigate=yes',

  social: {
    facebook: 'https://facebook.com/ciavialdelllano',
    instagram: 'https://instagram.com/ciavialdelllano',
    whatsapp: 'https://wa.me/573001234567',
  },

  /** Default WhatsApp message when no specific context is provided */
  defaultWhatsappMessage:
    'Hola, quiero información sobre los cursos para descuento en comparendos.',

  /** SMDLV value for 2025 in COP */
  smdlv2025: 1423500,

  stats: {
    courses: '5.000+',
    satisfaction: '98%',
    yearsExperience: '10+',
  },
} as const;
