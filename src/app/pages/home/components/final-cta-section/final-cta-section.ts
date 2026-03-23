import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { ShieldIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/**
 * Final call-to-action section promoting course enrollment for fine discounts.
 *
 * Displays a persuasive closing section encouraging users to book a course to obtain
 * their fine discounts. Provides a WhatsApp link with a pre-filled message to streamline
 * the booking process.
 *
 * @example
 * ```typescript
 * <app-final-cta-section />
 * ```
 */
@Component({
  selector: 'app-final-cta-section',
  imports: [Icon],
  templateUrl: './final-cta-section.html',
  styleUrl: './final-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCtaSection {
  /** Service for generating WhatsApp sharing links. */
  private readonly whatsapp = inject(Whatsapp);

  /**
   * WhatsApp link with pre-filled booking inquiry message.
   *
   * Generates a WhatsApp conversation starter requesting course scheduling
   * and fine discount information.
   */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, tengo un comparendo y quiero aprovechar el descuento. ¿Cómo puedo agendar mi curso?',
    ),
  );

  /* Icon representing security and trust in the final call-to-action. */
  protected readonly ShieldIcon = ShieldIcon;
}
