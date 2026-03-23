import type { Testimonial } from '../models/testimonial.model';

/** Static testimonials from real customers. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    role: 'Conductor de moto',
    location: 'Villavicencio',
    quote:
      'El proceso fue muy rápido y sencillo. En un solo día hice el curso y al día siguiente pagué mi comparendo con el 50% de descuento. ¡Excelente servicio!',
    rating: 5,
    initials: 'CR',
    avatarColor: 'bg-primary',
  },
  {
    id: 2,
    name: 'María Fernanda López',
    role: 'Conductora particular',
    location: 'Acacías',
    quote:
      'Muy profesionales y organizados. Me explicaron todo el proceso desde el principio y logré ahorrar más de $300.000 en mi fotomulta. Los recomiendo totalmente.',
    rating: 5,
    initials: 'ML',
    avatarColor: 'bg-accent',
  },
  {
    id: 3,
    name: 'Andrés Morales',
    role: 'Transportador de carga',
    location: 'Villavicencio',
    quote:
      'Tenía dos comparendos y me ayudaron con los dos. El curso duró exactamente 4 horas como dijeron. Instalaciones cómodas y el instructor muy claro. Ahorro total: $680.000.',
    rating: 4,
    initials: 'AM',
    avatarColor: 'bg-success',
  },
];
