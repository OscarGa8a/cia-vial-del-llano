import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';

/**
 * Represents a single step in the enrollment and certification process timeline.
 */
interface ProcessStep {
  /** Sequential step number displayed in the timeline marker. */
  readonly number: number;
  /** Step heading shown as the main action title. */
  readonly title: string;
  /** Supporting text explaining the action performed in this step. */
  readonly description: string;
  /** Utility classes used to style the step number badge. */
  readonly gradientClass: string;
}

/**
 * Step-by-step process section with a 5-step vertical timeline
 * showing how to go from contacting CIA Vial to getting the certificate.
 *
 * @example
 * ```typescript
 * <app-process-section />
 * ```
 */
@Component({
  selector: 'app-process-section',
  imports: [Icon],
  templateUrl: './process-section.html',
  styleUrl: './process-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSection {
  /** WhatsApp service used to generate prefilled CTA links. */
  private readonly whatsapp = inject(Whatsapp);

  /** Prebuilt WhatsApp URL for starting the guided enrollment process. */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso pedagógico para obtener el descuento en mi comparendo. ¿Qué debo hacer?',
    ),
  );

  /** Ordered timeline steps describing the full course process. */
  protected readonly steps: readonly ProcessStep[] = [
    {
      number: 1,
      title: 'Contáctanos por WhatsApp',
      description:
        'Escríbenos con tu número de comparendo o fotomulta. Nuestro equipo te responde en menos de 5 minutos.',
      gradientClass: 'bg-primary',
    },
    {
      number: 2,
      title: 'Verificamos tu comparendo',
      description:
        'Consultamos tu infracción en el SIMIT para confirmar el tipo de comparendo, el plazo disponible y el descuento que aplica.',
      gradientClass: 'bg-primary-light',
    },
    {
      number: 3,
      title: 'Agenda tu curso',
      description:
        'Elige el horario que más te convenga. Tenemos disponibilidad de lunes a sábado con múltiples franjas horarias.',
      gradientClass: 'bg-highlight',
    },
    {
      number: 4,
      title: 'Toma el curso (4 horas)',
      description:
        'Asiste a nuestras instalaciones en Villavicencio. El curso es presencial, dinámico y con instructores certificados.',
      gradientClass: 'bg-highlight-hover',
    },
    {
      number: 5,
      title: 'Recibe tu certificado',
      description:
        'Al finalizar el curso recibes tu certificado oficial registrado en el RUNT. ¡Listo para aplicar tu descuento!',
      gradientClass: 'bg-success',
    },
  ];
}
