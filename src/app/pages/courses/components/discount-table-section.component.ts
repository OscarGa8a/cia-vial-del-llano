import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';

interface DiscountTier {
  readonly percent: number;
  readonly label: string;
  readonly days: string;
  readonly colorClass: string;
}

interface DiscountCard {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly tiers: readonly DiscountTier[];
  readonly gradientClass: string;
  readonly whatsappMessage: string;
}

/**
 * Discount tables section showing the specific discount windows
 * for manual comparendos vs electronic/fotomulta comparendos.
 * Includes an informational note about business days.
 */
@Component({
  selector: 'app-discount-table-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-white"
      aria-labelledby="discount-table-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-14">
          <span class="inline-block bg-accent-light text-accent text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Plazos de descuento
          </span>
          <h2
            id="discount-table-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            Conoce los plazos para tu descuento
          </h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">
            El porcentaje de descuento depende del tipo de comparendo y del momento
            en que realices el curso. ¡Actúa rápido!
          </p>
        </div>

        <!-- Discount cards grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          @for (card of discountCards; track card.id) {
            <article
              class="card-hover rounded-3xl overflow-hidden shadow-lg border border-border"
              [attr.aria-label]="'Descuentos para ' + card.title"
            >
              <!-- Card header -->
              <div class="px-8 py-7" [class]="card.gradientClass">
                <div class="flex items-center gap-3">
                  <span class="text-3xl" aria-hidden="true">{{ card.icon }}</span>
                  <div>
                    <h3 class="font-sans font-bold text-xl text-white">{{ card.title }}</h3>
                    <p class="text-white/70 text-sm">{{ card.subtitle }}</p>
                  </div>
                </div>
              </div>

              <!-- Discount tiers -->
              <div class="bg-white p-8">
                <div class="flex flex-col gap-4 mb-8">
                  @for (tier of card.tiers; track tier.percent + tier.label) {
                    <div class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-border">
                      <div>
                        <p class="text-sm font-medium text-text-primary">{{ tier.label }}</p>
                        <p class="text-xs text-text-secondary mt-0.5">{{ tier.days }}</p>
                      </div>
                      <div
                        class="text-3xl font-sans font-bold px-3 py-1 rounded-xl"
                        [class]="tier.colorClass"
                        [attr.aria-label]="tier.percent + ' por ciento de descuento'"
                      >
                        {{ tier.percent }}%
                      </div>
                    </div>
                  }
                </div>

                <a
                  [href]="getWhatsappLink(card.whatsappMessage)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  [attr.aria-label]="'Consultar descuento para ' + card.title + ' por WhatsApp'"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Quiero este descuento
                </a>
              </div>
            </article>
          }
        </div>

        <!-- Info note about business days -->
        <div
          class="flex items-start gap-4 p-5 rounded-2xl bg-info-light border border-info/30"
          role="note"
        >
          <div class="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-info" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <div>
            <p class="font-semibold text-gray-800">Los plazos se cuentan en días hábiles</p>
            <p class="text-sm text-text-secondary mt-1">
              Los días hábiles son de lunes a viernes, sin contar festivos.
              El conteo comienza desde el día siguiente a la fecha de notificación
              del comparendo. <strong>No esperes al último momento</strong> para tomar tu curso.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DiscountTableSectionComponent {
  private readonly whatsappService = inject(WhatsappService);

  protected readonly discountCards: readonly DiscountCard[] = [
    {
      id: 'manual',
      icon: '📋',
      title: 'Comparendo Manual',
      subtitle: 'Impuesto por agente de tránsito',
      gradientClass: 'bg-gradient-to-r from-primary to-primary-light',
      tiers: [
        {
          percent: 50,
          label: '50% de descuento',
          days: 'Primeros 1 a 5 días hábiles',
          colorClass: 'bg-success-light text-success',
        },
        {
          percent: 25,
          label: '25% de descuento',
          days: 'Del día 6 al día 20 hábil',
          colorClass: 'bg-warning-light text-warning',
        },
      ],
      whatsappMessage:
        'Hola, tengo un comparendo manual y quiero obtener el descuento. ¿Cuándo puedo tomar el curso?',
    },
    {
      id: 'electronico',
      icon: '📷',
      title: 'Fotomulta / Electrónico',
      subtitle: 'Capturado por cámara de tránsito',
      gradientClass: 'bg-gradient-to-r from-accent to-accent-hover',
      tiers: [
        {
          percent: 50,
          label: '50% de descuento',
          days: 'Del día 1 al día 11 hábil',
          colorClass: 'bg-success-light text-success',
        },
        {
          percent: 25,
          label: '25% de descuento',
          days: 'Del día 12 al día 26 hábil',
          colorClass: 'bg-warning-light text-warning',
        },
      ],
      whatsappMessage:
        'Hola, tengo una fotomulta y quiero obtener el descuento. ¿Cuándo puedo tomar el curso?',
    },
  ];

  protected getWhatsappLink(message: string): string {
    return this.whatsappService.generateLink(message);
  }
}
