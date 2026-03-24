import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AwardIcon,
  CalendarDaysIcon,
  Clock4Icon,
  DollarSignIcon,
  HouseIcon,
  LucideIconData,
  UsersIcon,
} from 'lucide-angular';
import { Icon } from '@shared/components';

/**
 * Represents a single benefit card rendered in the benefits grid.
 */
interface Benefit {
  /** Icon displayed in the benefit card header. */
  readonly icon: LucideIconData;
  /** Benefit headline shown to the user. */
  readonly title: string;
  /** Detailed benefit explanation text. */
  readonly description: string;
  /** Utility classes applied to the icon container appearance. */
  readonly classes: string;
}

/**
 * Benefits grid section showing 6 advantages of taking
 * the pedagogical course at CIA Vial del Llano.
 *
 * @example
 * ```typescript
 * <app-benefits-section />
 * ```
 */
@Component({
  selector: 'app-benefits-section',
  imports: [Icon],
  templateUrl: './benefits-section.html',
  styleUrl: './benefits-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsSection {
  /** Benefit cards displayed in the section grid. */
  protected readonly benefits: readonly Benefit[] = [
    {
      icon: DollarSignIcon,
      title: 'Hasta 50% de descuento',
      description:
        'Obtén el máximo descuento posible en tu comparendo o fotomulta al tomar el curso dentro de los primeros días hábiles.',
      classes: 'bg-success-light text-success',
    },
    {
      icon: AwardIcon,
      title: 'Certificado nacional',
      description:
        'Nuestro certificado está avalado por el Ministerio de Transporte con registro automático en el RUNT, válido en todo Colombia.',
      classes: 'bg-accent-light text-accent',
    },
    {
      icon: Clock4Icon,
      title: 'Solo 4 horas',
      description:
        'El curso tiene una duración de 4 horas presenciales. Invierte un poco de tu tiempo y ahorra mucho en tu multa.',
      classes: 'bg-primary-lighter text-primary',
    },
    {
      icon: CalendarDaysIcon,
      title: 'Horarios flexibles',
      description:
        'Ofrecemos múltiples horarios de lunes a sábado para que puedas asistir cuando más te convenga.',
      classes: 'bg-highlight-light text-highlight',
    },
    {
      icon: UsersIcon,
      title: 'Atención personalizada',
      description:
        'Grupos reducidos con instructores certificados que te guían durante todo el proceso del curso.',
      classes: 'bg-info-light text-info',
    },
    {
      icon: HouseIcon,
      title: 'Instalaciones cómodas',
      description:
        'Aulas climatizadas y equipadas con tecnología moderna para una experiencia de aprendizaje agradable.',
      classes: 'bg-warning-light text-warning',
    },
  ];
}
