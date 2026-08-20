import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import type { ServiceId } from '@core/models/service.model';

export interface WhatsappTrackingEvent {
  readonly event: 'whatsapp_click';
  readonly service: ServiceId | 'general';
  readonly placement: string;
}

/** Records WhatsApp CTA interactions without touching browser APIs during SSR. */
@Injectable({ providedIn: 'root' })
export class Analytics {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.addEventListener('click', this.trackWhatsappAnchorClick.bind(this));
    }
  }

  trackWhatsappClick(service: WhatsappTrackingEvent['service'], placement: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const dataLayerWindow = window as Window & { dataLayer?: WhatsappTrackingEvent[] };
    (dataLayerWindow.dataLayer ??= []).push({ event: 'whatsapp_click', service, placement });
  }

  private trackWhatsappAnchorClick(event: Event): void {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
    if (!anchor) return;

    this.trackWhatsappClick(
      (anchor.dataset['whatsappService'] as WhatsappTrackingEvent['service']) ?? 'general',
      anchor.dataset['whatsappPlacement'] ?? 'link',
    );
  }
}
