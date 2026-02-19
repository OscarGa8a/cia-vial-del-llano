/**
 * Static data for the Contact (Contacto) page.
 * Contains contact option cards, form subject choices,
 * and FAQ quick-link entries.
 */

// ── Interfaces ────────────────────────────────────────────────

/** A contact option card displayed in the grid. */
export interface ContactOption {
  readonly title: string;
  readonly description: string;
  /** SVG path data for the card icon. */
  readonly iconPath: string;
  readonly iconBg: string;
  readonly iconColor: string;
  /** If present, the card links to this href. */
  readonly href?: string;
  /** If true, href opens in a new tab. */
  readonly external?: boolean;
  /** Extra Tailwind classes applied to the card root. */
  readonly cardClass?: string;
  /** Accessible label for the link. */
  readonly ariaLabel: string;
}

/** A subject option for the contact form dropdown. */
export interface SubjectOption {
  readonly value: string;
  readonly label: string;
}

/** A quick-link card for the FAQ section. */
export interface ContactQuickLink {
  readonly href: string;
  readonly label: string;
  readonly description: string;
  readonly iconPath: string;
  readonly iconBg: string;
  readonly iconColor: string;
  readonly ariaLabel: string;
}

// ── Data ──────────────────────────────────────────────────────

/** Subject options for the contact form. */
export const CONTACT_SUBJECTS: readonly SubjectOption[] = [
  { value: 'curso', label: 'Información sobre cursos' },
  { value: 'comparendo', label: 'Consulta sobre comparendos' },
  { value: 'descuento', label: 'Descuentos en multas' },
  { value: 'certificado', label: 'Certificados' },
  { value: 'otro', label: 'Otro asunto' },
] as const;

/** Quick links shown in the FAQ quick-links section. */
export const CONTACT_QUICK_LINKS: readonly ContactQuickLink[] = [
  {
    href: '/preguntas-frecuentes',
    label: 'Preguntas Frecuentes',
    description: 'Respuestas a las dudas más comunes sobre cursos y comparendos.',
    iconPath:
      'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01',
    iconBg: 'bg-accent-light',
    iconColor: 'text-accent',
    ariaLabel: 'Ir a preguntas frecuentes',
  },
  {
    href: '/calculadora',
    label: 'Calculadora de Multas',
    description: 'Calcula el valor de tu multa y el descuento disponible.',
    iconPath:
      'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M8 6h8 M8 10h8 M8 14h4',
    iconBg: 'bg-highlight-light',
    iconColor: 'text-highlight',
    ariaLabel: 'Ir a la calculadora de multas',
  },
  {
    href: '/cursos',
    label: 'Cursos Pedagógicos',
    description: 'Conoce nuestros cursos y obtén tu descuento.',
    iconPath:
      'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5',
    iconBg: 'bg-info-light',
    iconColor: 'text-info',
    ariaLabel: 'Ver cursos pedagógicos disponibles',
  },
  {
    href: '/ubicacion',
    label: 'Nuestra Ubicación',
    description: 'Encuentra cómo llegar a nuestras instalaciones.',
    iconPath:
      'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    iconBg: 'bg-success-light',
    iconColor: 'text-success',
    ariaLabel: 'Ver ubicación de CIA Vial del Llano',
  },
] as const;
