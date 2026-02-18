import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * "How to get there" section with directions by car, public transport, and landmarks.
 */
@Component({
  selector: 'app-how-to-get-there-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 lg:py-16 bg-surface-alt" id="como-llegar" aria-labelledby="directions-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="inline-block bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Indicaciones
          </span>
          <h2 id="directions-heading" class="font-sans font-bold text-3xl md:text-4xl text-text-primary mb-4">
            ¿Cómo <span class="text-accent">llegar</span>?
          </h2>
          <p class="text-text-secondary">Te explicamos las diferentes formas de llegar a nuestra sede</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <!-- By Car -->
          <div class="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zm0-5V9m0 8v3m-5-9h12a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h12a2 2 0 012 2v5z" />
              </svg>
            </div>
            <h3 class="font-sans font-bold text-xl text-text-primary mb-3">En Carro</h3>
            <ul class="space-y-2 text-text-secondary text-sm mb-4">
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span>Desde la Avenida del Llano, toma la Calle 15 hacia el centro</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span>Continúa 3 cuadras hasta el Parque Los Libertadores</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span>Estamos al frente del parque, edificio azul y blanco</span>
              </li>
            </ul>
            <div class="pt-4 border-t border-border">
              <div class="flex items-center gap-2 text-success">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10h.01M9 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium text-sm">Parqueadero gratuito</span>
              </div>
            </div>
          </div>

          <!-- By Public Transport -->
          <div class="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div class="w-14 h-14 bg-highlight/10 rounded-2xl flex items-center justify-center mb-4 text-highlight">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12M8 7a2 2 0 100-4h-3.5A1.5 1.5 0 004 5.5V20M8 7v10m4-10v10m4-10v10M4 20h16" />
              </svg>
            </div>
            <h3 class="font-sans font-bold text-xl text-text-primary mb-3">Transporte Público</h3>
            <ul class="space-y-2 text-text-secondary text-sm mb-4">
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-highlight mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span>Rutas que pasan cerca: Centro, San Fernando, Popular</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-highlight mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span>Bájate en el Parque Los Libertadores</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-highlight mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span>Camina 1 cuadra hacia el oriente</span>
              </li>
            </ul>
            <div class="pt-4 border-t border-border">
              <div class="flex items-center gap-2 text-highlight">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="font-medium text-sm">A 2 min caminando del paradero</span>
              </div>
            </div>
          </div>

          <!-- Landmarks -->
          <div class="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 text-accent">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9m0 0h-5.5m0 0H2m11-5a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="font-sans font-bold text-xl text-text-primary mb-3">Puntos de Referencia</h3>
            <ul class="space-y-2 text-text-secondary text-sm">
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-success mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Frente al Parque Los Libertadores</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-success mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Al lado del Banco de Bogotá</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-success mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>A 2 cuadras de la Gobernación</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-success mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Edificio azul y blanco de 3 pisos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HowToGetThereSectionComponent {}
