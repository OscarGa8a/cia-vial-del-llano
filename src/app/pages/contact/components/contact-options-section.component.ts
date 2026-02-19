import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Whatsapp } from '@core/services/whatsapp';
import { CONFIG } from '@core/data/config.data';

/**
 * Contact options section — 4-card grid showing the main ways
 * to reach CIA Vial del Llano: WhatsApp (highlighted), Phone, Email, Location.
 *
 * WhatsApp card uses a gradient background and pulse animation
 * to draw attention as the preferred contact method.
 */
@Component({
  selector: 'app-contact-options-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="py-16 bg-white"
      aria-labelledby="contact-options-heading"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="contact-options-heading"
          class="font-sans font-bold text-2xl sm:text-3xl text-text-primary text-center mb-4"
        >
          ¿Cómo prefieres <span class="text-primary">comunicarte</span>?
        </h2>
        <p class="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          Elige el canal que más te convenga. Respondemos en menos de 5 minutos.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- WhatsApp card (highlighted) -->
          <a
            [href]="whatsappLink()"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-whatsapp to-green-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            aria-label="Contactar por WhatsApp"
          >
            <div
              class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-[whatsapp-pulse_2s_ease-in-out_infinite]"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg">WhatsApp</h3>
            <p class="text-sm text-white/80 text-center">
              Respuesta inmediata
            </p>
            <span
              class="absolute top-3 right-3 text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium"
            >
              Recomendado
            </span>
          </a>

          <!-- Phone card -->
          <a
            [href]="'tel:' + phoneNumber"
            class="card-hover group flex flex-col items-center gap-4 p-8 rounded-2xl border border-border bg-white text-center"
            aria-label="Llamar por teléfono"
          >
            <div
              class="w-16 h-16 rounded-full bg-info-light flex items-center justify-center"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="text-info"
                aria-hidden="true"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
              Teléfono
            </h3>
            <p class="text-sm text-text-secondary">{{ phoneNumber }}</p>
          </a>

          <!-- Email card -->
          <a
            [href]="'mailto:' + email"
            class="card-hover group flex flex-col items-center gap-4 p-8 rounded-2xl border border-border bg-white text-center"
            aria-label="Enviar correo electrónico"
          >
            <div
              class="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="text-accent"
                aria-hidden="true"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 class="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
              Correo
            </h3>
            <p class="text-sm text-text-secondary">{{ email }}</p>
          </a>

          <!-- Location card -->
          <a
            routerLink="/ubicacion"
            class="card-hover group flex flex-col items-center gap-4 p-8 rounded-2xl border border-border bg-white text-center"
            aria-label="Ver ubicación de CIA Vial del Llano"
          >
            <div
              class="w-16 h-16 rounded-full bg-success-light flex items-center justify-center"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="text-success"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 class="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
              Ubicación
            </h3>
            <p class="text-sm text-text-secondary">{{ city }}</p>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ContactOptionsSectionComponent {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly phoneNumber = CONFIG.contact.phone;
  protected readonly email = CONFIG.contact.email;
  protected readonly city = CONFIG.address.city;

  /** Pre-built WhatsApp link with contextual message. */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero información sobre los cursos para descuento en comparendos.',
    ),
  );
}
