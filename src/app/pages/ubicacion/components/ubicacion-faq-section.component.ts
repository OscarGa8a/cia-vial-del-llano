import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

/**
 * FAQ accordion section with expandable questions about visiting the location.
 */
@Component({
  selector: 'app-ubicacion-faq-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 lg:py-16 bg-surface-alt" id="faq" aria-labelledby="faq-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-10">
          <h2 id="faq-heading" class="font-sans font-bold text-2xl md:text-3xl text-text-primary mb-4">
            Preguntas sobre tu visita
          </h2>
        </div>

        <!-- FAQ Items -->
        <div class="max-w-3xl mx-auto space-y-4">
          @for (item of faqItems; track item.question; let idx = $index) {
            <div
              class="faq-item bg-white rounded-2xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
              [attr.aria-expanded]="item.isOpen || false"
            >
              <!-- Question Button -->
              <button
                (click)="toggleFaq(idx)"
                class="w-full flex items-center justify-between p-5 text-left hover:bg-surface-alt transition-colors"
                [attr.aria-controls]="'faq-answer-' + idx"
                [attr.aria-label]="item.question"
              >
                <span class="font-bold text-text-primary pr-4">{{ item.question }}</span>
                <svg
                  class="w-5 h-5 text-primary faq-icon transition-transform duration-300 flex-shrink-0"
                  [style.transform]="item.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              <!-- Answer -->
              <div
                [id]="'faq-answer-' + idx"
                class="faq-answer overflow-hidden transition-all duration-300"
                [style.maxHeight]="item.isOpen ? '500px' : '0px'"
              >
                <div class="px-5 pb-5 text-text-secondary">
                  {{ item.answer }}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class UbicacionFaqSectionComponent {
  protected faqItems: FaqItem[] = [
    {
      question: '¿Necesito cita previa?',
      answer: 'Recomendamos agendar cita para garantizar tu cupo y evitar esperas. Sin embargo, también atendemos clientes sin cita previa, sujeto a disponibilidad.',
      isOpen: false,
    },
    {
      question: '¿Tienen parqueadero?',
      answer: 'Sí, contamos con parqueadero gratuito para nuestros clientes. Hay espacio para carros y motos. Si está lleno, hay parqueaderos públicos cerca.',
      isOpen: false,
    },
    {
      question: '¿Puedo ir el mismo día que llamo?',
      answer: '¡Sí! Dependiendo de la disponibilidad, podemos atenderte el mismo día. Te recomendamos llamar o escribir primero para confirmar que hay cupos disponibles.',
      isOpen: false,
    },
    {
      question: '¿Qué documentos debo llevar?',
      answer: 'Solo necesitas tu cédula de ciudadanía original y el número de tu comparendo. Si no tienes el número, nosotros te ayudamos a consultarlo.',
      isOpen: false,
    },
  ];

  /**
   * Toggle FAQ item open/closed state.
   */
  protected toggleFaq(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
