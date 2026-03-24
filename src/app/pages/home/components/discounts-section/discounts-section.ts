import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CameraIcon, CarFrontIcon, TriangleAlertIcon } from 'lucide-angular';
import { DiscountCard, Icon } from '@shared/components';
import { DiscountCard as IDiscountCard } from '@core/models/discount';

/**
 * Displays available fine discounts with different tiers for manual and electronic fines.
 *
 * Shows two main categories of traffic fines ("Comparendo Manual" and "Fotomulta")
 * with their respective discount percentages and time windows. Users can initiate
 * WhatsApp conversations to book courses for obtaining discounts.
 *
 * @example
 * ```typescript
 * <app-discounts-section />
 * ```
 */
@Component({
  selector: 'app-discounts-section',
  imports: [DiscountCard, Icon],
  templateUrl: './discounts-section.html',
  styleUrl: './discounts-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountsSection {
  /**
   * Collection of discount cards for different fine types.
   *
   * Contains configurations for manual and electronic fines with their respective
   * discount tiers and WhatsApp messaging templates.
   */
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
          days: 'Primeros 5 días hábiles',
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
        'Hola, tengo un comparendo manual y quiero obtener el descuento. ¿Cómo puedo agendar mi curso?',
    },
    {
      id: 'fotomulta',
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
        'Hola, tengo una fotomulta y quiero obtener el descuento. ¿Cómo puedo agendar mi curso?',
    },
  ];

  /** Icon representing an alert for discount expiration. */
  protected readonly TriangleAlertIcon = TriangleAlertIcon;
}
