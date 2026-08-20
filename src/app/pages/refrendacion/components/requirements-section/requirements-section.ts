import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Helps visitors prepare to initiate their refrendación service request. */
@Component({
  selector: 'app-license-renewal-requirements-section',
  imports: [Icon],
  templateUrl: './requirements-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseRenewalRequirementsSection {
  protected readonly prepareItems = [
    'La información disponible de tu licencia de conducción.',
    'Tu documento de identidad y los datos que ayuden a revisar tu caso.',
    'El motivo por el que deseas iniciar la refrendación.',
  ] as const;

  protected readonly confirmItems = [
    'Los requisitos y documentos aplicables a tu caso.',
    'El valor y la disponibilidad vigentes para la atención.',
    'Las acciones e indicaciones que debes seguir para continuar.',
  ] as const;

  protected readonly CheckIcon = CheckIcon;
}
