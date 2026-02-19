import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Introduction / Story section for the About page.
 * Displays the company history narrative with a placeholder image
 * and a floating "10+ years" badge.
 */
@Component({
  selector: 'app-about-introduction-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-16 lg:py-24 bg-white"
      aria-labelledby="about-intro-heading"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left — Text -->
          <div>
            <span
              class="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-4"
            >
              NUESTRA HISTORIA
            </span>

            <h2
              id="about-intro-heading"
              class="font-sans font-bold text-3xl md:text-4xl text-gray-900 mb-6"
            >
              Una historia de
              <span class="text-accent">compromiso</span> con Villavicencio
            </h2>

            <div class="space-y-4 text-gray-600 text-lg">
              <p>
                <strong class="text-gray-900">CIA VIAL DEL LLANO</strong>
                nació en 2014 con una misión clara: ofrecer a los conductores
                de Villavicencio y los Llanos Orientales una solución
                profesional y confiable para cumplir con sus obligaciones de
                tránsito.
              </p>
              <p>
                Lo que comenzó como un pequeño centro de atención, hoy es una
                de las instituciones de educación vial más reconocidas de la
                región. Hemos capacitado a más de
                <strong class="text-primary">5.000 conductores</strong>,
                ayudándoles a obtener descuentos significativos en sus multas
                mientras aprenden a ser mejores conductores.
              </p>
              <p>
                Nuestro éxito se debe a un equipo comprometido, instalaciones
                de calidad y una filosofía centrada en el
                <strong class="text-primary">servicio al cliente</strong>.
                Cada persona que nos visita es tratada con respeto,
                profesionalismo y la atención que merece.
              </p>
            </div>
          </div>

          <!-- Right — Image placeholder -->
          <div class="relative">
            <div
              class="aspect-square bg-gradient-to-br from-primary to-primary-dark rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
              aria-hidden="true"
            >
              <div class="text-center text-white/30">
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  class="mx-auto mb-4"
                >
                  <path
                    d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"
                  />
                </svg>
                <p class="text-lg font-medium">
                  Imagen de nuestras instalaciones
                </p>
              </div>
            </div>

            <!-- Floating badge -->
            <div
              class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
            >
              <div
                class="w-12 h-12 bg-highlight/10 rounded-xl flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="text-highlight"
                >
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <div>
                <p class="font-sans font-bold text-2xl text-primary">+10</p>
                <p class="text-gray-500 text-sm">años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutIntroductionSectionComponent {}
