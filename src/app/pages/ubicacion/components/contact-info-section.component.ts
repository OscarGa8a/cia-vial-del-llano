import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CONFIG } from '../../../core/data/config.data';
import { BusinessHoursService } from '../../../core/services/business-hours.service';
import { Whatsapp } from '@core/services/whatsapp';

/**
 * Contact information section with address, hours, phone, email cards and embedded Google Map.
 */
@Component({
  selector: 'app-contact-info-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <section class="py-12 lg:py-16 bg-white" id="contacto" aria-labelledby="contact-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <!-- Left Column - Contact Info Cards -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Address Card -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
                <div class="flex-grow">
                  <h3 class="font-sans font-bold text-lg text-text-primary mb-2">Dirección</h3>
                  <p class="text-text-secondary mb-1">{{ config.address.street }}</p>
                  <p class="text-text-secondary mb-3">
                    {{ config.address.city }}, {{ config.address.department }}
                  </p>
                  <p class="text-text-secondary text-sm mb-4">
                    <span aria-hidden="true">ℹ️</span>
                    Frente al Parque Los Libertadores, al lado del Banco de Bogotá
                  </p>
                  <button
                    (click)="copyAddress()"
                    class="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium text-sm transition-colors"
                    aria-label="Copiar dirección al portapapeles"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012 2h2a2 2 0 012-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copiar dirección
                  </button>
                </div>
              </div>
            </div>

            <!-- Business Hours Card -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-highlight/10 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-highlight"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div class="flex-grow">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-sans font-bold text-lg text-text-primary">
                      Horarios de Atención
                    </h3>
                    <span
                      class="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                      [class.bg-success/10]="businessHours.isOpenNow()"
                      [class.text-success]="businessHours.isOpenNow()"
                      [class.bg-error/10]="!businessHours.isOpenNow()"
                      [class.text-error]="!businessHours.isOpenNow()"
                      aria-live="polite"
                    >
                      <span
                        class="w-2 h-2 rounded-full"
                        [class.bg-success]="businessHours.isOpenNow()"
                        [class.bg-error]="!businessHours.isOpenNow()"
                        [class.status-open]="businessHours.isOpenNow()"
                      ></span>
                      {{ businessHours.statusLabel() }}
                    </span>
                  </div>
                  <div class="space-y-2">
                    @for (schedule of businessHours.getSchedule(); track schedule.days) {
                      <div
                        class="flex justify-between items-center py-2 border-b border-border last:border-0"
                      >
                        <span class="text-text-secondary">{{ schedule.days }}</span>
                        <span
                          class="font-semibold"
                          [class.text-text-primary]="schedule.open"
                          [class.text-error]="!schedule.open"
                        >
                          {{ schedule.hours }}
                        </span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Phone Card -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div class="flex-grow">
                  <h3 class="font-sans font-bold text-lg text-text-primary mb-3">Teléfonos</h3>
                  <div class="space-y-3">
                    <a
                      [href]="'tel:' + config.contact.phone.replace(/\\s/g, '')"
                      class="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                      aria-label="Llamar por teléfono fijo"
                    >
                      <svg
                        class="w-5 h-5 text-text-secondary flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span class="font-medium">{{ config.contact.phone }}</span>
                      <span class="text-xs text-text-secondary">Fijo</span>
                    </a>
                    <a
                      [href]="
                        whatsapp.generateLink('Hola, quisiera información sobre nuestra ubicación')
                      "
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-3 text-whatsapp hover:text-whatsapp-hover transition-colors"
                      aria-label="Escribir por WhatsApp"
                    >
                      <svg
                        class="w-5 h-5 text-whatsapp flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                        />
                      </svg>
                      <span class="font-medium">300 123 4567</span>
                      <span class="text-xs text-whatsapp font-medium">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Email Card -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div class="flex-grow">
                  <h3 class="font-sans font-bold text-lg text-text-primary mb-2">
                    Correo Electrónico
                  </h3>
                  <a
                    [href]="'mailto:' + config.contact.email"
                    class="text-primary hover:text-primary-light font-medium transition-colors break-all"
                    aria-label="Enviar correo electrónico"
                  >
                    {{ config.contact.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Map -->
          <div class="lg:col-span-3">
            <div
              class="bg-white rounded-3xl shadow-xl overflow-hidden h-full min-h-[400px] lg:min-h-[600px] relative"
            >
              <!-- Google Maps iframe -->
              <iframe
                [src]="mapSrc"
                width="100%"
                height="100%"
                style="border:0;display:block;min-height:400px;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicación de CIA Vial del Llano en Villavicencio, Meta"
              ></iframe>

              <!-- Overlay badge -->
              <div
                class="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-sm font-bold shadow-sm text-text-secondary"
              >
                Villavicencio, Meta
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            [href]="config.googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Abrir ubicación en Google Maps"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            Abrir en Google Maps
          </a>
          <a
            [href]="config.wazeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 bg-[#33CCFF] hover:bg-[#00BFFF] text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Abrir ubicación en Waze"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
            Abrir en Waze
          </a>
          <button
            (click)="copyAddress()"
            class="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-alt text-text-primary font-semibold px-6 py-4 rounded-xl border-2 border-border transition-all duration-300"
            aria-label="Copiar dirección al portapapeles"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012 2h2a2 2 0 012-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            Copiar Dirección
          </button>
        </div>
      </div>
    </section>
  `,
})
export class ContactInfoSectionComponent {
  protected readonly config = CONFIG;
  protected readonly businessHours = inject(BusinessHoursService);
  protected readonly whatsapp = inject(Whatsapp);

  private readonly sanitizer = inject(DomSanitizer);

  /** SafeResourceUrl: bypasses Angular's iframe src sanitization for this trusted Google Maps embed URL. */
  protected readonly mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(CONFIG.mapEmbedUrl);

  /**
   * Copy address to clipboard and show toast notification.
   */
  protected copyAddress(): void {
    navigator.clipboard.writeText(this.config.address.full).then(() => {
      this.showToast();
    });
  }

  /**
   * Show toast notification.
   */
  private showToast(): void {
    // Simple toast using browser alert (can be replaced with a more sophisticated toast service)
    const message = 'Dirección copiada al portapapeles';
    // In a real app, you'd use a toast service here
    console.log(message);
  }
}
