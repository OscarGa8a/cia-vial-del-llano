import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Whatsapp } from '@core/services/whatsapp';

/**
 * Hero section for the courses page.
 * Gradient background with breadcrumb, MinTransporte certification badge,
 * headline, description, and WhatsApp CTA button.
 */
@Component({
  selector: 'app-courses-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="hero-gradient min-h-[70vh] flex flex-col justify-center pt-24 pb-0"
      aria-labelledby="courses-hero-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          <!-- Left: Content -->
          <div class="text-white z-10">
            <!-- Breadcrumb -->
            <nav aria-label="Breadcrumb" class="mb-6">
              <ol class="flex items-center gap-2 text-white/60 text-sm">
                <li>
                  <a routerLink="/" class="hover:text-white transition-colors">Inicio</a>
                </li>
                <li aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </li>
                <li aria-current="page" class="text-white font-medium">Cursos</li>
              </ol>
            </nav>

            <!-- Certification badge -->
            <div
              class="inline-flex items-center gap-2 bg-success/20 border border-success/40 text-success text-sm font-semibold px-4 py-2 rounded-full mb-6"
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Certificados por el MinTransporte
            </div>

            <!-- Heading -->
            <h1
              id="courses-hero-heading"
              class="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Curso pedagógico para
              <span class="text-highlight">descuento en comparendos</span>
            </h1>

            <!-- Subheading -->
            <p class="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Ahorra hasta el 50% en tu multa de tránsito con nuestro curso avalado por el
              Ministerio de Transporte. Certificado con validez nacional.
            </p>

            <!-- CTA -->
            <div class="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                [href]="whatsappLink()"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Agendar curso por WhatsApp"
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
                Agendar mi curso ahora
              </a>
              <a
                routerLink="/calculadora"
                class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 hover:border-white/80 text-white font-semibold text-lg transition-all hover:bg-white/10"
                aria-label="Ir a la calculadora de descuentos"
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

            <!-- Quick stats -->
            <div class="flex flex-wrap items-center gap-6 text-white/70 text-sm">
              @for (stat of quickStats; track stat.label) {
                <div class="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    class="text-success"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{{ stat.label }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Right: SVG Illustration (classroom) -->
          <div class="hidden lg:flex items-center justify-center z-10">
            <div class="relative animate-[float_6s_ease-in-out_infinite]" aria-hidden="true">
              <svg
                width="440"
                height="340"
                viewBox="0 0 440 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Desk -->
                <rect
                  x="60"
                  y="220"
                  width="320"
                  height="8"
                  rx="4"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.25)"
                  stroke-width="1.5"
                />
                <!-- Desk legs -->
                <rect x="80" y="228" width="6" height="60" rx="2" fill="rgba(255,255,255,0.12)" />
                <rect x="354" y="228" width="6" height="60" rx="2" fill="rgba(255,255,255,0.12)" />

                <!-- Whiteboard -->
                <rect
                  x="120"
                  y="40"
                  width="200"
                  height="140"
                  rx="8"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.25)"
                  stroke-width="2"
                />
                <!-- Whiteboard content lines -->
                <rect x="145" y="70" width="100" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
                <rect
                  x="145"
                  y="85"
                  width="140"
                  height="3"
                  rx="1.5"
                  fill="rgba(255,255,255,0.12)"
                />
                <rect
                  x="145"
                  y="97"
                  width="120"
                  height="3"
                  rx="1.5"
                  fill="rgba(255,255,255,0.12)"
                />
                <!-- Traffic sign on whiteboard -->
                <polygon
                  points="280,75 300,110 260,110"
                  fill="rgba(245,166,35,0.3)"
                  stroke="rgba(245,166,35,0.6)"
                  stroke-width="1.5"
                />
                <text
                  x="280"
                  y="102"
                  text-anchor="middle"
                  font-family="sans-serif"
                  font-weight="700"
                  font-size="10"
                  fill="rgba(245,166,35,0.8)"
                >
                  !
                </text>
                <!-- Checkmark on whiteboard -->
                <circle
                  cx="170"
                  cy="140"
                  r="15"
                  fill="rgba(16,185,129,0.2)"
                  stroke="rgba(16,185,129,0.5)"
                  stroke-width="1.5"
                />
                <path
                  d="M162 140 L168 146 L178 134"
                  stroke="rgba(16,185,129,0.8)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                />

                <!-- Student 1 -->
                <circle
                  cx="140"
                  cy="195"
                  r="16"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="1.5"
                />
                <rect x="125" y="215" width="30" height="10" rx="5" fill="rgba(255,255,255,0.15)" />
                <!-- Laptop -->
                <rect
                  x="120"
                  y="210"
                  width="40"
                  height="6"
                  rx="2"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.25)"
                  stroke-width="1"
                />

                <!-- Student 2 -->
                <circle
                  cx="220"
                  cy="195"
                  r="16"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="1.5"
                />
                <rect x="205" y="215" width="30" height="10" rx="5" fill="rgba(255,255,255,0.15)" />
                <!-- Notebook -->
                <rect
                  x="202"
                  y="210"
                  width="36"
                  height="6"
                  rx="2"
                  fill="rgba(245,166,35,0.2)"
                  stroke="rgba(245,166,35,0.35)"
                  stroke-width="1"
                />

                <!-- Student 3 -->
                <circle
                  cx="300"
                  cy="195"
                  r="16"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="1.5"
                />
                <rect x="285" y="215" width="30" height="10" rx="5" fill="rgba(255,255,255,0.15)" />

                <!-- Certificate badge floating -->
                <g>
                  <circle
                    cx="380"
                    cy="80"
                    r="32"
                    fill="rgba(200,16,46,0.15)"
                    stroke="rgba(200,16,46,0.4)"
                    stroke-width="2"
                  />
                  <path
                    d="M380 60 L390 72 L390 88 Q390 98 380 102 Q370 98 370 88 L370 72 Z"
                    fill="rgba(200,16,46,0.3)"
                    stroke="rgba(255,255,255,0.4)"
                    stroke-width="1.5"
                  />
                  <path
                    d="M373 78 L378 83 L387 73"
                    stroke="rgba(255,255,255,0.8)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                  />
                </g>

                <!-- Clock floating -->
                <circle
                  cx="50"
                  cy="100"
                  r="24"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="1.5"
                />
                <circle cx="50" cy="100" r="2" fill="rgba(255,255,255,0.5)" />
                <line
                  x1="50"
                  y1="100"
                  x2="50"
                  y2="86"
                  stroke="rgba(255,255,255,0.5)"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <line
                  x1="50"
                  y1="100"
                  x2="60"
                  y2="104"
                  stroke="rgba(255,255,255,0.4)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <text
                  x="50"
                  y="130"
                  text-anchor="middle"
                  font-family="sans-serif"
                  font-size="10"
                  fill="rgba(255,255,255,0.5)"
                >
                  4h
                </text>
              </svg>
            </div>
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
export class CoursesHeroSectionComponent {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso pedagógico para obtener el descuento en mi comparendo.',
    ),
  );

  protected readonly quickStats = [
    { label: 'Duración: 4 horas' },
    { label: 'Certificado oficial' },
    { label: 'Validez nacional' },
  ] as const;
}
