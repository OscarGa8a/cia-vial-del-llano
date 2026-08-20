import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChevronDownIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

interface LicenseRenewalFaq {
  readonly id: number;
  readonly question: string;
  readonly answer: string;
}

/** Local single-open FAQ accordion for the refrendación service. */
@Component({
  selector: 'app-license-renewal-faq-section',
  imports: [Icon],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseRenewalFaqSection {
  protected readonly faqs: readonly LicenseRenewalFaq[] = [
    {
      id: 1,
      question: '¿Qué es la refrendación o renovación de la licencia de conducción?',
      answer: 'La refrendación o renovación actualiza la vigencia de tu licencia de conducción cuando llega su fecha de vencimiento.',
    },
    {
      id: 2,
      question: '¿Cómo sé si mi licencia necesita renovación?',
      answer: 'Revisa la fecha de vencimiento que aparece en tu licencia para saber si necesitas solicitar la renovación.',
    },
    {
      id: 3,
      question: '¿Qué información es útil para iniciar la refrendación?',
      answer: 'Puedes compartir la información disponible de tu licencia y el motivo por el que deseas solicitar el servicio.',
    },
    {
      id: 4,
      question: '¿Debo confirmar cita, documentos, valor o disponibilidad?',
      answer: 'Sí. Escríbenos para confirmar los detalles disponibles para tu solicitud.',
    },
    {
      id: 5,
      question: '¿Cómo solicito el servicio de refrendación con CIA Vial del Llano?',
      answer: 'Escríbenos por WhatsApp para solicitar la refrendación o renovación de tu licencia y confirmar los detalles para tu caso.',
    },
  ];
  protected readonly openFaqId = signal<number | null>(null);
  protected readonly ChevronDownIcon = ChevronDownIcon;

  /** Opens one answer at a time, or closes the current answer. */
  protected toggleItem(id: number): void {
    this.openFaqId.update((current) => (current === id ? null : id));
  }
}
