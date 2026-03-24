import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CONFIG } from '@core/data/config.data';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { PhoneIcon } from 'lucide-angular';

/**
 * Renders the final location CTA with direct WhatsApp contact action.
 *
 * @example
 * ```html
 * <app-ubication-final-cta-section />
 * ```
 */
@Component({
  selector: 'app-ubication-final-cta-section',
  imports: [Icon],
  templateUrl: './ubication-final-cta-section.html',
  styleUrl: './ubication-final-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UbicationFinalCtaSection {
  /** Shared static configuration used for contact details and labels. */
  protected readonly config = CONFIG;

  /** Service used to generate WhatsApp deep links for the CTA button. */
  private readonly whatsapp = inject(Whatsapp);

  /** Phone icon rendered near the contact action. */
  protected readonly PhoneIcon = PhoneIcon;

  /**
   * Pre-computed WhatsApp URL for users requesting location assistance.
   * Reuses a fixed message to keep CTA behavior consistent.
   */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, necesito ayuda con las indicaciones para llegar a CIA VIAL DEL LLANO',
    ),
  );
}
