import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivityIcon, BrainIcon, GaugeIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Presents the areas included in the medical exam service. */
@Component({
  selector: 'app-medical-exams-evaluations-section',
  imports: [Icon],
  templateUrl: './evaluations-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsEvaluationsSection {
  protected readonly evaluations = [
    { icon: ActivityIcon, title: 'Aptitud física', description: 'Conoce esta área dentro de los exámenes médicos para licencia.' },
    { icon: BrainIcon, title: 'Aptitud mental', description: 'Conoce esta área dentro de los exámenes médicos para licencia.' },
    { icon: GaugeIcon, title: 'Coordinación motriz', description: 'Conoce esta área dentro de los exámenes médicos para licencia.' },
  ] as const;
}
