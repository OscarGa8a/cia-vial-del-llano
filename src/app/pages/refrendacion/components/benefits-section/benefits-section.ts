import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarClockIcon, FileCheck2Icon, ShieldCheckIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Presents common situations for requesting the refrendación service. */
@Component({
  selector: 'app-license-renewal-benefits-section',
  imports: [Icon],
  templateUrl: './benefits-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseRenewalBenefitsSection {
  protected readonly benefits = [
    { icon: CalendarClockIcon, title: 'Licencia vencida', description: 'Puedes solicitar el servicio para confirmar cómo iniciar la refrendación de tu licencia.', classes: 'bg-primary-lighter text-primary' },
    { icon: FileCheck2Icon, title: 'Próxima a vencer', description: 'Solicita atención para revisar las acciones aplicables antes de que termine su vigencia.', classes: 'bg-accent-light text-accent' },
    { icon: ShieldCheckIcon, title: 'Documentación vigente', description: 'La refrendación ayuda a mantener actualizada la vigencia de tu licencia de conducción.', classes: 'bg-success-light text-success' },
  ] as const;
}
