import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CONFIG } from '@core/data/config.data';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { MessageSquareIcon, PhoneIcon } from 'lucide-angular';

/**
 * Call-to-action banner for contacting support via WhatsApp or phone.
 *
 * Displays a "Still have questions?" banner with two contact options:
 * Direct WhatsApp messaging with a pre-filled message and a phone call button.
 * Uses the Whatsapp service to generate links and CONFIG data for contact info.
 *
 * @example
 * ```typescript
 * <app-contact-cta-section />
 * ```
 */
@Component({
  selector: 'app-contact-cta-section',
  imports: [Icon],
  templateUrl: './contact-cta-section.html',
  styleUrl: './contact-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCtaSection {
  /** Whatsapp service for generating messaging links. */
  private readonly whatsapp = inject(Whatsapp);

  /** Formatted phone number for display. */
  protected readonly phone = CONFIG.contact.phone;

  /** Phone number without spaces for tel: links. */
  protected readonly phoneRaw = CONFIG.contact.phone.replace(/\s/g, '');

  /** WhatsApp messaging link with pre-filled support question. */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, tengo una duda que no aparece en las preguntas frecuentes. ¿Me pueden ayudar?',
    ),
  );

  /** Message square icon reference for WhatsApp button. */
  protected readonly MessageSquareIcon = MessageSquareIcon;

  /** Phone icon reference for phone button. */
  protected readonly PhoneIcon = PhoneIcon;
}
