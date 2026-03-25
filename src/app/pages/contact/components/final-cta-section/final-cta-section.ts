import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { ShieldIcon } from 'lucide-angular';

/**
 * Final CTA section for the Contact page.
 * Full-width gradient banner with a strong WhatsApp call-to-action
 * to convert visitors who haven't yet reached out.
 */
@Component({
  selector: 'app-final-cta-section',
  imports: [Icon],
  templateUrl: './final-cta-section.html',
  styleUrl: './final-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCtaSection {
  private readonly whatsapp = inject(Whatsapp);

  /** Pre-built WhatsApp link with contextual message. */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink('Hola, tengo una duda y me gustaría recibir ayuda.'),
  );

  protected readonly ShieldIcon = ShieldIcon;
}
