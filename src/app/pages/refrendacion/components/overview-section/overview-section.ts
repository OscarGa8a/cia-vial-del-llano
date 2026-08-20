import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckIcon, FileSearchIcon, MessageCircleQuestionIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Introduces the scope of the license renewal service. */
@Component({
  selector: 'app-license-renewal-overview-section',
  imports: [Icon, NgOptimizedImage],
  templateUrl: './overview-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseRenewalOverviewSection {
  /** TODO: Replace only after the user supplies the approved Cloudinary public ID. */
  protected readonly referenceImagePublicId = 'TODO_CLOUDINARY_PUBLIC_ID_REFRENDED_LICENSE';
  protected readonly highlights = [
    { icon: FileSearchIcon, title: 'Servicio local', description: 'Solicita atención para tu refrendación en Villavicencio.' },
    { icon: MessageCircleQuestionIcon, title: 'Tu caso', description: 'Confirma los requisitos, el valor y la disponibilidad aplicables.' },
    { icon: CheckIcon, title: 'Proceso aplicable', description: 'Sigue las indicaciones confirmadas para continuar.' },
  ] as const;
}
