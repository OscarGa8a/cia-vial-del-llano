import {
  BadgeCheckIcon,
  Building2Icon,
  BusIcon,
  CircleCheckIcon,
  Clock4Icon,
  DatabaseIcon,
  LandmarkIcon,
  LucideIconData,
  UsersIcon,
} from 'lucide-angular';

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
  readonly icon: LucideIconData;
  readonly classes: string;
}

/** A facility area for the gallery section. */
export interface Facility {
  readonly name: string;
  readonly subtitle?: string;
  image: string;
  /** Whether this item spans 2 columns in the grid. */
  readonly colSpan2?: boolean;
}

/** An advantage/benefit for the "Why Choose Us" section. */
export interface Advantage {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIconData;
  readonly classes: string;
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
export const COMPANY_VALUES: CompanyValue[] = [
  { label: 'Compromiso' },
  { label: 'Honestidad' },
  { label: 'Calidad' },
  { label: 'Servicio' },
  { label: 'Responsabilidad' },
] as const;

export const COMPANY: { MISSION: string; VISSION: string } = {
  MISSION:
    'Capacitar e instruir a los infractores de las normas de tránsito colombianas mediante procesos pedagógicos integrales, promoviendo la reflexión, el respeto por la vida y la cultura vial. Nuestro compromiso es contribuir a la transformación del comportamiento ciudadano en las vías, fortaleciendo la seguridad vial y el cumplimiento normativo.',
  VISSION:
    'Ser en 2030 el centro de atención a infractores más reconocido en el departamento del Meta por su excelencia educativa, innovación metodológica y aporte significativo a la reducción de la siniestralidad vial, consolidando una ciudadanía más consciente, responsable y comprometida con la movilidad segura.',
};

/** Team members displayed on the About page. */
export const TEAM_MEMBERS: TeamMember[] = [
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
    description: 'Especialista en educación vial con certificación del Ministerio de Transporte.',
    initials: 'MG',
    gradientFrom: 'from-accent',
    gradientTo: 'to-highlight',
  },
  {
    name: 'Andrea Martínez',
    role: 'Coordinadora Administrativa',
    description: 'Encargada de atención al cliente y gestión de citas. Siempre dispuesta a ayudar.',
    initials: 'AM',
    gradientFrom: 'from-highlight',
    gradientTo: 'to-success',
  },
] as const;

/** Company history milestones for the timeline section. */
export const TIMELINE_ITEMS: readonly TimelineItem[] = [
  {
    year: '2024',
    title: 'Fundación',
    description:
      'Abrimos nuestras puertas en Villavicencio con la misión de ofrecer educación vial de calidad.',
    badgeColor: 'bg-primary',
  },
  {
    year: '2025',
    title: 'Consolidación del servicio',
    description:
      'Fortalecimos nuestros procesos de atención y formación para brindar una experiencia cada vez más eficiente.',
    badgeColor: 'bg-accent',
  },
  {
    year: '2026',
    title: 'Crecimiento continuo',
    description:
      'Seguimos mejorando desde nuestra sede actual para servir mejor a nuestra comunidad.',
    badgeColor: 'bg-highlight',
  },
] as const;

/** Official certifications and endorsements. */
export const CERTIFICATIONS: Certification[] = [
  {
    name: 'MinTransporte',
    description: 'Habilitados por el Ministerio de Transporte de Colombia',
    icon: Building2Icon,
    classes: 'bg-primary/10 text-primary',
  },
  {
    name: 'RUNT',
    description: 'Integrados al Registro Único Nacional de Tránsito',
    icon: DatabaseIcon,
    classes: 'bg-accent/10 text-accent',
  },
  {
    name: 'SIMIT',
    description: 'Sistema Integrado de Información sobre Multas y Sanciones',
    icon: BadgeCheckIcon,
    classes: 'bg-highlight/10 text-highlight',
  },
  {
    name: 'SuperTransporte',
    description: 'Supervisados por la Superintendencia de Transporte',
    icon: LandmarkIcon,
    classes: 'bg-success/10 text-success',
  },
] as const;

/** Facility areas for the gallery section. */
export const FACILITIES: readonly Facility[] = [
  {
    name: 'Sede Principal',
    subtitle: 'Fachada moderna y accesible',
    image: 'IMG_2815_lmf9bl',
    colSpan2: true,
  },
  {
    name: 'Recepción',
    image: 'IMG_2838_bfp9tu',
  },
  {
    name: 'Sala de Espera',
    image: 'IMG_2858_uhaegq',
  },
  {
    name: 'Aula de Capacitación 1',
    subtitle: 'Capacidad para 20 personas',
    image: 'IMG_2805_fniavi',
    colSpan2: true,
  },
  {
    name: 'Aula de Capacitación 2',
    subtitle: 'Capacidad para 8 personas',
    image: 'IMG_2819_q59bxh',
    colSpan2: true,
  },
] as const;

/** Advantages for the "Why Choose Us" section. */
export const ADVANTAGES: Advantage[] = [
  {
    title: 'Certificados por MinTransporte',
    description: 'Avalados oficialmente por el Ministerio de Transporte de Colombia',
    icon: BadgeCheckIcon,
    classes: 'bg-primary/10 text-primary',
  },
  {
    title: 'Horarios Flexibles',
    description: 'Cursos en la mañana y en la tarde, adaptados a tu disponibilidad',
    icon: Clock4Icon,
    classes: 'bg-accent/10 text-accent',
  },
  {
    title: 'Atención Personalizada',
    description: 'Grupos pequeños para garantizar una mejor experiencia de aprendizaje',
    icon: UsersIcon,
    classes: 'bg-highlight/10 text-highlight',
  },
  {
    title: 'Instalaciones Cómodas',
    description: 'Aire acondicionado, parqueadero gratuito y espacios accesibles',
    icon: Building2Icon,
    classes: 'bg-success/10 text-success',
  },
  {
    title: 'Fácil acceso en transporte público',
    description:
      'Ubicados en Villavicencio con rutas de transporte público cercanas para llegar de forma sencilla',
    icon: BusIcon,
    classes: 'bg-primary/10 text-primary',
  },
  {
    title: 'Experiencia Comprobada',
    description: 'Más de 2 años de trayectoria exitosa y miles de clientes satisfechos',
    icon: CircleCheckIcon,
    classes: 'bg-accent/10 text-accent',
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
  { value: '2+', label: 'Años de experiencia', highlight: false },
  { value: '1.000+', label: 'Cursos realizados', highlight: true },
  { value: '1.500+', label: 'Conductores capacitados', highlight: false },
  { value: '100%', label: 'Certificados válidos', highlight: true },
] as const;
