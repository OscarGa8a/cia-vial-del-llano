import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Whatsapp } from '@core/services/whatsapp';
import { Icon } from '@shared/components';
import { MapPinIcon } from 'lucide-angular';

/**
 * Final CTA section for the About page.
 * Full-width gradient banner with WhatsApp and location CTA buttons.
 */
@Component({
  selector: 'app-final-cta-section',
  imports: [RouterLink, Icon],
  templateUrl: './final-cta-section.html',
  styleUrl: './final-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCtaSection {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly MapPinIcon = MapPinIcon;

  /** Pre-built WhatsApp link with contextual message. */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero conocer más sobre CIA VIAL DEL LLANO y agendar una cita.',
    ),
  );
}
