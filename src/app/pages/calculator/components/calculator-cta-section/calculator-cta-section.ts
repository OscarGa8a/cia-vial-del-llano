import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { CircleCheckIcon } from 'lucide-angular';

/**
 * Final call-to-action section for the calculator page.
 * Gradient background with a WhatsApp CTA and trust badges.
 */
@Component({
  selector: 'app-calculator-cta-section',
  imports: [Icon],
  templateUrl: './calculator-cta-section.html',
  styleUrl: './calculator-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorCtaSection {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, ya calculé mi multa y quiero agendar mi curso para obtener el descuento.',
    ),
  );

  protected readonly badges = [
    'MinTransporte Certificado',
    '+5,000 Alumnos',
    'Atención inmediata',
  ] as const;

  protected readonly CircleCheckIcon = CircleCheckIcon;
}
