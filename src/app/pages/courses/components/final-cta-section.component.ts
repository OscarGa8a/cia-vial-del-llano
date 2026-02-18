import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services/whatsapp';
import { CONFIG } from '../../../core/data/config.data';

/**
 * Final CTA section for the courses page.
 * Full-width gradient banner with WhatsApp CTA and trust stats.
 */
@Component({
  selector: 'app-courses-final-cta-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-gradient-to-br from-primary via-primary-dark to-accent relative overflow-hidden"
      aria-labelledby="courses-final-cta-heading"
    >
      <!-- Background dot pattern -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 36px 36px;"
        aria-hidden="true"
      ></div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Icon -->
        <div
          class="w-20 h-20 mx-auto rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-8"
          aria-hidden="true"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="1.5"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
          </svg>
        </div>

        <h2
          id="courses-final-cta-heading"
          class="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight"
        >
          ¿Listo para obtener tu
          <span class="text-highlight">descuento?</span>
        </h2>

        <p class="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          No dejes pasar más tiempo. Cada día que pasa reduces tus posibilidades de obtener el
          máximo descuento. Agenda tu curso hoy mismo.
        </p>

        <!-- CTA button -->
        <a
          [href]="whatsappLink()"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl animate-[whatsapp-pulse_2s_ease-in-out_infinite]"
          aria-label="Agendar curso pedagógico por WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
          Agendar mi curso ahora
        </a>

        <!-- Response time -->
        <p class="mt-5 text-white/60 text-sm flex items-center justify-center gap-2">
          <span
            class="w-2 h-2 rounded-full bg-whatsapp animate-ping inline-block"
            aria-hidden="true"
          ></span>
          Respuesta en menos de 5 minutos
        </p>

        <!-- Trust stats -->
        <div class="mt-14 grid grid-cols-3 divide-x divide-white/20 glass rounded-2xl py-6">
          @for (stat of stats; track stat.label) {
            <div class="flex flex-col items-center text-center px-4">
              <span class="font-sans font-bold text-2xl sm:text-3xl text-highlight">{{
                stat.value
              }}</span>
              <span class="text-white/70 text-xs sm:text-sm mt-1">{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class CoursesFinalCtaSectionComponent {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso pedagógico para obtener el descuento en mi comparendo. ¿Cuándo hay disponibilidad?',
    ),
  );

  protected readonly stats = [
    { value: CONFIG.stats.courses, label: 'Cursos realizados' },
    { value: CONFIG.stats.satisfaction, label: 'Clientes satisfechos' },
    { value: CONFIG.stats.yearsExperience, label: 'Años de experiencia' },
  ] as const;
}
