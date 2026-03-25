import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONFIG } from '@core/data/config.data';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-angular';

/**
 * Displays the main contact channels as cards (WhatsApp, phone, email, and location).
 *
 * @example
 * ```typescript
 * <app-contact-options-section />
 * ```
 */
@Component({
  selector: 'app-contact-options-section',
  imports: [RouterLink, Icon],
  templateUrl: './contact-options-section.html',
  styleUrl: './contact-options-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactOptionsSection {
  /** WhatsApp service used to generate deep links with prefilled messages. */
  private readonly whatsapp = inject(Whatsapp);

  /** Primary phone number shown in the section. */
  protected readonly phoneNumber = CONFIG.contact.phone;
  /** Contact email shown in the section. */
  protected readonly email = CONFIG.contact.email;
  /** City label shown in the location card. */
  protected readonly city = CONFIG.address.city;

  /** Computed WhatsApp URL with a default contextual message for users. */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, quiero información sobre los cursos para descuento en comparendos.',
    ),
  );

  /** Phone icon displayed in the phone contact card. */
  protected readonly PhoneIcon = PhoneIcon;
  /** Mail icon displayed in the email contact card. */
  protected readonly MailIcon = MailIcon;
  /** Pin icon displayed in the location contact card. */
  protected readonly MapPinIcon = MapPinIcon;
}
