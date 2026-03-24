import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Whatsapp } from '@core/services/whatsapp';
import { CONFIG } from '@core/data/config.data';
import { CalculatorIcon, CheckIcon, Clock4Icon } from 'lucide-angular';
import { Icon } from '@shared/components';
import { NgOptimizedImage } from '@angular/common';

/**
 * Main hero section for the home page with primary messaging and conversion actions.
 *
 * Renders the first-screen content including discount value proposition, trust badges,
 * key metrics, and direct call-to-action links for WhatsApp and calculator navigation.
 *
 * @example
 * ```typescript
 * <app-hero-section />
 * ```
 */
@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, Icon, NgOptimizedImage],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  /** Service used to generate WhatsApp links with pre-filled messages. */
  private readonly whatsapp = inject(Whatsapp);

  /**
   * WhatsApp call-to-action link for course scheduling.
   *
   * Generates a pre-filled message for users who want to start
   * the discount process for traffic fines.
   */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso para obtener el descuento en mi comparendo.',
    ),
  );

  /** Short trust labels shown as micro-badges in the hero area. */
  protected readonly trustBadges = ['MinTransporte', 'RUNT', 'SIMIT', 'Supertransporte'] as const;

  /** Key business metrics highlighted in the stats bar below the hero content. */
  protected readonly stats = [
    { value: CONFIG.stats.courses, label: 'Cursos realizados' },
    { value: CONFIG.stats.satisfaction, label: 'Clientes satisfechos' },
    { value: CONFIG.stats.yearsExperience, label: 'Años de experiencia' },
  ] as const;

  /** Clock icon used in urgency badge content. */
  protected readonly Clock4Icon = Clock4Icon;

  /** Calculator icon used in secondary call-to-action button. */
  protected readonly CalculatorIcon = CalculatorIcon;

  /** Check icon used in trust badge list items. */
  protected readonly CheckIcon = CheckIcon;
}
