import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services/whatsapp';

interface ProcessStep {
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly gradientClass: string;
}

/**
 * Step-by-step process section with a 5-step vertical timeline
 * showing how to go from contacting CIA Vial to getting the certificate.
 */
@Component({
  selector: 'app-process-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 bg-white" aria-labelledby="process-heading">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-16">
          <span
            class="inline-block bg-primary-lighter text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
          >
            Paso a paso
          </span>
          <h2
            id="process-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            ¿Cómo obtener tu descuento?
          </h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">
            Sigue estos 5 simples pasos y obtén tu certificado oficial para aplicar el descuento en
            tu comparendo.
          </p>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div
            class="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-highlight to-success"
            aria-hidden="true"
          ></div>

          <ol class="flex flex-col gap-10" role="list">
            @for (step of steps; track step.number; let isLast = $last) {
              <li class="relative flex items-start gap-6 sm:gap-8">
                <!-- Step number circle -->
                <div
                  class="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-sans font-bold text-lg sm:text-xl shadow-lg shrink-0 ring-4 ring-white"
                  [class]="step.gradientClass"
                  [attr.aria-label]="'Paso ' + step.number"
                >
                  {{ step.number }}
                </div>

                <!-- Step content -->
                <div class="pt-1 sm:pt-3 pb-2">
                  <h3 class="font-sans font-bold text-lg sm:text-xl text-text-primary mb-2">
                    {{ step.title }}
                  </h3>
                  <p class="text-text-secondary text-sm sm:text-base leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </li>
            }
          </ol>
        </div>

        <!-- CTA -->
        <div class="mt-14 text-center">
          <a
            [href]="whatsappLink()"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Comenzar el proceso por WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              />
            </svg>
            Comenzar ahora — Paso 1
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ProcessSectionComponent {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso pedagógico para obtener el descuento en mi comparendo. ¿Qué debo hacer?',
    ),
  );

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
