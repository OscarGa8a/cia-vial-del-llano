import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '../../../core/data/testimonials.data';

/**
 * Testimonials section — 3-card grid with avatar, stars, quote and customer info.
 */
@Component({
  selector: 'app-testimonials-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-surface-alt"
      id="testimonios"
      aria-labelledby="testimonials-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-14">
          <span class="inline-block bg-success-light text-success text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Testimonios
          </span>
          <h2
            id="testimonials-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            Lo que dicen nuestros clientes
          </h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">
            Más de 5.000 conductores ya han aprovechado su descuento con nosotros.
          </p>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (testimonial of testimonials; track testimonial.id) {
            <article
              class="card-hover bg-white rounded-3xl p-8 shadow-sm border border-border flex flex-col"
              [attr.aria-label]="'Testimonio de ' + testimonial.name"
            >
              <!-- Stars -->
              <div class="flex gap-1 mb-5" [attr.aria-label]="testimonial.rating + ' de 5 estrellas'">
                @for (star of getStars(testimonial.rating); track $index) {
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    [attr.fill]="star ? '#F5A623' : 'none'"
                    stroke="#F5A623"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                }
              </div>

              <!-- Quote -->
              <blockquote class="text-text-secondary text-sm leading-relaxed flex-1 mb-6">
                "{{ testimonial.quote }}"
              </blockquote>

              <!-- Customer -->
              <div class="flex items-center gap-3 pt-5 border-t border-border">
                <div
                  class="w-11 h-11 rounded-full flex items-center justify-center text-white font-sans font-bold text-sm shrink-0"
                  [class]="testimonial.avatarColor"
                  [attr.aria-label]="testimonial.name"
                >
                  {{ testimonial.initials }}
                </div>
                <div>
                  <p class="font-semibold text-text-primary text-sm">{{ testimonial.name }}</p>
                  <p class="text-text-secondary text-xs">{{ testimonial.role }} · {{ testimonial.location }}</p>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsSectionComponent {
  protected readonly testimonials = TESTIMONIALS;

  /**
   * Returns an array of 5 booleans indicating filled (true) or empty (false) stars.
   */
  protected getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
}
