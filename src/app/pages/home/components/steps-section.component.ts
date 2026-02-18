import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';

interface Step {
  readonly number: number;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly gradientClass: string;
}

/**
 * "How it works" section — 4-step process from consulta to descuento.
 */
@Component({
  selector: 'app-steps-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-surface-alt"
      id="como-funciona"
      aria-labelledby="steps-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-16">
          <span class="inline-block bg-primary-lighter text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Proceso simple
          </span>
          <h2
            id="steps-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            Obtén tu descuento en 4 simples pasos
          </h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">
            El proceso es rápido y sencillo. Nuestro equipo te acompaña durante todo el camino.
          </p>
        </div>

        <!-- Steps -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <!-- Connector line (desktop only) -->
          <div
            class="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-highlight to-success z-0"
            aria-hidden="true"
          ></div>

          @for (step of steps; track step.number) {
            <div class="relative z-10 flex flex-col items-center text-center">
              <!-- Step number badge -->
              <div
                class="w-8 h-8 rounded-full text-white text-sm font-bold font-sans flex items-center justify-center mb-3 -mt-1 ring-4 ring-surface-alt"
                [class]="step.gradientClass"
                [attr.aria-label]="'Paso ' + step.number"
              >
                {{ step.number }}
              </div>

              <!-- Icon circle -->
              <div
                class="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 -mt-12 ring-4 ring-surface-alt shadow-lg"
                [class]="step.gradientClass"
                aria-hidden="true"
              >
                <span class="text-4xl">{{ step.icon }}</span>
              </div>

              <!-- Content -->
              <h3 class="font-sans font-bold text-lg text-text-primary mb-2">{{ step.title }}</h3>
              <p class="text-text-secondary text-sm leading-relaxed">{{ step.description }}</p>
            </div>
          }
        </div>

        <!-- CTA -->
        <div class="mt-14 text-center">
          <a
            [href]="whatsappLink()"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-primary-light text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Comenzar el proceso por WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Comenzar ahora
          </a>
        </div>
      </div>
    </section>
  `,
})
export class StepsSectionComponent {
  private readonly whatsappService = inject(WhatsappService);

  protected readonly whatsappLink = computed(() =>
    this.whatsappService.generateLink(
      'Hola, quiero comenzar el proceso para obtener el descuento en mi comparendo.'
    )
  );

  protected readonly steps: readonly Step[] = [
    {
      number: 1,
      icon: '📱',
      title: 'Consulta tu multa',
      description: 'Verifica tu comparendo en el SIMIT o contáctanos y lo consultamos juntos.',
      gradientClass: 'bg-primary',
    },
    {
      number: 2,
      icon: '📅',
      title: 'Agenda tu cita',
      description: 'Escríbenos por WhatsApp y reserva tu cupo para el curso en el horario que prefieras.',
      gradientClass: 'bg-primary-light',
    },
    {
      number: 3,
      icon: '📝',
      title: 'Realiza el curso',
      description: 'Asiste a nuestras instalaciones. El curso dura 4 horas y es 100% presencial.',
      gradientClass: 'bg-highlight',
    },
    {
      number: 4,
      icon: '✅',
      title: 'Obtén tu descuento',
      description: 'Recibe tu certificado oficial y paga tu comparendo con el 50% o 25% de descuento.',
      gradientClass: 'bg-success',
    },
  ];
}
