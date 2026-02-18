import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

interface Benefit {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly iconBgClass: string;
  readonly iconTextClass: string;
}

/**
 * Benefits grid section showing 6 advantages of taking
 * the pedagogical course at CIA Vial del Llano.
 */
@Component({
  selector: 'app-courses-benefits-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-surface-alt"
      aria-labelledby="benefits-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-14">
          <span class="inline-block bg-success-light text-success text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Beneficios
          </span>
          <h2
            id="benefits-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            ¿Por qué tomar el curso con nosotros?
          </h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">
            Te ofrecemos la mejor experiencia para que obtengas tu descuento
            de manera rápida y cómoda.
          </p>
        </div>

        <!-- Benefits grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (benefit of benefits; track benefit.title) {
            <article
              class="card-hover bg-white rounded-2xl border border-border p-7 shadow-sm"
            >
              <!-- Icon -->
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                [class]="benefit.iconBgClass"
                aria-hidden="true"
              >
                <svg
                  width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2"
                  [class]="benefit.iconTextClass"
                >
                  @switch (benefit.icon) {
                    @case ('dollar') {
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                    }
                    @case ('award') {
                      <circle cx="12" cy="8" r="7"/>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                    }
                    @case ('clock') {
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    }
                    @case ('calendar') {
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    }
                    @case ('users') {
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                      <path d="M16 3.13a4 4 0 010 7.75"/>
                    }
                    @case ('home') {
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    }
                  }
                </svg>
              </div>

              <!-- Content -->
              <h3 class="font-sans font-bold text-lg text-text-primary mb-2">
                {{ benefit.title }}
              </h3>
              <p class="text-text-secondary text-sm leading-relaxed">
                {{ benefit.description }}
              </p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class CoursesBenefitsSectionComponent {
  protected readonly benefits: readonly Benefit[] = [
    {
      icon: 'dollar',
      title: 'Hasta 50% de descuento',
      description:
        'Obtén el máximo descuento posible en tu comparendo o fotomulta al tomar el curso dentro de los primeros días hábiles.',
      iconBgClass: 'bg-success-light',
      iconTextClass: 'text-success',
    },
    {
      icon: 'award',
      title: 'Certificado nacional',
      description:
        'Nuestro certificado está avalado por el Ministerio de Transporte con registro automático en el RUNT, válido en todo Colombia.',
      iconBgClass: 'bg-accent-light',
      iconTextClass: 'text-accent',
    },
    {
      icon: 'clock',
      title: 'Solo 4 horas',
      description:
        'El curso tiene una duración de 4 horas presenciales. Invierte un poco de tu tiempo y ahorra mucho en tu multa.',
      iconBgClass: 'bg-primary-lighter',
      iconTextClass: 'text-primary',
    },
    {
      icon: 'calendar',
      title: 'Horarios flexibles',
      description:
        'Ofrecemos múltiples horarios de lunes a sábado para que puedas asistir cuando más te convenga.',
      iconBgClass: 'bg-highlight-light',
      iconTextClass: 'text-highlight',
    },
    {
      icon: 'users',
      title: 'Atención personalizada',
      description:
        'Grupos reducidos con instructores certificados que te guían durante todo el proceso del curso.',
      iconBgClass: 'bg-info-light',
      iconTextClass: 'text-info',
    },
    {
      icon: 'home',
      title: 'Instalaciones cómodas',
      description:
        'Aulas climatizadas y equipadas con tecnología moderna para una experiencia de aprendizaje agradable.',
      iconBgClass: 'bg-warning-light',
      iconTextClass: 'text-warning',
    },
  ];
}
