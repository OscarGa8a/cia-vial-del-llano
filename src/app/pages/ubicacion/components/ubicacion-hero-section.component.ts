import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Hero section for the location page with breadcrumb, heading, and wave divider.
 */
@Component({
  selector: 'app-ubicacion-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="hero-gradient pt-28 pb-0"
      aria-labelledby="ubicacion-hero-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm text-white/60 mb-6">
          <a routerLink="/" class="hover:text-white transition-colors">Inicio</a>
          <span aria-hidden="true">/</span>
          <span class="text-highlight font-semibold">Ubicación</span>
        </nav>

        <!-- Content -->
        <div class="flex flex-col md:flex-row items-center gap-8 pb-12">
          <!-- Text content -->
          <div class="flex-1 space-y-4 text-white">
            <h1 id="ubicacion-hero-heading" class="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Nuestra <span class="text-highlight">Ubicación</span>
            </h1>
            <p class="text-white/75 text-lg max-w-xl">
              Estamos en el corazón de Villavicencio para tu comodidad. Visítanos y conoce nuestras instalaciones.
            </p>
          </div>

          <!-- Decorative icon (hidden on mobile) -->
          <div class="hidden md:flex items-center justify-center shrink-0" aria-hidden="true">
            <div class="w-24 h-24 glass rounded-2xl flex items-center justify-center shadow-xl rotate-12">
              <svg
                class="w-12 h-12 text-highlight"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
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
export class UbicacionHeroSectionComponent {}
