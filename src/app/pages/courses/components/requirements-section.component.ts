import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

interface Requirement {
  readonly icon: string;
  readonly text: string;
}

interface Topic {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly bgClass: string;
  readonly textClass: string;
}

/**
 * Requirements and course content section.
 * Shows what you need to bring and the 4 main topics covered in the course.
 */
@Component({
  selector: 'app-requirements-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-surface-alt"
      aria-labelledby="requirements-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <!-- Left: Requirements checklist -->
          <div>
            <span class="inline-block bg-accent-light text-accent text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Requisitos
            </span>
            <h2
              id="requirements-heading"
              class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
            >
              ¿Qué necesitas para el curso?
            </h2>
            <p class="text-text-secondary text-lg mb-8">
              Llega preparado con estos documentos y disfruta una experiencia sin contratiempos.
            </p>

            <ul class="flex flex-col gap-4" role="list">
              @for (req of requirements; track req.text) {
                <li class="flex items-start gap-4 bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <div
                    class="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" class="text-success"
                    >
                      @switch (req.icon) {
                        @case ('id') {
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <line x1="7" y1="12" x2="7" y2="12.01"/>
                          <line x1="12" y1="10" x2="17" y2="10"/>
                          <line x1="12" y1="14" x2="15" y2="14"/>
                        }
                        @case ('hash') {
                          <line x1="4" y1="9" x2="20" y2="9"/>
                          <line x1="4" y1="15" x2="20" y2="15"/>
                          <line x1="10" y1="3" x2="8" y2="21"/>
                          <line x1="16" y1="3" x2="14" y2="21"/>
                        }
                        @case ('mail') {
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        }
                        @case ('clock') {
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        }
                      }
                    </svg>
                  </div>
                  <span class="text-text-primary text-sm font-medium leading-relaxed pt-2">
                    {{ req.text }}
                  </span>
                </li>
              }
            </ul>
          </div>

          <!-- Right: Course content topics -->
          <div>
            <span class="inline-block bg-primary-lighter text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Contenido
            </span>
            <h2
              class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
            >
              ¿Qué aprenderás?
            </h2>
            <p class="text-text-secondary text-lg mb-8">
              El curso cubre los temas esenciales para una conducción segura y responsable.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              @for (topic of topics; track topic.title) {
                <article class="card-hover bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    [class]="topic.bgClass"
                    aria-hidden="true"
                  >
                    <svg
                      width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2"
                      [class]="topic.textClass"
                    >
                      @switch (topic.icon) {
                        @case ('book') {
                          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                        }
                        @case ('sign') {
                          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        }
                        @case ('shield') {
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        }
                        @case ('heart') {
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                        }
                      }
                    </svg>
                  </div>
                  <h3 class="font-sans font-bold text-base text-text-primary mb-1">
                    {{ topic.title }}
                  </h3>
                  <p class="text-text-secondary text-xs leading-relaxed">
                    {{ topic.description }}
                  </p>
                </article>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class RequirementsSectionComponent {
  protected readonly requirements: readonly Requirement[] = [
    {
      icon: 'id',
      text: 'Documento de identidad vigente (cédula de ciudadanía o cédula de extranjería)',
    },
    {
      icon: 'hash',
      text: 'Número del comparendo o fotomulta (puedes consultarlo en el SIMIT)',
    },
    {
      icon: 'mail',
      text: 'Correo electrónico activo para recibir tu certificado digital',
    },
    {
      icon: 'clock',
      text: 'Llegar mínimo 30 minutos antes de la hora de inicio del curso',
    },
  ];

  protected readonly topics: readonly Topic[] = [
    {
      icon: 'book',
      title: 'Normas de tránsito',
      description: 'Código Nacional de Tránsito, derechos y deberes del conductor.',
      bgClass: 'bg-primary-lighter',
      textClass: 'text-primary',
    },
    {
      icon: 'sign',
      title: 'Señales viales',
      description: 'Señales reglamentarias, preventivas e informativas en vías.',
      bgClass: 'bg-highlight-light',
      textClass: 'text-highlight',
    },
    {
      icon: 'shield',
      title: 'Seguridad vial',
      description: 'Prevención de accidentes, conducción defensiva y primeros auxilios.',
      bgClass: 'bg-success-light',
      textClass: 'text-success',
    },
    {
      icon: 'heart',
      title: 'Responsabilidad vial',
      description: 'Impacto social, convivencia y cultura ciudadana en las vías.',
      bgClass: 'bg-accent-light',
      textClass: 'text-accent',
    },
  ];
}
