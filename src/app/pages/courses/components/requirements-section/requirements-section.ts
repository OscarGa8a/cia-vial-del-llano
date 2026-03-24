import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BookOpenTextIcon,
  Clock4Icon,
  HashIcon,
  HeartIcon,
  IdCardIcon,
  LucideIconData,
  MailIcon,
  OctagonMinusIcon,
  ShieldIcon,
} from 'lucide-angular';
import { Icon } from '@shared/components';

/**
 * Represents a single enrollment requirement item.
 */
interface Requirement {
  /** Icon shown next to the requirement text. */
  readonly icon: LucideIconData;
  /** User-facing requirement description. */
  readonly text: string;
}

/**
 * Represents a syllabus topic card included in the course content overview.
 */
interface Topic {
  /** Icon displayed in the topic card. */
  readonly icon: LucideIconData;
  /** Topic title displayed as the card heading. */
  readonly title: string;
  /** Short description explaining the topic scope. */
  readonly description: string;
  /** Utility classes applied to topic visual styling. */
  readonly classes: string;
}

/**
 * Requirements and syllabus section for the pedagogical course enrollment flow.
 *
 * @example
 * ```typescript
 * <app-requirements-section />
 * ```
 */
@Component({
  selector: 'app-requirements-section',
  imports: [Icon],
  templateUrl: './requirements-section.html',
  styleUrl: './requirements-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequirementsSection {
  /** Required information and documents users must provide before attending the course. */
  protected readonly requirements: readonly Requirement[] = [
    {
      icon: IdCardIcon,
      text: 'Documento de identidad vigente (cédula de ciudadanía o cédula de extranjería)',
    },
    {
      icon: HashIcon,
      text: 'Número del comparendo o fotomulta (puedes consultarlo en el SIMIT)',
    },
    {
      icon: MailIcon,
      text: 'Correo electrónico activo para recibir tu certificado digital',
    },
    {
      icon: Clock4Icon,
      text: 'Llegar mínimo 30 minutos antes de la hora de inicio del curso',
    },
  ];

  /** Course topics shown as curriculum highlights for prospective students. */
  protected readonly topics: readonly Topic[] = [
    {
      icon: BookOpenTextIcon,
      title: 'Normas de tránsito',
      description: 'Código Nacional de Tránsito, derechos y deberes del conductor.',
      classes: 'bg-primary-lighter text-primary',
    },
    {
      icon: OctagonMinusIcon,
      title: 'Señales viales',
      description: 'Señales reglamentarias, preventivas e informativas en vías.',
      classes: 'bg-highlight-light text-highlight',
    },
    {
      icon: ShieldIcon,
      title: 'Seguridad vial',
      description: 'Prevención de accidentes, conducción defensiva y primeros auxilios.',
      classes: 'bg-success-light text-success',
    },
    {
      icon: HeartIcon,
      title: 'Responsabilidad vial',
      description: 'Impacto social, convivencia y cultura ciudadana en las vías.',
      classes: 'bg-accent-light text-accent',
    },
  ];
}
