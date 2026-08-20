import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChevronDownIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

interface MedicalExamsFaq {
  readonly id: number;
  readonly question: string;
  readonly answer: string;
}

/** Local single-open FAQ accordion for the medical exam service. */
@Component({
  selector: 'app-medical-exams-faq-section',
  imports: [Icon],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsFaqSection {
  protected readonly faqs: readonly MedicalExamsFaq[] = [
    {
      id: 1,
      question: '¿Para qué sirven los exámenes médicos para licencia de conducción?',
      answer: 'Son un servicio para personas que realizan trámites de licencia de conducción.',
    },
    {
      id: 2,
      question: '¿Los exámenes médicos pueden aplicar para renovación de licencia?',
      answer: 'Solicita los exámenes médicos y confirma la información disponible para tu renovación.',
    },
    {
      id: 3,
      question: '¿Dónde confirmo cita, ubicación y detalles del servicio?',
      answer: 'Escríbenos por WhatsApp para confirmar los detalles disponibles para tu solicitud.',
    },
    {
      id: 4,
      question: '¿Qué debo llevar?',
      answer: 'Confirma por WhatsApp la documentación disponible para tu solicitud.',
    },
    {
      id: 5,
      question: '¿Cómo confirmo precio, duración y disponibilidad?',
      answer: 'Escríbenos para confirmar precio, duración y disponibilidad.',
    },
    {
      id: 6,
      question: '¿Cómo solicito los exámenes médicos con CIA Vial del Llano?',
      answer: 'Escríbenos por WhatsApp para solicitar los exámenes médicos para tu licencia de conducción.',
    },
  ];
  protected readonly openFaqId = signal<number | null>(null);
  protected readonly ChevronDownIcon = ChevronDownIcon;

  /** Opens one answer at a time, or closes the current answer. */
  protected toggleItem(id: number): void {
    this.openFaqId.update((current) => (current === id ? null : id));
  }
}
