import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { getServiceById } from '@core/data/services.data';
import { SERVICE_IDS } from '@core/models/service.model';
import { Whatsapp } from '@core/services';
import { MessageCircleIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Final invitation to request the refrendación service. */
@Component({
  selector: 'app-license-renewal-final-cta-section',
  imports: [Icon],
  templateUrl: './final-cta-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseRenewalFinalCtaSection {
  private readonly whatsapp = inject(Whatsapp);
  private readonly service = getServiceById(SERVICE_IDS.LICENSE_RENEWAL);
  protected readonly MessageCircleIcon = MessageCircleIcon;

  /** Opens the tracked final refrendación request. */
  protected contact(): void {
    this.whatsapp.openServiceChat(this.service, 'license-renewal-final-cta');
  }
}
