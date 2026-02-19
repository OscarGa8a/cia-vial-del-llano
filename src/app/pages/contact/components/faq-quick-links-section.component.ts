import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_QUICK_LINKS } from '@core/data/contact-page.data';

/**
 * FAQ quick links section for the Contact page.
 * Displays a 4-card grid linking to key pages: FAQ, Calculator, Courses, Location.
 * Helps visitors navigate to self-service resources before contacting support.
 */
@Component({
  selector: 'app-contact-faq-links-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="py-16 bg-white"
      aria-labelledby="contact-faq-links-heading"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="contact-faq-links-heading"
          class="font-sans font-bold text-2xl sm:text-3xl text-text-primary text-center mb-4"
        >
          Recursos <span class="text-primary">útiles</span>
        </h2>
        <p class="text-text-secondary text-center mb-10 max-w-xl mx-auto">
          Quizá ya tenemos la respuesta que buscas. Consulta estos recursos.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (link of quickLinks; track link.href) {
            <a
              [routerLink]="link.href"
              class="card-hover group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-white text-center"
              [attr.aria-label]="link.ariaLabel"
            >
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                [class]="link.iconBg"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  [class]="link.iconColor"
                  aria-hidden="true"
                >
                  <path [attr.d]="link.iconPath" />
                </svg>
              </div>
              <h3 class="font-semibold text-text-primary text-sm group-hover:text-primary transition-colors">
                {{ link.label }}
              </h3>
              <p class="text-xs text-text-secondary leading-relaxed">
                {{ link.description }}
              </p>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactFaqLinksSectionComponent {
  protected readonly quickLinks = CONTACT_QUICK_LINKS;
}
