import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CONFIG } from '../data/config.data';
import type { Service } from '@core/models/service.model';
import { Analytics } from './analytics';

/**
 * Service for generating WhatsApp deep links and opening WhatsApp chats.
 * All browser interactions are SSR-safe guarded with isPlatformBrowser.
 */
@Injectable({ providedIn: 'root' })
export class Whatsapp {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly analytics = inject(Analytics);

  /**
   * Generates a WhatsApp deep link URL with an optional pre-filled message.
   * @param message - Optional message text. Falls back to the default message from config.
   * @returns A wa.me URL string.
   */
  generateLink(message?: string): string {
    const text = encodeURIComponent(message ?? CONFIG.defaultWhatsappMessage);
    return `https://wa.me/${CONFIG.contact.whatsappNumber}?text=${text}`;
  }

  /**
   * Opens WhatsApp in a new tab with an optional pre-filled message.
   * No-op during server-side rendering.
   * @param message - Optional message text.
   */
  openChat(message?: string, tracking?: { service: Service['id']; placement: string }): void {
    if (tracking) this.analytics.trackWhatsappClick(tracking.service, tracking.placement);
    if (!isPlatformBrowser(this.platformId)) return;
    window.open(this.generateLink(message), '_blank', 'noopener,noreferrer');
  }

  /** Opens a service-specific WhatsApp conversation and records its CTA placement. */
  openServiceChat(service: Service, placement: string): void {
    this.openChat(service.whatsappMessage, { service: service.id, placement });
  }

  /**
   * Generates a WhatsApp link pre-filled with calculator results.
   * @param infraction - Name of the infraction.
   * @param originalValue - Original fine amount in COP.
   * @param discountedValue - Discounted fine amount in COP.
   * @param discountPercent - Discount percentage (e.g. 50).
   */
  generateCalculatorLink(
    infraction: string,
    originalValue: number,
    discountedValue: number,
    discountPercent: number,
  ): string {
    const formatted = (v: number) =>
      new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }).format(v);
    const message =
      `Hola, quiero aprovechar el ${discountPercent}% de descuento en mi comparendo.\n` +
      `Infracción: ${infraction}\n` +
      `Valor original: ${formatted(originalValue)}\n` +
      `Valor con descuento: ${formatted(discountedValue)}\n` +
      `¿Cómo puedo agendar mi curso?`;
    return this.generateLink(message);
  }
}
