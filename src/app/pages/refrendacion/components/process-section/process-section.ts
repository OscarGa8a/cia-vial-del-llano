import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SERVICE_IDS } from '@core/models/service.model';
import { getServiceById } from '@core/data/services.data';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';

/** Shows the refrendación service request path. */
@Component({
  selector: 'app-license-renewal-process-section',
  imports: [Icon],
  templateUrl: './process-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseRenewalProcessSection {
  private readonly whatsapp = inject(Whatsapp);
  private readonly service = getServiceById(SERVICE_IDS.LICENSE_RENEWAL);

  protected readonly steps = [
    { title: 'Solicita el servicio', description: 'Escríbenos para solicitar la refrendación o renovación de tu licencia.' },
    { title: 'Confirma los detalles', description: 'Revisa la atención, los documentos, el valor y la disponibilidad para tu caso.' },
    { title: 'Comparte la información disponible', description: 'Envía los datos de tu licencia y el motivo de tu solicitud.' },
    { title: 'Continúa con la información confirmada', description: 'Avanza con los detalles que confirmaste para tu servicio.' },
  ] as const;

  /** Opens the tracked refrendación service request. */
  protected contact(): void {
    this.whatsapp.openServiceChat(this.service, 'license-renewal-process');
  }
}
