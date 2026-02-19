import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '@core/data/about-page.data';

/**
 * Testimonials section for the About page.
 * Displays 3 customer testimonials with star ratings and initials.
 */
@Component({
  selector: 'app-about-testimonials-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-16 lg:py-20 bg-white"
      aria-labelledby="about-testimonials-heading"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span
            class="inline-block bg-success/10 text-success font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            TESTIMONIOS
          </span>
          <h2
            id="about-testimonials-heading"
            class="font-sans font-bold text-3xl md:text-4xl text-gray-900 mb-4"
          >
            Lo que dicen nuestros
            <span class="text-highlight">clientes</span>
          </h2>
        </div>

        <!-- Testimonials grid -->
        <div class="grid md:grid-cols-3 gap-6">
          @for (testimonial of testimonials; track testimonial.name) {
            <div class="bg-gray-50 rounded-3xl p-6 card-hover">
              <!-- Stars -->
              <div
                class="flex items-center gap-1 mb-4"
                [attr.aria-label]="testimonial.rating + ' de 5 estrellas'"
                role="img"
              >
                @for (star of starArray; track $index) {
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="text-highlight"
                    aria-hidden="true"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                  </svg>
                }
              </div>

              <!-- Quote -->
              <p class="text-gray-600 mb-6 italic">
                "{{ testimonial.text }}"
              </p>

              <!-- Author -->
              <div class="flex items-center gap-3">
                <div
                  [class]="
                    'w-12 h-12 rounded-full flex items-center justify-center ' +
                    testimonial.initialsBg
                  "
                  aria-hidden="true"
                >
                  <span
                    [class]="'font-bold ' + testimonial.initialsColor"
                  >
                    {{ testimonial.initials }}
                  </span>
                </div>
                <div>
                  <p class="font-bold text-gray-900">
                    {{ testimonial.name }}
                  </p>
                  <p class="text-gray-500 text-sm">
                    {{ testimonial.city }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutTestimonialsSectionComponent {
  protected readonly testimonials = TESTIMONIALS;

  /** Array used to render 5 stars via &#64;for. */
  protected readonly starArray = Array(5);
}
