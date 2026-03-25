/**
 * Static data for the Contact (Contacto) page.
 * Contains contact option cards, form subject choices,
 * and FAQ quick-link entries.
 */

import {
  CalculatorIcon,
  CircleQuestionMarkIcon,
  GraduationCapIcon,
  LucideIconData,
  MapPinIcon,
} from 'lucide-angular';

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
  readonly icon: LucideIconData;
  readonly classes: string;
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
export const CONTACT_QUICK_LINKS: ContactQuickLink[] = [
  {
    href: '/preguntas-frecuentes',
    label: 'Preguntas Frecuentes',
    description: 'Respuestas a las dudas más comunes sobre cursos y comparendos.',
    icon: CircleQuestionMarkIcon,
    classes: 'bg-accent-light text-accent',
    ariaLabel: 'Ir a preguntas frecuentes',
  },
  {
    href: '/calculadora',
    label: 'Calculadora de Multas',
    description: 'Calcula el valor de tu multa y el descuento disponible.',
    icon: CalculatorIcon,
    classes: 'bg-highlight-light text-highlight',
    ariaLabel: 'Ir a la calculadora de multas',
  },
  {
    href: '/cursos',
    label: 'Cursos Pedagógicos',
    description: 'Conoce nuestros cursos y obtén tu descuento.',
    icon: GraduationCapIcon,
    classes: 'bg-info-light text-info',
    ariaLabel: 'Ver cursos pedagógicos disponibles',
  },
  {
    href: '/ubicacion',
    label: 'Nuestra Ubicación',
    description: 'Encuentra cómo llegar a nuestras instalaciones.',
    icon: MapPinIcon,
    classes: 'bg-success-light text-success',
    ariaLabel: 'Ver ubicación de CIA Vial del Llano',
  },
] as const;
