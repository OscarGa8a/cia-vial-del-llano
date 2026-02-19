import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CERTIFICATIONS } from '@core/data/about-page.data';

/**
 * Certifications section for the About page.
 * Displays official certifications and endorsements in a 4-column grid.
 */
@Component({
  selector: 'app-about-certifications-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-16 lg:py-20 bg-white"
      aria-labelledby="about-certifications-heading"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span
            class="inline-block bg-highlight/10 text-highlight font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            RESPALDO OFICIAL
          </span>
          <h2
            id="about-certifications-heading"
            class="font-sans font-bold text-3xl md:text-4xl text-gray-900 mb-4"
          >
            Certificaciones y <span class="text-primary">Avales</span>
          </h2>
          <p class="text-gray-600 text-lg">
            Contamos con el respaldo de las principales entidades de tránsito
            del país
          </p>
        </div>

        <!-- Certifications grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (cert of certifications; track cert.name) {
            <div class="bg-gray-50 rounded-2xl p-6 text-center card-hover">
              <div
                [class]="
                  'w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ' +
                  cert.iconBg
                "
                aria-hidden="true"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [class]="cert.iconColor"
                >
                  <path [attr.d]="cert.iconPath" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">{{ cert.name }}</h3>
              <p class="text-gray-600 text-sm">{{ cert.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutCertificationsSectionComponent {
  protected readonly certifications = CERTIFICATIONS;
}
