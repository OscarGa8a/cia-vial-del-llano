import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Trust badges section — horizontal bar showing official governing entities
 * that authorize and oversee CIA Vial del Llano.
 */
@Component({
  selector: 'app-trust-badges-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="bg-gray-50 border-y border-border py-10"
      aria-label="Entidades que nos autorizan y vigilan"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm font-medium text-text-secondary uppercase tracking-widest mb-8">
          Habilitados y vigilados por las entidades oficiales
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          @for (badge of badges; track badge.name) {
            <div
              class="flex flex-col items-center gap-3 p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all group"
              [attr.title]="badge.fullName"
            >
              <!-- Icon / Emblem placeholder -->
              <div
                class="w-14 h-14 rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors"
                [class]="badge.bgColor"
                aria-hidden="true"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path [attr.d]="badge.iconPath"/>
                </svg>
              </div>
              <div class="text-center">
                <p class="font-sans font-bold text-sm text-text-primary group-hover:text-primary transition-colors">
                  {{ badge.name }}
                </p>
                <p class="text-xs text-text-secondary mt-0.5 leading-tight">
                  {{ badge.description }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TrustBadgesSectionComponent {
  protected readonly badges = [
    {
      name: 'MinTransporte',
      fullName: 'Ministerio de Transporte',
      description: 'Ministerio de Transporte',
      bgColor: 'bg-blue-50',
      iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    },
    {
      name: 'RUNT',
      fullName: 'Registro Único Nacional de Tránsito',
      description: 'Registro Nacional de Tránsito',
      bgColor: 'bg-green-50',
      iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      name: 'SIMIT',
      fullName: 'Sistema Integrado de Multas y Sanciones por Infracciones de Tránsito',
      description: 'Sistema de Infracciones',
      bgColor: 'bg-orange-50',
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    },
    {
      name: 'Supertransporte',
      fullName: 'Superintendencia de Transporte',
      description: 'Superintendencia de Transporte',
      bgColor: 'bg-red-50',
      iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
  ] as const;
}
