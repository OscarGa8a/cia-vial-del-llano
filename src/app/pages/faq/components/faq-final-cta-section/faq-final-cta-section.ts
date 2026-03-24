import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { ShieldIcon } from 'lucide-angular';

/**
 * Final call-to-action section for the FAQ page with course enrollment prompt.
 *
 * Displays a full-width gradient banner with a compelling WhatsApp CTA
 * encouraging users to schedule a course enrollment for traffic ticket discount.
 * Pre-fills the message with course enrollment context for quick contact.
 *
 * @example
 * ```typescript
 * <app-faq-final-cta-section />
 * ```
 */
@Component({
  selector: 'app-faq-final-cta-section',
  imports: [Icon],
  templateUrl: './faq-final-cta-section.html',
  styleUrl: './faq-final-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqFinalCtaSection {
  /** Whatsapp service for generating course enrollment messaging links. */
  private readonly whatsapp = inject(Whatsapp);

  /** WhatsApp link with pre-filled course enrollment message. */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, estuve viendo las preguntas frecuentes y quiero agendar mi curso para el descuento en mi comparendo.',
    ),
  );

  /** Shield icon reference for visual protection/security messaging. */
  protected readonly ShieldIcon = ShieldIcon;
}
