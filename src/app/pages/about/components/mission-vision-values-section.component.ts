import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPANY_VALUES } from '@core/data/about-page.data';

/**
 * Mission, Vision & Values section for the About page.
 * Three cards with border-top accent colors showing Misión, Visión, and Valores.
 */
@Component({
  selector: 'app-about-mission-vision-values-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-16 lg:py-20 bg-gray-50"
      aria-labelledby="about-mvv-heading"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span
            class="inline-block bg-accent/10 text-accent font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            LO QUE NOS DEFINE
          </span>
          <h2
            id="about-mvv-heading"
            class="font-sans font-bold text-3xl md:text-4xl text-gray-900"
          >
            Misión, Visión y <span class="text-primary">Valores</span>
          </h2>
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Mission -->
          <div
            class="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-primary card-hover"
          >
            <div
              class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"
              aria-hidden="true"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 class="font-sans font-bold text-xl text-gray-900 mb-4">
              Misión
            </h3>
            <p class="text-gray-600">
              Brindar educación vial de calidad que contribuya a reducir la
              accidentalidad y formar conductores más responsables, ofreciendo
              un servicio eficiente y humano a nuestra comunidad.
            </p>
          </div>

          <!-- Vision -->
          <div
            class="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-highlight card-hover"
          >
            <div
              class="w-14 h-14 bg-highlight/10 rounded-2xl flex items-center justify-center mb-6"
              aria-hidden="true"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-highlight"
              >
                <path
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                />
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 class="font-sans font-bold text-xl text-gray-900 mb-4">
              Visión
            </h3>
            <p class="text-gray-600">
              Ser el centro de educación vial líder en los Llanos Orientales,
              reconocido por nuestra excelencia, compromiso social y
              contribución a una movilidad más segura en Colombia.
            </p>
          </div>

          <!-- Values -->
          <div
            class="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-accent card-hover"
          >
            <div
              class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6"
              aria-hidden="true"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-accent"
              >
                <path
                  d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"
                />
              </svg>
            </div>
            <h3 class="font-sans font-bold text-xl text-gray-900 mb-4">
              Valores
            </h3>
            <ul class="space-y-2 text-gray-600">
              @for (value of values; track value.label) {
                <li class="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    class="text-success shrink-0"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{{ value.label }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutMissionVisionValuesSectionComponent {
  protected readonly values = COMPANY_VALUES;
}
