import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONFIG } from '../../../core/data/config.data';

/**
 * Informational card explaining what the SMDLV is and its 2025 value.
 * Helps users understand how fine amounts are derived.
 */
@Component({
  selector: 'app-smdlv-info-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-10 bg-white" aria-label="Información sobre el SMDLV">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-primary-lighter border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
          <!-- Icon -->
          <div
            class="bg-primary text-white p-2.5 rounded-full shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Content -->
          <div>
            <h2 class="font-sans font-bold text-primary text-lg mb-1">
              ¿Qué es el SMDLV?
            </h2>
            <p class="text-gray-700 text-sm leading-relaxed">
              Las multas de tránsito en Colombia se calculan con base en el
              <strong>Salario Mínimo Diario Legal Vigente (SMDLV)</strong>.
              Para el año 2025, este valor es de
              <strong>{{ smdlvFormatted }}</strong>.
              Las categorías de infracción (A, B, C, D, E) son múltiplos de
              este valor: A = 4×, B = 8×, C = 15×, D = 30×, E = 45×.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SmdlvInfoSectionComponent {
  /** Formatted SMDLV daily value for display. */
  protected readonly smdlvFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(CONFIG.smdlvDaily2025);
}
