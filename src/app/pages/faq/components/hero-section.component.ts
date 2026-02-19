import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Hero section for the FAQ page.
 * Displays breadcrumb navigation, a large "?" icon, headline text,
 * and a wave divider matching the home page hero pattern.
 */
@Component({
  selector: 'app-faq-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="hero-gradient pt-28 pb-0"
      aria-labelledby="faq-hero-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="mb-8">
          <ol class="flex items-center gap-2 text-sm text-white/60">
            <li>
              <a
                routerLink="/"
                class="hover:text-white transition-colors"
              >
                Inicio
              </a>
            </li>
            <li aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </li>
            <li>
              <span class="text-white font-medium" aria-current="page">
                Preguntas Frecuentes
              </span>
            </li>
          </ol>
        </nav>

        <!-- Content -->
        <div class="text-center pb-16">
          <!-- Icon -->
          <div
            class="w-20 h-20 mx-auto rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-6"
            aria-hidden="true"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <!-- Heading -->
          <h1
            id="faq-hero-heading"
            class="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight"
          >
            Preguntas
            <span class="text-highlight">Frecuentes</span>
          </h1>

          <p class="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Encuentra respuestas a las dudas más comunes sobre comparendos,
            cursos pedagógicos, descuentos, pagos y certificados.
          </p>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="relative h-20 overflow-hidden">
        <svg
          class="absolute bottom-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="white"
          aria-hidden="true"
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  `,
})
export class FaqHeroSectionComponent {}
