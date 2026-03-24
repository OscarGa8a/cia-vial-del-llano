import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONFIG } from '@core/data/config.data';
import { BusinessHours, Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import {
  ClipboardCopyIcon,
  Clock4Icon,
  InfoIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
} from 'lucide-angular';

/**
 * Renders contact cards, quick actions, and an embedded map for the location page.
 *
 * @example
 * ```html
 * <app-contact-info-section />
 * ```
 */
@Component({
  selector: 'app-contact-info-section',
  imports: [Icon],
  templateUrl: './contact-info-section.html',
  styleUrl: './contact-info-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoSection {
  /** Static configuration used to render address, links, and contact details. */
  protected readonly config = CONFIG;

  /** Service that provides schedule and open/closed status for the office. */
  protected readonly businessHours = inject(BusinessHours);

  /** Service used to generate WhatsApp contact links. */
  protected readonly whatsapp = inject(Whatsapp);

  /** Current toast message; `null` means the toast is hidden. */
  protected readonly toastMessage = signal<string | null>(null);

  /** Toast visual variant for success and error feedback states. */
  protected readonly toastType = signal<'success' | 'error'>('success');

  /** Angular sanitizer used to safely bind the trusted map iframe URL. */
  private readonly sanitizer = inject(DomSanitizer);

  /** Platform identifier used to guard browser-only APIs like Clipboard. */
  private readonly platformId = inject(PLATFORM_ID);

  /** Active auto-hide timer reference for the toast lifecycle. */
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  /** Sanitized Google Maps embed URL bound to the map iframe source. */
  protected readonly mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(CONFIG.mapEmbedUrl);

  protected readonly MapPinIcon = MapPinIcon;
  protected readonly InfoIcon = InfoIcon;
  protected readonly ClipboardCopyIcon = ClipboardCopyIcon;
  protected readonly Clock4Icon = Clock4Icon;
  protected readonly PhoneIcon = PhoneIcon;
  protected readonly MailIcon = MailIcon;
  protected readonly UsersIcon = UsersIcon;

  /** Copies the full address to Clipboard API and shows success or error feedback. */
  protected copyAddress(): void {
    if (!isPlatformBrowser(this.platformId) || !navigator.clipboard) {
      this.showToast('No se pudo acceder al portapapeles en este entorno.', 'error');
      return;
    }

    navigator.clipboard
      .writeText(this.config.address.full)
      .then(() => {
        this.showToast('Dirección copiada al portapapeles', 'success');
      })
      .catch(() => {
        this.showToast('No se pudo copiar la dirección. Intentá nuevamente.', 'error');
      });
  }

  /**
   * Shows a temporary toast message.
   *
   * @param message - Message displayed inside the toast.
   * @param type - Visual toast variant.
   */
  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.toastMessage.set(null);
      this.toastTimer = null;
    }, 2500);
  }
}
