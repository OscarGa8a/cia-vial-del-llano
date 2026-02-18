import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Whatsapp } from '@core/services/whatsapp';
import { CONFIG } from '../../../core/data/config.data';

/**
 * Hero section for the home page.
 * Full-viewport gradient with headline, stats bar, dual CTA and SVG illustration.
 */
@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="hero-gradient min-h-screen flex flex-col justify-center pt-20 pb-0"
      aria-labelledby="hero-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          <!-- Left: Content -->
          <div class="text-white z-10">
            <!-- Urgency badge -->
            <div
              class="inline-flex items-center gap-2 bg-highlight/20 border border-highlight/40 text-highlight text-sm font-semibold px-4 py-2 rounded-full mb-6"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              ¡No pierdas tu descuento! Los plazos son estrictos
            </div>

            <!-- Heading -->
            <h1
              id="hero-heading"
              class="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Ahorra hasta el
              <span class="text-highlight">50%</span>
              en tus multas de tránsito
            </h1>

            <!-- Subheading -->
            <p class="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Cursos pedagógicos certificados por el Ministerio de Transporte. Obtén tu descuento en
              comparendos y fotomultas en el Meta.
            </p>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                [href]="whatsappLink()"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Agenda tu curso ahora por WhatsApp"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                Agenda tu curso ahora
              </a>
              <a
                routerLink="/calculadora"
                class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 hover:border-white/80 text-white font-semibold text-lg transition-all hover:bg-white/10"
                aria-label="Ir a la calculadora de multas"
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
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="12" y2="14" />
                </svg>
                Calcular mi descuento
              </a>
            </div>

            <!-- Trust micro-badges -->
            <div class="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              @for (badge of trustBadges; track badge) {
                <div class="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {{ badge }}
                </div>
              }
            </div>
          </div>

          <!-- Right: SVG Illustration -->
          <div class="hidden lg:flex items-center justify-center z-10">
            <div class="relative animate-[float_6s_ease-in-out_infinite]" aria-hidden="true">
              <svg
                width="460"
                height="340"
                viewBox="0 0 460 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Road -->
                <ellipse cx="230" cy="310" rx="200" ry="18" fill="rgba(255,255,255,0.06)" />
                <!-- Road lines -->
                <rect x="210" y="295" width="40" height="6" rx="3" fill="rgba(255,255,255,0.2)" />

                <!-- Car body -->
                <rect
                  x="80"
                  y="200"
                  width="160"
                  height="70"
                  rx="12"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="2"
                />
                <!-- Car cabin -->
                <path
                  d="M100 200 L120 160 L200 160 L220 200Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="2"
                />
                <!-- Car windows -->
                <rect x="125" y="165" width="35" height="28" rx="4" fill="rgba(255,255,255,0.35)" />
                <rect x="168" y="165" width="35" height="28" rx="4" fill="rgba(255,255,255,0.35)" />
                <!-- Car wheels -->
                <circle
                  cx="120"
                  cy="274"
                  r="22"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.4)"
                  stroke-width="3"
                />
                <circle cx="120" cy="274" r="10" fill="rgba(255,255,255,0.25)" />
                <circle
                  cx="200"
                  cy="274"
                  r="22"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.4)"
                  stroke-width="3"
                />
                <circle cx="200" cy="274" r="10" fill="rgba(255,255,255,0.25)" />
                <!-- Headlights -->
                <rect x="232" y="215" width="12" height="20" rx="4" fill="rgba(245,166,35,0.7)" />
                <rect x="232" y="245" width="12" height="12" rx="3" fill="rgba(245,166,35,0.5)" />
                <!-- Car grill -->
                <rect
                  x="232"
                  y="210"
                  width="12"
                  height="50"
                  rx="2"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.2)"
                  stroke-width="1"
                />

                <!-- Discount badge on car -->
                <circle cx="160" cy="185" r="28" fill="#C8102E" opacity="0.9" />
                <text
                  x="160"
                  y="182"
                  text-anchor="middle"
                  font-family="Poppins,sans-serif"
                  font-weight="700"
                  font-size="13"
                  fill="white"
                >
                  50%
                </text>
                <text
                  x="160"
                  y="197"
                  text-anchor="middle"
                  font-family="Inter,sans-serif"
                  font-size="8"
                  fill="rgba(255,255,255,0.9)"
                >
                  DESCUENTO
                </text>

                <!-- Motorcycle body -->
                <ellipse cx="340" cy="245" rx="50" ry="18" fill="rgba(255,255,255,0.1)" />
                <!-- Moto frame -->
                <path
                  d="M295 245 L320 210 L360 210 L385 245"
                  stroke="rgba(255,255,255,0.5)"
                  stroke-width="4"
                  fill="none"
                  stroke-linecap="round"
                />
                <!-- Moto body panel -->
                <path
                  d="M310 245 L325 215 L355 215 L370 245Z"
                  fill="rgba(255,255,255,0.18)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="1.5"
                />
                <!-- Moto seat -->
                <ellipse
                  cx="340"
                  cy="213"
                  rx="22"
                  ry="7"
                  fill="rgba(255,255,255,0.25)"
                  stroke="rgba(255,255,255,0.35)"
                  stroke-width="1.5"
                />
                <!-- Moto handlebars -->
                <path
                  d="M358 215 L372 205 M358 215 L372 225"
                  stroke="rgba(255,255,255,0.5)"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <!-- Moto wheels -->
                <circle
                  cx="300"
                  cy="264"
                  r="20"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.4)"
                  stroke-width="3"
                />
                <circle cx="300" cy="264" r="9" fill="rgba(255,255,255,0.2)" />
                <circle
                  cx="380"
                  cy="264"
                  r="20"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.4)"
                  stroke-width="3"
                />
                <circle cx="380" cy="264" r="9" fill="rgba(255,255,255,0.2)" />
                <!-- Moto headlight -->
                <circle
                  cx="386"
                  cy="230"
                  r="8"
                  fill="rgba(245,166,35,0.6)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="1.5"
                />

                <!-- Shield / certificate badge -->
                <path
                  d="M340 60 L380 80 L380 120 Q380 145 340 160 Q300 145 300 120 L300 80 Z"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.4)"
                  stroke-width="2"
                />
                <!-- Checkmark in shield -->
                <path
                  d="M320 110 L333 123 L360 95"
                  stroke="#10B981"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                />
                <!-- Shield stars -->
                <text
                  x="340"
                  y="140"
                  text-anchor="middle"
                  font-size="10"
                  fill="rgba(245,166,35,0.8)"
                >
                  ★ ★ ★
                </text>

                <!-- Floating money icon -->
                <circle
                  cx="80"
                  cy="120"
                  r="30"
                  fill="rgba(245,166,35,0.15)"
                  stroke="rgba(245,166,35,0.4)"
                  stroke-width="2"
                />
                <text
                  x="80"
                  y="127"
                  text-anchor="middle"
                  font-family="Poppins,sans-serif"
                  font-weight="700"
                  font-size="18"
                  fill="rgba(245,166,35,0.9)"
                >
                  $
                </text>

                <!-- Floating percentage icon -->
                <circle
                  cx="420"
                  cy="150"
                  r="24"
                  fill="rgba(200,16,46,0.15)"
                  stroke="rgba(200,16,46,0.4)"
                  stroke-width="2"
                />
                <text
                  x="420"
                  y="158"
                  text-anchor="middle"
                  font-family="Poppins,sans-serif"
                  font-weight="700"
                  font-size="14"
                  fill="rgba(200,16,46,0.9)"
                >
                  %
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="glass border-t border-white/10 mt-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-3 divide-x divide-white/10">
            @for (stat of stats; track stat.label) {
              <div class="py-5 flex flex-col items-center text-center">
                <span class="font-sans font-bold text-2xl sm:text-3xl text-highlight">{{
                  stat.value
                }}</span>
                <span class="text-white/70 text-xs sm:text-sm mt-1">{{ stat.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="relative h-20 overflow-hidden">
        <svg
          class="absolute bottom-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="white"
          aria-hidden="true"
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso para obtener el descuento en mi comparendo.',
    ),
  );

  protected readonly trustBadges = ['MinTransporte', 'RUNT', 'SIMIT', 'Supertransporte'] as const;

  protected readonly stats = [
    { value: CONFIG.stats.courses, label: 'Cursos realizados' },
    { value: CONFIG.stats.satisfaction, label: 'Clientes satisfechos' },
    { value: CONFIG.stats.yearsExperience, label: 'Años de experiencia' },
  ] as const;
}
