import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DiscountCard as IDiscountCard } from '@core/models/discount';
import { DiscountCard, Icon } from '@shared/components';
import { CameraIcon, CarFrontIcon, TriangleAlertIcon } from 'lucide-angular';

/**
 * Discount tables section showing the specific discount windows
 * for manual comparendos vs electronic/fotomulta comparendos.
 * Includes an informational note about business days.
 *
 * @example
 * ```typescript
 * <app-discount-table-section />
 * ```
 */
@Component({
  selector: 'app-discount-table-section',
  imports: [Icon, DiscountCard],
  templateUrl: './discount-table-section.html',
  styleUrl: './discount-table-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountTableSection {
  /** Discount card data grouped by manual and electronic ticket types. */
  protected readonly discountCards: IDiscountCard[] = [
    {
      id: 'manual',
      icon: CarFrontIcon,
      title: 'Comparendo Manual',
      subtitle: 'Impuesto por agente de tránsito',
      gradientClass: 'bg-gradient-to-r from-primary to-primary-light',
      tiers: [
        {
          percent: 50,
          label: '50% de descuento',
          days: 'Primeros 1 a 5 días hábiles',
          colorClass: 'bg-success-light text-success',
        },
        {
          percent: 25,
          label: '25% de descuento',
          days: 'Del día 6 al día 20 hábil',
          colorClass: 'bg-warning-light text-warning',
        },
      ],
      whatsappMessage:
        'Hola, tengo un comparendo manual y quiero obtener el descuento. ¿Cuándo puedo tomar el curso?',
    },
    {
      id: 'electronico',
      icon: CameraIcon,
      title: 'Fotomulta / Electrónico',
      subtitle: 'Capturado por cámara de tránsito',
      gradientClass: 'bg-gradient-to-r from-accent to-accent-hover',
      tiers: [
        {
          percent: 50,
          label: '50% de descuento',
          days: 'Del día 1 al día 11 hábil',
          colorClass: 'bg-success-light text-success',
        },
        {
          percent: 25,
          label: '25% de descuento',
          days: 'Del día 12 al día 26 hábil',
          colorClass: 'bg-warning-light text-warning',
        },
      ],
      whatsappMessage:
        'Hola, tengo una fotomulta y quiero obtener el descuento. ¿Cuándo puedo tomar el curso?',
    },
  ];

  /** Alert icon displayed in the business-days advisory note. */
  protected readonly TriangleAlertIcon = TriangleAlertIcon;
}
