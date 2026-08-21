import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getServiceById } from '@core/data/services.data';
import { SERVICE_IDS } from '@core/models/service.model';
import { Whatsapp } from '@core/services';
import { CheckIcon, ClipboardCheckIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/**
 * Atmospheric, service-specific entry point for license renewal requests.
 */
@Component({
  selector: 'app-license-renewal-hero-section',
  imports: [Icon, NgOptimizedImage, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseRenewalHeroSection {
  private readonly whatsapp = inject(Whatsapp);
  private readonly service = getServiceById(SERVICE_IDS.LICENSE_RENEWAL);

  protected readonly heroImagePublicId = 'banner_endorsement_bwzq91';
  protected readonly quickHighlights = [
    'Servicio de refrendación',
    'Atención en Villavicencio',
    'Confirmación según tu caso',
  ] as const;
  protected readonly CheckIcon = CheckIcon;
  protected readonly ClipboardCheckIcon = ClipboardCheckIcon;

  /** Opens the tracked, service-specific refrendación request. */
  protected contact(): void {
    this.whatsapp.openServiceChat(this.service, 'license-renewal-hero');
  }
}
