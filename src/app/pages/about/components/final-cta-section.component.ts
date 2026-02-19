import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Whatsapp } from '@core/services/whatsapp';

/**
 * Final CTA section for the About page.
 * Full-width gradient banner with WhatsApp and location CTA buttons.
 */
@Component({
  selector: 'app-about-final-cta-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary-dark to-accent relative overflow-hidden"
      aria-labelledby="about-cta-heading"
    >
      <!-- Dot pattern overlay -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 36px 36px;"
        aria-hidden="true"
      ></div>

      <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            <path
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.828 0l-4.244-4.243a8 8 0 1 1 11.314 0z"
            />
            <path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
        </div>

        <h2
          id="about-cta-heading"
          class="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight"
        >
          ¿Listo para conocernos
          <span class="text-highlight">en persona</span>?
        </h2>

        <p class="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Visítanos y descubre por qué somos la mejor opción para tu curso
          pedagógico en Villavicencio
        </p>

        <!-- CTA buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            routerLink="/ubicacion"
            class="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.828 0l-4.244-4.243a8 8 0 1 1 11.314 0z"
              />
              <path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            </svg>
            Ver ubicación
          </a>

          <a
            [href]="whatsappLink()"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl animate-[whatsapp-pulse_2s_ease-in-out_infinite]"
            aria-label="Agendar cita por WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              />
            </svg>
            Agendar cita por WhatsApp
          </a>
        </div>

        <!-- Response indicator -->
        <p class="mt-5 text-white/60 text-sm flex items-center justify-center gap-2">
          <span
            class="w-2 h-2 rounded-full bg-whatsapp animate-ping inline-block"
            aria-hidden="true"
          ></span>
          Respuesta en menos de 5 minutos
        </p>
      </div>
    </section>
  `,
})
export class AboutFinalCtaSectionComponent {
  private readonly whatsapp = inject(Whatsapp);

  /** Pre-built WhatsApp link with contextual message. */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero conocer más sobre CIA VIAL DEL LLANO y agendar una cita.',
    ),
  );
}
