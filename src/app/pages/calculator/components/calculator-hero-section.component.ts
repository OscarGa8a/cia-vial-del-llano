import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Compact hero section for the /calculadora page.
 * Shows a breadcrumb, page title, subtitle, and a decorative calculator icon.
 */
@Component({
  selector: 'app-calculator-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="hero-gradient pt-28 pb-0"
      aria-labelledby="calc-hero-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm text-white/60 mb-6">
          <a routerLink="/" class="hover:text-white transition-colors">Inicio</a>
          <span aria-hidden="true">/</span>
          <span class="text-highlight font-semibold">Calculadora</span>
        </nav>

        <div class="flex flex-col md:flex-row items-center gap-8 pb-12">
          <!-- Text -->
          <div class="flex-1 space-y-4 text-white">
            <h1
              id="calc-hero-heading"
              class="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight"
            >
              Calculadora de Multas
            </h1>
            <p class="text-white/75 text-lg max-w-xl">
              Conoce el valor exacto de tu infracción y cuánto puedes ahorrar
              con nuestro curso. Basado en el SMDLV 2025.
            </p>
          </div>

          <!-- Decorative calculator icon -->
          <div class="hidden md:flex items-center justify-center shrink-0" aria-hidden="true">
            <div class="w-24 h-24 glass rounded-2xl flex items-center justify-center shadow-xl rotate-12">
              <svg
                class="w-12 h-12 text-highlight"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="relative h-16 overflow-hidden">
        <svg
          class="absolute bottom-0 w-full"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          fill="white"
          aria-hidden="true"
        >
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" />
        </svg>
      </div>
    </section>
  `,
})
export class CalculatorHeroSectionComponent {}
