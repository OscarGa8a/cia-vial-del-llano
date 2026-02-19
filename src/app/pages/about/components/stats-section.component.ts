import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABOUT_STATS } from '@core/data/about-page.data';

/**
 * Stats section for the About page.
 * Displays 4 key metrics on a gradient background: years, courses,
 * drivers trained, and certificate validity.
 */
@Component({
  selector: 'app-about-stats-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-16 lg:py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden"
      aria-label="Estadísticas de CIA Vial del Llano"
    >
      <!-- Dot pattern overlay -->
      <div
        class="absolute inset-0 pointer-events-none opacity-20"
        style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 30px 30px;"
        aria-hidden="true"
      ></div>

      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          @for (stat of stats; track stat.label) {
            <div class="text-center">
              <p
                [class]="
                  'font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-2 ' +
                  (stat.highlight ? 'text-highlight' : 'text-white')
                "
              >
                {{ stat.value }}
              </p>
              <p class="text-white/80 text-base lg:text-lg">
                {{ stat.label }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutStatsSectionComponent {
  protected readonly stats = ABOUT_STATS;
}
