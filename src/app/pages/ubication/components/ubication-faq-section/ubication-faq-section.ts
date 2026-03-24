import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Faq } from '@core/models/faq.model';
import { Icon } from '@shared/components';
import { ChevronDownIcon } from 'lucide-angular';

/**
 * Displays an FAQ accordion with common questions about visiting the office.
 *
 * @example
 * ```html
 * <app-ubication-faq-section />
 * ```
 */
@Component({
  selector: 'app-ubication-faq-section',
  imports: [Icon],
  templateUrl: './ubication-faq-section.html',
  styleUrl: './ubication-faq-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UbicationFaqSection {
  /** FAQ items rendered in the accordion list. */
  protected faqItems: Faq[] = [
    {
      id: 1,
      question: '¿Necesito cita previa?',
      answer:
        'Recomendamos agendar cita para garantizar tu cupo y evitar esperas. Sin embargo, también atendemos clientes sin cita previa, sujeto a disponibilidad.',
    },
    {
      id: 2,
      question: '¿Tienen parqueadero?',
      answer:
        'Sí, contamos con parqueadero gratuito para nuestros clientes. Hay espacio para carros y motos. Si está lleno, hay parqueaderos públicos cerca.',
    },
    {
      id: 3,
      question: '¿Puedo ir el mismo día que llamo?',
      answer:
        '¡Sí! Dependiendo de la disponibilidad, podemos atenderte el mismo día. Te recomendamos llamar o escribir primero para confirmar que hay cupos disponibles.',
    },
    {
      id: 4,
      question: '¿Qué documentos debo llevar?',
      answer:
        'Solo necesitas tu cédula de ciudadanía original y el número de tu comparendo. Si no tienes el número, nosotros te ayudamos a consultarlo.',
    },
  ];

  /**
   * Tracks the currently expanded FAQ item ID.
   * Uses `null` when no item is expanded.
   */
  protected readonly openItemId = signal<number | null>(null);

  /** Icon shown in each FAQ header to indicate expand/collapse state. */
  protected readonly ChevronDownIcon = ChevronDownIcon;

  /**
   * Toggles one FAQ item and keeps a single-open accordion behavior.
   *
   * @param id - ID of the FAQ item to toggle.
   */
  protected toggleItem(id: number): void {
    this.openItemId.update((current) => (current === id ? null : id));
  }
}
