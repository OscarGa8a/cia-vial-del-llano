import { CONFIG } from '@core/data/config.data';

/** Base site URL used to build canonical and absolute SEO asset links. */
const SITE_URL = 'https://cia-vial-del-llano.vercel.app/';

/**
 * Global SEO defaults and structured-data helpers for the full application.
 *
 * Includes metadata defaults, social card settings, business identity,
 * product schema defaults, and shipping schema defaults.
 */
export const SEO_CONFIG = {
  siteName: CONFIG.company.name,
  siteUrl: SITE_URL,
  cloudinaryBaseUrl: CONFIG.cloudinary,

  defaultTitle: 'CIA Vial del Llano | Cursos para Descuento en Comparendos',
  defaultDescription:
    'Reducí tus multas de tránsito hasta un 50% con el curso pedagógico de CIA Vial del Llano en Villavicencio, Meta. Ley 1383 de 2010. Atención presencial.',
  defaultKeywords: [
    'cursos comparendos',
    'descuento multas tránsito',
    'CIA Vial del Llano',
    'Villavicencio',
    'Meta',
    'curso pedagógico',
    'fotomultas',
    'Ley 1383',
  ],

  defaultImage: 'banner_about_1_zujpli',
  defaultImageAlt: 'CIA Vial del Llano - Cursos para Descuento en Comparendos',
  ogType: 'website',
  locale: 'es_CO',
  facebookAppId: '1506665477732519',

  twitterCard: 'summary_large_image',
  twitterSite: '',

  business: {
    name: CONFIG.company.name,
    alternateName: CONFIG.company.fullName,
    description: CONFIG.company.slogan,
    email: CONFIG.contact.email,
    phone: CONFIG.contact.phone,
    addressLocality: CONFIG.address.city,
    addressRegion: CONFIG.address.department,
    addressCountry: 'CO',
    latitude: '4.1533',
    longitude: '-73.6366',
    socialLinks: [CONFIG.social.facebook, CONFIG.social.instagram, CONFIG.social.whatsapp],
    priceRange: '$$',
    foundingLocation: CONFIG.address.city,
    slogan: CONFIG.company.slogan,
    currenciesAccepted: 'COP',
    paymentAccepted: 'Cash, Credit Card',
  },

  product: {
    brand: CONFIG.company.name,
    brandLogo: `${SITE_URL}/images/logo.svg`,
    condition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/InStock',
    currency: 'COP',
    seller: CONFIG.company.name,
  },

  shipping: {
    destination: 'CO',
    businessDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    cutoffTime: '17:00:00-05:00',
    handlingTimeMin: 1,
    handlingTimeMax: 2,
    transitTimeMin: 3,
    transitTimeMax: 6,
    unitCode: 'DAY',
  },
};

/** Defines SEO metadata used by a single route-level page. */
export interface PageSeoEntry {
  /** Title used in the document head and social previews. */
  title: string;
  /** Description used in search snippets and social cards. */
  description: string;
  /** Keywords included in the standard keywords meta tag. */
  keywords: string[];
}

/**
 * Route-level SEO overrides keyed by page slug.
 *
 * These values are consumed by page components to provide specific metadata
 * while preserving shared defaults from SEO_CONFIG.
 */
export const PAGE_SEO_CONFIG: Record<string, PageSeoEntry> = {
  home: {
    title: 'Cursos para Descuento en Comparendos | CIA Vial - Villavicencio',
    description:
      'Reducí tus multas de tránsito hasta un 50% con el curso pedagógico de CIA Vial del Llano en Villavicencio, Meta. Ley 1383 de 2010. Atención presencial.',
    keywords: [
      'cursos comparendos',
      'descuento multas tránsito',
      'CIA Vial del Llano',
      'Villavicencio',
      'curso pedagógico',
      'fotomultas',
      'Ley 1383',
    ],
  },
  courses: {
    title: 'Curso Pedagógico de Comparendos en Villavicencio | CIA Vial',
    description:
      'Inscribite al curso pedagógico de tránsito y obtené descuento del 50% en comparendos y fotomultas. Ley 1383 de 2010. Villavicencio, Meta.',
    keywords: [
      'curso pedagógico tránsito',
      'descuento comparendos',
      'Ley 1383',
      'Villavicencio',
      'fotomultas',
      'descuento 50%',
    ],
  },
  calculator: {
    title: 'Calculadora de Multas de Tránsito 2026 | CIA Vial del Llano',
    description:
      'Calculá el valor exacto de tu multa de tránsito y los descuentos disponibles. Consultá infracciones y montos según SMDLV 2026 en Colombia.',
    keywords: [
      'calculadora multas tránsito',
      'valor comparendo Colombia',
      'infracciones tránsito',
      'SMDLV 2026',
      'descuento comparendo',
    ],
  },
  ubication: {
    title: 'Ubicación y Horarios | CIA Vial del Llano - Villavicencio, Meta',
    description:
      'Encontranos en Calle 37B # 19A-49, Los Caracoles, Villavicencio, Meta. Lunes a viernes 8am–6pm, sábados 8am–2pm.',
    keywords: [
      'ubicación CIA Vial del Llano',
      'Villavicencio Meta',
      'dirección cursos comparendos',
      'horarios atención',
    ],
  },
  faq: {
    title: 'Preguntas Frecuentes sobre Comparendos | CIA Vial del Llano',
    description:
      'Resolvemos tus dudas sobre los cursos pedagógicos, requisitos, descuentos en comparendos y fotomultas. Todo lo que necesitás saber.',
    keywords: [
      'preguntas frecuentes comparendos',
      'dudas curso pedagógico',
      'requisitos curso tránsito',
      'cómo funciona descuento',
    ],
  },
  about: {
    title: 'Nosotros | CIA Vial del Llano - Centro Integral de Atención Vial',
    description:
      'Conocé al equipo de CIA Vial del Llano, Centro Integral de Atención Vial del Llano. Más de 2 años ayudando conductores en Villavicencio, Meta.',
    keywords: [
      'quiénes somos CIA Vial del Llano',
      'centro atención vial',
      'Villavicencio Meta',
      'historia empresa',
    ],
  },
  contact: {
    title: 'Contacto | CIA Vial del Llano - +57 321 287 8660',
    description:
      'Contactanos para información sobre cursos y descuentos en comparendos. WhatsApp: +57 321 287 8660. Email: ciavialdelllano@gmail.com.',
    keywords: [
      'contacto CIA Vial del Llano',
      'WhatsApp cursos comparendos',
      'teléfono Villavicencio',
      'email CIA Vial',
    ],
  },
};
