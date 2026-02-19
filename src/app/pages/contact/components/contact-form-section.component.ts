import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Whatsapp } from '@core/services/whatsapp';
import { CONFIG } from '@core/data/config.data';
import { CONTACT_SUBJECTS } from '@core/data/contact-page.data';

/**
 * Contact form + info sidebar section.
 *
 * Left column (lg:col-span-7): Reactive form with name, phone, email,
 * subject dropdown, and message. On submit, composes a WhatsApp message
 * from the form data and opens WhatsApp via the Whatsapp service.
 *
 * Right column (lg:col-span-5): Business hours with live open/closed
 * status, address card, and embedded Google Maps iframe.
 */
@Component({
  selector: 'app-contact-form-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section
      class="py-16 bg-surface-alt"
      aria-labelledby="contact-form-heading"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="contact-form-heading"
          class="font-sans font-bold text-2xl sm:text-3xl text-text-primary text-center mb-4"
        >
          Envíanos tu <span class="text-primary">mensaje</span>
        </h2>
        <p class="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          Completa el formulario y te responderemos por WhatsApp
          en minutos.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- ── Form Column ── -->
          <div class="lg:col-span-7">
            <form
              [formGroup]="contactForm"
              (ngSubmit)="onSubmit()"
              class="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
            >
              <!-- Name + Phone row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    for="contact-name"
                    class="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    formControlName="name"
                    placeholder="Tu nombre"
                    autocomplete="name"
                    class="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    for="contact-phone"
                    class="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Teléfono
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    formControlName="phone"
                    placeholder="300 123 4567"
                    autocomplete="tel"
                    class="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="mb-4">
                <label
                  for="contact-email"
                  class="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Correo electrónico
                </label>
                <input
                  id="contact-email"
                  type="email"
                  formControlName="email"
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                  class="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <!-- Subject -->
              <div class="mb-4">
                <label
                  for="contact-subject"
                  class="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Asunto
                </label>
                <select
                  id="contact-subject"
                  formControlName="subject"
                  class="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                >
                  <option value="" disabled>Selecciona un asunto</option>
                  @for (subject of subjects; track subject.value) {
                    <option [value]="subject.value">{{ subject.label }}</option>
                  }
                </select>
              </div>

              <!-- Message -->
              <div class="mb-6">
                <label
                  for="contact-message"
                  class="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  formControlName="message"
                  rows="4"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  class="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                [disabled]="contactForm.invalid"
                class="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                Enviar por WhatsApp
              </button>

              <!-- Success feedback -->
              @if (submitted()) {
                <div
                  class="mt-4 flex items-center gap-2 p-4 rounded-xl bg-success-light text-success text-sm font-medium"
                  role="status"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Mensaje enviado. Te redirigimos a WhatsApp.
                </div>
              }
            </form>
          </div>

          <!-- ── Info Sidebar ── -->
          <div class="lg:col-span-5 flex flex-col gap-6">
            <!-- Business hours card -->
            <div class="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    class="text-accent"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 class="font-bold text-text-primary">Horario de atención</h3>

                <!-- Live open/closed badge -->
                <span
                  class="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                  [class]="isOpen() ? 'bg-success-light text-success' : 'bg-error-light text-error'"
                >
                  {{ isOpen() ? 'Abierto' : 'Cerrado' }}
                </span>
              </div>

              <ul class="space-y-2 text-sm text-text-secondary">
                <li class="flex justify-between">
                  <span>Lunes a Viernes</span>
                  <span class="font-medium text-text-primary">8:00 AM – 6:00 PM</span>
                </li>
                <li class="flex justify-between">
                  <span>Sábados</span>
                  <span class="font-medium text-text-primary">8:00 AM – 2:00 PM</span>
                </li>
                <li class="flex justify-between">
                  <span>Domingos</span>
                  <span class="font-medium text-text-primary">Cerrado</span>
                </li>
              </ul>
            </div>

            <!-- Address card -->
            <div class="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
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
                <h3 class="font-bold text-text-primary">Dirección</h3>
              </div>

              <p class="text-sm text-text-secondary mb-3">
                {{ fullAddress }}
              </p>

              <div class="flex gap-2">
                <a
                  [href]="googleMapsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                  aria-label="Abrir en Google Maps"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Google Maps
                </a>
                <a
                  [href]="wazeUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                  aria-label="Abrir en Waze"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Waze
                </a>
              </div>
            </div>

            <!-- Embedded map -->
            <div
              class="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
            >
              <iframe
                [src]="mapEmbedUrl"
                width="100%"
                height="250"
                style="border: 0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicación de CIA Vial del Llano en Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactFormSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly whatsapp = inject(Whatsapp);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);

  /** Reactive form for contact message. */
  protected readonly contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.email],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  /** Subject options for the dropdown. */
  protected readonly subjects = CONTACT_SUBJECTS;

  /** Tracks whether the form has been successfully submitted. */
  protected readonly submitted = signal(false);

  /** Static data from CONFIG. */
  protected readonly fullAddress = CONFIG.address.full;
  protected readonly googleMapsUrl = CONFIG.googleMapsUrl;
  protected readonly wazeUrl = CONFIG.wazeUrl;

  /** SafeResourceUrl: bypasses Angular's iframe src sanitization for this trusted Google Maps embed URL. */
  protected readonly mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(CONFIG.mapEmbedUrl);

  /**
   * Computes whether the business is currently open.
   * SSR-safe — always returns false on the server.
   */
  protected readonly isOpen = computed(() => {
    if (!isPlatformBrowser(this.platformId)) return false;

    const now = new Date();
    const day = now.getDay(); // 0=Sun, 6=Sat
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour * 60 + minute;

    // Sunday — closed
    if (day === 0) return false;
    // Saturday — 8:00 AM to 2:00 PM
    if (day === 6) return time >= 480 && time < 840;
    // Weekdays — 8:00 AM to 6:00 PM
    return time >= 480 && time < 1080;
  });

  /**
   * On submit, compose a WhatsApp message from the form fields
   * and open WhatsApp via the Whatsapp service.
   */
  onSubmit(): void {
    if (this.contactForm.invalid) return;

    const { name, phone, email, subject, message } = this.contactForm.getRawValue();
    const subjectLabel =
      this.subjects.find((s) => s.value === subject)?.label ?? subject;

    const whatsappMessage =
      `Hola, soy ${name}.\n` +
      `Teléfono: ${phone}\n` +
      (email ? `Correo: ${email}\n` : '') +
      `Asunto: ${subjectLabel}\n\n` +
      message;

    this.whatsapp.openChat(whatsappMessage);
    this.submitted.set(true);
    this.contactForm.reset();
  }
}
