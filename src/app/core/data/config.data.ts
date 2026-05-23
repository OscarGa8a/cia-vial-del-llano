/**
 * Global configuration for CIA Vial del Llano.
 * All static company data lives here — no backend required.
 */
export const CONFIG = {
  cloudinary: 'https://res.cloudinary.com/dgv4wlorw',
  company: {
    name: 'CIA Vial del Llano',
    fullName: 'Centro Integral de Atención Vial del Llano',
    slogan: 'Cursos para descuento en comparendos y fotomultas',
    nit: '', // Fill in when available
  },
  contact: {
    /** WhatsApp number in international format without + */
    whatsappNumber: '573177865735',
    phone: '317 786 5735',
    email: 'ciavialdelllano@gmail.com',
  },

  address: {
    street: 'Calle 37B # 19A-49',
    neighborhood: 'Los Caracoles',
    city: 'Villavicencio',
    department: 'Meta',
    country: 'Colombia',
    full: 'Calle 37B # 19A-49, Los Caracoles, Villavicencio, Meta',
  },

  hours: {
    weekdays: 'Lunes a Viernes: 8:00 AM – 6:00 PM',
    saturday: 'Sábados: 8:00 AM – 2:00 PM',
    sunday: 'Domingos: Cerrado',
  },

  /** Google Maps embed src URL — uses clean coordinates, no session params */
  mapEmbedUrl:
    'https://www.google.com/maps?q=4.1505191414235805,-73.62014036418411&z=17&hl=es&output=embed',

  /** Google Maps directions URL — opens in app/web with exact pin */
  googleMapsUrl: 'https://www.google.com/maps?q=4.1505191414235805,-73.62014036418411&z=17&hl=es',

  /** Waze navigation URL */
  wazeUrl: 'https://waze.com/ul?ll=4.1505191414235805,-73.62014036418411&navigate=yes',

  social: {
    facebook: 'https://facebook.com/profile.php?id=61590357297488',
    instagram: 'https://instagram.com/ciavialdelllano',
    tiktok: 'https://tiktok.com/@cia.vial.del.llano',
    whatsapp: 'https://wa.me/573177865735',
  },

  /** Default WhatsApp message when no specific context is provided */
  defaultWhatsappMessage:
    'Hola, quiero información sobre los cursos para descuento en comparendos.',

  /**
   * SMDLV 2026 — Salario Mínimo Diario Legal Vigente (daily minimum wage).
   * Base unit used to calculate all traffic fine amounts.
   * Category values: A=4×, B=8×, C=15×, D=30×, E=45×
   */
  smdlvDaily2026: 58363.5,

  stats: {
    courses: '5.000+',
    satisfaction: '98%',
    yearsExperience: '2+',
  },
} as const;
