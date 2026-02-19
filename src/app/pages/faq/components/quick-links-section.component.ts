import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Quick navigation links section.
 * Grid of 4 cards linking to key pages: Calculator, Courses, Location, Contact/Home.
 */
@Component({
  selector: 'app-faq-quick-links-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="py-16 bg-white"
      aria-labelledby="quick-links-heading"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="quick-links-heading"
          class="font-sans font-bold text-2xl text-text-primary text-center mb-10"
        >
          También te puede interesar
        </h2>

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
export class FaqQuickLinksSectionComponent {
  protected readonly quickLinks = [
    {
      href: '/calculadora',
      label: 'Calculadora de Multas',
      description: 'Calcula el valor de tu multa con descuento.',
      iconPath: 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M8 6h8 M8 10h8 M8 14h4',
      iconBg: 'bg-highlight-light',
      iconColor: 'text-highlight',
      ariaLabel: 'Ir a la calculadora de multas',
    },
    {
      href: '/cursos',
      label: 'Cursos Pedagógicos',
      description: 'Información completa sobre nuestros cursos.',
      iconPath: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5',
      iconBg: 'bg-accent-light',
      iconColor: 'text-accent',
      ariaLabel: 'Ver información de cursos pedagógicos',
    },
    {
      href: '/ubicacion',
      label: 'Nuestra Ubicación',
      description: 'Cómo llegar a nuestras instalaciones.',
      iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      iconBg: 'bg-info-light',
      iconColor: 'text-info',
      ariaLabel: 'Ver ubicación de CIA Vial del Llano',
    },
    {
      href: '/',
      label: 'Página Principal',
      description: 'Volver al inicio para más información.',
      iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
      iconBg: 'bg-success-light',
      iconColor: 'text-success',
      ariaLabel: 'Ir a la página principal',
    },
  ] as const;
}
