import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

interface QuickStat {
  readonly icon: string;
  readonly value: string;
  readonly label: string;
  readonly bgClass: string;
  readonly textClass: string;
}

/**
 * Course information section explaining what the pedagogical course is,
 * its legal basis (Ley 1383 de 2010), and three quick stats cards.
 */
@Component({
  selector: 'app-course-info-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-white"
      aria-labelledby="course-info-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <!-- Left: Text content -->
          <div>
            <span class="inline-block bg-primary-lighter text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Sobre el curso
            </span>
            <h2
              id="course-info-heading"
              class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-6"
            >
              ¿Qué es el curso pedagógico?
            </h2>
            <p class="text-text-secondary text-lg leading-relaxed mb-6">
              El curso pedagógico por infracción a las normas de tránsito es un programa
              educativo establecido por la
              <strong class="text-text-primary">Ley 1383 de 2010</strong>, que permite a los
              conductores infractores obtener un descuento de hasta el 50% en el valor
              de su comparendo o fotomulta.
            </p>
            <p class="text-text-secondary text-base leading-relaxed mb-8">
              Nuestro curso está avalado por el Ministerio de Transporte y es impartido
              por instructores certificados. Al completarlo, recibirás un certificado
              oficial registrado en el RUNT con validez en todo el territorio nacional.
            </p>

            <!-- Quick stats row -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              @for (stat of quickStats; track stat.label) {
                <div
                  class="flex items-center gap-3 p-4 rounded-2xl border border-border"
                >
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    [class]="stat.bgClass"
                    aria-hidden="true"
                  >
                    <svg
                      width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2"
                      [class]="stat.textClass"
                    >
                      @switch (stat.icon) {
                        @case ('clock') {
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        }
                        @case ('percent') {
                          <line x1="19" y1="5" x2="5" y2="19"/>
                          <circle cx="6.5" cy="6.5" r="2.5"/>
                          <circle cx="17.5" cy="17.5" r="2.5"/>
                        }
                        @case ('globe') {
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                        }
                      }
                    </svg>
                  </div>
                  <div>
                    <p class="font-sans font-bold text-lg text-text-primary">{{ stat.value }}</p>
                    <p class="text-text-secondary text-xs">{{ stat.label }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Right: SVG Illustration -->
          <div class="hidden lg:flex items-center justify-center" aria-hidden="true">
            <svg width="400" height="320" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Main document -->
              <rect x="80" y="30" width="240" height="260" rx="12" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="2"/>
              <!-- Document header -->
              <rect x="80" y="30" width="240" height="50" rx="12" fill="#1E3A5F"/>
              <rect x="80" y="68" width="240" height="12" fill="#1E3A5F"/>
              <!-- Header text -->
              <rect x="100" y="45" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.6)"/>
              <rect x="100" y="58" width="120" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>

              <!-- Content lines -->
              <rect x="110" y="100" width="180" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="110" y="115" width="160" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="110" y="130" width="140" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="110" y="145" width="170" height="4" rx="2" fill="#E5E7EB"/>

              <!-- Checkmarks -->
              <circle cx="130" cy="180" r="12" fill="#D1FAE5"/>
              <path d="M124 180 L128 184 L136 176" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <rect x="150" y="177" width="100" height="4" rx="2" fill="#E5E7EB"/>

              <circle cx="130" cy="210" r="12" fill="#D1FAE5"/>
              <path d="M124 210 L128 214 L136 206" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <rect x="150" y="207" width="120" height="4" rx="2" fill="#E5E7EB"/>

              <circle cx="130" cy="240" r="12" fill="#D1FAE5"/>
              <path d="M124 240 L128 244 L136 236" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <rect x="150" y="237" width="90" height="4" rx="2" fill="#E5E7EB"/>

              <!-- Official stamp -->
              <circle cx="280" cy="250" r="28" fill="none" stroke="#C8102E" stroke-width="2" stroke-dasharray="4 3" opacity="0.6"/>
              <text x="280" y="248" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="7" fill="#C8102E" opacity="0.7">OFICIAL</text>
              <text x="280" y="260" text-anchor="middle" font-family="sans-serif" font-size="5" fill="#C8102E" opacity="0.5">MinTransporte</text>

              <!-- Shield badge floating -->
              <g transform="translate(340, 60)">
                <path d="M0 -20 L20 -10 L20 10 Q20 25 0 32 Q-20 25 -20 10 L-20 -10 Z" fill="#1E3A5F" stroke="#2D5A87" stroke-width="1.5"/>
                <path d="M-7 2 L-2 7 L8 -4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CourseInfoSectionComponent {
  protected readonly quickStats: readonly QuickStat[] = [
    {
      icon: 'clock',
      value: '4 horas',
      label: 'Duración del curso',
      bgClass: 'bg-primary-lighter',
      textClass: 'text-primary',
    },
    {
      icon: 'percent',
      value: 'Hasta 50%',
      label: 'Descuento en tu multa',
      bgClass: 'bg-success-light',
      textClass: 'text-success',
    },
    {
      icon: 'globe',
      value: 'Nacional',
      label: 'Validez del certificado',
      bgClass: 'bg-highlight-light',
      textClass: 'text-highlight',
    },
  ];
}
