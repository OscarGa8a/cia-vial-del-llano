import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CONFIG } from '@core/data/config.data';
import { CONTACT_SUBJECTS } from '@core/data/contact-page.data';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { CircleCheckBigIcon, Clock4Icon, ExternalLinkIcon, MapPinIcon } from 'lucide-angular';

/**
 * Displays the contact form with business information and location details.
 *
 * @example
 * ```typescript
 * <app-contact-form-section />
 * ```
 */
@Component({
  selector: 'app-contact-form-section',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './contact-form-section.html',
  styleUrl: './contact-form-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormSection {
  /** Form builder used to create the typed reactive contact form. */
  private readonly fb = inject(FormBuilder);
  /** WhatsApp service used to open chats with prefilled messages. */
  private readonly whatsapp = inject(Whatsapp);
  /** Platform identifier used for browser/server checks in computed signals. */
  private readonly platformId = inject(PLATFORM_ID);
  /** Sanitizer used to safely trust the Google Maps embed URL. */
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
  protected readonly submitted = signal<boolean>(false);

  /** Full business address shown in the location card. */
  protected readonly fullAddress = CONFIG.address.full;
  /** External Google Maps URL used by quick-access actions. */
  protected readonly googleMapsUrl = CONFIG.googleMapsUrl;
  /** External Waze URL used for navigation shortcuts. */
  protected readonly wazeUrl = CONFIG.wazeUrl;

  /** Trusted iframe URL used to render the Google Maps embed. */
  protected readonly mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    CONFIG.mapEmbedUrl,
  );

  /**
   * Computes whether the business is currently open.
   * SSR-safe — always returns false on the server.
   */
  protected readonly isOpen = computed<boolean>(() => {
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

  /** Icons used in the template for various UI elements. */
  protected readonly CircleCheckBigIcon = CircleCheckBigIcon;
  protected readonly Clock4Icon = Clock4Icon;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly ExternalLinkIcon = ExternalLinkIcon;

  /** Validates the form, builds the WhatsApp message, and opens the chat. */
  onSubmit(): void {
    if (this.contactForm.invalid) return;

    const { name, phone, email, subject, message } = this.contactForm.getRawValue();
    const subjectLabel = this.subjects.find((s) => s.value === subject)?.label ?? subject;

    const whatsappMessage =
      `Hola, soy ${name}.\n` +
      `Teléfono: ${phone}\n` +
      (email ? `Correo: ${email}\n` : '') +
      `Asunto: ${subjectLabel}\n\n` +
      `${message}`;

    this.whatsapp.openChat(whatsappMessage);
    this.submitted.set(true);
    this.contactForm.reset();
  }
}
