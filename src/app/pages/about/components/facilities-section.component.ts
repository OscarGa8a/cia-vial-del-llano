import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FACILITIES } from '@core/data/about-page.data';

/**
 * Facilities / Gallery section for the About page.
 * Displays a bento-style grid of facility areas with gradient placeholders
 * and hover labels. Uses Gemini's col-span-2 layout pattern.
 */
@Component({
  selector: 'app-about-facilities-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-16 lg:py-20 bg-gray-50"
      aria-labelledby="about-facilities-heading"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span
            class="inline-block bg-accent/10 text-accent font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            NUESTRO ESPACIO
          </span>
          <h2
            id="about-facilities-heading"
            class="font-sans font-bold text-3xl md:text-4xl text-gray-900 mb-4"
          >
            Conoce nuestras
            <span class="text-primary">instalaciones</span>
          </h2>
        </div>

        <!-- Bento grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          @for (facility of facilities; track facility.name) {
            <div
              [class]="
                'relative rounded-2xl overflow-hidden group cursor-pointer ' +
                (facility.colSpan2 ? 'col-span-2' : '')
              "
              [attr.aria-label]="facility.name"
            >
              <!-- Gradient background placeholder -->
              <div
                [class]="
                  'absolute inset-0 bg-gradient-to-br flex items-center justify-center ' +
                  facility.gradientFrom +
                  ' ' +
                  facility.gradientTo
                "
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-white/30 group-hover:scale-110 transition-transform duration-700"
                  aria-hidden="true"
                >
                  <path [attr.d]="facility.iconPath" />
                </svg>
              </div>

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"
                aria-hidden="true"
              ></div>

              <!-- Label -->
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 class="font-bold text-lg">{{ facility.name }}</h4>
                @if (facility.subtitle) {
                  <p class="text-sm text-white/80">
                    {{ facility.subtitle }}
                  </p>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutFacilitiesSectionComponent {
  protected readonly facilities = FACILITIES;
}
