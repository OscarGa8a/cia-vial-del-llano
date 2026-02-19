import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Hero section for the About (Nosotros) page.
 * Displays breadcrumb navigation, a building icon, headline text,
 * subtitle, and a wave divider matching the FAQ/Home hero pattern.
 */
@Component({
  selector: 'app-about-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="hero-gradient pt-28 pb-0"
      aria-labelledby="about-hero-heading"
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
                Nosotros
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
              <path
                d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"
              />
            </svg>
          </div>

          <!-- Heading -->
          <h1
            id="about-hero-heading"
            class="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight"
          >
            Conoce
            <span class="text-highlight">CIA VIAL</span>
            DEL LLANO
          </h1>

          <p class="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Más de 10 años comprometidos con la educación vial y la
            seguridad de los conductores colombianos
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
export class AboutHeroSectionComponent {}
