/**
 * Static data for the About (Nosotros) page.
 * Contains team members, timeline milestones, certifications,
 * facilities, advantages, and testimonials.
 */

// ── Interfaces ────────────────────────────────────────────────

/** A member of the CIA Vial del Llano team. */
export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly description: string;
  readonly initials: string;
  readonly gradientFrom: string;
  readonly gradientTo: string;
}

/** A milestone in the company timeline. */
export interface TimelineItem {
  readonly year: string;
  readonly title: string;
  readonly description: string;
  readonly badgeColor: string;
}

/** An official certification or endorsement. */
export interface Certification {
  readonly name: string;
  readonly description: string;
  readonly iconBg: string;
  readonly iconColor: string;
  /** SVG path data for the certification icon. */
  readonly iconPath: string;
}

/** A facility area for the gallery section. */
export interface Facility {
  readonly name: string;
  readonly subtitle?: string;
  readonly gradientFrom: string;
  readonly gradientTo: string;
  /** SVG path data for the placeholder icon. */
  readonly iconPath: string;
  /** Whether this item spans 2 columns in the grid. */
  readonly colSpan2?: boolean;
}

/** An advantage/benefit for the "Why Choose Us" section. */
export interface Advantage {
  readonly title: string;
  readonly description: string;
  readonly iconBg: string;
  readonly iconColor: string;
  /** SVG path data for the advantage icon. */
  readonly iconPath: string;
}

/** A customer testimonial. */
export interface Testimonial {
  readonly name: string;
  readonly city: string;
  readonly text: string;
  readonly initials: string;
  readonly initialsBg: string;
  readonly initialsColor: string;
  readonly rating: number;
}

/** A value in the Mission/Vision/Values section. */
export interface CompanyValue {
  readonly label: string;
}

// ── Data ──────────────────────────────────────────────────────

/** Company values list. */
export const COMPANY_VALUES: readonly CompanyValue[] = [
  { label: 'Compromiso' },
  { label: 'Honestidad' },
  { label: 'Calidad' },
  { label: 'Servicio' },
  { label: 'Responsabilidad' },
] as const;

/** Team members displayed on the About page. */
export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    name: 'Carlos Rodríguez',
    role: 'Director General',
    description:
      'Fundador de CIA VIAL DEL LLANO con más de 15 años de experiencia en el sector de tránsito.',
    initials: 'CR',
    gradientFrom: 'from-primary',
    gradientTo: 'to-primary-light',
  },
  {
    name: 'María González',
    role: 'Instructora Principal',
    description:
      'Especialista en educación vial con certificación del Ministerio de Transporte.',
    initials: 'MG',
    gradientFrom: 'from-accent',
    gradientTo: 'to-highlight',
  },
  {
    name: 'Andrea Martínez',
    role: 'Coordinadora Administrativa',
    description:
      'Encargada de atención al cliente y gestión de citas. Siempre dispuesta a ayudar.',
    initials: 'AM',
    gradientFrom: 'from-highlight',
    gradientTo: 'to-success',
  },
] as const;

/** Company history milestones for the timeline section. */
export const TIMELINE_ITEMS: readonly TimelineItem[] = [
  {
    year: '2014',
    title: 'Fundación',
    description:
      'Abrimos nuestras puertas en Villavicencio con la misión de ofrecer educación vial de calidad.',
    badgeColor: 'bg-primary',
  },
  {
    year: '2016',
    title: 'Primeros 1.000 cursos',
    description:
      'Alcanzamos nuestro primer gran hito: 1.000 conductores capacitados exitosamente.',
    badgeColor: 'bg-accent',
  },
  {
    year: '2018',
    title: 'Expansión de instalaciones',
    description:
      'Ampliamos nuestras instalaciones para ofrecer mayor comodidad y capacidad a nuestros usuarios.',
    badgeColor: 'bg-highlight',
  },
  {
    year: '2024',
    title: '10 años de servicio',
    description:
      'Celebramos una década de compromiso con la seguridad vial en los Llanos Orientales.',
    badgeColor: 'bg-success',
  },
  {
    year: '2025',
    title: 'Crecimiento continuo',
    description:
      'Seguimos creciendo y mejorando para servir mejor a nuestra comunidad.',
    badgeColor: 'bg-primary',
  },
] as const;

/** Official certifications and endorsements. */
export const CERTIFICATIONS: readonly Certification[] = [
  {
    name: 'MinTransporte',
    description: 'Habilitados por el Ministerio de Transporte de Colombia',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    iconPath:
      'M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4',
  },
  {
    name: 'RUNT',
    description: 'Integrados al Registro Único Nacional de Tránsito',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    iconPath:
      'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  },
  {
    name: 'SIMIT',
    description:
      'Sistema Integrado de Información sobre Multas y Sanciones',
    iconBg: 'bg-highlight/10',
    iconColor: 'text-highlight',
    iconPath:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    name: 'SuperTransporte',
    description: 'Supervisados por la Superintendencia de Transporte',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    iconPath:
      'M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z',
  },
] as const;

/** Facility areas for the gallery section. */
export const FACILITIES: readonly Facility[] = [
  {
    name: 'Sede Principal',
    subtitle: 'Fachada moderna y accesible',
    gradientFrom: 'from-primary',
    gradientTo: 'to-primary-dark',
    iconPath:
      'M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4',
    colSpan2: true,
  },
  {
    name: 'Recepción',
    gradientFrom: 'from-accent',
    gradientTo: 'to-highlight',
    iconPath:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6',
  },
  {
    name: 'Sala de Espera',
    gradientFrom: 'from-highlight',
    gradientTo: 'to-success',
    iconPath:
      'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    name: 'Aula de Capacitación',
    subtitle: 'Capacidad para 20 personas',
    gradientFrom: 'from-success',
    gradientTo: 'to-primary',
    iconPath:
      'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
    colSpan2: true,
  },
] as const;

/** Advantages for the "Why Choose Us" section. */
export const ADVANTAGES: readonly Advantage[] = [
  {
    title: 'Certificados por MinTransporte',
    description:
      'Avalados oficialmente por el Ministerio de Transporte de Colombia',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    iconPath:
      'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z',
  },
  {
    title: 'Horarios Flexibles',
    description:
      'Cursos en la mañana y en la tarde, adaptados a tu disponibilidad',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  },
  {
    title: 'Atención Personalizada',
    description:
      'Grupos pequeños para garantizar una mejor experiencia de aprendizaje',
    iconBg: 'bg-highlight/10',
    iconColor: 'text-highlight',
    iconPath:
      'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
  },
  {
    title: 'Instalaciones Cómodas',
    description:
      'Aire acondicionado, parqueadero gratuito y espacios accesibles',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    iconPath:
      'M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4',
  },
  {
    title: 'Ubicación Céntrica',
    description:
      'En el centro de Villavicencio, fácil de encontrar y acceder',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    iconPath:
      'M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.828 0l-4.244-4.243a8 8 0 1 1 11.314 0zM15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  },
  {
    title: 'Experiencia Comprobada',
    description:
      'Más de una década de trayectoria exitosa y miles de clientes satisfechos',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    iconPath:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
] as const;

/** Customer testimonials for the About page. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Juan Manuel R.',
    city: 'Villavicencio',
    text: 'Excelente servicio. Me atendieron muy rápido y pude obtener mi certificado el mismo día. El curso fue muy informativo y el instructor muy profesional.',
    initials: 'JM',
    initialsBg: 'bg-primary/20',
    initialsColor: 'text-primary',
    rating: 5,
  },
  {
    name: 'Carolina P.',
    city: 'Acacías, Meta',
    text: 'Muy recomendados. Logré ahorrar más de $300.000 en mi multa gracias al curso. Las instalaciones son muy cómodas y el personal muy amable.',
    initials: 'CP',
    initialsBg: 'bg-accent/20',
    initialsColor: 'text-accent',
    rating: 5,
  },
  {
    name: 'Andrés L.',
    city: 'Granada, Meta',
    text: 'Pensé que iba a perder mi descuento pero me atendieron muy rápido. Llegué a las 10am y a la 1pm ya tenía mi certificado. ¡Gracias!',
    initials: 'AL',
    initialsBg: 'bg-highlight/20',
    initialsColor: 'text-highlight',
    rating: 5,
  },
] as const;

/** Stats displayed on the About page. */
export const ABOUT_STATS = [
  { value: '10+', label: 'Años de experiencia', highlight: false },
  { value: '5.000+', label: 'Cursos realizados', highlight: true },
  { value: '4.500+', label: 'Conductores capacitados', highlight: false },
  { value: '100%', label: 'Certificados válidos', highlight: true },
] as const;
