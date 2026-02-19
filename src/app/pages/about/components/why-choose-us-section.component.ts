import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ADVANTAGES } from '@core/data/about-page.data';

/**
 * "Why Choose Us" section for the About page.
 * Displays a 6-card grid of advantages with icons.
 */
@Component({
  selector: 'app-about-why-choose-us-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-16 lg:py-20 bg-white"
      aria-labelledby="about-advantages-heading"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span
            class="inline-block bg-success/10 text-success font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            NUESTRAS VENTAJAS
          </span>
          <h2
            id="about-advantages-heading"
            class="font-sans font-bold text-3xl md:text-4xl text-gray-900 mb-4"
          >
            ¿Por qué <span class="text-accent">elegirnos</span>?
          </h2>
          <p class="text-gray-600 text-lg">
            Conoce las razones por las que somos la mejor opción en
            Villavicencio
          </p>
        </div>

        <!-- Advantages grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (advantage of advantages; track advantage.title) {
            <div class="bg-gray-50 rounded-2xl p-6 card-hover group">
              <div
                [class]="
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ' +
                  advantage.iconBg
                "
                aria-hidden="true"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [class]="advantage.iconColor"
                >
                  <path [attr.d]="advantage.iconPath" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 text-lg mb-2">
                {{ advantage.title }}
              </h3>
              <p class="text-gray-600">{{ advantage.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutWhyChooseUsSectionComponent {
  protected readonly advantages = ADVANTAGES;
}
