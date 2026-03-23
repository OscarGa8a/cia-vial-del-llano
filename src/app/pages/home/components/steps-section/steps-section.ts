import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { Step } from '../../models';
import {
  BookOpenTextIcon,
  CalendarDaysIcon,
  MonitorSmartphoneIcon,
  SquareCheckBigIcon,
} from 'lucide-angular';
import { StepItem } from './step-item/step-item';
import { Icon } from '@shared/components';

/**
 * Step-by-step process section guiding users through course enrollment and discount claim.
 *
 * Displays four sequential steps from fine verification to receiving the discount:
 * consultation, scheduling, course attendance, and discount application.
 * Includes a WhatsApp link to start the enrollment process.
 *
 * @example
 * ```typescript
 * <app-steps-section />
 * ```
 */
@Component({
  selector: 'app-steps-section',
  imports: [StepItem, Icon],
  templateUrl: './steps-section.html',
  styleUrl: './steps-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsSection {
  /** Service for generating WhatsApp sharing links. */
  private readonly whatsapp = inject(Whatsapp);

  /**
   * WhatsApp link with pre-filled enrollment inquiry message.
   *
   * Generates a WhatsApp conversation starter requesting to begin
   * the process for obtaining the fine discount.
   */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, quiero comenzar el proceso para obtener el descuento en mi comparendo.',
    ),
  );

  /**
   * Sequential steps for the course enrollment funnel.
   *
   * Contains the four steps users follow to complete their course
   * and apply their fine discount.
   */
  protected readonly steps: readonly Step[] = [
    {
      number: 1,
      icon: MonitorSmartphoneIcon,
      title: 'Consulta tu multa',
      description: 'Verifica tu comparendo en el SIMIT o contáctanos y lo consultamos juntos.',
      gradientClass: 'bg-primary',
    },
    {
      number: 2,
      icon: CalendarDaysIcon,
      title: 'Agenda tu cita',
      description:
        'Escríbenos por WhatsApp y reserva tu cupo para el curso en el horario que prefieras.',
      gradientClass: 'bg-primary-light',
    },
    {
      number: 3,
      icon: BookOpenTextIcon,
      title: 'Realiza el curso',
      description: 'Asiste a nuestras instalaciones. El curso dura 4 horas y es 100% presencial.',
      gradientClass: 'bg-highlight',
    },
    {
      number: 4,
      icon: SquareCheckBigIcon,
      title: 'Obtén tu descuento',
      description:
        'Recibe tu certificado oficial y paga tu comparendo con el 50% o 25% de descuento.',
      gradientClass: 'bg-success',
    },
  ];
}
