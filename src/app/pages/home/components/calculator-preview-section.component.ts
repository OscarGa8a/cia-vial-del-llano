import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../../core/services/whatsapp.service';

/**
 * Calculator preview section — a visual teaser showing what the calculator
 * looks like, with a CTA to the full /calculadora page.
 */
@Component({
  selector: 'app-calculator-preview-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="py-20 bg-white"
      id="calculadora"
      aria-labelledby="calc-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-14">
          <span class="inline-block bg-highlight-light text-highlight-hover text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Calcula tu ahorro
          </span>
          <h2
            id="calc-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            ¿Cuánto puedes ahorrar?
          </h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">
            Usa nuestra calculadora para conocer el valor de tu multa y cuánto puedes ahorrar con el descuento.
          </p>
        </div>

        <!-- Preview card -->
        <div class="max-w-3xl mx-auto">
          <div class="rounded-3xl border-2 border-border shadow-2xl overflow-hidden">
            <!-- Card header -->
            <div class="bg-primary px-8 py-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2"/>
                  <line x1="8" y1="6" x2="16" y2="6"/>
                  <line x1="8" y1="10" x2="16" y2="10"/>
                  <line x1="8" y1="14" x2="12" y2="14"/>
                </svg>
              </div>
              <div>
                <h3 class="font-sans font-bold text-xl text-white">Calculadora de Multas</h3>
                <p class="text-white/70 text-sm">Conoce tu descuento exacto</p>
              </div>
            </div>

            <!-- Mock form (visual only) -->
            <div class="bg-white p-8" aria-hidden="true">
              <!-- Type selector (visual) -->
              <div class="mb-6">
                <p class="text-sm font-semibold text-text-primary mb-3">Tipo de comparendo</p>
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-center gap-2 p-3 rounded-xl border-2 border-primary bg-primary-lighter cursor-default select-none">
                    <div class="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                      <div class="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span class="text-sm font-medium text-primary">Manual / Físico</span>
                  </div>
                  <div class="flex items-center gap-2 p-3 rounded-xl border-2 border-border cursor-default select-none">
                    <div class="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                    <span class="text-sm text-text-secondary">Electrónico / Fotomulta</span>
                  </div>
                </div>
              </div>

              <!-- Category (visual) -->
              <div class="mb-6">
                <p class="text-sm font-semibold text-text-primary mb-2">Código de infracción</p>
                <div class="w-full px-4 py-3 rounded-xl border-2 border-border bg-gray-50 text-text-secondary text-sm flex items-center justify-between cursor-default select-none">
                  <span>C02 - Estacionar en sitio prohibido</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              <!-- Date (visual) -->
              <div class="mb-8">
                <p class="text-sm font-semibold text-text-primary mb-2">Fecha del comparendo</p>
                <div class="w-full px-4 py-3 rounded-xl border-2 border-border bg-gray-50 text-text-secondary text-sm flex items-center justify-between cursor-default select-none">
                  <span>Seleccionar fecha</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
              </div>

              <!-- Preview result (teaser) -->
              <div class="p-5 rounded-2xl bg-success-light border border-success/20 mb-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm text-text-secondary">Valor de la multa</span>
                  <span class="text-sm font-semibold text-text-primary line-through">$213.525</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm text-text-secondary">Tu descuento (50%)</span>
                  <span class="text-sm font-semibold text-success">-$106.762</span>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-success/20">
                  <span class="font-semibold text-text-primary">Total a pagar</span>
                  <span class="font-bold text-2xl text-primary">$106.763</span>
                </div>
              </div>

              <!-- Blur overlay hint -->
              <div class="relative">
                <div class="absolute inset-0 backdrop-blur-sm bg-white/70 rounded-xl z-10 flex flex-col items-center justify-center gap-2" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <span class="text-sm font-semibold text-primary">Usa la calculadora completa</span>
                </div>
                <div class="h-12 rounded-xl bg-gray-100"></div>
              </div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <a
              routerLink="/calculadora"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary-light text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Ir a la calculadora completa de multas"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
              </svg>
              Calcular mi descuento exacto
            </a>
            <a
              [href]="whatsappLink()"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white font-semibold text-lg transition-all"
              aria-label="Preguntar por el descuento en WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CalculatorPreviewSectionComponent {
  private readonly whatsappService = inject(WhatsappService);

  protected readonly whatsappLink = computed(() =>
    this.whatsappService.generateLink(
      'Hola, quiero saber cuánto puedo ahorrar en mi comparendo. ¿Pueden ayudarme?'
    )
  );
}
