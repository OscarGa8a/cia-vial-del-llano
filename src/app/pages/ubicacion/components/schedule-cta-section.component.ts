import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Whatsapp } from '@core/services/whatsapp';

/**
 * Schedule a visit CTA section with primary gradient blue card.
 * Features WhatsApp button and note about walk-ins.
 */
@Component({
  selector: 'app-schedule-cta-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 lg:py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div
            class="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
          >
            <!-- Background pattern -->
            <div class="absolute inset-0 dot-pattern opacity-10"></div>

            <div class="relative z-10">
              <!-- Icon -->
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <!-- Heading -->
              <h2 class="font-sans font-bold text-3xl md:text-4xl text-white mb-4">
                ¿Listo para visitarnos?
              </h2>

              <!-- Subheading -->
              <p class="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Agenda tu cita y te esperamos en nuestra sede. Te recomendamos agendar para
                garantizar tu cupo.
              </p>

              <!-- WhatsApp CTA Button -->
              <a
                [href]="whatsapp.generateLink('Hola, quiero agendar una cita para visitarlos')"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl text-lg whatsapp-glow"
                aria-label="Agendar cita por WhatsApp"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  />
                </svg>
                Agendar cita por WhatsApp
              </a>

              <!-- Walk-in note -->
              <p class="mt-4 text-white/60 text-sm">
                <span aria-hidden="true">ℹ️</span>
                También aceptamos visitas sin cita, sujeto a disponibilidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ScheduleCtaSectionComponent {
  protected readonly whatsapp = inject(Whatsapp);
}
