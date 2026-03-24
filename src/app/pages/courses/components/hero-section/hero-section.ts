import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { CalculatorIcon, CheckIcon, ChevronRightIcon, ShieldIcon } from 'lucide-angular';

/**
 * Hero section for the courses page.
 * Gradient background with breadcrumb, MinTransporte certification badge,
 * headline, description, and WhatsApp CTA button.
 *
 * @example
 * ```typescript
 * <app-hero-section />
 * ```
 */
@Component({
  selector: 'app-hero-section',
  imports: [Icon, NgOptimizedImage],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  /** WhatsApp link generator service used for CTA navigation. */
  private readonly whatsapp = inject(Whatsapp);

  /** Prebuilt WhatsApp URL for the primary course enrollment CTA. */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso pedagógico para obtener el descuento en mi comparendo.',
    ),
  );

  /** Key course highlights shown below the hero copy. */
  protected readonly quickStats = [
    { label: 'Duración: 4 horas' },
    { label: 'Certificado oficial' },
    { label: 'Validez nacional' },
  ] as const;

  /** Chevron icon used in breadcrumb and CTA visual indicators. */
  protected readonly ChevronRightIcon = ChevronRightIcon;

  /** Shield icon used for trust and certification messaging. */
  protected readonly ShieldIcon = ShieldIcon;

  /** Calculator icon used for discount-related value proposition. */
  protected readonly CalculatorIcon = CalculatorIcon;

  /** Check icon used for quick stats list bullets. */
  protected readonly CheckIcon = CheckIcon;
}
