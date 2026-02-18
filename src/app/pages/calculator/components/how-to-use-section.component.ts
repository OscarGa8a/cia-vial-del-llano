import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Step {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

/**
 * "How to use the calculator" section — 3-step guide.
 */
@Component({
  selector: 'app-how-to-use-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 bg-white" aria-labelledby="how-to-heading">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="how-to-heading"
          class="text-center font-sans font-bold text-3xl text-primary mb-12"
        >
          ¿Cómo usar la calculadora?
        </h2>

        <ol class="grid md:grid-cols-3 gap-8 list-none" aria-label="Pasos para calcular tu multa">
          @for (step of steps; track step.number) {
            <li class="flex flex-col items-center text-center">
              <div
                class="w-16 h-16 bg-primary-lighter text-primary rounded-full flex items-center justify-center mb-4 text-2xl font-bold font-sans"
                aria-hidden="true"
              >
                {{ step.number }}
              </div>
              <h3 class="font-bold text-lg text-gray-800 mb-2">{{ step.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ step.description }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class HowToUseSectionComponent {
  protected readonly steps: readonly Step[] = [
    {
      number: '1',
      title: 'Selecciona la Infracción',
      description:
        'Elige si fue manual (agente de tránsito) o fotomulta, y busca el código de tu infracción en el formulario o en la tabla.',
    },
    {
      number: '2',
      title: 'Ingresa la Fecha',
      description:
        'Coloca la fecha exacta que aparece en tu comparendo. El sistema calculará los días hábiles transcurridos.',
    },
    {
      number: '3',
      title: 'Mira tu Ahorro',
      description:
        'Verás cuánto pagas con el descuento disponible y hasta cuándo tienes plazo. Luego agenda tu curso por WhatsApp.',
    },
  ] as const;
}
