import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Parking information banner highlighting free parking availability.
 */
@Component({
  selector: 'app-parking-info-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-2xl p-6 lg:p-8">
            <div class="flex flex-col md:flex-row items-center gap-6">
              <div class="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-success">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zm0-5V9m0 8v3m-5-9h12a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h12a2 2 0 012 2v5z" />
                </svg>
              </div>
              <div class="flex-grow text-center md:text-left">
                <h3 class="font-sans font-bold text-xl text-text-primary mb-2">
                  Parqueadero Gratuito
                </h3>
                <p class="text-text-secondary">
                  Contamos con parqueadero privado <strong>sin costo adicional</strong> para nuestros clientes. Capacidad para carros y motos. Si está lleno, hay parqueaderos públicos a menos de 50 metros.
                </p>
              </div>
              <div class="flex-shrink-0">
                <span class="inline-flex items-center gap-2 bg-success text-white font-bold px-4 py-2 rounded-full">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Gratis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ParkingInfoSectionComponent {}
